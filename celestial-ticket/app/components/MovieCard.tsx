import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function AllMovieCard({
  item,
  title,
  poster,
  ageRating,
  genre,
}) {
  return (
    <View className="bg-white rounded-lg shadow-md m-2 w-48">
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "detail-film",
            params: { movieId: item._id, item: JSON.stringify(item) },
          })
        }
      >
        <Image source={{ uri: poster }} className="w-full h-64 rounded-lg" />
        <Text className="font-bold text-lg p-2 mt-2">{title}</Text>
        <View className="flex flex-row p-2 mt-2">
          <Text className="pr-1">{ageRating}</Text>
          <Text className="">{genre}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
