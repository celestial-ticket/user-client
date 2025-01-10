import { router } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

export default function Card({ item }) {
  const width = Dimensions.get("window").width;
  const itemWidth = width * 0.5;
  return (
    <View className=" rounded-lg ml-3 mr-3" style={{ width: itemWidth }}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "detail-film",
            params: { movieId: item._id, item: JSON.stringify(item) },
          })
        }
      >
        <Image
          source={{ uri: item.thumbnail }}
          className="h-96 w-full rounded-lg"
        />
      </TouchableOpacity>
      <View className="p-3">
        <Text className="text-lg font-bold">{item.title}</Text>
      </View>
    </View>
  );
}
