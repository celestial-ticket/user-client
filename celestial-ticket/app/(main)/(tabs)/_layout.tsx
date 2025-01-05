import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                lazy: false,
                tabBarActiveTintColor: "blue",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={26} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cinema"
                options={{
                    title: "Cinema",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={26} name="film" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ticket"
                options={{
                    title: "Ticket",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={26} name="ticket" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
