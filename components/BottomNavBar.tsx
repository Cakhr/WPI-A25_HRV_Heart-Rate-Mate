import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { HamburgerMenu } from './HamburgerMenu';
import { useState } from 'react';
import { NavButton } from './NavButton';
import { RelativePathString } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export const BottomNavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigationRoutes: string[] = [
    '/',
    '/indexTwo',
    '/indexThree',
    '/camera'
  ];
  return (
    <View className={'flex w-full h-fit'}>
      <View
        className={`absolute left-0 h-full w-screen bg-primary pl-20 border-t-accent border-2 ${expanded ? '' : 'hidden'}`}
      >
        <SafeAreaProvider className={'m-4'}>
          <SafeAreaView
            className={'h-full py-3 rounded-2xl'}
            style={styles.container}
          >
            <ScrollView
              className={'h-24'}
              horizontal={true}
              showsVerticalScrollIndicator={false}
            >
              {navigationRoutes.map((pathString: string, index: number) => {
                return (
                  <View className={'size-20 ml-2'} key={'navbar.' + index}>
                    {NavButton(pathString as RelativePathString)}
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
      <View
        className={
          'absolute bottom-0 left-0 bg-primary p-6 size-28 rounded-full rounded-bl-none border-accent border-2 transition-all'
        }
      />
      <View
        className={
          'absolute bottom-0 -left-1 bg-primary border-accent border-t-2 w-1/2 h-full transition-all'
        }
      />
      <View
        className={
          'absolute -bottom-1 left-0 bg-primary border-accent border-r-2 w-full h-1/2 transition-all'
        }
      />
      <>
        <View
          className={
            'bg-primary w-fit h-fit p-5 m-1 rounded-full rounded-bl-none items-center justify-center border-primary border-1 transition-all'
          }
        >
          <Pressable
            className={'size-16 rounded-full'}
            onPress={() => setExpanded(!expanded)}
          >
            <HamburgerMenu />
          </Pressable>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    overflowY: 'hidden',
    overflowX: 'scroll'
  }
});

export default BottomNavBar;
