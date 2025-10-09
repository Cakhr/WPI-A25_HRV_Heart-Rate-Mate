import { useState, useEffect, FC } from 'react';
import { RelativePathString, useRouter, usePathname } from 'expo-router';
import { Pressable, Text, Appearance, ColorSchemeName } from 'react-native';
import {
  House,
  Tally2,
  Tally3,
  Camera,
  Bug,
  ChartLine,
  MessageCircleQuestionMark,
  NotebookPen,
  UserPlus,
  Database
} from 'lucide-react-native';
import appearanceQuery from '../../modules/appearanceQuery';
import { darkIconStroke, lightIconStroke } from '../Util/PairLucideicon';

const PairIcon: FC<RelativePathString> = (route) => {
  // triggers rerender on appearance change
  const [appearance, setAppearance] = useState<ColorSchemeName | undefined>(
    Appearance.getColorScheme()
  );

  // appearance change listener
  useEffect(() => {
    const listener = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }: { colorScheme: ColorSchemeName }) => {
        setAppearance(newColorScheme as ColorSchemeName);
      }
    );
    return () => listener.remove();
  }, [appearance]);

  // set svg stroke colors
  let color: string = '#FFFFFF'; // svg stroke color
  if (appearanceQuery()) {
    // check if dark mode?
    color = darkIconStroke;
  } else {
    color = lightIconStroke;
  }

  switch (route as string) {
    case '/':
      return (
        <House
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/indexTwo':
      return (
        <Tally2
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/indexThree':
      return (
        <Tally3
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/measurements/camera':
      return (
        <Camera
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/orientation/orientation':
      return (
        <UserPlus
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/journaling/journal':
      return (
        <NotebookPen
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/learnMore/faq':
      return (
        <MessageCircleQuestionMark
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/debug/debugCapture':
      return (
        <Bug
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/debug/viewCaptures':
      return (
        <ChartLine
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    case '/debug/inspectDB':
      return (
        <Database
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={32}
          color={color}
        />
      );
    default:
      console.log('No icon matched for route [' + route + ']');
      return <></>;
  }
};

export const NavButton = (route: RelativePathString) => {
  const router = useRouter();
  const currentPath: string = usePathname();

  return (
    <Pressable
      className={'bg-card'}
      style={{
        flex: 1,
        flexGrow: 1,
        borderRadius: 10,
        boxShadow: `0px 3px 5px -2px #000000`
      }}
      onPress={() => {
        if ((route as string) !== currentPath) {
          router.replace(route);
        }
      }}
    >
      <>
        {PairIcon(route)}
        <Text
          className={'text-text'}
          style={{ fontSize: 8, fontWeight: 'bold', padding: 4 }}
        >
          {route === ('/' as RelativePathString) ? '/home' : route}
        </Text>
      </>
    </Pressable>
  );
};
