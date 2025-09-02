import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import '../app/global.css';
import { BottomNavBar } from '@/components/BottomNavBar';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { usersTable } from '../db/schema';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function RootLayout() {
  useDrizzleStudio(expo);
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>(
    null
  );
  useEffect(() => {
    if (!success) return;
    (async () => {
      await db.delete(usersTable);
      await db.insert(usersTable).values([
        {
          name: 'John',
          age: 30,
          email: 'john@example.com'
        }
      ]);
      const users = await db.select().from(usersTable);
      setItems(users);
    })();
  }, [success]);
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
  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
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
