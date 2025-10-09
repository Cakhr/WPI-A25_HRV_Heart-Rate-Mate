import { FC } from 'react';
import { Text } from 'react-native';

interface TextProps {
  content: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
  customSize?: number | undefined;
  weight?: 'bold' | 'italic' | undefined;
  align?: 'center' | 'left' | 'right';
}

export const TextFormatted: FC<TextProps> = ({
  size,
  weight,
  customSize,
  content,
  align
}) => {
  let fontSize: number = 12;
  if (!customSize) {
    switch (size) {
      case 'md':
        fontSize = 16;
        break;
      case 'lg':
        fontSize = 20;
        break;
      case 'xl':
        fontSize = 24;
        break;
    }
  } else {
    fontSize = customSize;
  }
  if (!weight) {
    return (
      <Text
        style={{
          flex: 1,
          fontSize,
          textAlign: align
        }}
        className="text-text transition-all"
      >
        {content}
      </Text>
    );
  } else if (weight === 'bold') {
    return (
      <Text
        style={{
          flex: 1,
          fontSize,
          fontWeight: weight,
          textAlign: align
        }}
        className="text-text transition-all"
      >
        {content}
      </Text>
    );
  } else if (weight === 'italic') {
    return (
      <Text
        style={{
          flex: 1,
          fontSize,
          fontStyle: weight,
          textAlign: align
        }}
        className="text-text transition-all"
      >
        {content}
      </Text>
    );
  }
};
