
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import {
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    useFonts
} from '@expo-google-fonts/open-sans';
import { AuthContextProvider } from '@/contexts/AuthContext';

export const unstable_settings = {
    initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();
const Layout = () => {
    const [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_500Medium,
        OpenSans_600SemiBold,
        OpenSans_700Bold,
    });

    if (!fontsLoaded) {
        return;
    }

    SplashScreen.hideAsync();
    return (
        <AuthContextProvider>
            <StatusBar style='dark' />
            <Stack screenOptions={{ headerShown: false }} />
        </AuthContextProvider>
    )
}

export default Layout;