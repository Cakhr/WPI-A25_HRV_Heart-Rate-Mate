import { View, Pressable, StyleSheet, ScrollView} from "react-native";
import { HamburgerMenu } from "./HamburgerMenu";
import { useState } from "react";
import { NavButton } from "./NavButton";
import { RelativePathString } from "expo-router";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


export const BottomNavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const navigationRoutes = [
        "/",
        "/indexTwo",
        "/indexThree",
        "/indexFour",
    ];
    return(
        <View className={'flex w-full h-fit'}>
            <View className={`absolute left-0 h-full w-screen bg-primary pl-24 ${expanded ? '' : 'hidden'}`}>
                <SafeAreaProvider>
                    <SafeAreaView 
                        className={'h-full py-3'}
                        style={[
                            styles.containter,
                            {
                                flexDirection: 'row',
                                overflowY: 'hidden',
                                overflowX: 'scroll',
                            }
                        ]}>
                            <ScrollView 
                                className={'h-24'} 
                                horizontal={true}
                                showsVerticalScrollIndicator={false}>
                        {navigationRoutes.map((pathString: string, index: number) => {
                            return(
                                <View 
                                    className={'size-20'}
                                    key={index}>
                                    {NavButton(pathString as RelativePathString)}
                                </View>
                            );
                        })}
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
            <View className={'absolute top-0 left-0 bg-card-variant w-1/2 h-full'}/>
            <View className={'absolute bottom-0 left-0 bg-card-variant w-full h-1/2'}/>
            <>
                <View className={'bg-card-variant w-fit h-fit p-6 rounded-full rounded-bl-none items-center justify-center'}>
                    <Pressable 
                        className={'size-16 rounded-full'}
                        onPress={() => setExpanded(!expanded)}>
                        <HamburgerMenu/>
                    </Pressable>
                </View>
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        padding: 4,
    }
})

export default BottomNavBar;