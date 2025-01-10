import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ticket from "../../components/Ticket";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../mutations/user";
import { formatTime } from "../../../helpers/convertTimeStamp";
import { useAuth } from "../../../contexts/Auth";
import client from "../../../config/apollo-client";

export default function ProfileScreen() {
  const router = useRouter();
  const { isLogin, setIsLogin, user, loading, error } = useAuth();

  // Filter out duplicate orders
  // const uniqueOrders = useMemo(() => {
  //   const orderMap = new Map();
  //   user.orders.forEach((order) => {
  //     if (!orderMap.has(order.id)) {
  //       orderMap.set(order.id, order);
  //     }
  //   });
  //   return Array.from(orderMap.values());
  // }, [user.orders]);

  // get data from mutation query

  const handleLogout = async () => {
    try {
      // Hapus data sesi yang disimpan di SecureStore
      await SecureStore.deleteItemAsync("location");
      await SecureStore.deleteItemAsync("accessToken");

      setIsLogin(false);

      // Clear Apollo Client cache
      await client.clearStore();

      router.dismissAll();
      router.replace("(main)");
      Alert.alert("Logout Success", "You have been logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: handleLogout,
        },
      ],
      { cancelable: true },
    );
  };

  if (loading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (error || isLogin === false) {
    return (
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="mb-3 flex h-14 w-96 justify-center rounded-3xl bg-customGold transition duration-200 hover:bg-customGold"
          onPress={() => router.push("login")}
        >
          <Text className="text-center font-bold text-blue-900">
            Please Login First
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleOrderPress = (order) => {
    router.push({
      pathname: "/order-detail",
      params: {
        existingOrder: JSON.stringify(order),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header Profile */}
        <View className="flex items-center">
          <Text className="mt-14 text-center text-3xl font-bold">
            My Profile
          </Text>
          <FontAwesome6
            name="user-circle"
            size={100}
            color="black"
            style={{ marginTop: 7 }}
          />
          <Text className="mt-5 text-center text-lg font-bold">
            {user.name}
          </Text>
          <Text className="text-center text-lg">{user.email}</Text>
        </View>

        {/* Tickets */}
        <Text className="m-5 font-semibold">My Tickets</Text>
        {user.orders.map((order, index) => {
          return (
            <TouchableOpacity
              className=""
              key={index}
              onPress={() => handleOrderPress(order)}
            >
              <View className="me-3 ml-3 rounded-t-md bg-blue-900 p-5">
                <Text className="mb-3 text-xl font-extrabold text-[#f4c366]">
                  {order.movie.title}
                </Text>
                <View className="">
                  <Text className="text-white">Day</Text>
                  <Text className="mb-3 text-xl font-bold text-white">
                    {new Intl.DateTimeFormat("us")
                      .format(order.showTime.date)
                      .split("/")
                      .join("-")}
                  </Text>
                  <Text className="text-white">Cinema</Text>
                  <Text className="mb-3 text-xl font-bold text-white">
                    {order.cinema.name}
                  </Text>
                  <Text className="text-white">Time</Text>
                  <Text className="mb-3 text-xl font-bold text-white">
                    {formatTime(order.showTime.startTime)}
                  </Text>
                </View>
              </View>
              <View className="mb-5 ml-3 mr-3 rounded-b-md bg-[#f4c366] p-5">
                <Text>Ticket {order.seats.join(", ")}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Logout Button */}
        <TouchableOpacity
          className="mx-auto mb-8 mt-5 flex h-12 w-96 items-center justify-center rounded-2xl bg-red-600"
          onPress={confirmLogout}
        >
          <Text className="text-center font-bold text-white">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
