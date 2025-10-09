import { CuratedBreathingSession } from '@/components/Breathing/CuratedSession';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { componentStyles } from '@/components/Util/ReusableStyles';
import { TextFormatted } from '@/components/Util/TextFormatted';
import { router } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

export const defaultBreathingRates = [
  { bIn: 3.2, bOut: 5.2 },
  { bIn: 3.7, bOut: 5.5 },
  { bIn: 3.8, bOut: 5.8 },
  { bIn: 4.0, bOut: 6.0 },
  { bIn: 4.2, bOut: 6.2 },
  { bIn: 4.4, bOut: 6.6 },
  { bIn: 4.8, bOut: 7.2 }
];

export default function Orientation() {
  const [beginOrientation, setBeginOrientation] = useState<boolean>(false);
  if (beginOrientation) {
    return <BreathingSessionSequence />;
  }
  return (
    <View
      className={'bg-background'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <PageHeader title={'User Orientation'} />
      <Pressable
        style={{
          ...componentStyles.menuButton,
          alignSelf: 'center',
          marginTop: 'auto',
          marginBottom: 110
        }}
        className={'bg-accent'}
        onPress={() => {
          setBeginOrientation(true);
        }}
      >
        <TextFormatted
          size={'lg'}
          weight={'bold'}
          align={'center'}
          content={'Press to Begin'}
        />
      </Pressable>
    </View>
  );
}

const BreathingSessionSequence = () => {
  const [transition, setTransition] = useState<boolean>(true);
  const [iterator, setIterator] = useState<number>(0);
  const [sessionRating, setSessionRating] = useState<number>(0);
  const [userRatings, setUserRatings] = useState<number[]>([]);

  // refresh rating between sessions
  useEffect(() => {
    setSessionRating(2);
  }, [iterator]);

  console.log(userRatings);

  const comfortButtonColors = [
    '#ff0000',
    '#ffa000',
    '#f0f000',
    '#00ff00',
    '#00f0f0'
  ];

  const SessionRatingButton: FC<{ value: number }> = ({ value }) => {
    console.log(value);
    return (
      <View>
        <Pressable
          className={'transition-all'}
          onPress={() => setSessionRating(value)}
          style={
            sessionRating === value
              ? {
                  ...styles.ratingButton,
                  ...styles.ratingSelected,
                  backgroundColor: comfortButtonColors[value]
                }
              : {
                  ...styles.ratingButton,
                  backgroundColor: comfortButtonColors[value]
                }
          }
        >
          <View style={{ alignContent: 'center' }}>
            <TextFormatted size="lg" weight="bold" content={value.toString()} />
          </View>
        </Pressable>
      </View>
    );
  };

  console.log(iterator);
  if (!transition && iterator < 6) {
    return (
      <View className={'bg-background'} style={{ flex: 1 }}>
        <View
          className={'bg-primary'}
          style={{
            marginBottom: 110,
            marginTop: 'auto',
            gap: 10,
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 10,
            paddingVertical: 20,
            marginHorizontal: 10
          }}
        >
          <View style={{ padding: 20, height: 100 }}>
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={'On a Scale of 1 to 5'}
            />
            <TextFormatted
              size={'md'}
              weight={'bold'}
              align={'center'}
              content={'Please Rate How Comfortable That Was'}
            />
          </View>
          <View
            style={{
              gap: 5,
              height: 80,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            {comfortButtonColors.map((color, index) => {
              return <SessionRatingButton key={index} value={index} />;
            })}
          </View>
          <Pressable
            style={{ ...componentStyles.menuButton, marginBottom: 10 }}
            className={'bg-accent'}
            onPress={() => {
              setIterator(iterator + 1);
              setTransition(true);
              setUserRatings([...userRatings, sessionRating]);
            }}
          >
            <TextFormatted
              size={'lg'}
              weight={'bold'}
              align={'center'}
              content={'Proceed to Next'}
            />
          </Pressable>
        </View>
      </View>
    );
  }
  if (transition) {
    return (
      <CuratedBreathingSession
        bIn={defaultBreathingRates[iterator].bIn}
        bOut={defaultBreathingRates[iterator].bOut}
        duration={2}
        sequence={iterator + 1}
        setTransition={setTransition}
      />
    );
  }
  return (
    <View
      className={'bg-background'}
      style={{ flex: 1, alignContent: 'center' }}
    >
      <View style={{ marginVertical: 'auto' }}>
        <Pressable
          className={'bg-primary'}
          style={{ ...componentStyles.menuButton, alignContent: 'center' }}
          onPress={() => {
            router.replace('/');
          }}
        >
          <TextFormatted
            size={'lg'}
            weight={'bold'}
            align={'center'}
            content="Return to Main Menu"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingButton: {
    padding: 25,
    borderRadius: 10,
    boxShadow: '0px 1px 8px #000000'
  },
  ratingSelected: {
    borderBottomWidth: 5,
    borderColor: '#ffffff'
  }
});
