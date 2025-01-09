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

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Mutation for login
  const [login, { loading, error }] = useMutation(loginMutation);

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
      await save("user", JSON.stringify(user)); // Save user data if needed

      // Navigate to the next page after successful login
      router.replace("(tabs)"); // Replace with the path of the page after login

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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <SafeAreaView className="flex justify-center items-center h-full">
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
                <View className="flex-row mt-2">
                  <View className="w-4 h-4 bg-customGold rounded-full mx-1" />
                  <View className="w-4 h-4 bg-blue-500 rounded-full mx-1" />
                  <View className="w-4 h-4 bg-sky-400 rounded-full mx-1" />
                </View>
              </View>

              {/* Form Section */}
              <View className="m-8 bg-blue-900 bg-opacity-50 p-6 rounded-3xl shadow-lg">
                {/* Email Input */}
                <TextInput
                  className="bg-gray-900 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Email"
                  placeholderTextColor={"#a1a1aa"}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                {/* Password Input */}
                <TextInput
                  className="bg-gray-900 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Password"
                  placeholderTextColor={"#a1a1aa"}
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                />

                {/* Login Button */}
                <TouchableOpacity
                  className="bg-customGold w-96 h-14 rounded-3xl mb-3 flex justify-center shadow-md hover:bg-customGold transition duration-200"
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text className="text-center font-bold text-blue-900">
                    {loading ? "Logging In..." : "Log In"}
                  </Text>
                </TouchableOpacity>

                {/* Register Redirect */}
                <View className="flex-row justify-center mt-4">
                  <Text className="text-white text-base">
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Navigate to Register");
                      router.push("register"); // Navigate to the register page
                    }}
                  >
                    <Text className="text-customGold text-base font-semibold ml-1 underline">
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Decorative Sketched Cinema Elements */}
              <View className="absolute bottom-10 w-full flex-row justify-center space-x-4 opacity-50">
                <View className="h-16 w-16 bg-transparent border-2 border-customGold rounded-full flex items-center justify-center">
                  <Text className="text-white text-lg">🎥</Text>
                </View>
                <View className="h-16 w-16 bg-transparent border-2 border-blue-500 rounded-full flex items-center justify-center">
                  <Text className="text-white text-lg">🎬</Text>
                </View>
                <View className="h-16 w-16 bg-transparent border-2 border-sky-400 rounded-full flex items-center justify-center">
                  <Text className="text-white text-lg">🍿</Text>
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
