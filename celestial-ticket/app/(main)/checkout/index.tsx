import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { show } = params;
  const parsedShow = Array.isArray(show)
    ? JSON.parse(show[0])
    : JSON.parse(show);
  const { time, seats } = parsedShow;

  //   const memoSeats = useMemo(() => seats, [seats]);
  const [seatsData, setSeatsData] = useState([]);

  const arrangeSeats = (flatSeats) => {
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

  useEffect(() => {
    const arrangedSeats = arrangeSeats(seats);
    setSeatsData(arrangedSeats);
  }, []);

  const toggleSeatStatus = (rowIndex, section, seatIndex) => {
    const updatedSeats = [...seatsData];
    const seat = updatedSeats[rowIndex][section][seatIndex];
    seat[1] = seat[1] === "Booked" ? "Available" : "Booked";
    setSeatsData(updatedSeats);
  };

  const renderRow = (rowSeats, rowIndex) => (
    <View key={rowIndex} className="flex-row justify-center mb-4 gap-12">
      {/* Left Section */}
      <View className="flex-row">
        {rowSeats.left.map(([seat, status], index) => (
          <TouchableOpacity
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded ${
              status === "Available" ? "bg-green-500" : "bg-red-500"
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
              status === "Available" ? "bg-green-500" : "bg-red-500"
            }`}
            onPress={() => toggleSeatStatus(rowIndex, "middle", index)}
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
              status === "Available" ? "bg-green-500" : "bg-red-500"
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
      <Text className="text-2xl font-bold mb-4">Checkout Screen</Text>
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

      <View className="absolute bottom-0 w-full">
        <TouchableOpacity
          className="mb-2 p-2 bg-amber-500 rounded w-1/2 mx-auto"
          onPress={() =>
            router.push({
              pathname: "view3d",
              params: { seats: JSON.stringify(seatsData) },
            })
          }
        >
          <Text className="text-white text-center">3D VIEW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
