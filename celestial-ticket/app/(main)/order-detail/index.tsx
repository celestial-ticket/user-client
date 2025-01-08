import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useMovie } from "../../../contexts/MovieContext";
import { useMutation } from "@apollo/client";
import { CreateOrder } from "../../../mutations/order";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function OrderDetailScreen() {
  const router = useRouter();
  const { movieId } = useMovie();
  const [order, setOrder] = useState({});
  // console.log("🚀 ~ movieId:", movieId);

  const params = useLocalSearchParams();
  const { bookedSeats, totalPrice, movie, showTime, cinema } = params;
  // console.log("🚀 ~ OrderDetailScreen ~ params:", params);

  const arrayBookedSeats = Array.isArray(bookedSeats)
    ? (JSON.parse(bookedSeats[0]) as [])
    : (JSON.parse(bookedSeats) as []);
  // console.log("🚀 ~ arrayBookedSeats:", arrayBookedSeats);

  const parsedCinema = Array.isArray(cinema)
    ? JSON.parse(cinema[0])
    : JSON.parse(cinema);
  // console.log("🚀 ~ parsedCinema:", typeof JSON.parse(parsedCinema));
  const cinemaObejct = JSON.parse(parsedCinema);

  const parsedShowTime = Array.isArray(showTime)
    ? JSON.parse(showTime[0])
    : JSON.parse(showTime);
  // console.log("🚀 ~ parsedShowTime:", parsedShowTime);

  const accessToken = SecureStore.getItem("accessToken");
  // console.log("🚀 ~ accessToken:", accessToken)
  if (!accessToken) {
    router.push("login");
  }
  const [createOrder, { loading, error }] = useMutation(CreateOrder);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await createOrder({
          variables: {
            body: {
              cinemaId: cinemaObejct._id,
              movieId,
              paymentStatus: "Success",
              price: Number(totalPrice),
              seats: arrayBookedSeats,
              showTimeId: parsedShowTime._id,
            },
          },
        });
        console.log("order", data);
        setOrder(data.createOrder);
      } catch (err) {
        console.error("Error creating order", err);
      }
    })();
  }, []);
  // {"createOrder": {"__typename": "Order", "_id": "677e1aeb143c70723cea8553", "cinema": null, "cinemaId": "677a888690228a39d636fc5f", "createdAt": "1736317675884", "movie": null, "paymentStatus": "Success", "price": 40000, "seats": ["[\"E5\"]"], "showTime": null, "showTimeId": "677c912a280cb7c3fe85a88c"}}
  return (
    <View>
      <Text>{movie}</Text>
      <Text>{Date(parsedShowTime.date)}</Text>
      <Text>{cinemaObejct.name}</Text>
      <Text>{arrayBookedSeats}</Text>
      <Text>{totalPrice}</Text>
      <Text>{Date(order.createdAt)}</Text>
      <Text>{order.paymentStatus}</Text>
    </View>
  );
}
