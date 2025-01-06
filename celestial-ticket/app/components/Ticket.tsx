import React from "react";
import { View, Text, Image } from "react-native";
// import { QRCode } from "react-native-custom-qr-codes-expo"; // Pastikan untuk menginstal library ini

const Ticket = () => {
    return (
        <View className="bg-blue-900 p-4 rounded-lg shadow-md w-11/12">
            <Text className="text-white text-2xl font-bold text-center">
                Mile 22
            </Text>
            <Text className="text-white text-center">Tuesday, 28 Aug 2018</Text>
            <Text className="text-white text-center">Theater: EMPIRE XXI</Text>
            <Text className="text-white text-center">Time: 18:45</Text>

            <View className="bg-white mt-4 p-4 rounded-lg">
                <Text className="text-lg font-semibold">Number of Tickets</Text>
                <Text className="text-lg">4 Person</Text>
                <Text className="text-lg">C1, C2, C3, C4</Text>

                <Text className="text-lg font-semibold mt-2">
                    Transaction Code
                </Text>
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
