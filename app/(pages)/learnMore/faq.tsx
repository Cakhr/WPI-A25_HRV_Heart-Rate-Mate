import { InfoDropdown } from '@/components/InformationalDropdown';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { TextFormatted } from '@/components/Util/TextFormatted';
import { useState } from 'react';
import { Pressable, ScrollView, View, StyleSheet } from 'react-native';

export default function Index() {
  const [showFaqs, setShowFaqs] = useState<boolean>(false);
  console.log(showFaqs);
  return (
    <View className={'bg-background size-full'}>
      <PageHeader title="Information/FAQs" />
      <View
        style={{
          flex: 1,
          marginTop: 115
        }}
      >
        <View style={styles.container}>
          <View className={'bg-card'} style={styles.titleCard}>
            <View style={{ height: 60 }}>
              <TextFormatted
                size={'xl'}
                weight={'bold'}
                align={'center'}
                content={showFaqs ? 'Frequently Asked' : 'Learn About HRVB!'}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                className={`transition-all ${showFaqs ? 'bg-accent' : 'bg-primary'}`}
                style={showFaqs ? styles.button : styles.buttonPressed}
                onPress={() => {
                  setShowFaqs(false);
                }}
              >
                <TextFormatted
                  size={'md'}
                  weight={'bold'}
                  align={'center'}
                  content={'Education'}
                />
              </Pressable>
              <Pressable
                className={`transition-all ${showFaqs ? 'bg-primary' : 'bg-accent'}`}
                style={showFaqs ? styles.buttonPressed : styles.button}
                onPress={() => {
                  setShowFaqs(true);
                }}
              >
                <TextFormatted
                  size={'md'}
                  weight={'bold'}
                  align={'center'}
                  content={'FAQs'}
                />
              </Pressable>
            </View>
          </View>
          <ScrollView style={{ width: 380, paddingTop: 5 }}>
            {showFaqs
              ? faqs.map((obj, key) => {
                  return (
                    <InfoDropdown
                      key={key}
                      title={obj.title}
                      content={obj.content}
                    />
                  );
                })
              : info.map((obj, key) => {
                  return (
                    <InfoDropdown
                      key={key}
                      title={obj.title}
                      content={obj.content}
                    />
                  );
                })}

            <View style={{ marginBottom: 100 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleCard: {
    padding: 30,
    paddingBottom: 10,
    borderRadius: 10,
    zIndex: 30,
    boxShadow: '1px 3px 5px -2px #333333'
  },
  buttonContainer: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  button: {
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 40,
    boxShadow: '1px 3px 5px -2px #333333'
  },
  buttonPressed: {
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 40,
    boxShadow: 'inset 1px 1px 5px 1px #333333'
  }
});

// Markdown
const info = [
  {
    title: 'What is Heart Rate Variability (HRV)?',
    content:
      '**--- Heart Rate Variability (HRV)** is a measure of the change in time between each heartbeat.\n**---** ***High HRV*** means there are **more changes** in the time between heartbeats.\n**---** ***Low HRV*** means there are **fewer changes** and your heart has a more regular rhythm.'
  },
  {
    title: 'How Does a Healthy Heart Work?',
    content:
      '**---** A ***healthy heart*** naturally **speeds up when you inhale** and **slows down when you exhale**.\n**---** **This shows your heart and nervous system are working well** and can handle challenges.\n**---** ***When you are stressed,*** *your heart and breathing rates increase.*\n**---** **This lowers your HRV and prevents your body from resting and relaxing.**\n**---** While this stress response can help you in dangerous situations, **most stress today does not need such an extreme reaction.**'
  },
  {
    title: 'Why is Stress a Problem?',
    content:
      '**---** **Stress originally evolved to protect us from physical danger,** like predators.\n**---** When stressed, the ***sympathetic nervous system*** activates, *raising blood pressure, heart rate, and breathing rate* to prepare us to fight or flee.\n**---** This makes it hard to relax because the ***parasympathetic nervous system,*** *which helps us rest*, is less active.\n**---** *Your heart and breathing rates stay fast,* ***keeping your HRV low.***\n**---** After danger passes, the ***parasympathetic nervous system*** calms your body by *slowing your heart and breathing, which increases your HRV.*\n**---** But today, *stress usually comes from everyday worries, like exams or deadlines,* ***not real threats.***\n**---** ***Ongoing stress maintains a low HRV,*** making it hard to ever relax and *causing long-term health problems.*'
  },
  {
    title: 'Use of HRVB in Restoring HRV?',
    content:
      '**---** **HRV Biofeedback refers to measuring signals from your body in real time** and *learning to control these signals through practice.*\n**---** For HRV, **this involves detecting reduced HRV during stress, and guiding individuals to use slow, controlled breathing patterns** to restore the heart to more normal levels of variability.\n**---** **Slow breathing activates the parasympathetic nervous system, which relaxes your body** and balances your overall autonomic nervous system.\n**---** Since your heart rate naturally speeds up when you inhale and slows down when you exhale, **each controlled breath improves oxygen levels and adds more variation in the time between heartbeats.**\n**---** ***Anyone can quickly benefit from practicing HRV Biofeedback!***\n**---** **Focusing on breathing also makes it harder to worry about other concerns at the same time,** which resembles mindfulness meditation.'
  },
  {
    title: 'Methods of Measuring HRV',
    content:
      '**---** **To benefit from HRV Biofeedback, you need to measure your HRV regularly** to see progress over time.\n**---** The ***Electrocardiogram (ECG)*** uses electrodes attached to the body to measure and graph signals from your heart!\n**---** **The ECG works well in clinics but isn’t practical for individual use at home.**\n**---** **More user-friendly methods for measuring HRV are being developed, such as the Smart Photonic Wristband, the Millimeter-Wave Radar, and Ballistocardiography (BCG),** but many aren’t widely available or affordable yet.\n**---** **One easy and accessible method is photoplethysmography (PPG),** *which is what our app uses!*\n**---** **PPG uses your phone’s camera and flashlight to measure changes in blood flow and estimate your current HRV.**'
  },
  {
    title: 'Benefits of Practicing HRVB',
    content:
      '**---** **HRV Biofeedback can have positive effects on your brain,** *helping you regulate your emotions.*\n**---** It also **balances your autonomic nervous system,** *making you more resilient to stress.*\n**---** This will better help you meet academic demands by **boosting studying, problem-solving, and decision-making, while lowering anxiety during tasks,** like delivering a presentation.\n**---** This **reduced stress and emotional balance also improves sleep,** giving you more energy and helping you function better during the day.\n**---** In summary, **the benefits of HRV Biofeedback consist of enhanced stress resilience, emotional regulation, academic performance, sleep, and productivity,** which support your overall success and well-being!'
  }
];

const faqs = [
  {
    title: 'Why is my HRV lower than before?',
    content:
      '**Many factors can affect the HRV reading,** such as *not getting enough sleep, consuming coffee, drinking alcohol, or experiencing more stress that day.*'
  },
  {
    title: 'Why should I use HRV Biofeedback?',
    content:
      'Other techniques, such as **yoga and meditation, can help calm you down in the moment,** ***but HRV Biofeedback is a scientific approach to increasing stress resilience over time.*** HRV Biofeedback is also tailored toward your body’s needs, utilizing your personal breathing rate.'
  },
  {
    title: 'Does HRV Biofeedback work instantly?',
    content:
      'While most feel calm immediately after a breathing session, **the technique has to be practiced consistently over time to see results in stress resilience.** *Like working out to build muscle.*'
  },
  {
    title: 'How long does HRV Biofeedback take?',
    content:
      '**The training starts with the initial step of finding your personal breathing rate, which can take 15-20 minutes.** Then, you have to practice breathing at your personal rate for **10-20 minutes twice a day for 4-8 weeks.** That is just the training, but *many continue to do the at-home breathing afterwards.*'
  },
  {
    title: 'HRV vs. HRV Biofeedback?',
    content:
      '***Heart Rate Variability (HRV)*** **is a measure of the change in time between each heartbeat.**\n\n***HRV Biofeedback (HRVB)*** **uses this HRV data to train your body to better regulate itself through specific breathing techniques.**'
  },
  {
    title: 'Is HRV Biofeedback training safe?',
    content:
      '**HRV Biofeedback training is a low-risk technique**, *but you should stop if you feel dizzy or unwell.*'
  },
  {
    title: 'What does my HRV score mean?',
    content:
      '**Your HRV score is one way to tell how your nervous system is functioning.** A higher HRV score indicates a *more balanced nervous system,* making you more resilient to stress. The app allows you to **track your progress over time to see how your HRV score changes.**'
  }
];
