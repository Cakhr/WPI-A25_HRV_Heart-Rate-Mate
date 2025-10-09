import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';
import { Pressable, Text, View } from 'react-native';
import { measurements, measurementSessions } from '@/db/schema';
import { DataTypes, ObjectType, OpenCV } from 'react-native-fast-opencv';

export default function Index() {
  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);

  return (
    <View className={'bg-background size-full'}>
      <View
        className={'bg-background'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text></Text>
        <Pressable
          className={'bg-card p-2 rounded-lg text-text'}
          onPress={async () => {
            const toConvert = await db
              .select({ captureId: measurementSessions.captureId })
              .from(measurementSessions)
              .where(eq(measurementSessions.analyzed, false));
            for (const capture of toConvert) {
              const rawDat = await db
                .select()
                .from(measurements)
                .where(eq(measurements.captureId, capture.captureId));

              console.log(
                `Capture meaurements fetched for CapID: ${capture.captureId}`
              );

              let rRaw: number[] = [];
              let gRaw: number[] = [];
              let bRaw: number[] = [];
              let ids: number[] = [];

              for (const dat of rawDat) {
                rRaw.push(dat.avgRed);
                gRaw.push(dat.avgGreen);
                bRaw.push(dat.avgBlue);
                ids.push(dat.id);
              }

              console.log('Moving Data to OpenCV Mats');

              const rR = OpenCV.createObject(
                ObjectType.Mat,
                1,
                rRaw.length,
                DataTypes.CV_32F,
                rRaw
              );

              const gR = OpenCV.createObject(
                ObjectType.Mat,
                1,
                gRaw.length,
                DataTypes.CV_32F,
                gRaw
              );

              const bR = OpenCV.createObject(
                ObjectType.Mat,
                1,
                bRaw.length,
                DataTypes.CV_32F,
                bRaw
              );

              const rDst = OpenCV.createObject(
                ObjectType.Mat,
                1,
                rRaw.length,
                DataTypes.CV_32F
              );

              const gDst = OpenCV.createObject(
                ObjectType.Mat,
                1,
                gRaw.length,
                DataTypes.CV_32F
              );

              const bDst = OpenCV.createObject(
                ObjectType.Mat,
                1,
                bRaw.length,
                DataTypes.CV_32F
              );

              console.log('OpenCV Mats initialized, converting');

              OpenCV.invoke('dft', rR, rDst, 16, 0);
              OpenCV.invoke('dft', gR, gDst, 16, 0);
              OpenCV.invoke('dft', bR, bDst, 16, 0);

              const buf = OpenCV.matToBuffer(rDst, 'float32').buffer;
              console.log('Conversion complete, pushing to db');

              const dftPlanes = OpenCV.createObject(
                ObjectType.Mat,
                2,
                rRaw.length,
                DataTypes.CV_32F
              );

              console.log('hi');

              let real: number[] = [];
              let imag: number[] = [];

              for (let i = 0; i < buf.length; i++) {
                if (i % 2 === 0) {
                  real.push(buf[i]);
                } else {
                  imag.push(buf[i]);
                }
              }

              console.log(real);
              console.log(imag);
              // const rArr = OpenCV.toJSValue(rDst);
              // const gArr = OpenCV.toJSValue(gDst);
              // const bArr = OpenCV.toJSValue(bDst);

              let i = 0;

              // await db.insert(measurementsFourier).values(
              //   ids.map((id) => {
              //     (capture.captureId,
              //       id,
              //       rArr.data[i],
              //       gArr.data[i],
              //       bArr.data[i],
              //       '0');
              //   })
              // );
              OpenCV.clearBuffers();
            }
          }}
        >
          <Text className={'text-text'}>
            {'Convert and Log measurement captures'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
