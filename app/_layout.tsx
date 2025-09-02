import { Stack } from 'expo-router';
import { View } from 'react-native';
import '../app/global.css';
import { BottomNavBar } from '@/components/BottomNavBar';

export default function RootLayout() {
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
