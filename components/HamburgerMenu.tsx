import { Menu } from "lucide-react-native";
import { Appearance, ColorSchemeName, View } from "react-native";
import { useEffect, useState } from "react";
import appearanceQuery from '@/modules/appearanceQuery';



export const HamburgerMenu = () => {
    // triggers rerender on appearance change
    const [appearance, setAppearance] = useState<ColorSchemeName | undefined>(
        Appearance.getColorScheme()
    );

    // appearance change listener
    useEffect(() => {
        const listener = Appearance.addChangeListener(
          ({colorScheme: newColorScheme}: {colorScheme: ColorSchemeName}) => { //
            setAppearance(newColorScheme as ColorSchemeName);
          },
        );
        return () => listener.remove();
      }, [setAppearance]);

    // set svg stroke colors
    let color: string = '' // svg stroke color
    if(appearanceQuery()){ // check if dark mode?
        color = '#10B0FF';
    }else{
        color = '#01040c';
    }

    // actual component
    return (
        <View className={'bg-card rounded-full shadow-lg flex-auto items-center justify-center transition-all'}>
            <Menu className={'mx-auto'} size={34} color={color}/>
        </View>
    );
}

export default HamburgerMenu;