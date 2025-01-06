import { Stack } from "expo-router/stack";
import "../../global.css";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
