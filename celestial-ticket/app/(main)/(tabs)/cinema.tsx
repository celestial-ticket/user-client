import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const cinemas = [
    "Cinema 1",
    "Cinema 2",
    "Cinema 3",
    "Cinema 4",
    "Cinema 5",
    "Cinema 6",
    "Cinema 7",
    "Cinema 8",
    "Cinema 9",
    "Cinema 10",
    "Cinema 1",
    "Cinema 2",
    "Cinema 3",
    "Cinema 4",
    "Cinema 5",
    "Cinema 6",
    "Cinema 7",
    "Cinema 8",
    "Cinema 9",
    "Cinema 10",
];

export default function CinemaScreen() {
    return (
        <ScrollView className="flex-1">
            {cinemas.map((cinema, index) => (
                <TouchableOpacity
                    key={index}
                    className="border-b w-full p-3 border-gray-300"
                >
                    <View className="flex flex-row">
                        <MaterialCommunityIcons
                            className="mr-5"
                            name="office-building-marker"
                            size={30}
                            color="black"
                        />
                        <Text className="font-semibold text-xl">{cinema}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
