import { Stack } from "expo-router/stack";
import "../global.css";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo-client";
import { LogBox } from "react-native";
import { AuthProvider } from "../contexts/Auth";

LogBox.ignoreAllLogs(true); //error karena index.js tidak dijalankan

// Suppress specific console errors
// suppressSpecificConsoleErrors();

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(main)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthProvider>
    </ApolloProvider>
  );
}
