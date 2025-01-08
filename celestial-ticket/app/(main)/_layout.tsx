import { Stack } from "expo-router/stack";
import "../../global.css";
import { MovieProvider } from "../../contexts/MovieContext";

export default function Layout() {
  return (
    <MovieProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="view3d" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="detail-film" />
        <Stack.Screen name="order-detail" />
      </Stack>
    </MovieProvider>
  );
}
