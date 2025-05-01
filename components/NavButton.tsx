import { useState, useEffect } from 'react';
import { RelativePathString, Link } from 'expo-router';
import { Pressable, Text, Appearance, ColorSchemeName } from 'react-native';
import { House } from 'lucide-react-native';
import appearanceQuery from '@/modules/appearanceQuery';

const darkIconStroke: string = '#10B0FF';
const lightIconStroke: string = '#01040c';

const pairIcon = (route: RelativePathString) => {
	// triggers rerender on appearance change
	const [appearance, setAppearance] = useState<ColorSchemeName | undefined>(
		Appearance.getColorScheme()
	);

	// appearance change listener
	useEffect(() => {
		const listener = Appearance.addChangeListener(
			({
				colorScheme: newColorScheme
			}: {
				colorScheme: ColorSchemeName;
			}) => {
				//
				setAppearance(newColorScheme as ColorSchemeName);
			}
		);
		return () => listener.remove();
	}, [setAppearance]);

	// set svg stroke colors
	let color: string = '#FFFFFF'; // svg stroke color
	if (appearanceQuery()) {
		// check if dark mode?
		color = darkIconStroke;
	} else {
		color = lightIconStroke;
	}

	switch (route as String) {
		case '/':
			return (
				<House
					className={'p-1 transition-all'}
					size={32}
					color={color}
				/>
			);
		case '/indexTwo':
			return <></>;
		case '/indexThree':
			return <></>;
		case '/indexFour':
			return <></>;
		default:
			console.log(
				'This should not happen lol, no icon matched to route [' +
					route +
					']'
			);
			return <></>;
	}
};

export const NavButton = (route: RelativePathString) => {
	return (
		<Link href={route} asChild>
			<Pressable
				className={
					'flex-1 items-center justify-items-center bg-card rounded-2xl p-1 shadow-lg transition-all'
				}
			>
				{route === ('/' as RelativePathString) ? (
					<>
						{pairIcon(route)}
						<Text className={'text-text'}>Home</Text>
					</>
				) : (
					''
				)}
			</Pressable>
		</Link>
	);
};
