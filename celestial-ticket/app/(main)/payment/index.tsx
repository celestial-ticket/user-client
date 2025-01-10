import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
import { CREATE_PAYMENT_TOKEN } from "../../../mutations/midtrans";
import React from "react";
import { useAuth } from "../../../contexts/Auth";

export default function PaymentScreen() {
  const { refetch, isLogin } = useAuth();
  const router = useRouter();
  if (!isLogin) {
    router.replace("login");
  }
  const params = useLocalSearchParams();
  const { totalPrice, bookedSeats, movie, showTime, cinema } = params;

  const arrayBookedSeats: [] = Array.isArray(bookedSeats)
    ? JSON.parse(bookedSeats[0])
    : JSON.parse(bookedSeats);

  console.log("🚀 ~ PaymentScreen ~ totalPrice:", totalPrice);
  console.log("🚀 ~ PaymentScreen ~ bookedSeats:", bookedSeats);

  const [token, setToken] = useState("");
  const [webViewUrl, setWebViewUrl] = useState("");

  // Apollo mutation hook
  const [createPaymentToken, { loading, error }] =
    useMutation(CREATE_PAYMENT_TOKEN);

  // Handle payment initiation
  const handlePayment = async () => {
    if (!totalPrice) {
      console.error("Total price is missing");
      return;
    }
    try {
      const response = await createPaymentToken({
        variables: { amount: Number(totalPrice) },
      }); // amount in cents
      console.log("🚀 ~ handlePayment ~ response:", response);
      const { token, redirect_url } = response.data.createPaymentToken;

      setToken(token); // Store token for WebView
      setWebViewUrl(redirect_url); // Set the redirect URL for the WebView
    } catch (error) {
      console.log("🚀 ~ handlePayment ~ error:", error);
      console.error("Error creating payment token", error.response);
    }
  };

  useEffect(() => {
    handlePayment();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <Text className="mx-auto my-auto bg-red-600 text-3xl">
        Error: {error.message}
      </Text>
    );
  }
  return (
    // <>
    //   {webViewUrl ? (
    <WebView
      source={{ uri: webViewUrl }}
      style={{ marginTop: 0, width: "100%", height: "80%" }}
      onNavigationStateChange={(event) => {
        if (event.url.includes("success")) {
          refetch();
          Alert.alert("Payment Successful");
          console.log("🚀 ~ PaymentScreen ~ event.url", event.url);
          router.replace({
            pathname: "order-detail",
            params: {
              totalPrice,
              bookedSeats: JSON.stringify(bookedSeats),
              movie,
              showTime,
              cinema,
            },
          }); // Navigate to order-detail screen
        } else if (event.url.includes("error")) {
          Alert.alert("Payment Failed");
          console.log("🚀 ~ PaymentScreen ~ event.url", event.url);
          router.back();
        }
      }}
    />
  );
}
