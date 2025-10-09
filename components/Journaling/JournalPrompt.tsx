import { FC } from 'react';
import { Pressable, View } from 'react-native';
import { TextFormatted } from '../Util/TextFormatted';
import { PairLucideIcon } from '../Util/PairLucideicon';
import { PromptSelection } from '@/app/(pages)/journaling/newJournal';

interface JournalPromptProps {
  title: string;
  description: string;
  categoryId: number;
  promptId: number;
  setSelectedPrompt: (selection: PromptSelection) => void;
}

export const JournalPrompt: FC<JournalPromptProps> = ({
  title,
  description,
  categoryId,
  promptId,
  setSelectedPrompt
}) => {
  return (
    <View
      className={'bg-card'}
      style={{
        padding: 10,
        borderRadius: 10,
        gap: 5,
        flexDirection: 'row',
        marginHorizontal: 10,
        boxShadow: '0px 3px 5px -2px #000000'
      }}
    >
      <Pressable
        className={'bg-primary'}
        onPress={() => {
          setSelectedPrompt({ categoryId, promptId });
        }}
        style={{
          padding: 4,
          borderRadius: 10,
          width: 48,
          height: 48,
          alignSelf: 'flex-start',
          boxShadow: '0px 2px 4px -2px #000000'
        }}
      >
        <PairLucideIcon icon={'squarepen'} size={32} />
      </Pressable>
      <View style={{ gap: 2, paddingHorizontal: 5, flex: 1, flexWrap: 'wrap' }}>
        <TextFormatted
          size={'lg'}
          weight={'bold'}
          align={'left'}
          content={title}
        />
        <View>
          <TextFormatted
            size={'sm'}
            weight={'italic'}
            align={'left'}
            content={description}
          />
        </View>
      </View>
    </View>
  );
};
