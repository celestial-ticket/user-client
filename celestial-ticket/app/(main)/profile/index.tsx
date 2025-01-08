import { useRouter } from "expo-router";
import {
  ActivityIndicator,
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
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../mutations/user";
import { formatTime } from "../../../helpers/convertTimeStamp";

export default function ProfileScreen() {
  const router = useRouter();
  // const [user, setUser] = useState(null);

  // get data from mutation query
  const { loading, error, data } = useQuery(GET_USER);

  // Ambil data pengguna dari SecureStore
  useEffect(() => {
    const fetchUser = async () => {
      const userToken = await SecureStore.getItemAsync("accessToken");
      console.log("🚀 ~ fetchUser ~ userToken:", userToken);

      if (userToken) {
        // Contoh data pengguna, ubah sesuai kebutuhan
        // setUser({
        //   id: 1,
        //   name: "John Doe",
        //   email: "johndoe@example.com",
        //   phoneNumber: "+1234567890",
        //   address: "Jakarta, Indonesia",
        //   gender: "male",
        //   coordinates: {
        //     latitude: 37.7749,
        //     longitude: -122.4194,
        //   },
        // });
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
      // setUser(null);

      // Navigasi ke halaman login
      router.replace("(main)");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const { user } = data;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header Profile */}
        <View className="flex items-center">
          <Text className="text-center text-3xl font-bold mt-14">
            My Profile
          </Text>
          <FontAwesome6
            name="user-circle"
            size={100}
            color="black"
            style={{ marginTop: 7 }}
          />
          <Text className="text-center text-lg font-bold mt-5">
            {user.name}
          </Text>
          <Text className="text-center text-lg">{user.email}</Text>
        </View>

        {/* Tickets */}
        <Text className="m-5 font-semibold">My Tickets</Text>
        {user.orders.map((order, index) => {
          return (
            <View className="" key={index}>
              <View className="bg-blue-900 me-3 ml-3 p-5 rounded-t-md">
                <Text className="text-[#f4c366] font-extrabold text-xl mb-3">
                  {order.movie.title}
                </Text>
                <View className="">
                  <Text className="text-white">Day</Text>
                  <Text className="font-bold text-xl text-white mb-3">
                    {new Intl.DateTimeFormat("us")
                      .format(order.showTime.date)
                      .split("/")
                      .join("-")}
                  </Text>
                  <Text className="text-white">Cinema</Text>
                  <Text className="text-white font-bold text-xl mb-3">{order.cinema.name}</Text>
                  <Text className="text-white">Time</Text>
                  <Text className="text-white font-bold text-xl mb-3">{formatTime(order.showTime.startTime)}</Text>
                </View>
              </View>
              <View className="bg-[#f4c366] mr-3 ml-3 mb-5 p-5 rounded-b-md">
                <Text>Ticket {order.seats.join(", ")}</Text>
              </View>
            </View>
            // <Ticket
            //   key={order.id}
            //   title={order.movie.title}
            //   date={order.date}
            //   time={order.time}
            //   cinema={order.cinema.name}
            //   price={order.price}
            // />
          );
        })}
        {/* <Ticket /> */}

        {/* <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="text-xl font-bold text-center">Mile 22</Text>

          <View className="flex-row justify-between mt-4">
            <Text className="text-lg">Theater: EMPIRE XXI</Text>
            <Text className="">
              Tuesday, 28 Aug 2018
            </Text>
            <Text className="text-lg">Time: 18:45</Text>
          </View>

          <View className="mt-4">
            <Text className="text-lg">Number of Tickets: 4 Person</Text>
            <Text className="text-gray-600">C1, C2, C3, C4</Text>
          </View>

          <View className="mt-4">
            <Text className="text-lg">Transaction Code:</Text>
            <Text className="text-xl font-bold">92798</Text>
          </View>

          <View className="mt-4">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // Replace with your QR code image URL
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View> */}

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-600 w-96 h-12 rounded-2xl mt-5 flex justify-center items-center mx-auto"
          onPress={handleLogout}
        >
          <Text className="text-center text-white font-bold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
