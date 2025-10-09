import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { View } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { useEffect, useState } from 'react';
import { measurementSessions, measurements } from '@/db/schema';
import { Select, SelectItem } from '@ui-kitten/components';
import { eq } from 'drizzle-orm';

interface CaptureData {
  rChannel: lineDataItem[];
  gChannel: lineDataItem[];
  bChannel: lineDataItem[];
  rMin: number;
  bMin: number;
  gMin: number;
}

type IdWithTimestamp = {
  id: number;
  timeStamp: string;
};

export default function Index() {
  const [captureIds, setCaptureIds] = useState<IdWithTimestamp[] | undefined>(
    undefined
  );
  const [selectedCapture, setSelectedCapture] = useState<number | undefined>(
    undefined
  );
  const [captureData, setCaptureData] = useState<CaptureData | undefined>(
    undefined
  );

  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);

  console.log(captureIds, selectedCapture);

  useEffect(() => {
    async function fetchCaptureIds(): Promise<void> {
      let captures = (
        await db
          .select({
            captureId: measurementSessions.captureId,
            timeStamp: measurementSessions.createdAt
          })
          .from(measurementSessions)
      ).map((c) => {
        console.log(c.timeStamp);
        return { id: c.captureId, timeStamp: c.timeStamp ?? 'Null Date' };
      }) as IdWithTimestamp[];
      setCaptureIds(captures);
    }

    async function fetchCaptureById(captureId: number): Promise<void> {
      const rawDat = await db
        .select()
        .from(measurements)
        .where(eq(measurements.captureId, captureId));

      let rRaw: lineDataItem[] = [];
      let gRaw: lineDataItem[] = [];
      let bRaw: lineDataItem[] = [];
      let ids: number[] = [];
      let rMin = 255;
      let gMin = 255;
      let bMin = 255;

      let i = 0;

      for (const dat of rawDat) {
        // discard ~first 2 seconds of capture bc its usually extremely noisy
        // don't do this during actual analysis obviously lol, this is just for presentation
        if (i < 120) {
          i++;
          continue;
        }

        let rAvg, gAvg, bAvg: number;
        rAvg = dat.avgRed;
        bAvg = dat.avgBlue;
        gAvg = dat.avgGreen;

        if (rAvg < rMin) {
          rMin = rAvg;
        }
        if (gAvg < gMin) {
          gMin = rAvg;
        }
        if (bAvg < bMin) {
          bMin = bAvg;
        }
        rRaw.push({ value: rAvg });
        gRaw.push({ value: gAvg });
        bRaw.push({ value: bAvg });
        ids.push(dat.id);
      }
      setCaptureData({
        rChannel: rRaw,
        gChannel: gRaw,
        bChannel: bRaw,
        rMin,
        bMin,
        gMin
      });
    }

    if (!captureIds) {
      fetchCaptureIds();
    }

    if (!captureData && selectedCapture) {
      fetchCaptureById(selectedCapture);
    }
  }, [captureIds, captureData, db, selectedCapture]);

  console.log(captureIds);

  return (
    <View className={'bg-white size-full'}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-end'
        }}
      >
        {captureData && (
          <View>
            <LineChart
              yAxisOffset={captureData.rMin - 2}
              hideDataPoints1
              rulesType={'solid'}
              data={captureData?.rChannel}
              spacing1={0.5}
              color={'#FF0000'}
              thickness={2}
              width={320}
            />
            <LineChart
              hideDataPoints1
              rulesType={'solid'}
              data={captureData?.gChannel}
              spacing1={0.5}
              color={'#00FF00'}
              thickness={2}
              width={320}
            />
            <LineChart
              hideDataPoints1
              yAxisOffset={captureData.bMin - 2}
              rulesType={'solid'}
              data={captureData?.bChannel}
              spacing1={0.5}
              color={'#0000FF'}
              thickness={2}
              width={320}
            />
          </View>
        )}
        <Select
          style={{
            width: 250,
            alignSelf: 'flex-end',
            marginRight: 20,
            marginBottom: 30
          }}
          placeholder={'Select a Capture'}
          multiSelect={false}
        >
          {captureIds &&
            captureIds.map((cap) => {
              console.log(cap);
              return (
                <SelectItem
                  onPress={() => setSelectedCapture(cap.id)}
                  key={cap.id}
                  title={`${cap.id} | ${cap.timeStamp}`}
                />
              );
            })}
        </Select>
      </View>
    </View>
  );
}
