import { useNavigation } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ticket from "../../components/Ticket";

export default function ProfileScreen() {
    const user = [
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            phoneNumber: "+1234567890",
            address: "Jakarta, Indonesia",
            gender: "male",
            coordinates: {
                latitude: 37.7749,
                longitude: -122.4194,
            },
        },
    ];

    return (
        <SafeAreaView className="flex">
            <View className="flex items-center">
                <Text className="text-center text-3xl font-bold mt-16">
                    My Profile
                </Text>
                <FontAwesome6
                    name="user-circle"
                    size={100}
                    color="black"
                    style={{ marginTop: 7 }}
                />
                <Text className="text-center text-lg font-bold mt-5">
                    {user[0].name}
                </Text>
                <Text className="text-center text-lg">{user[0].email}</Text>
            </View>
                <Text className="m-5 font-semibold">My Tickets</Text>
            <View className="flex flex-row justify-center">
                <Ticket />
            </View>
        </SafeAreaView>
    );
}
