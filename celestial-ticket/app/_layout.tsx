import { Stack } from "expo-router/stack";
import "../global.css";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo-client";

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </ApolloProvider>
  );
}
