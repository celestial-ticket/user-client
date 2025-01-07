import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function OrderDetailScreen() {
  const params = useLocalSearchParams();
  console.log(params);
  const { bookedSeats, totalPrice, movie } = params;
  const arrayBookedSeats: [] = Array.isArray(bookedSeats)
    ? JSON.parse(bookedSeats[0])
    : JSON.parse(bookedSeats);
  console.log("🚀 ~ OrderDetailScreen ~ arrayBookedSeats:", arrayBookedSeats);
  //   const bookedSeatsString = arrayBookedSeats.join(", ");
  return (
    <View>
      {/* <Text>{bookedSeatsString}</Text> */}
      <Text>{totalPrice}</Text>
      <Text>{movie}</Text>
    </View>
  );
}
