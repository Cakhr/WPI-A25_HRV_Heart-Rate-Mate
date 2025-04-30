import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { NavButton } from '../../components/NavButton';

export default function Index() {
	const router = useRouter();
	return (
		<View className={'bg-background size-full'}>
			<View
				className={'bg-primary'}
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text className={'bg-card p-2 rounded-lg text-text'}>
					Edit app/pages/indexThree.tsx to edit this screen.
				</Text>
			</View>
		</View>
	);
}
