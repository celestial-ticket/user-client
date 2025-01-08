import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { useQuery } from "@apollo/client";
import { GET_NEARBY_CINEMAS } from "../../../mutations/cinema";
import { useMovies } from "../../../contexts/MoviesContext";
import AllMovieCard from "../../components/MovieCard";
import { useRouter } from "expo-router";

const transformCinemaData = (cinemas, nowShowing) => {
  return cinemas?.map((cinema) => {
    const movies = cinema.showTimes
      .map((showTime) => {
        const movie = nowShowing.find(
          (movie) => movie._id === showTime.movieId
        );
        return movie
          ? {
              ...movie,
              showTime: showTime,
            }
          : null;
      })
      .filter((movie) => movie !== null);

    return {
      ...cinema,
      movies,
    };
  });
};

export default function CinemaScreen() {
  const router = useRouter();
  const [expandedCinema, setExpandedCinema] = useState(null);

  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw "Permission to access location was denied";
      }
      let storedLocation = await SecureStore.getItemAsync("location");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      } else {
        await Location.enableNetworkProviderAsync();

        let currentLocation = await Location.getCurrentPositionAsync({});
        await SecureStore.setItemAsync(
          "location",
          JSON.stringify(currentLocation)
        );
        setLocation(currentLocation);
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
  } = useMovies();

  const { loading, error, data } = useQuery(GET_NEARBY_CINEMAS, {
    variables: {
      userLocation: {
        coordinates: [userLocation.longitude, userLocation.latitude],
        type: "Point",
      },
      maxDistance: 50,
    },
  });

  if (moviesLoading || loading)
    return <Text className="h-screen my-auto text-center">Loading...</Text>;

  if (moviesError || error)
    return (
      <Text className="h-screen my-auto text-center">
        {moviesError ? moviesError.message : error.message}
      </Text>
    );

  const { nowShowing } = movieData;
  const transformedData = transformCinemaData(
    data?.getNearbyCinemas,
    nowShowing
  );

  const toggleCinema = (cinemaId) => {
    setExpandedCinema(expandedCinema === cinemaId ? null : cinemaId);
  };

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
                <AllMovieCard
                  width={"w-full"}
                  key={movie._id}
                  item={movie}
                  title={movie.title}
                  poster={movie.thumbnail}
                  ageRating={movie.ageRating}
                  genre={movie.genre}
                  onPress={() =>
                    router.push({
                      pathname: "detail-film",
                      params: { item: JSON.stringify(movie) },
                    })
                  }
                />
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
