import { Menu, X } from 'lucide-react-native';
import { View } from 'react-native';
import { useEffect } from 'react';
import appearanceQuery from '../../modules/appearanceQuery';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSequence
} from 'react-native-reanimated';
import { lightIconStroke, darkIconStroke } from '../Util/PairLucideicon';

export const HamburgerMenu = (expanded: boolean) => {
  const sv = useSharedValue<string>('0deg');

  const easing = Easing.linear;

  useEffect(() => {
    if (expanded) {
      sv.value = withSequence(withTiming('90deg', { duration: 250, easing }));
    } else {
      sv.value = withTiming('0deg', { duration: 125, easing });
    }
    console.log(sv.value);
  }, [sv, easing, expanded]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: sv.value }]
  }));

  let color: string = '';
  if (appearanceQuery()) {
    color = darkIconStroke;
  } else {
    color = lightIconStroke;
  }

  return (
    <View
      className={
        'bg-card rounded-full flex-auto items-center justify-center transition-all'
      }
    >
      <Animated.View style={[animatedStyle]}>
        {expanded ? (
          <X className={'mx-auto'} size={34} color={color} />
        ) : (
          <Menu className={'mx-auto'} size={34} color={color} />
        )}
      </Animated.View>
    </View>
  );
};

export default HamburgerMenu;
