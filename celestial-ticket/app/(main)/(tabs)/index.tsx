import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// ! Location
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// ! Carousel
import Carousel from "react-native-reanimated-carousel";
import { Link, useRouter } from "expo-router";
import AllMovieCard from "../../components/MovieCard";

export default function Page() {
    const router = useRouter();
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
    const movies = [
        {
            id: 1,
            title: "The Last Voyage",
            genre: "Adventure",
            duration: "120 minutes",
            synopsis:
                "A group of explorers embarks on a perilous journey across uncharted waters, facing mythical creatures and treacherous storms.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["John Doe", "Jane Smith", "Emily Johnson"],
            age_rating: "PG-13",
        },
        {
            id: 2,
            title: "Mystery of the Lost City",
            genre: "Mystery",
            duration: "90 minutes",
            synopsis:
                "A detective uncovers secrets in a city that has been lost to time, leading to unexpected twists and revelations.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Michael Brown", "Sarah Davis", "David Wilson"],
            age_rating: "PG",
        },
        {
            id: 3,
            title: "Love in the Time of Chaos",
            genre: "Romance",
            duration: "105 minutes",
            synopsis:
                "In a world torn apart by conflict, two lovers find solace in each other amidst the chaos surrounding them.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Anna Taylor", "Chris Lee", "Jessica White"],
            age_rating: "R",
        },
        {
            id: 4,
            title: "Galactic Warriors",
            genre: "Sci-Fi",
            duration: "140 minutes",
            synopsis:
                "A team of intergalactic soldiers must unite to save their galaxy from an impending alien invasion.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Tom Hanks", "Scarlett Johansson", "Idris Elba"],
            age_rating: "PG-13",
        },
        {
            id: 5,
            title: "The Haunted House",
            genre: "Horror",
            duration: "95 minutes",
            synopsis:
                "A group of friends spends a night in a haunted house, where they encounter terrifying spirits and dark secrets.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Emma Stone", "Ryan Gosling", "Liam Neeson"],
            age_rating: "R",
        },
        {
            id: 6,
            title: "The Great Heist",
            genre: "Action",
            duration: "110 minutes",
            synopsis:
                "A mastermind thief assembles a team to pull off the biggest heist in history, but things don't go as planned.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Leonardo DiCaprio", "Kate Winslet", "Brad Pitt"],
            age_rating: "PG-13",
        },
        {
            id: 7,
            title: "Journey to the Center of the Earth",
            genre: "Adventure",
            duration: "100 minutes",
            synopsis:
                "A thrilling expedition leads a group of scientists to the Earth's core, where they discover a world beyond imagination.",
            thumbnail:
                "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Dwayne Johnson", "Emily Blunt", "Josh Hutcherson"],
            age_rating: "PG",
        },
        {
            id: 8,
            title: "The Secret Garden",
            genre: "Drama",
            duration: "120 minutes",
            synopsis:
                "A young girl discovers a hidden garden that transforms her life and the lives of those around her.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Daisy Ridley", "Colin Firth", "Julie Walters"],
            age_rating: "G",
        },
        {
            id: 9,
            title: "Cybernetic Dreams",
            genre: "Sci-Fi",
            duration: "130 minutes",
            synopsis:
                "In a future where technology rules, a hacker fights against a corrupt system to save humanity.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Keanu Reeves", "Natalie Portman", "Michael Fassbender"],
            age_rating: "PG-13",
        },
        {
            id: 10,
            title: "The Art of War",
            genre: "Action",
            duration: "115 minutes",
            synopsis:
                "A skilled warrior must navigate through political intrigue and betrayal to protect his kingdom.",
            thumbnail: "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            cast: ["Jet Li", "Michelle Yeoh", "Donnie Yen"],
            age_rating: "R",
        },
    ];

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
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "detail-film",
                        params: { item: JSON.stringify(item) },
                    })
                }
            >
                <Image
                    source={{ uri: item.image }}
                    className="h-96 w-full rounded-lg"
                />
            </TouchableOpacity>
        </View>
    );

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

            <ScrollView style={{ backgroundColor: "white" }}>
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
            // onSnapToItem={(index) => console.log("current index:", index)}
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

                {/* UPCOMING */}

                <View>
                    <Text className="m-5 font-bold text-xl">Coming Soon</Text>
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
                <View className="flex-1 mt-5 pb-24">
                    <Text className="m-5 font-bold text-xl">All Movies</Text>
                    <FlatList
                        data={movies}
                        renderItem={({ item }) => (
                            <AllMovieCard
                                item={item}
                                title={item.title}
                                poster={item.thumbnail}
                                age_rating={item.age_rating}
                                genre={item.genre}
                            />
                        )}
                        keyExtractor={(item) => item.title}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
