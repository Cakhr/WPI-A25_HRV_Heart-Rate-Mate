import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { TextFormatted } from '../Util/TextFormatted';

export const NavBack = () => {
  if (!router.canGoBack()) {
    console.log(router.canGoBack());
    return <></>;
  }
  return (
    <View style={{ marginTop: 50, marginLeft: 30 }}>
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <TextFormatted
          size={'sm'}
          weight={'bold'}
          align={'center'}
          content={'< Back'}
        />
      </Pressable>
    </View>
  );
};
