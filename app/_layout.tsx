import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import '../app/global.css';
import { BottomNavBar } from '@/components/BottomNavBar';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function RootLayout() {
  useDrizzleStudio(expo);
  const { success, error } = useMigrations(db, migrations);
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
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
  );
}
