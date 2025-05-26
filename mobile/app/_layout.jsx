import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "./components/safeScreen.jsx";
import { StatusBar } from "expo-status-bar";
import COLORS from '../constants/color';

export default function RootLayout() {
  return <SafeAreaProvider>
    <SafeScreen>
      <Stack screenOptions={{
        headerShown: true,
         headerShadowVisible: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
      }} >
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="(auth)" options={{ title: "" }} />
      </Stack>
    </SafeScreen>
    <StatusBar style="dark" />
  </SafeAreaProvider>;
}
