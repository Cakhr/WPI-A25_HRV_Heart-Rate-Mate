import { useState, useEffect, FC } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import {
  AlarmClock,
  BookHeart,
  ChevronDownCircle,
  CircleQuestionMark,
  CloudSun,
  HeartPulse,
  LibraryBig,
  ListChecks,
  MessageCircleMore,
  NotebookPen,
  PenLine,
  Smile,
  SquarePen,
  Trash2,
  UserPlus,
  Wind
} from 'lucide-react-native';
import appearanceQuery from '../../modules/appearanceQuery';

export const darkIconStroke: string = '#10B0FF';
export const lightIconStroke: string = '#cccccc';

interface IconProps {
  icon: IconName;
  size: number;
}

export type IconName =
  | 'wind'
  | 'notebookpen'
  | 'heartpulse'
  | 'bookheart'
  | 'userplus'
  | 'chevron'
  | 'penline'
  | 'librarybig'
  | 'circlequestionmark'
  | 'squarepen'
  | 'cloudsun'
  | 'smile'
  | 'messagecirclemore'
  | 'trash2'
  | 'alarmclock'
  | 'listchecks';

export const PairLucideIcon: FC<IconProps> = ({ icon, size }) => {
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

  switch (icon as string) {
    case 'wind':
      return (
        <Wind
          className={'p-1 transition-all'}
          style={{ marginRight: 'auto', marginVertical: 'auto' }}
          size={size}
          color={color}
        />
      );
    case 'notebookpen':
      return (
        <NotebookPen
          className={'p-1 transition-all'}
          style={{ marginRight: 'auto', marginVertical: 'auto' }}
          size={size}
          color={color}
        />
      );
    case 'heartpulse':
      return (
        <HeartPulse
          className={'p-1 transition-all'}
          style={{ marginRight: 'auto', marginVertical: 'auto' }}
          size={size}
          color={color}
        />
      );
    case 'bookheart':
      return (
        <BookHeart
          className={'p-1 transition-all'}
          style={{ marginRight: 'auto', marginVertical: 'auto' }}
          size={size}
          color={color}
        />
      );
    case 'userplus':
      return (
        <UserPlus
          className={'p-1 transition-all'}
          style={{ marginRight: 'auto', marginVertical: 'auto' }}
          size={size}
          color={color}
        />
      );
    case 'chevron':
      return (
        <ChevronDownCircle
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'penline':
      return (
        <PenLine
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'librarybig':
      return (
        <LibraryBig
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'circlequestionmark':
      return (
        <CircleQuestionMark
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'squarepen':
      return (
        <SquarePen
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'cloudsun':
      return (
        <CloudSun
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'smile':
      return (
        <Smile
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'messagecirclemore':
      return (
        <MessageCircleMore
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'trash2':
      return (
        <Trash2
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'alarmclock':
      return (
        <AlarmClock
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );
    case 'listchecks':
      return (
        <ListChecks
          style={{ margin: 'auto' }}
          className={'transition-all'}
          size={size}
          color={color}
        />
      );

    default:
      console.log('no icon matched to lucide icon [' + icon + ']');
      return <></>;
  }
};
