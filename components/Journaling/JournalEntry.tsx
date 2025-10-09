import { useState, FC } from 'react';
import { Pressable, View, StyleSheet, TextInput } from 'react-native';
import { TextFormatted } from '../Util/TextFormatted';
import {
  KeyboardAvoidingView,
  KeyboardController,
  KeyboardStickyView
} from 'react-native-keyboard-controller';
import { JournalWithId } from '@/app/(pages)/journaling/existingJournal';
import { router } from 'expo-router';
import { fetchJournalEntries, insertJournalEntry } from './databaseOps';

// Handles writing new entries as well as editing existing ones

interface JournalEntryProps {
  journalTitle: string;
  journalDesc: string;
  journalEntry?: string | undefined;
  entryId?: number | undefined; // edit existing entry
  resetSelection: (selection: undefined) => void; // dismiss new entry
  setJournalEntries?: (entries: JournalWithId[]) => void; //refresh list of existing entries
}

export interface Journal {
  title: string;
  description: string;
  entry: string;
}

export const JournalEntry: FC<JournalEntryProps> = ({
  journalTitle,
  journalDesc,
  journalEntry,
  entryId,
  resetSelection,
  setJournalEntries
}) => {
  console.log(journalTitle, journalDesc, entryId);
  const [title, setTitle] = useState<string>(journalTitle);
  const [description, setDescription] = useState<string>(journalDesc);
  const [entry, setEntry] = useState<string>(journalEntry ?? '');

  return (
    <Pressable
      accessible={false}
      className={'bg-background'}
      onPress={() => {
        KeyboardController.dismiss();
      }}
      style={{
        flex: 1,
        paddingTop: 35
      }}
    >
      <View
        className={'bg-card'}
        style={{
          gap: 10,
          paddingVertical: 20,
          margin: 5,
          marginBottom: 0,
          paddingHorizontal: 25,
          borderRadius: 10
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TextFormatted
            size={'md'}
            align={'left'}
            weight={'bold'}
            content={'Title:'}
          />
          <TextInput
            style={styles.titleAndDescInput}
            className={'text-text'}
            placeholder={'Write a Title'}
            value={title}
            onChangeText={(t) => setTitle(t)}
            multiline={false}
          />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TextFormatted
            size={'md'}
            align={'left'}
            weight={'bold'}
            content={'Prompt:'}
          />
          <TextInput
            style={styles.titleAndDescInput}
            className={'text-text'}
            value={description}
            placeholder={'Write a Description'}
            onChangeText={(t) => setDescription(t)}
            multiline={true}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={90}
        style={{ height: '70%', marginBottom: 'auto' }}
      >
        <TextInput
          className="bg-card text-text"
          style={styles.entry}
          value={entry}
          placeholderTextColor={'#cccccc'}
          placeholder={'Write your journal entry here!'}
          onChangeText={(t) => setEntry(t)}
          multiline={true}
          maxLength={4096}
        />
      </KeyboardAvoidingView>
      <KeyboardStickyView style={{ justifyContent: 'flex-end', height: 70 }}>
        <View
          style={{
            height: 40,
            paddingHorizontal: 30,
            marginVertical: 25,
            paddingBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Pressable
            className={'bg-card'}
            onPress={() => {
              resetSelection(undefined);
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <TextFormatted
              size={'md'}
              align={'center'}
              weight={'bold'}
              content={'Dismiss'}
            />
          </Pressable>
          <Pressable
            className={'bg-primary'}
            onPress={() => {
              insertJournalEntry({ title, description, entry }, entryId);
              resetSelection(undefined);
              if (!entryId) {
                router.push('./existingJournal');
              }
              if (setJournalEntries) {
                fetchJournalEntries(setJournalEntries);
              }
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <TextFormatted
              size={'md'}
              align={'center'}
              weight={'bold'}
              content={`${entryId ? 'Update' : 'Save'} Journal Entry`}
            />
          </Pressable>
        </View>
      </KeyboardStickyView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleAndDescInput: {
    flex: 1,
    flexGrow: 2,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 8,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderRadius: 10
  },
  entry: {
    flex: 1,
    overflowY: 'scroll',
    borderWidth: 3,
    marginHorizontal: 5,
    marginTop: 15,
    borderColor: '#CCCCCC',
    fontSize: 16,
    padding: 10,
    borderRadius: 10
  }
});
