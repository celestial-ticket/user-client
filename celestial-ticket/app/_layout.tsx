import { Stack } from "expo-router/stack";
import "../global.css";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
