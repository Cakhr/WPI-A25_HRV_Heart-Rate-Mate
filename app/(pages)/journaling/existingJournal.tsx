import { PageHeader } from '@/components/PageHeader/PageHeader';
import { ScrollView, View, Modal } from 'react-native';
import { Journal, JournalEntry } from '@/components/Journaling/JournalEntry';
import { useEffect, useState } from 'react';
import { ExistingJournalDropdown } from '@/components/Journaling/ExistingJournalDropdown';
import { useSharedValue } from 'react-native-worklets-core';
import { TextFormatted } from '@/components/Util/TextFormatted';
import { fetchJournalEntries } from '@/components/Journaling/databaseOps';

export interface JournalWithId extends Journal {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export default function Index() {
  const [journalEntries, setJournalEntries] = useState<
    JournalWithId[] | undefined
  >(undefined);
  const [selectedEntry, setSelectedEntry] = useState<JournalWithId | undefined>(
    undefined
  );
  let dateDivider = useSharedValue<string>('');

  useEffect(() => {
    if (!journalEntries) {
      fetchJournalEntries(setJournalEntries);
    }
  }, [journalEntries, selectedEntry]);
  console.log(journalEntries);

  dateDivider.value = '';

  return (
    <View className={'bg-background size-full transition-all'}>
      {selectedEntry && (
        <Modal
          className={'size-full'}
          transparent={true}
          animationType={'slide'}
        >
          <JournalEntry
            entryId={selectedEntry.id}
            journalTitle={selectedEntry.title}
            journalDesc={selectedEntry.description}
            journalEntry={selectedEntry.entry}
            resetSelection={setSelectedEntry}
            setJournalEntries={setJournalEntries}
          />
        </Modal>
      )}
      <View
        style={{
          flex: 1,
          paddingTop: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PageHeader title={'Existing Journals'} />
        <ScrollView style={{ width: 390, borderRadius: 30 }}>
          <View style={{ marginTop: 10 }} />
          {journalEntries &&
            journalEntries.map((e, key) => {
              const entryDate: string = e.createdAt.substring(
                0,
                e.createdAt.indexOf(' ')
              );
              if (dateDivider.value !== entryDate) {
                dateDivider.value = entryDate;
                return (
                  <View key={key}>
                    <View
                      className={'bg-primary'}
                      style={{
                        flexDirection: 'row',
                        borderRadius: 10,
                        padding: 10,
                        paddingHorizontal: 20,
                        marginHorizontal: 5,
                        marginTop: 20,
                        boxShadow: '0px 3px 5px -2px #000000'
                      }}
                    >
                      <TextFormatted
                        size={'xl'}
                        weight={'bold'}
                        align={'center'}
                        content={entryDate.split('-').reverse().join('/')}
                      />
                    </View>
                    <ExistingJournalDropdown
                      key={key}
                      journal={e}
                      setJournalEntries={setJournalEntries}
                      setSelectedEntry={setSelectedEntry}
                    />
                  </View>
                );
              } else {
                return (
                  <ExistingJournalDropdown
                    key={key}
                    journal={e}
                    setJournalEntries={setJournalEntries}
                    setSelectedEntry={setSelectedEntry}
                  />
                );
              }
            })}
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
}
