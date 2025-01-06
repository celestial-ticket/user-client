import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const { totalPrice, bookedSeats } = params;
  console.log("🚀 ~ PaymentScreen ~ totalPrice:", totalPrice);
  console.log("🚀 ~ PaymentScreen ~ bookedSeats:", bookedSeats);

  return (
    <View>
      <Text>Payment Screen</Text>
    </View>
  );
}
