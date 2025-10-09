import { View, Pressable, ScrollView } from 'react-native';
import { HamburgerMenu } from './NavMenuIcon';
import { useEffect, useState } from 'react';
import { NavButton } from './NavMenuButton';
import { RelativePathString } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export const navigationRoutes: string[] = [
  '/',
  '/learnMore/faq',
  '/measurements/camera',
  '/orientation/orientation',
  '/journaling/journal',
  '/debug/viewCaptures',
  '/debug/debugCapture',
  '/debug/inspectDB'
];

export const BottomNavBar = () => {
  const [expanded, setExpanded] = useState(false);
  console.log(expanded);

  const sv = useSharedValue<number>(-400);

  const easing = Easing.sin;

  useEffect(() => {
    if (expanded) {
      sv.value = withTiming(0, { duration: 250, easing });
    } else {
      sv.value = withTiming(-400, { duration: 125, easing });
    }
    console.log(sv.value);
  }, [sv, expanded, easing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sv.value }]
  }));

  // ${!expanded && 'hidden'}

  return (
    <View className={'flex w-full h-fit'}>
      <Animated.View style={[animatedStyle]}>
        <View
          className={`absolute bg-primary w-screen left-0 border-t-accent border-r-accent border-2`}
          style={{
            flex: 1,
            paddingTop: 5,
            marginLeft: 6,
            borderTopRightRadius: 10
          }}
        >
          <SafeAreaProvider>
            <SafeAreaView style={{ height: 'auto', overflowX: 'scroll' }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                style={{
                  flexDirection: 'row',
                  paddingLeft: 90,
                  marginRight: 10,
                  paddingBottom: 20
                }}
              >
                {navigationRoutes.map((pathString: string, index: number) => {
                  return (
                    <View
                      style={{ marginVertical: 'auto' }}
                      className={'size-20 ml-2'}
                      key={'navbar.' + index}
                    >
                      {NavButton(pathString as RelativePathString)}
                    </View>
                  );
                })}
              </ScrollView>
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      </Animated.View>
      <View
        className={
          'absolute bottom-0 left-0 bg-primary p-6 size-28 rounded-full rounded-bl-none border-accent border-2 transition-all'
        }
        style={{ boxShadow: `-4px 10px 10px 4px #111111` }}
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
        style={{ boxShadow: `-4px 13px 10px 4px #111111` }}
      />
      <>
        <View
          className={
            'bg-primary w-fit h-fit p-5 m-1 rounded-full rounded-bl-none items-center justify-center border-primary border-1 transition-all'
          }
        >
          <Pressable
            className={'size-16 rounded-full'}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            {HamburgerMenu(expanded)}
          </Pressable>
        </View>
      </>
    </View>
  );
};

export default BottomNavBar;
