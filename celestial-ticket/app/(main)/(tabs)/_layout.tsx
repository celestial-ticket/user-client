import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { MoviesProvider } from "../../../contexts/MoviesContext";

export default function TabLayout() {
<<<<<<< HEAD
  return (
    <MoviesProvider>
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
              <MaterialCommunityIcons
                name="office-building-marker-outline"
                size={24}
                color={color}
              />
              // <FontAwesome size={26} name="film" color={color} />
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
    </MoviesProvider>
  );
=======
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
                        <MaterialCommunityIcons name="office-building-marker-outline" size={26} color={color} />
                        // <FontAwesome size={26} name="film" color={color} />
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
>>>>>>> 6e80891da3f562e3617b285b2835fcf2a8cf8c86
}
