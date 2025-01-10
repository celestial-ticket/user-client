import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        lazy: false,
        tabBarActiveTintColor: "#04243a",
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
            <MaterialCommunityIcons
              name="office-building-marker-outline"
              size={26}
              color={color}
            />
            // <FontAwesome size={26} name="film" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-circle" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
