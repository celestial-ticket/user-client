import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    router.replace("register");
  }

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#1e3a8a", "#1e40af", "#3b82f6"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex justify-center items-center h-full">
          <View className="mb-10 items-center">
            <Text className="text-2xl font-extrabold text-[#f4c366]">
              Hello welcome to
            </Text>
            {/* <Text className="text-6xl font-extrabold text-[#f4c366]">Cel-Tix</Text> */}
            <View className="flex flex-row items-center mt-3">
              <Text className="text-6xl font-extrabold">Cel</Text>
              <Text className="text-6xl font-extrabold"> -</Text>
              <Text className="text-6xl font-extrabold text-[#f4c366]">
                Tix
              </Text>
            </View>
          </View>
          <View className="">
            {/* NAME */}
            <TextInput
              className="bg-gray-800 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-lg"
              placeholder="Name"
              placeholderTextColor={"#a1a1aa"}
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            {/* PHONE NUMBER */}
            <TextInput
              className="bg-gray-800 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-lg"
              placeholder="Phone Number"
              placeholderTextColor={"#a1a1aa"}
              value={formData.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
            />

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

            {/* GENDER (Pilih Gender) */}
            <TextInput
              className="bg-gray-800 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-lg"
              placeholder="Gender"
              placeholderTextColor={"#a1a1aa"}
              value={formData.gender}
              onChangeText={(text) => handleChange("gender", text)}
            />

            {/* ADDRESS */}
            <TextInput
              className="bg-gray-800 w-96 h-16 px-5 rounded-3xl mb-3 font-bold text-white shadow-lg"
              placeholder="Address"
              placeholderTextColor={"#a1a1aa"}
              value={formData.address}
              onChangeText={(text) => handleChange("address", text)}
            />

            {/* REGISTER BUTTON */}
            <TouchableOpacity
              className="bg-[#f4c366] w-96 h-14 rounded-2xl mb-3 flex justify-center shadow-md hover:bg-blue-600 transition duration-200"
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text className="text-center font-bold text-black">
                {loading ? "Registering..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* ERROR HANDLING  
        {error && <Text className="text-red-500">{error.message}</Text>} */}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
