import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

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

  useEffect(() => {
    setSeatsData(seats);
  }, []);
  console.log(seatsData);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Checkout Screen</Text>
      <Text className="text-lg mb-4">Show Time: {time}</Text>
      <View className="flex-row flex-wrap justify-center">
        {seatsData.map(([seat, status], index: number) => (
          <TouchableOpacity
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded ${
              status === "Available" ? "bg-green-500" : "bg-red-500"
            }`}
            onPress={() => {
              const updatedSeats = [...seatsData];
              if (updatedSeats[index][1] === "Booked") {
                updatedSeats[index][1] = "Available";
              } else {
                updatedSeats[index][1] = "Booked";
              }
              setSeatsData(updatedSeats);
            }}
          >
            <Text className="text-white font-bold">{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-4 p-2 bg-blue-500 rounded">
        <Text className="text-white text-center">Screen</Text>
      </View>

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
