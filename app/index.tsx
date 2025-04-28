import { Text, View, Button } from 'react-native';

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text className={'bg-red-500 p-2 rounded-lg'}>
				Edit app/index.tsx to edit this screen.
			</Text>
			<div className={'m-2 bg-black text-white p-2 rounded-full'}>
				{'Hihi'}
			</div>
		</View>
	);
}
