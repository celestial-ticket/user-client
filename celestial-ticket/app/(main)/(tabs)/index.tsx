import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as SecureStorage from "expo-secure-store";

// ! Location
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// ! Carousel
import Carousel from "react-native-reanimated-carousel";
import { Link } from "expo-router";
import AllMovieCard from "../../components/MovieCard";

// ! RENDER MOVIE
import Card from "../../components/CarouselMovie";
import { useMovies } from "../../../contexts/MoviesContext";

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
        throw "Permission to access location was denied";
      }
      const storageLocation = await SecureStorage.getItemAsync("location");
      let location;
      if (storageLocation) {
        location = JSON.parse(storageLocation);
        setLocation(location);
      } else {
        await Location.enableNetworkProviderAsync();

        location = await Location.getCurrentPositionAsync({});
        SecureStorage.setItemAsync("location", JSON.stringify(location));
        setLocation(location);
      }
      console.log(location, "LOCATION IN HOME");
      // get city name
      const { latitude, longitude } = location.coords;
      console.log("🚀 ~ latitude:", latitude);
      try {
        let address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        console.log("🚀 ~ address:", address);
        if (address.length > 0) {
          setCity(address[0].city || address[0].region || "Unknown City");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
        console.log("🚀 ~ error:", error);
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
  const itemWidth = width * 0.5; // Width of each item

  const carouselData = [
    {
      id: "1",
      title: "50% Off on All Products",
      image:
        "https://t4.ftcdn.net/jpg/04/80/95/15/360_F_480951584_ESYWyM1jIGg2aDL5Cqakp33cRdmFFmMu.jpg",
    },
    {
      id: "2",
      title: "Buy 1 Get 1 Free",
      image:
        "https://americancoinop.com/sites/default/files/styles/article_main_facebook/public/images/articles/main/russo-special_offer_00372.jpg?h=5148bfd9&itok=o-VY3Qcp",
    },
    {
      id: "3",
      title: "Free Shipping Worldwide",
      image:
        "https://img.freepik.com/free-vector/special-bogo-offer-buy-one-get-one-free-background-business-marketing_1017-51006.jpg?w=360",
    },
    {
      id: "4",
      title: "Clearance Sale Up to 70%",
      image:
        "https://americancoinop.com/sites/default/files/styles/article_main_facebook/public/images/articles/main/russo-special_offer_00372.jpg?h=5148bfd9&itok=o-VY3Qcp",
    },
    {
      id: "5",
      title: "New Arrivals Just In",
      image:
        "https://img.freepik.com/premium-vector/buy-one-get-one-free-typography-banner-design-promotion-discount-template-coupon-icon_375539-1009.jpg?semt=ais_hybrid",
    },
  ];

  // ! <><><> [ RENDER MOVIE ] <><><>
  const { data, loading, error } = useMovies();

  const { nowShowing, upcoming, movies } = data || {};
  console.log("🚀 ~ Page ~ upcoming:", upcoming);
  // console.log("🚀 ~ data:", nowShowing);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center absolute">
        <ActivityIndicator size={100} />
      </View>
    );
  }
  if (error) {
    return (
      <Text className="mx-auto my-auto text-3xl bg-red-600">
        Error: {error.message}
      </Text>
    );
  }

  return (
    <SafeAreaView className="bg-white">
      {/* SEARCH BAR */}
      <View className="flex flex-row justify-center items-center mt-5 mb-3">
        <View className="flex flex-row justify-center items-center w-5/6 bg-gray-100 rounded-full mr-3">
          <View className="w-1/6 justify-center items-center">
            <Feather name="search" size={24} color="black" />
            {/* <Image className="w-6 h-6" /> */}
          </View>
          <TextInput placeholder="Search" className="w-5/6" />
        </View>
        <Link href="/profile">
          <FontAwesome6 name="user-circle" size={28} color="black" />
        </Link>
      </View>
      {/* ----------------- */}

      <ScrollView className="bg-white">
        <View>
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
              data={carouselData}
              scrollAnimationDuration={3000}
              // onSnapToItem={(index) => console.log("current index:", index)}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                  <Text>{item.title}</Text>
                </View>
              )}
            />
          </View>
          {/* ----------------- */}

          {/* CARD NOW SHOWING */}
          <View>
            <Text className="m-5 font-bold text-xl">Now Showing</Text>
            <FlatList
              data={nowShowing}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth + 6} // Width of item + margin (3 on each side)
              decelerationRate="fast" // Fast deceleration for smoother snapping
              // snapToAlignment="center" // Snap to center
              contentContainerStyle={{
                paddingHorizontal: (width - itemWidth) / 2, // Center the first item
              }}
              initialScrollIndex={1} // Start the carousel at the second item (index 1)
              getItemLayout={(data, index) => ({
                length: itemWidth + 6,
                offset: (itemWidth + 6) * index,
                index,
              })}
            />
          </View>

          {/* UPCOMING */}
          <View>
            <Text className="m-5 font-bold text-xl">Coming Soon</Text>
            <FlatList
              data={upcoming}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth + 6} // Width of item + margin (3 on each side)
              decelerationRate="fast" // Fast deceleration for smoother snapping
              // snapToAlignment="center" // Snap to center
              contentContainerStyle={{
                paddingHorizontal: (width - itemWidth) / 2, // Center the first item
              }}
              initialScrollIndex={1} // Start the carousel at the second item (index 1)
              getItemLayout={(data, index) => ({
                length: itemWidth + 6,
                offset: (itemWidth + 6) * index,
                index,
              })}
            />
          </View>

          {/* ALL MOVIE CARD */}
          <View className="flex-1 mt-5 pb-24">
            <Text className="m-5 font-bold text-xl">All Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <AllMovieCard
                  // width={"w-96"}
                  item={item}
                  title={item.title}
                  poster={item.thumbnail}
                  ageRating={item.ageRating}
                  genre={item.genre}
                />
              )}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-evenly" }}
              contentContainerStyle={{ gap: 6, paddingHorizontal: 12 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
