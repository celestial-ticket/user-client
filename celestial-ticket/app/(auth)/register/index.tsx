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
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

export default function RegisterPage() {
  let location = JSON.parse(SecureStore.getItem("location"));
  if (!location) {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw "Permission to access location was denied";
      }

      await Location.enableNetworkProviderAsync();
      location = await Location.getCurrentPositionAsync({});
      SecureStore.setItemAsync("location", JSON.stringify(location));
    })();
  }
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
      Alert.alert("Register Successful", "You have successfully registered.");
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };
  if (error) {
    Alert.alert("Register Failed", error.message);
    router.replace("register");
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
            <SafeAreaView className="flex h-full items-center justify-center">
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

              <View className="m-8 w-11/12 max-w-lg rounded-3xl bg-blue-900 bg-opacity-50 p-6">
                {/* NAME */}
                <TextInput
                  className="mb-3 h-14 w-full rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Name"
                  placeholderTextColor="grey"
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                />
                {/* PHONE NUMBER */}
                <TextInput
                  className="mb-3 h-14 w-full rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Phone Number"
                  placeholderTextColor="grey"
                  value={formData.phoneNumber}
                  onChangeText={(text) => handleChange("phoneNumber", text)}
                />
                {/* EMAIL */}
                <TextInput
                  className="mb-3 h-14 w-full rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Email"
                  placeholderTextColor="grey"
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                {/* PASSWORD */}
                <TextInput
                  className="mb-3 h-14 w-full rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Password"
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                />
                {/* GENDER */}
                <TextInput
                  className="mb-3 h-14 w-full rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Gender"
                  placeholderTextColor="grey"
                  value={formData.gender}
                  onChangeText={(text) => handleChange("gender", text)}
                />
                {/* ADDRESS */}
                <TextInput
                  className="mb-3 h-14 w-full rounded-3xl bg-gray-900 px-5 font-bold text-white focus:ring-2 focus:ring-customGold"
                  placeholder="Address"
                  placeholderTextColor="grey"
                  value={formData.address}
                  onChangeText={(text) => handleChange("address", text)}
                />
                {/* REGISTER BUTTON */}
                <TouchableOpacity
                  className="mb-3 flex h-14 w-full justify-center rounded-3xl bg-customGold transition duration-200 hover:bg-customGold"
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text className="text-center font-bold text-blue-900">
                    {loading ? "Registering..." : "Sign Up"}
                  </Text>
                </TouchableOpacity>
                {/* Login Redirect */}
                <View className="mt-4 flex-row justify-center">
                  <Text className="text-base text-white">
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Navigate to Login");
                      router.push("login"); // Navigate to the login page
                    }}
                  >
                    <Text className="t-base ml-1 font-semibold text-customGold">
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                ;{/* ERROR HANDLING */}
                {error && (
                  <Text className="mt-2 text-center font-bold text-red-500">
                    {error.message}
                  </Text>
                )}
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
