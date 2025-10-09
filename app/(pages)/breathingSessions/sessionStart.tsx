import { Modal, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { componentStyles } from '@/components/Util/ReusableStyles';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { TextFormatted } from '@/components/Util/TextFormatted';
import { PairLucideIcon } from '@/components/Util/PairLucideicon';
import { FC, useState } from 'react';

export default function Index() {
  const [showTechnique, setShowTechnique] = useState<boolean>(false);

  return (
    <View
      className={'size-full bg-background'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
      }}
    >
      <PageHeader title={'Sessions'} />
      <TechniqueModal open={showTechnique} setOpen={setShowTechnique} />
      <Pressable
        className={'bg-primary'}
        style={componentStyles.menuButton}
        onPress={() => {
          router.replace('/');
        }}
      >
        <PairLucideIcon size={48} icon={'heartpulse'} />
        <TextFormatted
          size={'xl'}
          align={'center'}
          weight={'bold'}
          content={'Daily Session'}
        />
      </Pressable>
      <Pressable
        className={'bg-primary'}
        style={componentStyles.menuButton}
        onPress={() => {
          router.push('./customSession');
        }}
      >
        <PairLucideIcon size={48} icon={'alarmclock'} />
        <TextFormatted
          size={'xl'}
          align={'center'}
          weight={'bold'}
          content={'Custom Session'}
        />
      </Pressable>
      <Pressable
        className={'bg-card'}
        style={{ ...componentStyles.menuButton, width: 260 }}
        onPress={() => {
          setShowTechnique(true);
        }}
      >
        <PairLucideIcon size={24} icon={'circlequestionmark'} />
        <TextFormatted
          size={'md'}
          align={'center'}
          weight={'bold'}
          content={'Breathing Technique'}
        />
      </Pressable>
    </View>
  );
}

const TechniqueModal: FC<{ open: boolean; setOpen: (v: boolean) => void }> = ({
  open,
  setOpen
}) => {
  if (!open) {
    return <></>;
  }
  return (
    <Modal visible={open} transparent={true} animationType="fade">
      <Pressable
        className={'size-full'}
        onPress={() => {
          setOpen(false);
        }}
        style={{
          position: 'absolute',
          opacity: 0.5,
          backgroundColor: '#000000'
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          className={'bg-card'}
          style={{
            width: 300,
            height: 400,
            borderRadius: 10,
            alignItems: 'center',
            padding: 30
          }}
        >
          <TextFormatted
            size={'md'}
            weight={'bold'}
            align={'center'}
            content={breathingInstructions}
          />
          <Pressable
            onPress={() => setOpen(false)}
            className={'bg-background'}
            style={{
              padding: 4,
              borderRadius: 10,
              width: 80,
              height: 30,
              boxShadow: '0px 2px 4px -2px #000000'
            }}
          >
            <TextFormatted
              size={'md'}
              weight={'bold'}
              align={'center'}
              content={'Dismiss'}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const breathingInstructions: string = `Imagine breathing through your stomach, as if it were a balloon.\n\nBreathe in through your nose, and out through your mouth.\n\nYour stomach should rise while your chest does not.\n\nTry that a few times, press 'Dismiss' when you’re ready to get started.`;
