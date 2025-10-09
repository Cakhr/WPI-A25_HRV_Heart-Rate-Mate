import { PageHeader } from '@/components/PageHeader/PageHeader';
import { PairLucideIcon } from '@/components/Util/PairLucideicon';
import { componentStyles } from '@/components/Util/ReusableStyles';
import { TextFormatted } from '@/components/Util/TextFormatted';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function Index() {
  return (
    <View className={'bg-background size-full transition-all'}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PageHeader title={'Journaling'} />
        <View style={{ gap: 10 }}>
          <Pressable
            className={'bg-primary'}
            style={componentStyles.menuButton}
            onPress={() => {
              router.push('./newJournal');
            }}
          >
            <PairLucideIcon icon={'notebookpen'} size={64} />
            <TextFormatted
              size={'xl'}
              align={'center'}
              weight={'bold'}
              content={'New Journal Entry'}
            />
          </Pressable>
          <Pressable
            className={'bg-primary'}
            style={componentStyles.menuButton}
            onPress={() => {
              router.push('./existingJournal');
            }}
          >
            <PairLucideIcon icon={'librarybig'} size={48} />
            <TextFormatted
              size={'lg'}
              align={'center'}
              weight={'bold'}
              content={'Existing Entries'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
