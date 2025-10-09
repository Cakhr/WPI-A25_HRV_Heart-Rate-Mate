import { Pressable, Text, View, StyleSheet, Switch } from 'react-native';
import { componentStyles } from '@/components/Util/ReusableStyles';
import { FC, useState } from 'react';
import { Breathing } from './Breathing';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import {
  KeyboardAvoidingView,
  KeyboardController
} from 'react-native-keyboard-controller';
import { TextFormatted } from '@/components/Util/TextFormatted';

export interface BreathingSessionProps {
  bIn: number;
  bOut: number;
  duration: number;
  sequence: number;
  setTransition: (transition: boolean) => void;
}

export const CuratedBreathingSession: FC<BreathingSessionProps> = ({
  bIn,
  bOut,
  duration,
  sequence,
  setTransition
}) => {
  const [haptics, setHaptics] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const [showBreathing, setShowBreathing] = useState<boolean>(false);

  if (!showBreathing) {
    return (
      <View
        style={{
          flex: 1
        }}
        className={'bg-background size-full transition-all'}
      >
        <PageHeader title={'Curated Session'} />
        <Pressable
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            KeyboardController.dismiss();
          }}
          accessible={false}
        >
          <KeyboardAvoidingView
            behavior={'position'}
            keyboardVerticalOffset={10}
          >
            <View className={'bg-card transition-all'} style={styles.body}>
              <View
                className={'bg-primary'}
                style={{
                  marginHorizontal: 10,
                  padding: 10,
                  paddingHorizontal: 20,
                  marginVertical: 10,
                  marginBottom: 30,
                  borderRadius: 10,
                  boxShadow: 'inset 1px 1px 5px 1px #333333'
                }}
              >
                <Text
                  className={'text-text transition-all'}
                  style={{
                    ...componentStyles.textBoldXL,
                    fontSize: 24
                  }}
                >
                  {`Session ${sequence} of 7 Details`}
                </Text>
              </View>
              <View style={styles.row}>
                <View>
                  <TextFormatted
                    size="lg"
                    weight="bold"
                    content="Breath in (Seconds):"
                  />
                </View>
                <TextFormatted
                  size="lg"
                  weight="bold"
                  align="right"
                  content={bIn.toString()}
                />
              </View>
              <View style={styles.row}>
                <View>
                  <TextFormatted
                    size="lg"
                    weight="bold"
                    content="Breath Out (Seconds):"
                  />
                </View>
                <TextFormatted
                  size="lg"
                  weight="bold"
                  align="right"
                  content={bOut.toString()}
                />
              </View>
              <View style={styles.row}>
                <View>
                  <TextFormatted
                    size="lg"
                    weight="bold"
                    content="Duration (Minutes):"
                  />
                </View>
                <TextFormatted
                  size="lg"
                  weight="bold"
                  align="right"
                  content={duration.toString()}
                />
              </View>
              <View style={{ ...styles.row, alignItems: 'center' }}>
                <TextFormatted
                  size={'md'}
                  weight={'bold'}
                  content={'Haptic FeedBack:'}
                />
                <Switch
                  value={haptics}
                  onValueChange={(value) => setHaptics(value)}
                  style={{ marginLeft: 'auto' }}
                />
              </View>
              <View style={{ ...styles.row, alignItems: 'center' }}>
                <TextFormatted
                  size={'md'}
                  weight={'bold'}
                  content={'Audio FeedBack:'}
                />
                <Switch
                  value={audio}
                  onValueChange={(value) => setAudio(value)}
                  style={{ marginLeft: 'auto' }}
                />
              </View>
              <View style={{ ...styles.row, alignItems: 'center' }}>
                <Pressable
                  className={'bg-primary'}
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    marginHorizontal: 'auto'
                  }}
                  onPress={() => {
                    setShowBreathing(true);
                  }}
                >
                  <Text
                    className={'text-text transition-all'}
                    style={componentStyles.textBold}
                  >
                    {'Start Session'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </View>
    );
  }
  return (
    <View className={'bg-background'}>
      <Breathing
        bIn={bIn}
        bOut={bOut}
        duration={duration}
        setShowBreathing={setTransition} // :3
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: 'auto',
    width: 'auto',
    borderRadius: 10,
    padding: 20,
    gap: 30
  },
  numberInput: {
    width: 70,
    height: 30,
    paddingLeft: 10,
    backgroundColor: '#CCCCCC',
    boxShadow: 'inset 1px 1px 7px 1px #666666',
    marginLeft: 'auto'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textSm: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
