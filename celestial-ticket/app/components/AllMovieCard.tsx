import React from "react";
import { View, Text, Image } from "react-native";

export default function AllMovieCard({ title, poster, rating, genre }) {
    return (
        <View className="bg-white rounded-lg shadow-md p-4 m-2 w-48">
            <Image
                source={{ uri: poster }}
                className="w-full h-40 rounded-lg"
            />
            <Text className="font-bold text-lg mt-2">{title}</Text>
            <Text></Text>
            <Text></Text>
            <Text className="text-yellow-500">
                {"★".repeat(Math.round(rating))}
            </Text>
            <Text className="text-gray-600">{genre}</Text>
        </View>
    );
}
