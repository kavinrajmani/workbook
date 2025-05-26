import { Stack } from 'expo-router'
import COLORS from '../../constants/color';

export default function AuthLayout() {
    return <Stack screenOptions={{ 
                headerShown: false,
                headerShadowVisible: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "600",
                    color: COLORS.textPrimary,
                },
                contentStyle: {
                    backgroundColor: COLORS.background,  
                },
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
            }}>
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="register" options={{ title: "" }} />
        <Stack.Screen name="ResetPassword" options={{ title: "" }} />
    </Stack>
}