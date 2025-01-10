import React from "react";
import { View, Text, Image } from "react-native";
// import { QRCode } from "react-native-custom-qr-codes-expo"; // Pastikan untuk menginstal library ini

const Ticket = () => {
  return (
    <View className="w-11/12 rounded-lg bg-blue-900 p-4">
      <Text className="text-center text-2xl font-bold text-white">Mile 22</Text>
      <Text className="text-center text-white">Tuesday, 28 Aug 2018</Text>
      <Text className="text-center text-white">Theater: EMPIRE XXI</Text>
      <Text className="text-center text-white">Time: 18:45</Text>

      <View className="mt-4 rounded-lg bg-white p-4">
        <Text className="text-lg font-semibold">Number of Tickets</Text>
        <Text className="text-lg">4 Person</Text>
        <Text className="text-lg">C1, C2, C3, C4</Text>

        <Text className="mt-2 text-lg font-semibold">Transaction Code</Text>
        <Text className="text-lg">92798</Text>

        <View className="mt-4">
          {/* <QRCode
                        value="92798" // Ganti dengan nilai yang sesuai
                        size={80}
                        color="black"
                        backgroundColor="white"
                    /> */}
        </View>
      </View>
    </View>
  );
};

export default Ticket;
