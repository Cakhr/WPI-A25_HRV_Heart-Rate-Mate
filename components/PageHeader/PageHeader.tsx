import { router } from 'expo-router';
import { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

export const PageHeader: FC<{ title: string; disableBack?: boolean }> = ({
  title,
  disableBack
}) => {
  return (
    <View
      className={'bg-card w-screen'}
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 25,
        paddingTop: 50,
        paddingBottom: 15,
        boxShadow: '0px 1px 8px #000000'
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Text
          className={'text-text'}
          style={{
            flexGrow: 1,
            fontSize: 32,
            fontWeight: 'bold',
            marginLeft: 30,
            textAlign: 'left'
          }}
        >
          {title}
        </Text>
        {!disableBack && router.canGoBack() && (
          <View
            className={'bg-background'}
            style={{
              marginVertical: 'auto',
              marginLeft: 'auto',
              marginRight: 20,
              padding: 5,
              borderRadius: 5,
              alignSelf: 'flex-start'
            }}
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Text style={{ textAlign: 'center' }} className={'text-text'}>
                {'< Back'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
