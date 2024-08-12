import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from '@/components/LoginScreen';
import * as SecureStore from 'expo-secure-store'


SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string){
    try{
      return SecureStore.getItemAsync(key)
    } catch(err){
      return null
    }
  },
  async saveToken(key: string, value: string){
    try{
      return SecureStore.setItemAsync(key, value)
    } catch(err) {
      return
    }
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf')
  })

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SignedIn>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ThemeProvider>
    </ClerkProvider>
  );
}
