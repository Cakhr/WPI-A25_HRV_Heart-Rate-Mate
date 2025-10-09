import { drizzle } from 'drizzle-orm/expo-sqlite';
import { FC, useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import {
  Camera,
  CameraDevice,
  CameraDeviceFormat,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor
} from 'react-native-vision-camera';
import { useSharedValue } from 'react-native-worklets-core';

import * as SQLite from 'expo-sqlite';
import { measurementSessions, measurements } from '@/db/schema';
import { Measurements, MeasurementCaptures } from '@/db/schemas/schemas';
import { DataTypes, ObjectType, OpenCV } from 'react-native-fast-opencv';
import { createResizePlugin } from 'vision-camera-resize-plugin';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { eq } from 'drizzle-orm';

export interface CaptureParams {
  width: number;
  height: number;
}

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function CameraPage() {
  // Capture parameters for camera
  const captureParams: CaptureParams = { width: 480, height: 640 };
  // Request camera permission
  const cameraPermissionStatus = async () => {
    return await Camera.requestCameraPermission();
  };

  // Filter for desired device (Back, ideally wide angle to avoid distortion)
  const device: CameraDevice | undefined = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera']
  });

  // Desired format
  const format: CameraDeviceFormat | undefined = useCameraFormat(device, [
    { videoResolution: captureParams }
  ]);

  // if permission is denied or device doesn't have a camera for some reason (Simualtor)
  if (cameraPermissionStatus.toString() === 'denied' || !device) {
    return (
      <View className="bg-background size-full">
        <PageHeader title={'PPG Capture'} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text className={'bg-card p-2 rounded-lg text-text'}>
            {!device ? 'No Camera Available :(' : 'Camera Permission Denied :('}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View className="bg-background size-full">
        <PageHeader title={'PPG Capture'} />
        <FrameAnalyzer
          device={device}
          format={format!}
          cParams={captureParams}
        />
      </View>
    );
  }
}

type Fps = 30 | 60;

interface FrameAnalyzerProps {
  device: CameraDevice;
  format: CameraDeviceFormat;
  cParams: CaptureParams;
}

// Raw RGB values -> time series -> frequency analysis -> heart rate

