import { useState, useEffect, FC } from 'react';
import { RelativePathString, useRouter, usePathname } from 'expo-router';
import { Pressable, Text, Appearance, ColorSchemeName } from 'react-native';
import { House, Tally2, Tally3, Camera } from 'lucide-react-native';
import appearanceQuery from '../modules/appearanceQuery';

const darkIconStroke: string = '#10B0FF';
const lightIconStroke: string = '#01040c';

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
      return <House className={'p-1 transition-all'} size={32} color={color} />;
    case '/indexTwo':
      return (
        <Tally2 className={'p-1 transition-all'} size={32} color={color} />
      );
    case '/indexThree':
      return (
        <Tally3 className={'p-1 transition-all'} size={32} color={color} />
      );
    case '/camera':
      return (
        <Camera className={'p-1 transition-all'} size={32} color={color} />
      );
    default:
      console.log(
        'This should not happen lol, no icon matched to route [' + route + ']'
      );
      return <></>;
  }
};

export const NavButton = (route: RelativePathString) => {
  const router = useRouter();
  const currentPath: string = usePathname();

  return (
    <Pressable
      className={
        'flex-1 items-center justify-items-center bg-card rounded-2xl p-1 transition-all'
      }
      onPress={() => {
        if ((route as string) !== currentPath) {
          router.replace(route);
        }
      }}
    >
      <>
        {PairIcon(route)}
        <Text className={'text-text text-[10px]'}>{route}</Text>
      </>
    </Pressable>
  );
};
