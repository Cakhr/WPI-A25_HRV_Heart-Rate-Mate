import { RelativePathString, useRouter, Link } from 'expo-router';
import { Pressable, Text, View} from 'react-native';

export const NavButton = (route: RelativePathString) => {
	return (
		<Link href={route} asChild>
			<Pressable className={'size-full bg-card-variant rounded-full p-2'}>
				<Text className={'text-text'}>
					{route}
				</Text>
			</Pressable>
		</Link>
	);
}