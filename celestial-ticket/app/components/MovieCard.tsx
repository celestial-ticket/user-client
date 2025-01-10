import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

type MovieCardProps = {
  width: any;

  item: any;

  title: any;

  poster: any;

  ageRating: any;

  genre: any;

  onPress?: () => void;
};

export default function AllMovieCard({
  width,
  item,
  title,
  poster,
  ageRating,
  genre,
}: MovieCardProps) {
  console.log(item, "item");

  return (
    <View className={`rounded-lg bg-white ${width ? "" : "w-44"}`}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "detail-film",
            params: { item: JSON.stringify(item) },
          })
        }
      >
        <Image source={{ uri: poster }} className="h-64 w-full rounded-lg" />
        <Text className="mt-2 p-2 text-lg font-bold">{title}</Text>
        <View className="mt-2 flex flex-row p-2">
          <Text className="pr-1">{ageRating}</Text>
          <Text className="">{genre}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
