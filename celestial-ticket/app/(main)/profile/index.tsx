import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ticket from "../../components/Ticket";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Ambil data pengguna dari SecureStore
  useEffect(() => {
    const fetchUser = async () => {
      const userToken = await SecureStore.getItemAsync("accessToken");
      console.log("🚀 ~ fetchUser ~ userToken:", userToken);

      if (userToken) {
        // Contoh data pengguna, ubah sesuai kebutuhan
        setUser({
          id: 1,
          name: "John Doe",
          email: "johndoe@example.com",
          phoneNumber: "+1234567890",
          address: "Jakarta, Indonesia",
          gender: "male",
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
        });
      } else {
        router.push("login"); // Arahkan ke halaman login jika belum login
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Hapus data sesi yang disimpan di SecureStore
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("location");
      await SecureStore.deleteItemAsync("accessToken");

      // Reset status pengguna
      setUser(null);

      // Navigasi ke halaman login
      router.replace("(main)");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return null; // Tampilkan loading jika user belum terisi
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Profile */}
      <View className="flex items-center">
        <Text className="text-center text-3xl font-bold mt-16">My Profile</Text>
        <FontAwesome6
          name="user-circle"
          size={100}
          color="black"
          style={{ marginTop: 7 }}
        />
        <Text className="text-center text-lg font-bold mt-5">{user.name}</Text>
        <Text className="text-center text-lg">{user.email}</Text>
      </View>

      {/* Tickets */}
      <Text className="m-5 font-semibold">My Tickets</Text>
      <View className="flex flex-row justify-center">
        <Ticket />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        className="bg-red-600 w-96 h-12 rounded-2xl mt-5 flex justify-center items-center mx-auto"
        onPress={handleLogout}
      >
        <Text className="text-center text-white font-bold">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
