import { JournalEntry } from '@/components/Journaling/JournalEntry';
import { JournalPrompt } from '@/components/Journaling/JournalPrompt';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { IconName, PairLucideIcon } from '@/components/Util/PairLucideicon';
import { TextFormatted } from '@/components/Util/TextFormatted';
import { useState } from 'react';
import { View, ScrollView, Modal } from 'react-native';

type WritingCategory = {
  category: string;
  icon: IconName;
  prompts: WritingPrompt[];
};

type WritingPrompt = {
  title: string;
  description: string;
};

export type PromptSelection = { categoryId: number; promptId: number };

export default function Index() {
  const [prompt, setPrompt] = useState<PromptSelection | undefined>(undefined);
  console.log(prompt);

  return (
    <View className={'bg-background size-full transition-all'}>
      {prompt && (
        <Modal
          className={'size-full'}
          transparent={true}
          animationType={'slide'}
        >
          <JournalEntry
            journalTitle={
              categories[prompt.categoryId].prompts[prompt.promptId].title
            }
            journalDesc={
              categories[prompt.categoryId].prompts[prompt.promptId].description
            }
            resetSelection={setPrompt}
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
        <PageHeader title={'New Journal'} />
        <View style={{ flexDirection: 'row' }}>
          <ScrollView>
            <View style={{ marginBottom: 30 }} />
            {categories.map((category, catId) => {
              return (
                <View key={catId} style={{ gap: 5, marginBottom: 20 }}>
                  <View
                    className={'bg-primary'}
                    style={{
                      flexDirection: 'row',
                      borderRadius: 10,
                      padding: 10,
                      paddingHorizontal: 20,
                      marginHorizontal: 5,
                      boxShadow: '0px 3px 5px -2px #000000'
                    }}
                  >
                    <TextFormatted
                      size={'xl'}
                      weight={'bold'}
                      align={'left'}
                      content={'About ' + category.category}
                    />
                    <PairLucideIcon icon={category.icon} size={32} />
                  </View>
                  {category.prompts.map((prompt, promptId) => {
                    return (
                      <JournalPrompt
                        key={promptId}
                        title={prompt.title}
                        description={prompt.description}
                        categoryId={catId}
                        promptId={promptId}
                        setSelectedPrompt={setPrompt}
                      />
                    );
                  })}
                </View>
              );
            })}
            <View style={{ marginBottom: 100 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const categories: WritingCategory[] = [
  {
    category: 'Anything',
    icon: 'messagecirclemore',
    prompts: [
      {
        title: 'Custom Entry',
        description: 'Write about whatever you feel like!'
      }
    ]
  },
  {
    category: 'Today',
    icon: 'cloudsun',
    prompts: [
      {
        title: 'Rise and Shine',
        description: 'Good Morning!\nWhat are you looking forward to today?'
      },
      {
        title: 'To-Do List',
        description: 'What do you want to get started on today?'
      },
      {
        title: 'Day is Done',
        description:
          'How did your day go?\nWhat was good? What was not so good?'
      },
      {
        title: 'Tomorrow',
        description:
          'Tomorrow is the start of a new day! And anything is possible, do you have any plans?'
      }
    ]
  },
  {
    category: 'Yourself',
    icon: 'smile',
    prompts: [
      {
        title: 'Status Report',
        description: 'How are you feeling?'
      },
      {
        title: 'Great Strides',
        description:
          'What are some things you feel you have improved at recently? What are your next goals?'
      },
      {
        title: 'Self-Appreciation',
        description:
          'What are some things you like about yourself? They can be anything, nothing is too small to appreciate.'
      },
      {
        title: 'Grateful',
        description:
          'Try and think of a few things or people you are grateful for, how have they affected your life?'
      }
    ]
  },
  {
    category: 'Stress',
    icon: 'alarmclock',
    prompts: [
      {
        title: 'Brain Dump',
        description:
          'Write everything that is weighing on you right now without editing or judgement. Let it all out!'
      },
      {
        title: 'A Stress-Free Me',
        description: `Imagine yourself one month from now feeling relaxed. What has changed? Remember the challenges you've already overcome!`
      },
      {
        title: 'Friendly Advice',
        description:
          'What would you tell a friend going through what you are feeling right now?'
      },
      {
        title: 'Dear Stress',
        description:
          'Write a letter to your stress. Don’t be afraid to talk, ask questions, and explain how it has been affecting you.'
      }
    ]
  },
  {
    category: 'Routines',
    icon: 'listchecks',
    prompts: [
      {
        title: 'An Ideal Day',
        description:
          'What does a balanced, productive, and enjoyable day look like for you from start to finish?'
      },
      {
        title: 'Start Small',
        description:
          'What is one small habit you could add or remove from your routine to support your physical or mental health?'
      },
      {
        title: 'Anchor Habits',
        description:
          'What are a couple habits that help you feel more grounded and capable when life gets chaotic?'
      },
      {
        title: 'Intentional Living',
        description:
          'How can you adjust your routine to better align with your values, goals, or priorities?'
      }
    ]
  }
];
