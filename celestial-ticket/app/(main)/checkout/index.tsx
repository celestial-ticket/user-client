import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { toRupiah } from "../../../helpers/toRupiah";

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { show, movie } = params;
  const parsedShow = Array.isArray(show)
    ? JSON.parse(show[0])
    : JSON.parse(show);
    console.log("🚀 ~ CheckoutScreen ~ parsedShow", parsedShow);
    
  const { time, seatList: seats, price } = parsedShow;

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

  useEffect(() => {
    const arrangedSeats = arrangeSeats(seats);
    setSeatsData(arrangedSeats);
  }, []);

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
    seatIndex: number
  ) => {
    const updatedSeats = [...seatsData];
    const seat = updatedSeats[rowIndex][section][seatIndex];
    seat[1] = seat[1] === "booked" ? "available" : "booked";
    setSeatsData(updatedSeats);
    setModalVisible(true);
  };

  const renderRow = (
    rowSeats: {
      left: [string, string][];
      middle: [string, string][];
      right: [string, string][];
    },
    rowIndex: number
  ) => (
    <View key={rowIndex} className="flex-row justify-center mb-4 gap-12">
      {/* Left Section */}
      <View className="flex-row">
        {rowSeats.left.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded ${
              status === "available" ? "bg-green-500" : "bg-red-500"
            }`}
            onPress={() => toggleSeatStatus(rowIndex, "left", index)}
          >
            <Text className="text-white font-bold">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Middle Section */}
      <View className="flex-row">
        {rowSeats.middle.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded ${
              status === "available" ? "bg-green-500" : status === "booked" ? "bg-blue-500": "bg-red-500"
            }`}
            onPress={() => toggleSeatStatus(rowIndex, "middle", index)}
            disabled={status === "unavailable"}
          >
            <Text className="text-white font-bold">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Right Section */}
      <View className="flex-row">
        {rowSeats.right.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded ${
              status === "available" ? "bg-green-500" : "bg-red-500"
            }`}
            onPress={() => toggleSeatStatus(rowIndex, "right", index)}
          >
            <Text className="text-white font-bold">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">{movie}</Text>
      <Text className="text-lg mb-4">Show Time: {time}</Text>
      <ScrollView horizontal>
        <View>
          <View className="flex-row flex-wrap justify-center w-[170vw]">
            {seatsData.map((row, index) => renderRow(row, index))}
          </View>
          <View className="mt-4 p-2 bg-blue-500 rounded">
            <Text className="text-white text-center">Screen</Text>
          </View>
        </View>
      </ScrollView>
      <View className="mt-4">
        <TouchableOpacity
          className="p-2 bg-green-600 rounded"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-center">View Summary</Text>
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
        className={`w-screen bg-slate-100 p-4 rounded absolute bottom-0  ${
          modalVisible ? "visible" : "hidden"
        }`}
      >
        <View className="flex-row justify-between w-screen">
          <Text className="text-lg font-bold mb-2">Price Summary</Text>
          <Text className="text-lg text-black mb-2 right-8">
            {bookedSeats.length} x {toRupiah(price)}
          </Text>
        </View>
        <Text className="mb-2">
          Booked Seats: {bookedSeats.join(", ") || "None"}
        </Text>
        <Text className="mb-4">Total Price: {toRupiah(totalPrice)}</Text>
        <TouchableOpacity
          className="p-2 bg-yellow-500 rounded mb-2"
          onPress={() =>
            router.push({
              pathname: "view3d",
              params: { seats: JSON.stringify(seatsData) },
            })
          }
        >
          <Text className="text-white text-center">3D VIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 bg-blue-500 rounded"
          onPress={() =>
            router.push({
              pathname: "payment",
              params: {
                totalPrice,
                bookedSeats: JSON.stringify(bookedSeats),
                movie,
              },
            })
          }
        >
          <Text className="text-white text-center">Continue</Text>
        </TouchableOpacity>
      </Pressable>
      {/* </Modal> */}
    </View>
  );
}
