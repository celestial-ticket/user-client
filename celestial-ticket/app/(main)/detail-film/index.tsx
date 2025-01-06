import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { toRupaih } from "../../../helpers/toRupiah";

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

const showTime = [
  {
    id: 1,
    time: "10:00",
    seats: generateSeats(5, 12), // 5 rows, 12 seats per row, price $10
    price: 50_000,
    cinema: "Cinema 1",
  },
  {
    id: 2,
    time: "12:00",
    seats: generateSeats(5, 12), // 5 rows, 12 seats per row, price $12
    price: 55_000,
    cinema: "Cinema 1",
  },
  {
    id: 3,
    time: "15:00",
    seats: generateSeats(5, 12), // 5 rows, 12 seats per row, price $12
    price: 55_000,
    cinema: "Cinema 1",
  },
  {
    id: 4,
    time: "12:00",
    seats: generateSeats(5, 12), // 5 rows, 12 seats per row, price $12
    price: 100_000,
    cinema: "Cinema 2",
  },
  {
    id: 5,
    time: "15:00",
    seats: generateSeats(5, 12), // 5 rows, 12 seats per row, price $12
    price: 100_000,
    cinema: "Cinema 2",
  },
];

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
  const router = useRouter();
  const params = useLocalSearchParams();
  const { item } = params;
  const [selectedCinemas, setSelectedCinemas] = useState(null);
  const groupedShowTimes = groupShowTimesByCinema(showTime);

  // Parse the item data
  const parsedItem = Array.isArray(item)
    ? JSON.parse(item[0])
    : JSON.parse(item);
  console.log("🚀 ~ DetailFilmScreen ~ params:", parsedItem);

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
      <Text className="text-lg mb-4">
        Summary: haha hihi {parsedItem.title}
      </Text>
      {Object.keys(groupedShowTimes).map((cinema) => (
        <View key={cinema} className="mb-4">
          <TouchableOpacity
            onPress={() => toggleCinema(cinema)}
            className="border-2 border-black p-2 m-2"
          >
            <Text className="text-xl font-bold">{cinema}</Text>
          </TouchableOpacity>
          {selectedCinemas?.includes(cinema) && (
            <View className="border-2 border-gray-300 p-2 m-2 bg-slate-100">
              <Text className="text-center">Cinema info</Text>
              <Text className="text-center">
                Price: {toRupaih(groupedShowTimes[cinema][0].price)}
              </Text>
              <View className="flex-row flex-wrap justify-center">
                {groupedShowTimes[cinema].map((show) => (
                  <View key={show.id} className="w-1/3">
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "checkout",
                          params: {
                            show: JSON.stringify(show),
                            movie: parsedItem.title,
                          },
                        })
                      }
                      className="border-2 border-gray-300 p-2 m-2"
                    >
                      <Text className="text-center">{show.time}</Text>
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
