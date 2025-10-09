import { FC, useEffect, useState } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  cancelAnimation,
  configureReanimatedLogger
} from 'react-native-reanimated';
import { Pressable, StyleSheet, View } from 'react-native';
import { componentStyles } from '../Util/ReusableStyles';
import { TextFormatted } from '../Util/TextFormatted';

export interface BreathingParams {
  bIn: number;
  bOut: number;
  duration: number;
  setShowBreathing: (value: boolean) => void;
}

export const Breathing: FC<BreathingParams> = ({
  bIn,
  bOut,
  duration,
  setShowBreathing
}) => {
  configureReanimatedLogger({ strict: false });
  const [breathingInProgress, setBreathingInProgress] =
    useState<boolean>(false);
  // seconds -> ms
  const durationIn = bIn * 1000;
  const durationOut = bOut * 1000;
  // minutes -> ms
  const sessionDuration = duration * 60000;

  const scale = useSharedValue<number>(0.1);
  // const timer = useSharedValue<number>(180);

  let startTime: number = 0;

  const easing = Easing.sin;

  useEffect(() => {
    if (!breathingInProgress) {
      cancelAnimation(scale);
      console.log('Session Cancelled');
    } else {
      scale.value = withRepeat(
        withSequence(
          withTiming(1, { duration: durationIn, easing }),
          withTiming(0.1, { duration: durationOut, easing })
        ),
        sessionDuration / (durationIn + durationOut)
      );
    }
  }, [
    scale,
    durationIn,
    durationOut,
    breathingInProgress,
    startTime,
    sessionDuration,
    easing
  ]);

  const breathingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  // const [timer, setTimer] = useState(sessionDuration);
  // const [timeInterval, setTimeInterval] = useState(null);
  // console.log(timer);

  // // Function to start the timer
  // const startTimer = () => {
  //   // Use setInterval to update the timer every 1000 milliseconds (1 second)
  //   setTimeInterval(
  //     setInterval(() => {
  //       // Update the timer by incrementing the previous value by 1
  //       setTimer((prev) => prev - 100);
  //     }, 1000);
  //     return null;
  //   );
  // };

  // const pauseTimer = () => {
  //   // Clear the interval to stop the timer from updating
  //   setTimeInterval(null);
  // };

  // // Function to reset the timer
  // const resetTimer = () => {
  //   // Reset the timer value to 0
  //   setTimer(sessionDuration);
  //   // Clear the interval to stop the timer
  //   clearInterval(timeInterval);
  // };

  return (
    <View className={'bg-background size-full'} style={{ flex: 1 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={styles.boxOutlineInner} />
        <Animated.View style={[styles.box, breathingStyle]} />
        <View style={styles.boxOutline} />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{ position: 'absolute', bottom: 0, width: 200, height: 40 }}
        />
        <View style={{ height: '100%', marginTop: '250%' }}>
          <Pressable
            style={componentStyles.menuButton}
            className={'bg-accent'}
            onPress={() => {
              if (!breathingInProgress) {
                startTime = new Date().getTime();
                // startTimer();
              } else {
                scale.value = 0.1;
                // setTimeInterval(null);
              }
              setBreathingInProgress(!breathingInProgress);
            }}
          >
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={`${breathingInProgress ? 'Pause' : 'Start'} Session`}
            />
          </Pressable>
          <Pressable
            className={'bg-accent'}
            style={{
              ...componentStyles.menuButton,
              marginBottom: 110,
              marginTop: 10
            }}
            onPress={() => {
              setBreathingInProgress(false);
              setShowBreathing(false);
            }}
          >
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={`End Exercise`}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    top: 200,
    height: 240,
    zIndex: 10,
    width: 240,
    backgroundColor: '#b58df1',
    borderRadius: 120
  },
  boxOutline: {
    position: 'absolute',
    top: 200,
    zIndex: 20,
    height: 238,
    width: 238,
    borderWidth: 2,
    borderColor: '#6fff6f',
    borderRadius: 120
  },
  boxOutlineInner: {
    position: 'absolute',
    top: 308,
    zIndex: 20,
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: '#ff3000',
    borderRadius: 100
  }
});
