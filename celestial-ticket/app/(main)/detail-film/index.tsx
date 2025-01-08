import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { GET_SHOWTIME } from "../../../mutations/showTimes";
import { useQuery } from "@apollo/client";
import { toRupiah } from "../../../helpers/toRupiah";
import { formatTime } from "../../../helpers/convertTimeStamp";
import { useMovie } from "../../../contexts/MovieContext";

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
  const location = JSON.parse(SecureStore.getItem("location"));
  const { latitude, longitude } = location.coords;
  // Parse the item data
  const parsedItem = Array.isArray(item)
    ? JSON.parse(item[0])
    : JSON.parse(item);

  // console.log("🚀 ~ DetailFilmScreen ~ params:", parsedItem);

  const movieId = parsedItem._id;
  setMovieId(movieId);
  // console.log("🚀 ~ DetailFilmScreen ~ movieId:", movieId);

  const [selectedCinemas, setSelectedCinemas] = useState(null);

  // ! <><><>  Wiring  <><><>
  const { loading, error, data } = useQuery(GET_SHOWTIME, {
    variables: {
      movieId,
      date: "2025-01-10",
      userLocation: {
        coordinates: [longitude, latitude],
        type: "Point",
      },
    },
  });

  const o = {
    movieId,
    date: "2025-01-10",
    userLocation: {
      coordinates: [longitude, latitude],
      type: "Point",
    },
  };
  // console.log("🚀 ~ DetailFilmScreen ~ o:", o);

  // console.log("🚀 ~ DetailFilmScreen ~ data:", data);

  if (loading) {
    return (
      <Text className="w-full text-center my-auto text-3xl">Loading...</Text>
    );
  }
  if (error) {
    return (
      <Text className="mx-auto my-auto text-3xl bg-red-600">
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
          : [cinema]
      );
    }
  };

  return (
    <ScrollView>
      <Image source={{ uri: parsedItem.image }} className="w-full h-96" />
      <Text className="text-2xl font-bold mb-4 text-center">
        {parsedItem.title}
      </Text>
      <Text className="text-lg mb-4">Title {parsedItem.title}</Text>
      {/* {console.log(parsedItem.movieStatus, "<<< ITEM")} */}
      {parsedItem.movieStatus == "Now Showing" &&
        data.getShowTimes.map((showTime) => (
          <View key={showTime.cinema._id} className="mb-4">
            <TouchableOpacity
              onPress={() => toggleCinema(showTime.cinema._id)}
              className="border-2 border-black p-2 m-2"
            >
              <Text className="text-xl font-bold">{showTime.cinema.name}</Text>
            </TouchableOpacity>

            {selectedCinemas?.includes(showTime.cinema._id) && (
              <View className="border-2 border-gray-300 p-2 m-2 bg-slate-100">
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
                        className="border-2 border-gray-300 p-2 m-2"
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
