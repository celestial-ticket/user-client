import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { loginMutation } from "../../../mutations/login"; // Ensure the mutation import is correct
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

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
      router.push('(tabs)'); // Replace with the path of the page after login

      // Provide feedback that login was successful
      Alert.alert("Login Successful", "You have successfully logged in.");
      
    } catch (err) {
      console.error("Error logging in:", err);
      Alert.alert("Login Failed", "An error occurred during login.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex justify-center items-center h-full">
        <View>
          <Text className="text-3xl">CelTix</Text>
        </View>
        <View className="m-32">
          {/* EMAIL */}
          <TextInput
            className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold text-white"
            placeholder="Email"
            placeholderTextColor={"grey"}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          {/* PASSWORD */}
          <TextInput
            className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold text-white"
            placeholder="Password"
            placeholderTextColor={"grey"}
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          {/* LOGIN BUTTON */}
          <TouchableOpacity
            className="bg-blue-600 w-96 h-12 rounded-2xl mb-3 flex justify-center"
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-center font-bold text-black">
              {loading ? "Logging In..." : "Log In"}
            </Text>
          </TouchableOpacity>

          {/* CREATE AN ACCOUNT BUTTON */}
          <TouchableOpacity
            className="w-96 h-12 border-2 rounded-2xl flex justify-center border-blue-500"
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
    </SafeAreaProvider>
  );
}