import { useState, FC, useEffect } from 'react';
import { Pressable, View, Modal } from 'react-native';
import { TextFormatted } from '../Util/TextFormatted';
import { PairLucideIcon } from '../Util/PairLucideicon';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing
} from 'react-native-reanimated';
import { JournalWithId } from '@/app/(pages)/journaling/existingJournal';
import { deleteJournalEntry, fetchJournalEntries } from './databaseOps';

const duration: number = 125;

interface ExistingJournalDropdownProps {
  journal: JournalWithId;
  setJournalEntries: (entries: JournalWithId[]) => void;
  setSelectedEntry: (entry: JournalWithId) => void;
}

export const ExistingJournalDropdown: FC<ExistingJournalDropdownProps> = ({
  journal,
  setJournalEntries,
  setSelectedEntry
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const createDate = journal.createdAt
    .substring(0, 10)
    .split('-')
    .reverse()
    .join('/');
  const createTime = journal.createdAt.substring(11, 16);

  const updateDate = journal.updatedAt
    .substring(0, 10)
    .split('-')
    .reverse()
    .join('/');
  const updateTime = journal.updatedAt.substring(11, 16);

  const entryDetails: JournalWithId = {
    ...journal,
    createdAt: createDate,
    updatedAt: updateDate
  };

  // Begin Animation Related Stuff
  const chevron = useSharedValue<string>('-90deg');
  const dropdown = useSharedValue<number>(0);
  const dropdownOffset = useSharedValue<number>(-50);

  const easingChev = Easing.linear;
  const easingDrop = Easing.sin;

  console.log(dropdownOffset.value, dropdown.value);

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
  // End Animation Related Stuff

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 5 }}>
      <DeleteModal
        entry={entryDetails}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        setJournalEntries={setJournalEntries}
      />
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
      >
        <View
          className={'bg-card'}
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            borderRadius: 10,
            padding: 20,
            zIndex: 20,
            boxShadow: '0px 4px 4px -2px #000000'
          }}
        >
          <View>
            <TextFormatted
              size={'md'}
              weight={'bold'}
              align={'center'}
              content={createTime}
            />
          </View>
          <TextFormatted
            size={'md'}
            weight={'bold'}
            align={'center'}
            content={journal.title}
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
            className={`bg-card ${!open && 'hidden'}`}
          >
            <View
              className={'bg-background'}
              style={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 10,
                gap: 5
              }}
            >
              <TextFormatted
                size={'md'}
                weight={'bold'}
                align={'center'}
                content={journal.description}
              />
              <TextFormatted
                size={'sm'}
                weight={'italic'}
                align={'left'}
                content={journal.entry}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 5,
                alignItems: 'center'
              }}
            >
              <View style={{ flexDirection: 'column', marginRight: 'auto' }}>
                <TextFormatted
                  size={'sm'}
                  weight={'bold'}
                  align={'left'}
                  content={`Created At: ${createDate} ${createTime}`}
                />
                <TextFormatted
                  size={'sm'}
                  weight={'bold'}
                  align={'left'}
                  content={`Updated At: ${updateDate} ${updateTime}`}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable
                  onPress={() => setSelectedEntry(entryDetails)}
                  className={'bg-primary'}
                  style={{
                    padding: 4,
                    borderRadius: 10,
                    width: 48,
                    height: 48,
                    alignSelf: 'flex-start',
                    boxShadow: '0px 2px 4px -2px #000000'
                  }}
                >
                  <PairLucideIcon icon={'penline'} size={32} />
                </Pressable>
                <Pressable
                  onPress={() => setShowDelete(true)}
                  className={'bg-primary'}
                  style={{
                    padding: 4,
                    borderRadius: 10,
                    width: 48,
                    height: 48,
                    alignSelf: 'flex-start',
                    boxShadow: '0px 2px 4px -2px #000000'
                  }}
                >
                  <PairLucideIcon icon={'trash2'} size={32} />
                </Pressable>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const DeleteModal: FC<{
  entry: JournalWithId;
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
  setJournalEntries: (entries: JournalWithId[]) => void;
}> = ({ entry, showDelete, setShowDelete, setJournalEntries }) => {
  return (
    <Modal
      className={'transition-all'}
      visible={showDelete}
      transparent={true}
      animationType={'fade'}
    >
      <Pressable
        className={'size-full'}
        onPress={() => {
          setShowDelete(false);
        }}
        style={{
          position: 'absolute',
          backgroundColor: '#000000',
          opacity: 0.5
        }}
      />
      <View
        className={'size-full'}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          className={'bg-card'}
          style={{
            height: 150,
            width: 300,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 20,
            opacity: 2
          }}
        >
          <TextFormatted
            size={'md'}
            weight={'bold'}
            align={'center'}
            content={`Are you sure you want to delete entry '${entry.title}' from ${entry.createdAt}?`}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <Pressable
              onPress={() => setShowDelete(false)}
              className={'bg-background'}
              style={{
                padding: 4,
                borderRadius: 10,
                width: 80,
                height: 30,
                boxShadow: '0px 2px 4px -2px #000000'
              }}
            >
              <TextFormatted
                size={'md'}
                weight={'bold'}
                align={'center'}
                content={'Cancel'}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                deleteJournalEntry(entry.id);
                setShowDelete(false);
                fetchJournalEntries(setJournalEntries);
              }}
              style={{
                backgroundColor: '#aa0000',
                padding: 4,
                borderRadius: 10,
                width: 80,
                height: 30,
                boxShadow: '0px 2px 4px -2px #000000'
              }}
            >
              <TextFormatted
                size={'md'}
                weight={'bold'}
                align={'center'}
                content={'Delete'}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
