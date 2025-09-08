import { drizzle } from 'drizzle-orm/expo-sqlite';
import { FC, useEffect, useState } from 'react';
import { Text, View, Pressable, Animated } from 'react-native';
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

interface CaptureParams {
  width: number;
  height: number;
}

interface ColorInfo {
  b: number;
  g: number;
  r: number;
  rA: number;
  gA: number;
}
const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function CameraPage() {
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
    { videoResolution: captureParams },
    { fps: 30 }
  ]);

  if (cameraPermissionStatus.toString() === 'denied' || !device) {
    return (
      <View className="bg-background size-full">
        <View
          className={'bg-background'}
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
      <FrameAnalyzer
        device={device}
        format={format!}
        captureParams={captureParams}
      />
    );
  }
}

interface FrameAnalyzerProps {
  device: CameraDevice;
  format: CameraDeviceFormat;
  captureParams: CaptureParams;
}

const FrameAnalyzer: FC<FrameAnalyzerProps> = ({
  device,
  format,
  captureParams
}) => {
  const [capture, setCapture] = useState<boolean>(false);
  const [torch, setTorch] = useState<boolean>(false);
  const [logs, setLogs] = useState<boolean>(false);
  const [details, setDetails] = useState<ColorInfo>({
    b: 0,
    g: 0,
    r: 0,
    rA: 0,
    gA: 0
  });
  const captureDetails = useSharedValue<ColorInfo>({
    b: 0,
    g: 0,
    r: 0,
    rA: 0,
    gA: 0
  });
  // frameProcessor consts
  const frameSize = captureParams.width * captureParams.height * 4;
  // length of R, G, B & A arrays
  const color = frameSize / 4;
  // center of the frame, scan direction TB-LR
  const center = frameSize / 2 + captureParams.height * 2;

  // TODO using this to force re-renders feels gross will try to figure out something else
  useEffect(() => {
    if (!logs && details !== captureDetails.value) {
      setDetails(captureDetails.value);
    }
  }, [captureDetails, details, logs, setDetails]);

  // Process individual frames as they are streamed
  // This is done synchronously, we'll switch to async once I set up the db for it
  // !!! BGRA format expected
  // [ B, G, R, A, B, G, R, A ... ]
  // [ 0, 1, 2, 3, 4, 5, 6, 7 ... ]
  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      if (frame.pixelFormat === 'rgb') {
        const buffer = frame.toArrayBuffer();
        const data = new Uint8Array(buffer);
        let redAvg: number, greenAvg: number;
        redAvg = greenAvg = 0;
        for (let i = 0; i < frameSize + 1; i++) {
          switch (i % 4) {
            case 0:
              // Short circuit, we don't need the blue (0) or alpha (3) channels
              continue;
            case 3:
              // ditto
              continue;
            case 2:
              redAvg += data[i];
              continue;
            case 1:
              greenAvg += data[i];
              continue;
            default:
              // this should not happen :)
              console.log('what the flip');
              break;
          }
        }

        redAvg = redAvg / color;
        greenAvg = greenAvg / color;

        if (logs) {
          console.log(
            `BGRA @ center [${data[center]}, ${data[center + 1]}, ${data[center + 2]}, ${data[center + 3]}] -- (R-Avg: ${redAvg}, G-Avg: ${greenAvg})`
          );
        } else {
          captureDetails.value = {
            b: data[center],
            g: data[center + 1],
            r: data[center + 2],
            rA: redAvg,
            gA: greenAvg
          };
        }
      }
    },
    [captureDetails, logs]
  );

  return (
    <View
      className={'bg-background'}
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-end'
      }}
    >
      {capture && (
        <View
          style={{
            flex: 1,
            borderColor: 'red',
            borderWidth: 2
          }}
        >
          <View
            style={{
              borderColor: 'cyan',
              borderWidth: 2,
              width: 5,
              height: 5,
              borderRadius: 100,
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 10
            }}
          />
          <Camera
            outputOrientation="preview"
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
        {!logs && (
          <View className="bg-card p-2 rounded-lg">
            <Animated.Text className={'text-text'}>
              {`BGR @ Center [${details.b}, ${details.g}, ${details.r}] 
                (Red Avg: ${details.rA.toFixed(2)}) (Green Avg: ${details.gA.toFixed(2)})`}
            </Animated.Text>
          </View>
        )}
        <Pressable
          onPress={() => setCapture(!capture)}
          style={{
            ...styles.debugButton,
            backgroundColor: capture ? 'red' : 'lime'
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {capture ? 'End Stream' : 'Begin Stream'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setLogs(!logs)}
          style={{
            ...styles.debugButton,
            backgroundColor: logs ? 'lime' : 'salmon'
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {logs ? 'Switch to live view' : 'Switch to console logging'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTorch(!torch)}
          style={{
            ...styles.debugButton,
            backgroundColor: torch ? 'yellow' : 'black',
            marginBottom: 102
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
      </View>
    </View>
  );
};

const styles = {
  debugButton: {
    margin: 2,
    padding: 4,
    borderRadius: 100
  }
};
