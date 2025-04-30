import { Menu } from "lucide-react-native";
import { View } from "react-native";

export const HamburgerMenu = () => {
    return (
        <View className={'bg-card-variant rounded-full flex-auto items-center justify-center'}>
            <Menu className={'text-background mx-auto'} size={32}/>
        </View>
    );
}

export default HamburgerMenu;