const FrameAnalyzer: FC<FrameAnalyzerProps> = ({ device, format, cParams }) => {
  const [capture, setCapture] = useState<boolean>(false);
  const [frameRate, setFrameRate] = useState<Fps>(60);
  const [torch, setTorch] = useState<boolean>(true);
  const [logs, setLogs] = useState<boolean>(false);
  const [session, setSession] = useState<MeasurementCaptures[] | undefined>(
    undefined
  );
  const captureSpool = useSharedValue<Measurements[]>([]);
  const captureStart = useSharedValue<number>(0);

  // useEffect to push records when capture stops
  useEffect(() => {
    const pushRecords = async () => {
      if (!capture && captureSpool.value.length > 0) {
        try {
          console.log(
            `pushing records, captureSpool size = ${captureSpool.value.length}`
          );
          await db
            .update(measurementSessions)
            .set({ duration: new Date().getTime() - captureStart.value })
            .where(
              eq(measurementSessions.captureId, session?.at(0)?.captureId ?? -1)
            );
          await db.insert(measurements).values(
            captureSpool.value.map((cap) => ({
              captureId: session?.at(0)?.captureId ?? -1,
              avgRed: cap.avgRed,
              avgGreen: cap.avgGreen,
              avgBlue: cap.avgBlue,
              ms: cap.ms
            }))
          );
          captureSpool.value = [];
          console.log(
            `records pushed, captureSpool size now = ${captureSpool.value.length}`
          );
        } catch (e) {
          console.log(e);
        }
      }
    };
    pushRecords();
    // we only want this useEffect to run when capture changes state, hence the below eslint-disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capture]);

  // init resize plugin for React Native Vision Camera
  const { resize } = createResizePlugin();

  // Process individual frames as they are streamed
  // This is done synchronously, testing on as old as an iPhone SE2 indicates it's plenty performant, stable 60fps
  // Each frame can only take ~16ms to analyze
  // !!! BGRA format expected
  // [ B, G, R, A, B, G, R, A ... ]
  // [ 0, 1, 2, 3, 4, 5, 6, 7 ... ]
  const frameProcessor = useFrameProcessor(
    async (frame) => {
      'worklet';
      if (frame.pixelFormat === 'rgb') {
        const fps: number = frameRate;
        const spoolLength: number = captureSpool.value.length;
        // Corresponds to ~1 min of recording
        if (spoolLength > fps * 60) {
          console.log(`Capture aborted, max capture size ${spoolLength}`);
          setCapture(false);
        }

        const width = cParams.width;
        const height = cParams.height;

        // crop to Region of Interest (~1/2 total area of frame, cropped from center), and strip out alpha channel
        const resized = resize(frame, {
          scale: {
            width: width,
            height: height
          },
          crop: {
            x: width / 4,
            y: height / 4,
            width: width / 2,
            height: height / 2
          },
          pixelFormat: 'bgr',
          dataType: 'uint8'
        });

        // even if deprecated, it works for now so I'm keeping it
        const src = OpenCV.frameBufferToMat(height, width, 3, resized);

        const r = OpenCV.createObject(ObjectType.Mat, 0, 0, DataTypes.CV_8U);
        const g = OpenCV.createObject(ObjectType.Mat, 0, 0, DataTypes.CV_8U);
        const b = OpenCV.createObject(ObjectType.Mat, 0, 0, DataTypes.CV_8U);

        // console.log(b.id, g.id, r.id);

        OpenCV.invoke('extractChannel', src, b, 0);
        OpenCV.invoke('extractChannel', src, g, 1);
        OpenCV.invoke('extractChannel', src, r, 2);

        // console.log('extracted');

        const avgRed = parseFloat(
          OpenCV.toJSValue(OpenCV.invoke('mean', r)).a.toFixed(6)
        );
        const avgGreen = parseFloat(
          OpenCV.toJSValue(OpenCV.invoke('mean', g)).a.toFixed(6)
        );
        const avgBlue = parseFloat(
          OpenCV.toJSValue(OpenCV.invoke('mean', b)).a.toFixed(6)
        );

        // console.log(rAvg, gAvg, bAvg);

        if (logs) {
          console.log(
            `BGR Avgs [${avgBlue}, ${avgGreen}, ${avgRed}] Time: ${new Date().getTime()}`
          );
        } else {
          // push to spool for later pushing to DB
          captureSpool.value.push({
            avgRed,
            avgGreen,
            avgBlue,
            ms: new Date().getMilliseconds()
          });
        }
        OpenCV.clearBuffers();
      }
    },
    [logs]
  );

  return (
    <View
      className={'bg-background'}
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-end',
        marginTop: 100
      }}
    >
      {capture && (
        <View
          style={{
            flex: 1,
            height: 'auto',
            borderColor: 'red',
            borderWidth: 2
          }}
        >
          <View
            style={{
              borderColor: 'skyblue',
              borderWidth: 2,
              width: '50%',
              height: '50%',
              position: 'absolute',
              top: '25%',
              right: '25%',
              zIndex: 10
            }}
          />
          <View
            style={{
              borderColor: 'cyan',
              borderWidth: 1,
              width: 5,
              height: 5,
              borderRadius: 100,
              position: 'absolute',
              top: '50%',
              right: '50%',
              zIndex: 10
            }}
          />
          <Camera
            focusable={true}
            enableFpsGraph={true}
            outputOrientation="preview"
            fps={frameRate}
            style={{ flex: 1 }}
            device={device!}
            format={format}
            resizeMode="contain"
            isActive={true}
            enableLocation={false}
            torch={torch ? 'on' : 'off'}
            pixelFormat="rgb"
            frameProcessor={frameProcessor}
          />
        </View>
      )}
      <View>
        <Pressable
          onPress={async () => {
            if (!capture) {
              setSession(
                (await db
                  .insert(measurementSessions)
                  .values({
                    resolution: `${cParams.height}x${cParams.width}`,
                    duration: 0
                  })
                  .returning()) as MeasurementCaptures[]
              );
            }

            captureStart.value = new Date().getTime();
            setCapture(!capture);
          }}
          style={{
            ...styles.debugButton,
            backgroundColor: capture ? 'red' : 'lime'
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {capture
              ? `End Stream ${session?.at(0)?.captureId ?? -1}`
              : 'Begin Stream'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTorch(!torch)}
          style={{
            ...styles.debugButton,
            backgroundColor: torch ? 'yellow' : 'black'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: torch ? 'black' : 'white'
            }}
          >
            {torch ? 'Torch ON' : 'Torch OFF'}
          </Text>
        </Pressable>
        <Pressable
          disabled={capture}
          onPress={() => {
            if (frameRate === 60) {
              setFrameRate(30);
            } else {
              setFrameRate(60);
            }
          }}
          style={{
            ...styles.debugButton,
            backgroundColor: 'red'
          }}
        >
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            {frameRate === 60 ? 'Use 30fps' : 'Use 60fps'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setLogs(!logs)}
          style={{
            ...styles.debugButton,
            marginBottom: 102,
            backgroundColor: logs ? 'lime' : 'salmon'
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {logs ? 'Stop Logging' : 'Log output to Console'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  debugButton: {
    margin: 2,
    padding: 6,
    borderRadius: 10
  }
});
