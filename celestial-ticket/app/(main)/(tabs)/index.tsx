import { Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// ! Location
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// ! Carousel


export default function Page() {
    // ! Location
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [city, setCity] = useState("");

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Reverse geocode to get city name
            const { latitude, longitude } = location.coords;
            let address = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            if (address.length > 0) {
                setCity(address[0].city || address[0].region || "Unknown City");
            }
        })();
    }, []);

    let text = "Waiting...";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    // ! Carousel
    
    return (
        <SafeAreaView className="bg-white h-full">
            {/* SEARCH BAR */}
            <View className="flex flex-row justify-center items-center mt-5">
                <View className="flex flex-row justify-center items-center w-5/6 bg-gray-100 rounded-full mr-3">
                    <View className="w-1/6 justify-center items-center">
                        <Feather name="search" size={24} color="black" />
                        {/* <Image className="w-6 h-6" /> */}
                    </View>
                    <TextInput placeholder="Search" className="w-5/6" />
                </View>
                <FontAwesome6 name="user-circle" size={28} color="black" />
            </View>
            {/* ----------------- */}

            {/* LOCATION */}
            <View className="flex flex-row m-5">
                <FontAwesome
                    className="mr-3"
                    name="map-marker"
                    size={24}
                    color="grey"
                />
                <Text className="text-lg uppercase">{city}</Text>
                {/* <Text>Latitude: {location?.coords.latitude}</Text> */}
                {/* <Text>Longitude: {location?.coords.longitude}</Text> */}
            </View>

            {/* PROMO CAROUSEL */}

            {/* CARD NOW SHOWING */}

            {/* ALL MOVIE CARD */}
        </SafeAreaView>
    );
}

