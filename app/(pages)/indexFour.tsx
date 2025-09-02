import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className={'bg-background size-full'}>
      <View
        className={'bg-accent'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text className={'bg-card p-2 rounded-lg text-text'}>
          Edit app/pages/indexFour.tsx to edit this screen.
        </Text>
      </View>
    </View>
  );
}
