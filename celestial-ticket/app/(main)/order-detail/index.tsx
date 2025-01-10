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
import { useAuth } from "../../../contexts/Auth";

export default function OrderDetailScreen() {
  const router = useRouter();
  const { movieId } = useMovie();
  const [order, setOrder] = useState<any>({});
  const { refetch, isLogin, user } = useAuth();

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

  let cinemaObejct: { _id: string; name: string } = { _id: "", name: "" };
  if (cinema) {
    const parsedCinema = Array.isArray(cinema)
      ? JSON.parse(cinema[0])
      : JSON.parse(cinema);
    // console.log("🚀 ~ parsedCinema:", typeof JSON.parse(parsedCinema));
    cinemaObejct = JSON.parse(parsedCinema);
  }

  let parsedShowTime: { _id: string; date?: number; startTime?: string } = {
    _id: "",
  };
  if (showTime) {
    parsedShowTime = Array.isArray(showTime)
      ? JSON.parse(showTime[0])
      : JSON.parse(showTime);
  }

  const [createOrder, { loading, error }] = useMutation(CreateOrder);
  const [sendEmail] = useMutation(SendEmail);

  useEffect(() => {
    if (!isLogin) {
      router.push("login");
    }
    if (existingOrder) {
      try {
        const parsedExistingOrder = Array.isArray(existingOrder)
          ? JSON.parse(existingOrder[0])
          : JSON.parse(existingOrder);
        console.log(
          "🚀 ~ OrderDetailScreen ~ parsedExistingOrder:",
          parsedExistingOrder,
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
          const sendData = {
            email: user.email, // Replace with the user's email
            order: {
              movie,
              date: formatIndoDate(Number(parsedShowTime.date)),
              time: formatTime(Number(parsedShowTime.date)),
              cinema: cinemaObejct.name,
              seats: arrayBookedSeats,
              totalPrice: toRupiah(+totalPrice),
              orderId: data.createOrder._id,
            },
          };
          console.log("sendData", sendData);

          await sendEmail({
            variables: {
              email: user.email, // Replace with the user's email
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
  return (
    <View>
      {!order ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View className="mx-auto mt-10 w-11/12 rounded-lg bg-blue-900 p-4">
            <Text className="text-center text-2xl font-bold text-white">
              {existingOrder ? order?.movie?.title : movie}
            </Text>
            <Text className="text-center text-white">
              {existingOrder
                ? formatIndoDate(Number(order?.showTime?.date))
                : formatIndoDate(Number(parsedShowTime?.date))}
            </Text>
            <Text className="text-center text-white">
              Theater:{" "}
              {existingOrder ? order?.cinema?.name : cinemaObejct?.name}
            </Text>
            <Text className="text-center text-white">
              Time:{" "}
              {existingOrder
                ? formatTime(Number(order?.showTime?.startTime))
                : formatTime(Number(parsedShowTime?.startTime))}
            </Text>

            <View className="mt-4 rounded-lg bg-white p-4">
              <Text className="mt-2 text-lg font-semibold">
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
            onPress={() => {
              refetch();
              router.push("profile");
            }}
            className="mx-auto mt-4 w-11/12 rounded-lg bg-blue-700 p-3"
          >
            <Text className="text-center text-lg font-semibold text-white">
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
