import { Appearance } from 'react-native';

// Query user light/dark mode
export default function appearanceQuery() {
	const colorScheme = Appearance.getColorScheme();
	if (colorScheme === 'dark') {
		return true;
	}
	return false;
}
