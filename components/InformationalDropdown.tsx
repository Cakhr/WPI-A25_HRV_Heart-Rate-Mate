import { useState, FC, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { TextFormatted } from './Util/TextFormatted';
import { PairLucideIcon } from './Util/PairLucideicon';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing
} from 'react-native-reanimated';

export const darkIconStroke: string = '#10B0FF';
export const lightIconStroke: string = '#dddddd';

interface InfoDropdownProps {
  title: string;
  content: string;
}

const duration: number = 125;

export const InfoDropdown: FC<InfoDropdownProps> = ({ title, content }) => {
  const [open, setOpen] = useState<boolean>(false);
  const chevron = useSharedValue<string>('-90deg');
  const dropdown = useSharedValue<number>(0);
  const dropdownOffset = useSharedValue<number>(-50);
  const easingChev = Easing.linear;
  const easingDrop = Easing.sin;

  console.log(dropdownOffset.value, dropdown.value);

  //TODO figure out a way to make initial anim smooth

  // // only want this firing on initial render
  // useEffect(() => {
  //   if (open) {
  //     setOpen(false);
  //     dropdown.value = dropdownOffset.value;
  //   }
  //   console.log(dropdown.value, dropdownOffset.value);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dropdownOffset.value]);

  useEffect(() => {
    if (open) {
      dropdown.value = withTiming(0, {
        duration,
        easing: easingDrop
      });
      chevron.value = withTiming('0deg', { duration, easing: easingChev });
    } else {
      dropdown.value = withTiming(dropdownOffset.value, {
        duration,
        easing: easingDrop
      });
      chevron.value = withTiming('-90deg', { duration, easing: easingChev });
    }
    console.log(chevron.value);
  }, [chevron, dropdown, dropdownOffset, easingChev, easingDrop, open]);

  const chrevronAnimated = useAnimatedStyle(() => ({
    transform: [{ rotate: chevron.value }]
  }));

  const dropDownAnimated = useAnimatedStyle(() => ({
    transform: [{ translateY: dropdown.value }]
  }));

  return (
    <View style={{ flex: 1, padding: 5, paddingHorizontal: 10 }}>
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
      >
        <View
          className={'bg-primary'}
          style={{
            flexDirection: 'row',
            padding: 10,
            paddingVertical: 20,
            borderRadius: 10,
            boxShadow: '0px 4px 4px -2px #000000',
            zIndex: 20,
            alignItems: 'center'
          }}
        >
          <TextFormatted
            size={'md'}
            weight={'bold'}
            align={'center'}
            content={title}
          />
          <Animated.View style={[chrevronAnimated]}>
            <PairLucideIcon icon="chevron" size={24} />
          </Animated.View>
        </View>
        <Animated.View
          style={[dropDownAnimated, { paddingHorizontal: 5, zIndex: 10 }]}
        >
          <View
            onLayout={(e) => {
              dropdownOffset.value = -e.nativeEvent.layout.height / 4;
            }}
            style={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 5,
              paddingTop: 0,
              boxShadow: '0px 4px 5px -2px #000000'
            }}
            className={`bg-primary ${!open && 'hidden'}`}
          >
            <View
              style={{
                backgroundColor: '#CCCCCC',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 10,
                paddingTop: 0
              }}
            >
              <Markdown>{content}</Markdown>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};
