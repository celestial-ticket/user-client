import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { GET_SHOWTIME } from "../../../mutations/showTimes";
import { useQuery } from "@apollo/client";
import { toRupiah } from "../../../helpers/toRupiah";
import { formatTime } from "../../../helpers/convertTimeStamp";
import { useMovie } from "../../../contexts/MovieContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

// import CalendarStrip from "react-native-calendar-strip";

const generateSeats = (rows: number, columns: number) => {
  const seatCodes = "ABCDE"; // 5 rows
  const seats = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 1; colIndex <= columns; colIndex++) {
      const seatCode = `${seatCodes[rowIndex]}${colIndex}`;
      seats.push([seatCode, "Available"]);
    }
  }

  return seats;
};

const groupShowTimesByCinema = (showTimes) => {
  return showTimes.reduce((acc, show) => {
    if (!acc[show.cinema]) {
      acc[show.cinema] = [];
    }
    acc[show.cinema].push(show);
    return acc;
  }, {});
};

export default function DetailFilmScreen() {
  const { setMovieId } = useMovie();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { item } = params;
  let location = JSON.parse(SecureStore.getItem("location")) || null;
  if (!location) {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw "Permission to access location was denied";
      }

      await Location.enableNetworkProviderAsync();
      location = await Location.getCurrentPositionAsync({});
      SecureStore.setItemAsync("location", JSON.stringify(location));
    })();
  }

  const { latitude, longitude } = location?.coords;
  // Parse the item data
  const parsedItem = Array.isArray(item)
    ? JSON.parse(item[0])
    : JSON.parse(item);

  console.log("🚀 ~ DetailFilmScreen ~ params:", parsedItem);

  const movieId = parsedItem._id;
  useEffect(() => {
    setMovieId(movieId);
  }, [movieId]);

  // console.log("🚀 ~ DetailFilmScreen ~ movieId:", movieId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCinemas, setSelectedCinemas] = useState(null);

  // ! <><><>  Wiring  <><><>
  const { loading, error, data } = useQuery(GET_SHOWTIME, {
    variables: {
      movieId,
      date: selectedDate || "2025-01-10",
      userLocation: {
        coordinates: [longitude, latitude],
        type: "Point",
      },
    },
  });

  if (loading) {
    return (
      <View className="flex h-screen items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    );
  }
  if (error) {
    return (
      <Text className="mx-auto my-auto bg-red-600 text-3xl">
        Error: {error.message}
      </Text>
    );
  }
  // console.log("🚀 ~ DetailFilmScreen ~ data", data);

  const toggleCinema = (cinema) => {
    if (cinema) {
      setSelectedCinemas((prevSelectedCinemas) =>
        prevSelectedCinemas?.includes(cinema)
          ? prevSelectedCinemas.filter((c) => c !== cinema)
          : prevSelectedCinemas
            ? [...prevSelectedCinemas, cinema]
            : [cinema],
      );
    }
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || Date.now();
    setShowDatePicker((prevShowDatePicker) => !prevShowDatePicker);
    setSelectedDate(currentDate);
  };

  return (
    <ScrollView className="flex-1">
      <Image
        source={{ uri: parsedItem.thumbnail }}
        className="h-96 w-full object-cover"
      />
      <View className="p-4">
        <Text className="mb-4 text-center text-2xl font-bold">
          {parsedItem.title}
        </Text>
        <Text className="m-2 mb-0 text-lg font-bold">Title</Text>
        <Text className="m-2 mt-0 text-lg">{parsedItem.title}</Text>
        <Text className="text-baset m-2 mb-0 text-justify font-bold">
          Synopsis
        </Text>
        <Text className="text-baset m-2 mt-0 text-justify">
          {parsedItem.synopsis}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="mx-auto my-4 flex w-11/12 flex-row items-center justify-center rounded-lg bg-blue-700 p-3"
      >
        <View className="flex-row items-center justify-center gap-4">
          <Text className="mr-2 text-center text-white">Select Date</Text>
          <FontAwesome6 name="calendar" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 12, 31)}
        />
      )}

      {parsedItem.movieStatus == "Now Showing" &&
        data.getShowTimes.map((showTime) => (
          <View key={showTime.cinema._id} className="mb-4">
            <TouchableOpacity
              onPress={() => toggleCinema(showTime.cinema._id)}
              className="m-2 border-2 border-black p-2"
            >
              <Text className="text-xl font-bold">{showTime.cinema.name}</Text>
            </TouchableOpacity>

            {selectedCinemas?.includes(showTime.cinema._id) && (
              <View className="m-2 border-2 border-gray-300 bg-slate-100 p-2">
                <Text className="text-center">Cinema info</Text>
                <Text className="text-center">
                  Price: {toRupiah(showTime.showTimes[0]?.price || 0)}
                </Text>
                <View className="flex-row flex-wrap justify-center">
                  {showTime.showTimes.map((show) => (
                    <View key={show._id} className="w-1/3">
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: "checkout",
                            params: {
                              showTime: JSON.stringify(show),
                              cinema: JSON.stringify(showTime.cinema),
                              movie: parsedItem.title,
                            },
                          })
                        }
                        className="m-2 border-2 border-gray-300 p-2"
                      >
                        <Text className="text-center">
                          {formatTime(show.startTime)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}
    </ScrollView>
  );
}
