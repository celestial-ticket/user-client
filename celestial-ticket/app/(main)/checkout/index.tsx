import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { toRupiah } from "../../../helpers/toRupiah";
import * as SecureStore from "expo-secure-store";
import { GET_ORDERS_CHAIR } from "../../../mutations/order";
import { useQuery } from "@apollo/client";
import { formatTime } from "../../../helpers/convertTimeStamp";
import { useAuth } from "../../../contexts/Auth";

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { showTime: show, cinema, movie } = params;
  // console.log("🚀 ~ CheckoutScreen ~ cinema:", cinema);

  const parsedShow = Array.isArray(show)
    ? JSON.parse(show[0])
    : JSON.parse(show);
  console.log("🚀 ~ CheckoutScreen ~ parsedShow", parsedShow);

  const { startTime, seatList: seats, price, _id: showTimeId } = parsedShow;
  // console.log("🚀 ~ CheckoutScreen ~ time:", time);
  // console.log("🚀 ~ CheckoutScreen ~ showTimeId:", showTimeId);

  //get all orders
  const { loading, error, data, refetch } = useQuery(GET_ORDERS_CHAIR);

  //   const memoSeats = useMemo(() => seats, [seats]);
  const [seatsData, setSeatsData] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const arrangeSeats = (flatSeats: [string, string][]) => {
    const rows = {};
    flatSeats.forEach(([seat, status]) => {
      const rowKey = seat[0]; // First character of seat code (e.g., 'A' for 'A1')
      if (!rows[rowKey]) rows[rowKey] = { left: [], middle: [], right: [] };

      const seatNumber = parseInt(seat.slice(1), 10);
      if (seatNumber <= 2) {
        rows[rowKey].left.push([seat, status]);
      } else if (seatNumber > 2 && seatNumber <= 10) {
        rows[rowKey].middle.push([seat, status]);
      } else {
        rows[rowKey].right.push([seat, status]);
      }
    });
    return Object.values(rows);
  };
  const calculatePriceSummary = (arrangedSeats: {}[]) => {
    const bookedSeats = [];
    let total = 0;

    arrangedSeats.forEach((row) => {
      ["left", "middle", "right"].forEach((section) => {
        row[section].forEach(([seat, status]) => {
          if (status === "booked") {
            bookedSeats.push(seat);
            total += price;
          }
        });
      });
    });

    return { total, booked: bookedSeats };
  };
  const { isLogin } = useAuth();
  useEffect(() => {
    refetch();
    if (!isLogin) {
      router.dismiss();
      router.push("login");
    }

    if (data && data.getOrders) {
      const unavailableSeats = data.getOrders
        .filter(
          (order) => order.showTime._id.toString() === showTimeId.toString(),
        )
        .map((order) => order.seats)
        .flat();

      // console.log("🚀 ~ useEffect ~ unavailableSeats:", unavailableSeats);

      const updatedSeats = seats.map(([seat, status]) => {
        if (unavailableSeats.includes(seat)) {
          return [seat, "unavailable"];
        }
        return [seat, status];
      });
      // console.log("🚀 ~ updatedSeats ~ updatedSeats:", updatedSeats);

      const arrangedSeats = arrangeSeats(updatedSeats);
      setSeatsData(arrangedSeats);
    }
  }, [data]);

  useEffect(() => {
    const { total, booked } = calculatePriceSummary(seatsData);
    setBookedSeats(booked);
    setTotalPrice(total);
    if (booked.length === 0) {
      setModalVisible(false);
    }
  }, [seatsData]);

  const toggleSeatStatus = (
    rowIndex: number,
    section: string,
    seatIndex: number,
  ) => {
    const updatedSeats = [...seatsData];
    const seat = updatedSeats[rowIndex][section][seatIndex];
    // console.log("🚀 ~ CheckoutScreen ~ seat:", seat);
    seat[1] = seat[1] === "booked" ? "available" : "booked";
    setSeatsData(updatedSeats);
    // console.log("🚀 ~ CheckoutScreen ~ seatData:", seatsData[0].middle);
    setModalVisible(true);
    refetch();
  };

  const renderRow = (
    rowSeats: {
      left: [string, string][];
      middle: [string, string][];
      right: [string, string][];
    },
    rowIndex: number,
  ) => (
    <View key={rowIndex} className="mb-4 flex-row justify-center gap-12">
      {/* Left Section */}
      <View className="flex-row">
        {rowSeats.left.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`m-1 flex h-10 w-10 items-center justify-center rounded ${
              status === "available"
                ? "bg-green-500"
                : status === "booked"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            disabled={status === "unavailable"}
            onPress={() => toggleSeatStatus(rowIndex, "left", index)}
          >
            <Text className="font-bold text-white">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Middle Section */}
      <View className="flex-row">
        {rowSeats.middle.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`m-1 flex h-10 w-10 items-center justify-center rounded ${
              status === "available"
                ? "bg-green-500"
                : status === "booked"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            disabled={status === "unavailable"}
            onPress={() => toggleSeatStatus(rowIndex, "middle", index)}
          >
            <Text className="font-bold text-white">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Right Section */}
      <View className="flex-row">
        {rowSeats.right.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`m-1 flex h-10 w-10 items-center justify-center rounded ${
              status === "available"
                ? "bg-green-500"
                : status === "booked"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            disabled={status === "unavailable"}
            onPress={() => toggleSeatStatus(rowIndex, "right", index)}
          >
            <Text className="font-bold text-white">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading)
    return (
      <View className="flex h-screen items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    );

  if (error)
    return (
      <Text className="my-auto h-screen text-center">
        Error: {error.message}
      </Text>
    );
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">{movie}</Text>
      <Text className="mb-4 text-lg">Show Time: {formatTime(startTime)}</Text>
      <ScrollView horizontal>
        <View>
          <View className="w-[170vw] flex-row flex-wrap justify-center">
            {seatsData.map((row, index) => renderRow(row, index))}
          </View>
          <View className="mt-4 rounded bg-blue-500 p-2">
            <Text className="text-center text-white">Screen</Text>
          </View>
        </View>
      </ScrollView>
      <View className="mt-4">
        <TouchableOpacity
          className="rounded bg-green-600 p-2"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-center text-white">View Summary</Text>
        </TouchableOpacity>
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      > */}
      <Pressable
        onPress={() => setModalVisible(false)}
        className={`absolute bottom-0 w-screen rounded bg-slate-100 p-4 ${
          modalVisible ? "visible" : "hidden"
        }`}
      >
        <View className="w-screen flex-row justify-between">
          <Text className="mb-2 text-lg font-bold">Price Summary</Text>
          <Text className="right-8 mb-2 text-lg text-black">
            {bookedSeats.length} x {toRupiah(price)}
          </Text>
        </View>
        <Text className="mb-2">
          Booked Seats: {bookedSeats.join(", ") || "None"}
        </Text>
        <Text className="mb-4">Total Price: {toRupiah(totalPrice)}</Text>
        <TouchableOpacity
          className="mb-2 rounded bg-yellow-500 p-2"
          onPress={() =>
            router.push({
              pathname: "view3d",
              params: { seats: JSON.stringify(seatsData) },
            })
          }
        >
          <Text className="text-center text-white">3D VIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded bg-blue-500 p-2"
          onPress={() => {
            // refetch();

            router.dismiss();
            router.push({
              pathname: "payment",
              params: {
                totalPrice,
                bookedSeats: JSON.stringify(bookedSeats),
                movie,
                showTime: show,
                cinema: JSON.stringify(cinema),
              },
            });
          }}
        >
          <Text className="text-center text-white">Continue</Text>
        </TouchableOpacity>
      </Pressable>
      {/* </Modal> */}
    </View>
  );
}
