import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 300, height: 300, borderRadius: 20 }}
        contentFit="cover"
        transition={1000}
        placeholder="blurhash"
        source={{ uri: "https://images.unsplash.com/photo-1747049552306-0f94c91bd351?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
      <Text style={{ color: 'gray' }}>Hello, World! by Kavinraj</Text>
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/register">Register</Link>
    </View>
  );
}
