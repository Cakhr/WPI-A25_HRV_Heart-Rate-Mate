import { Pressable, Text, View, StyleSheet, Switch } from 'react-native';
import { componentStyles } from '@/components/Util/ReusableStyles';
import { Input } from '@ui-kitten/components';
import { useState } from 'react';
import { Breathing } from '../../../components/Breathing/Breathing';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import {
  KeyboardAvoidingView,
  KeyboardController
} from 'react-native-keyboard-controller';
import { TextFormatted } from '@/components/Util/TextFormatted';

export default function CustomSession() {
  const [breathIn, setBreathIn] = useState<string>('4.0');
  const [breathOut, setBreathOut] = useState<string>('6.0');
  const [duration, setDuration] = useState<string>('10');
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
        <PageHeader title={'Custom Session'} />
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
              <View className={'bg-primary'} style={styles.title}>
                <Text
                  className={'text-text transition-all'}
                  style={{
                    ...componentStyles.textBoldXL,
                    fontSize: 24
                  }}
                >
                  {'Custom Session Details'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={styles.text}
                  className={'text-text transition-all'}
                >
                  {'Breath In (Sec):'}
                </Text>
                <Input
                  style={styles.numberInput}
                  value={breathIn.toString()}
                  keyboardType="numeric"
                  onChangeText={(nextValue) => setBreathIn(nextValue)}
                />
              </View>
              <View style={styles.row}>
                <Text
                  style={styles.text}
                  className={'text-text transition-all'}
                >
                  {'Breath Out (Sec):'}
                </Text>
                <Input
                  style={{ ...styles.numberInput }}
                  value={breathOut.toString()}
                  keyboardType="numeric"
                  onChangeText={(nextValue) => setBreathOut(nextValue)}
                />
              </View>
              <View style={styles.row}>
                <Text
                  style={styles.text}
                  className={'text-text transition-all'}
                >
                  {'Duration (Min):'}
                </Text>
                <Input
                  style={{ ...styles.numberInput }}
                  value={duration.toString()}
                  keyboardType="numeric"
                  onChangeText={(nextValue) => setDuration(nextValue)}
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
                  style={{ marginLeft: 'auto', marginRight: 8 }}
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
                  style={{ marginLeft: 'auto', marginRight: 8 }}
                />
              </View>
              <View style={{ ...styles.row, alignItems: 'center' }}>
                <Pressable
                  className={'bg-primary'}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    marginHorizontal: 'auto',
                    boxShadow: '1px 3px 5px -2px #333333'
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
    <Breathing
      bIn={parseFloat(breathIn)}
      bOut={parseFloat(breathOut)}
      duration={parseFloat(duration)}
      setShowBreathing={setShowBreathing}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginBottom: 30,
    borderRadius: 10
  },
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
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
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
