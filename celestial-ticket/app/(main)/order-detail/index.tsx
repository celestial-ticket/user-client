import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { useMovie } from "../../../contexts/MovieContext";
import { useMutation } from "@apollo/client";
import { CreateOrder } from "../../../mutations/order";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { formatIndoDate, formatTime } from "../../../helpers/convertTimeStamp";
import { toRupiah } from "../../../helpers/toRupiah";
import QRCode from "react-native-qrcode-svg";
import { SendEmail } from "../../../mutations/sendEmail";

export default function OrderDetailScreen() {
  const router = useRouter();
  const { movieId } = useMovie();
  const [order, setOrder] = useState({});
  // console.log("🚀 ~ movieId:", movieId);

  const params = useLocalSearchParams();
  const { bookedSeats, totalPrice, movie, showTime, cinema, existingOrder } =
    params;
  console.log("🚀 ~ OrderDetailScreen ~ existingOrder:", existingOrder);
  // console.log("🚀 ~ OrderDetailScreen ~ params:", params);

  let arrayBookedSeats = [];
  if (bookedSeats) {
    const parsedBookedSeats = Array.isArray(bookedSeats)
      ? JSON.parse(bookedSeats[0])
      : JSON.parse(bookedSeats);
    arrayBookedSeats =
      typeof parsedBookedSeats === "string"
        ? JSON.parse(parsedBookedSeats)
        : parsedBookedSeats;
  }

  let cinemaObejct = {};
  if (cinema) {
    const parsedCinema = Array.isArray(cinema)
      ? JSON.parse(cinema[0])
      : JSON.parse(cinema);
    // console.log("🚀 ~ parsedCinema:", typeof JSON.parse(parsedCinema));
    cinemaObejct = JSON.parse(parsedCinema);
  }

  let parsedShowTime = {};
  if (showTime) {
    parsedShowTime = Array.isArray(showTime)
      ? JSON.parse(showTime[0])
      : JSON.parse(showTime);
  }

  const accessToken = SecureStore.getItem("accessToken");
  if (!accessToken) {
    router.push("login");
  }

  const [createOrder, { loading, error }] = useMutation(CreateOrder);
  const [sendEmail] = useMutation(SendEmail);

  useEffect(() => {
    if (existingOrder) {
      try {
        const parsedExistingOrder = Array.isArray(existingOrder)
          ? JSON.parse(existingOrder[0])
          : JSON.parse(existingOrder);
        console.log(
          "🚀 ~ OrderDetailScreen ~ parsedExistingOrder:",
          parsedExistingOrder
        );
        setOrder(parsedExistingOrder);
      } catch (error) {
        console.error("Error parsing existing order:", error);
      }
    } else {
      (async () => {
        try {
          const o = {
            cinemaId: cinemaObejct._id,
            movieId,
            paymentStatus: "Success",
            price: Number(totalPrice),
            seats: arrayBookedSeats,
            showTimeId: parsedShowTime._id,
          };
          console.log(o);

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

          // Call the mutation to send the email
          // console.log(JSON.parse(await SecureStore.getItemAsync("user")).email);
          const sendData = {
            email: JSON.parse(await SecureStore.getItemAsync("user")).email, // Replace with the user's email
            order: {
              movie,
              date: formatIndoDate(parsedShowTime.date),
              time: formatTime(parsedShowTime.date),
              cinema: cinemaObejct.name,
              seats: arrayBookedSeats,
              totalPrice: toRupiah(+totalPrice),
              orderId: data.createOrder._id,
            },
          };
          console.log("sendData", sendData);

          await sendEmail({
            variables: {
              email: JSON.parse(await SecureStore.getItemAsync("user")).email, // Replace with the user's email
              order: {
                movie,
                date: formatIndoDate(parsedShowTime.date),
                time: formatTime(parsedShowTime.date),
                cinema: cinemaObejct.name,
                seats: arrayBookedSeats,
                totalPrice: toRupiah(+totalPrice),
                orderId: data.createOrder._id,
              },
            },
          });
          console.log("Email sent");
        } catch (err) {
          console.error("Error creating order", err);
        }
      })();
    }
  }, []);

  console.log("🚀 ~ OrderDetailScreen ~ order:", order);
  // (NOBRIDGE) LOG  🚀 ~ OrderDetailScreen ~ order:
  // {"__typename": "Order",
  // "_id": "677ec1117cebfe70c1f2d3bb",
  // "cinema": {"__typename": "Cinema", "name": "Cinema 21 Plaza Senayan"},
  // "movie": {"__typename": "Movie", "title": "Moana 2: The Return of the Ocean"},
  // "price": 120000,
  // "seats": ["C3", "C4", "C5"],
  // "showTime": {"__typename": "ShowTime", "date": "1736467200000", "endTime": "1736510400000",
  // "startTime": "1736503200000"}}
  return (
    <View>
      {!order ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View className="bg-blue-900 p-4 rounded-lg shadow-md w-11/12 mx-auto mt-10">
            <Text className="text-white text-2xl font-bold text-center">
              {existingOrder ? order?.movie?.title : movie}
            </Text>
            <Text className="text-white text-center">
              {existingOrder
                ? formatIndoDate(order?.showTime?.date)
                : formatIndoDate(parsedShowTime?.date)}
            </Text>
            <Text className="text-white text-center">
              Theater:{" "}
              {existingOrder ? order?.cinema?.name : cinemaObejct?.name}
            </Text>
            <Text className="text-white text-center">
              Time:{" "}
              {existingOrder
                ? formatTime(order?.showTime?.startTime)
                : formatTime(parsedShowTime?.startTime)}
            </Text>

            <View className="bg-white mt-4 p-4 rounded-lg">
              <Text className="text-lg font-semibold mt-2">
                Transaction Code
              </Text>
              <Text className="text-lg">{order?._id}</Text>

              <Text className="text-lg font-semibold">Number of Tickets</Text>
              <Text className="text-lg">
                {existingOrder
                  ? order?.seats?.length
                  : arrayBookedSeats?.length}
                Person
              </Text>
              <Text className="text-lg">
                {existingOrder
                  ? order?.seats?.join(", ")
                  : arrayBookedSeats?.join(", ")}
              </Text>

              <Text className="text-lg font-semibold">Total Payment</Text>
              <Text className="text-lg">
                {existingOrder
                  ? toRupiah(+order?.price)
                  : toRupiah(+totalPrice)}
              </Text>
              <View className="mt-4 self-end">
                {order._id ? (
                  <QRCode value={order?._id} size={100} />
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("profile")}
            className="bg-blue-700 p-3 rounded-lg mt-4 w-11/12 mx-auto"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
