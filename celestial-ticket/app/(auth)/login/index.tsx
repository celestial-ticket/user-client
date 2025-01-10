import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { loginMutation } from "../../../mutations/login"; // Ensure the mutation import is correct
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../../contexts/Auth";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Mutation for login
  const [login, { loading, error }] = useMutation(loginMutation);
  const { setIsLogin, refetch } = useAuth();

  // Handle text changes
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission for login
  const handleSubmit = async () => {
    try {
      const { data } = await login({
        variables: {
          input: formData, // Sending email and password
        },
      });

      // Save access token using SecureStore
      const { accessToken, user } = data.login;
      console.log("Login success:", accessToken, user);

      // Save access token to SecureStore
      await save("accessToken", accessToken);
      refetch(); //refetch user data

      // Navigate to the next page after successful login
      router.replace("(tabs)"); // Replace with the path of the page after login
      setIsLogin(true); // Set the login status to true
      // Provide feedback that login was successful
      Alert.alert("Login Successful", "You have successfully logged in.");
    } catch (err) {
      console.error("Error logging in:", err);
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#1e293b", "#172a4f", "#312e81"]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <SafeAreaView className="flex h-full items-center justify-center">
              {/* Title Section */}
              <View className="mb-10">
                <View className="flex-row">
                  <Text className="text-6xl font-extrabold text-customGold">
                    Cel-
                  </Text>
                  <Text className="text-6xl font-extrabold text-white">
                    Tix
                  </Text>
                </View>
                <View className="mt-2 flex-row">
                  <View className="mx-1 h-4 w-4 rounded-full bg-customGold" />
                  <View className="mx-1 h-4 w-4 rounded-full bg-blue-500" />
                  <View className="mx-1 h-4 w-4 rounded-full bg-sky-400" />
                </View>
              </View>

              {/* Form Section */}
              <View className="m-8 rounded-3xl bg-blue-900 bg-opacity-50 p-6">
                {/* Email Input */}
                <TextInput
                  className="mb-3 h-16 w-96 rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Email"
                  placeholderTextColor={"#a1a1aa"}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                {/* Password Input */}
                <TextInput
                  className="mb-3 h-16 w-96 rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Password"
                  placeholderTextColor={"#a1a1aa"}
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                />

                {/* Login Button */}
                <TouchableOpacity
                  className="mb-3 flex h-14 w-96 justify-center rounded-3xl bg-customGold transition duration-200 hover:bg-customGold"
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text className="text-center font-bold text-blue-900">
                    {loading ? "Logging In..." : "Log In"}
                  </Text>
                </TouchableOpacity>

                {/* Register Redirect */}
                <View className="mt-4 flex-row justify-center">
                  <Text className="text-base text-white">
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Navigate to Register");
                      router.push("register"); // Navigate to the register page
                    }}
                  >
                    <Text className="ml-1 text-base font-semibold text-customGold underline">
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Decorative Sketched Cinema Elements */}
              <View className="absolute bottom-10 w-full flex-row justify-center space-x-4 opacity-50">
                <View className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-customGold bg-transparent">
                  <Text className="text-lg text-white">🎥</Text>
                </View>
                <View className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-500 bg-transparent">
                  <Text className="text-lg text-white">🎬</Text>
                </View>
                <View className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-sky-400 bg-transparent">
                  <Text className="text-lg text-white">🍿</Text>
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
