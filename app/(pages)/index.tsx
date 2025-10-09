import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { componentStyles } from '@/components/Util/ReusableStyles';
import { PairLucideIcon } from '@/components/Util/PairLucideicon';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { TextFormatted } from '@/components/Util/TextFormatted';

export default function Index() {
  return (
    <View
      className={'bg-background size-full'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <PageHeader title={'Home'} disableBack={true} />
      <View
        className={'bg-card'}
        style={{
          marginTop: 'auto',
          marginBottom: 110,
          borderRadius: 10,
          padding: 10,
          paddingBottom: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Pressable
          style={componentStyles.buttonXL}
          className={'bg-primary'}
          onPress={() => {
            router.push('/breathingSessions/sessionStart');
          }}
        >
          <PairLucideIcon icon={'wind'} size={64} />
          <TextFormatted
            size={'xl'}
            weight={'bold'}
            align={'center'}
            content={'Breathing Sessions'}
          />
        </Pressable>
        <View style={{ gap: 10, marginTop: 20 }}>
          <Pressable
            style={componentStyles.menuButton}
            className={'bg-primary'}
            onPress={() => {
              router.push('/measurements/camera');
            }}
          >
            <PairLucideIcon icon={'heartpulse'} size={48} />
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={'Measure and Track'}
            />
          </Pressable>
          <Pressable
            style={componentStyles.menuButton}
            className={'bg-primary'}
            onPress={() => {
              router.push('/journaling/journal');
            }}
          >
            <PairLucideIcon icon={'bookheart'} size={48} />
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={'Journaling'}
            />
          </Pressable>
          <Pressable
            style={componentStyles.menuButton}
            className={'bg-primary'}
            onPress={() => {
              router.push('/learnMore/faq');
            }}
          >
            <PairLucideIcon icon={'circlequestionmark'} size={48} />
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={'Learn More'}
            />
          </Pressable>
          <Pressable
            style={componentStyles.menuButton}
            className={'bg-primary'}
            onPress={() => {
              router.push('/orientation/orientation');
            }}
          >
            <PairLucideIcon icon={'userplus'} size={48} />
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={'Orientation'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
