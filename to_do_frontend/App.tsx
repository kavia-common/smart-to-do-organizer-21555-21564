import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';

// PUBLIC_INTERFACE
export default function App() {
  /** Entrypoint for the Ocean Tasks app.
   * Renders the gesture root, safe area provider, and the main HomeScreen.
   * Uses environment variables EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY for Supabase.
   */
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <HomeScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
