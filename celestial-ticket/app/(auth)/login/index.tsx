import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { loginMutation } from "../../../mutations/login"; // Ensure the mutation import is correct
import { useRouter } from "expo-router";
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
      router.replace("/(tabs)"); // Replace with the path of the page after login

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
        colors={["#1e3a8a", "#1e40af", "#3b82f6"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex justify-center items-center h-full">
          <View className="flex flex-row mb-10">
            <Text className="text-6xl font-extrabold">Cel-</Text>
            <Text className="text-6xl font-extrabold text-[#f4c366]">Tix</Text>
          </View>
          <View className="m-8">
            {/* EMAIL */}
            <TextInput
              className="bg-gray-800 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-lg"
              placeholder="Email"
              placeholderTextColor={"#a1a1aa"}
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
            {/* PASSWORD */}
            <TextInput
              className="bg-gray-800 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-lg"
              placeholder="Password"
              placeholderTextColor={"#a1a1aa"}
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            {/* LOGIN BUTTON */}
            <TouchableOpacity
              className="bg-[#f4c366] w-96 h-14 rounded-2xl mb-3 flex justify-center shadow-md hover:bg-blue-600 transition duration-200"
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text className="text-center font-bold text-black">
                {loading ? "Logging In..." : "Log In"}
              </Text>
            </TouchableOpacity>

            {/* CREATE AN ACCOUNT BUTTON */}
            <TouchableOpacity
              className="w-96 h-14 border-2 rounded-2xl flex justify-center border-[#f4c366] hover:bg-blue-500 transition duration-200"
              onPress={() => {
                console.log("Create Account");
                router.push("register"); // Navigate to the register page
              }}
            >
              <Text className="text-center font-bold text-black">
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
