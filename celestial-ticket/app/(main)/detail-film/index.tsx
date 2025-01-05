import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const generateSeats = (rows, columns, price) => {
  const seatCodes = "ABCDE"; // 5 rows
  const seats = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 1; colIndex <= columns; colIndex++) {
      const seatCode = `${seatCodes[rowIndex]}${colIndex}`;
      seats.push([seatCode, "Available", price]);
    }
  }

  return seats;
};

const showTime = [
  {
    id: 1,
    time: "10:00",
    seats: generateSeats(5, 12, 10), // 5 rows, 12 seats per row, price $10
  },
  {
    id: 2,
    time: "12:00",
    seats: generateSeats(5, 12, 12), // 5 rows, 12 seats per row, price $12
  },
];
export default function DetailFilmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { item } = params;

  // Parse the item data
  const parsedItem = Array.isArray(item)
    ? JSON.parse(item[0])
    : JSON.parse(item);
  console.log("🚀 ~ DetailFilmScreen ~ params:", parsedItem);

  return (
    <View>
      <Text>Detail Film Screen</Text>
      <Text>title : {parsedItem.title}</Text>
      {showTime.map((show) => (
        <TouchableOpacity
          key={show.id}
          onPress={() =>
            router.push({
              pathname: "checkout",
              params: { show: JSON.stringify(show) },
            })
          }
          className="border-2 border-black p-2 m-2"
        >
          <Text>{show.time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
