import { Text, View } from 'react-native';

export default function Index() {
	return (
		<View 
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text className={'bg-red-500 p-2 rounded-lg'}>
				Edit app/pages/indexTwo.tsx to edit this screen.
			</Text>
			<Text className={'m-2 bg-blue-500 text-white p-2 rounded-full'}>
				{'Hihi'}
			</Text>
		</View>
	);
}
