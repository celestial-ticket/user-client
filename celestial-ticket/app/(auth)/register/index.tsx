import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { registerMutation } from "../../../mutations/registration"; // pastikan mutation sudah diimpor dengan benar
import { useRouter } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterPage() {
  const location = JSON.parse(SecureStorage.getItem("location"));
  const { latitude, longitude } = location.coords;
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "", // Asumsi gender juga ingin ditambahkan
    address: "", // Menambahkan address
    location: { coordinates: [longitude, latitude], type: "Point" }, // Menambahkan lokasi pengguna
  });

  // Mutasi untuk registrasi
  const [register, { loading, error }] = useMutation(registerMutation);

  // Menangani perubahan teks
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const router = useRouter();
  // Menangani submit form
  const handleSubmit = async () => {
    try {
      const { data } = await register({
        variables: {
          body: {
            ...formData,
          },
        },
      });

      console.log(formData);
      router.replace("login");
      console.log("User registered:", data.register);
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };
  if (error) {
    Alert.alert("Register Failed", error.message);
  }

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
            <SafeAreaView className="flex justify-center items-center h-full">
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

              <View className="m-8 bg-blue-900 bg-opacity-50 p-6 rounded-3xl shadow-lg w-11/12 max-w-lg">
                {/* NAME */}
                <TextInput
                  className="bg-gray-900 w-full h-14 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Name"
                  placeholderTextColor="grey"
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                />
                {/* PHONE NUMBER */}
                <TextInput
                  className="bg-gray-900 w-full h-14 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Phone Number"
                  placeholderTextColor="grey"
                  value={formData.phoneNumber}
                  onChangeText={(text) => handleChange("phoneNumber", text)}
                />
                {/* EMAIL */}
                <TextInput
                  className="bg-gray-900 w-full h-14 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Email"
                  placeholderTextColor="grey"
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                {/* PASSWORD */}
                <TextInput
                  className="bg-gray-900 w-full h-14 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Password"
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                />
                {/* GENDER */}
                <TextInput
                  className="bg-gray-900 w-full h-14 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Gender"
                  placeholderTextColor="grey"
                  value={formData.gender}
                  onChangeText={(text) => handleChange("gender", text)}
                />
                {/* ADDRESS */}
                <TextInput
                  className="bg-gray-900 w-full h-14 px-5 rounded-3xl mb-3 font-bold text-white shadow-md focus:ring-2 focus:ring-customGold"
                  placeholder="Address"
                  placeholderTextColor="grey"
                  value={formData.address}
                  onChangeText={(text) => handleChange("address", text)}
                />
                {/* REGISTER BUTTON */}
                <TouchableOpacity
                  className="bg-customGold w-full h-14 rounded-3xl mb-3 flex justify-center shadow-md hover:bg-customGold transition duration-200"
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text className="text-center font-bold text-blue-900">
                    {loading ? "Registering..." : "Sign Up"}
                  </Text>
                </TouchableOpacity>
                {/* Login Redirect */}
                <View className="flex-row justify-center mt-4">
                  <Text className="text-white text-base">
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Navigate to Login");
                      router.push("login"); // Navigate to the login page
                    }}
                  >
                    <Text className="text-customGold t-base font-semibold ml-1">
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                ;{/* ERROR HANDLING */}
                {error && (
                  <Text className="text-center text-red-500 font-bold mt-2">
                    {error.message}
                  </Text>
                )}
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
