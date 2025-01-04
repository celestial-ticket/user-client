import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// ! Location
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// ! Carousel
import Carousel from "react-native-reanimated-carousel";

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

            // get city name
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
    const width = Dimensions.get("window").width;
    const carouselData = [
        {
            id: "1",
            title: "50% Off on All Products",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            id: "2",
            title: "Buy 1 Get 1 Free",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            id: "3",
            title: "Free Shipping Worldwide",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            id: "4",
            title: "Clearance Sale Up to 70%",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            id: "5",
            title: "New Arrivals Just In",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
    ];

    // ! Card now showing
    
    const itemWidth = width * 0.5; // Width of each item
    const data = [
        {
            title: "Devils Stay",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Wicked",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "The Great Escape",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Mystery Night",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Adventure Time",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Horror House",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Comedy Club",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Romantic Getaway",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Sci-Fi World",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
        {
            title: "Fantasy Land",
            image: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        },
    ];
    const renderItem = ({ item }) => (
        <View
            className="bg-white rounded-lg shadow-md ml-3 mr-3"
            style={{ width: itemWidth }}
        >
            <Image
                source={{ uri: item.image }}
                className="h-96 w-full rounded-lg"
            />
        </View>
    );

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
            <View className="flex flex-row">
                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    // data={[...new Array(6).keys()]}
                    data={carouselData}
                    scrollAnimationDuration={3000}
                    onSnapToItem={(index) =>
                        console.log("current index:", index)
                    }
                    renderItem={({ item }) => (
                        <View
                        // style={{
                        //     flex: 1,
                        //     justifyContent: "center",
                        //     alignItems: "center",
                        //     borderRadius: 10,
                        //     overflow: "hidden",
                        // }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 10,
                                }}
                                resizeMode="cover"
                            />
                        </View>
                    )}
                />
            </View>
            {/* ----------------- */}

            {/* CARD NOW SHOWING */}

            <View>
                <Text className="m-5 font-bold text-xl">Now Showing</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={itemWidth + 6} // Width of item + margin (3 on each side)
                    decelerationRate="fast" // Fast deceleration for smoother snapping
                    snapToAlignment="center" // Snap to center
                    contentContainerStyle={{
                        paddingHorizontal: (width - itemWidth) / 2, // Center the first item
                    }}
                />
            </View>

            {/* ALL MOVIE CARD */}
        </SafeAreaView>
    );
}
