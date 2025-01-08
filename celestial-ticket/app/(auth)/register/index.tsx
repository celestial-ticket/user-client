import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { registerMutation } from "../../../mutations/registration"; // pastikan mutation sudah diimpor dengan benar
import { useRouter } from "expo-router";
import * as SecureStorage from "expo-secure-store";

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
      <SafeAreaView className="bg-white items-center justify-center flex-1">
        {/* NAME */}
        <TextInput
          className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
          placeholder="Name"
          placeholderTextColor="grey"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        {/* PHONE NUMBER */}
        <TextInput
          className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
          placeholder="Phone Number"
          placeholderTextColor="grey"
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
        />

        {/* EMAIL */}
        <TextInput
          className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
          placeholder="Email"
          placeholderTextColor="grey"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        {/* PASSWORD */}
        <TextInput
          className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />

        {/* GENDER (Pilih Gender) */}
        <TextInput
          className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
          placeholder="Gender"
          placeholderTextColor="grey"
          value={formData.gender}
          onChangeText={(text) => handleChange("gender", text)}
        />

        {/* ADDRESS */}
        <TextInput
          className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
          placeholder="Address"
          placeholderTextColor="grey"
          value={formData.address}
          onChangeText={(text) => handleChange("address", text)}
        />

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          className="bg-blue-600 w-96 h-12 rounded-2xl mb-3 flex justify-center"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-center font-bold color-black">
            {loading ? "Registering..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* ERROR HANDLING
        {error && <Text className="text-red-500">{error.message}</Text>} */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
