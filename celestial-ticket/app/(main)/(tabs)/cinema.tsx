import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { GET_NEARBY_CINEMAS } from "../../../mutations/cinema";
import { useMovies } from "../../../contexts/MoviesContext";
import { useState } from "react";
// const cinemas = [
//   "Cinema 1",
//   "Cinema 2",
//   "Cinema 3",
//   "Cinema 4",
//   "Cinema 5",
//   "Cinema 6",
//   "Cinema 7",
//   "Cinema 8",
//   "Cinema 9",
//   "Cinema 10",
//   "Cinema 1",
//   "Cinema 2",
//   "Cinema 3",
//   "Cinema 4",
//   "Cinema 5",
//   "Cinema 6",
//   "Cinema 7",
//   "Cinema 8",
//   "Cinema 9",
//   "Cinema 10",
// ];

const transformCinemaData = (cinemas, nowShowing) => {
  //   console.log("🚀 ~ transformCinemaData ~ cinemas:", cinemas);
  return cinemas?.map((cinema) => {
    const movies = cinema.showTimes
      .map((showTime) => {
        const movie = nowShowing.find(
          (movie) => movie._id === showTime.movieId
        );
        return movie ? { _id: movie._id, title: movie.title } : null;
      })
      .filter((movie) => movie !== null);

    return {
      ...cinema,
      movies,
    };
  });
};

export default function CinemaScreen() {
  const [expandedCinema, setExpandedCinema] = useState(null);

  const location = SecureStore.getItem("location");
  const userLocation = JSON.parse(location);
  const { latitude, longitude } = userLocation.coords;
  const { data: movieData } = useMovies();
  const { nowShowing } = movieData;

  const { loading, error, data } = useQuery(GET_NEARBY_CINEMAS, {
    variables: {
      userLocation: {
        coordinates: [longitude, latitude],
        type: "Point",
      },
      maxDistance: 50,
    },
  });
  const transformedData = transformCinemaData(
    data?.getNearbyCinemas,
    nowShowing
  );
  console.log("🚀 ~ CinemaScreen ~ transformedData:", transformedData);

  const toggleCinema = (cinemaId) => {
    setExpandedCinema(expandedCinema === cinemaId ? null : cinemaId);
  };

  if (loading)
    return <Text className="h-screen my-auto text-center">Loading...</Text>;
  if (error)
    return (
      <Text className="h-screen my-auto text-center">{error.message}</Text>
    );

  return (
    <ScrollView className="flex-1">
      {transformedData.map((cinema, index) => (
        <View key={index} className="border-b w-full p-3 border-gray-300">
          <TouchableOpacity onPress={() => toggleCinema(cinema._id)}>
            <View className="flex flex-row">
              <MaterialCommunityIcons
                className="mr-5"
                name="office-building-marker"
                size={30}
                color="black"
              />
              <Text className="font-semibold text-xl">{cinema.name}</Text>
            </View>
          </TouchableOpacity>
          {expandedCinema === cinema._id && (
            <View className="mt-2">
              {cinema.movies.map((movie) => (
                <Text key={movie._id} className="ml-10">
                  {movie.title}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
