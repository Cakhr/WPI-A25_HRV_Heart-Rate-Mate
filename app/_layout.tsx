import '../app/global.css';
import * as SQLite from 'expo-sqlite';
import * as eva from '@eva-design/eva';
import migrations from '../drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { BottomNavBar } from '@/components/NavMenu/NavMenu';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { ApplicationProvider } from '@ui-kitten/components';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { TextFormatted } from '@/components/Util/TextFormatted';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function RootLayout() {
  useDrizzleStudio(expo);
  const { success, error } = useMigrations(db, migrations);
  if (error) {
    return (
      <View
        className={'bg-background'}
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <View
          className={'bg-red-900'}
          style={{ height: 40, padding: 10, borderRadius: 10 }}
        >
          <TextFormatted
            size={'md'}
            weight={'bold'}
            align={'center'}
            content={`DB migration error: ${error.message}`}
          />
        </View>
      </View>
    );
  }
  if (!success) {
    return (
      <View
        className={'bg-background'}
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <View
          className={'bg-card'}
          style={{ height: 40, padding: 10, borderRadius: 10 }}
        >
          <TextFormatted
            size={'md'}
            weight={'bold'}
            align={'center'}
            content={`DB migration is in progress...`}
          />
        </View>
      </View>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.mapping}>
      <KeyboardProvider>
        <View className={'size-full'}>
          <View className={'absolute bottom-0 left-0 z-50'}>
            <BottomNavBar />
          </View>
          <Stack
            screenOptions={{
              headerShown: false, //hides navigation header
              headerStyle: { backgroundColor: 'background' }, // background
              headerTintColor: 'accent', // back button + title color
              headerTitleStyle: { fontWeight: 'bold' } // title font
            }}
          />
        </View>
      </KeyboardProvider>
    </ApplicationProvider>
  );
}
