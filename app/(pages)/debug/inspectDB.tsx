import { TextFormatted } from '@/components/Util/TextFormatted';
import { View } from 'react-native';

export default function Index() {
  return (
    <View className={'bg-background size-full'}>
      <View
        className={'bg-primary'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TextFormatted
          size={'md'}
          weight={'bold'}
          content={'Under Construction :)'}
        />
      </View>
    </View>
  );
}
