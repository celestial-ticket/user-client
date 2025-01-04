import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import Card from "../../components/Card";
// import Carousel from "../../components/Carousel";
import { SearchBar } from "react-native-screens";
import Carousel from "react-native-snap-carousel";

export default function Page() {
    const promoData = [
        {
            id: 1,
            title: "Promo 1",
            image: "https://via.placeholder.com/300x150",
        },
        {
            id: 2,
            title: "Promo 2",
            image: "https://via.placeholder.com/300x150",
        },
        {
            id: 3,
            title: "Promo 3",
            image: "https://via.placeholder.com/300x150",
        },
    ];

    const renderPromo = ({ item }) => (
        <View className="items-center justify-center">
            <Image
                source={{ uri: item.image }}
                className="w-72 h-36 rounded-lg"
            />
            <Text className="mt-2 font-bold text-center">{item.title}</Text>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                {/* <SearchBar
                    placeholder="Search"
                    onChangeText={(text) => console.log(text)}
                    className="m-5"
                    // style={{ margin: 10 }}
                /> */}
                <View className="m-7">
                    <Text>Location</Text>
                </View>
                {/* <Carousel /> */}

                <PagerView className="w-5" style={{ flex: 1 }} initialPage={0}>
                    <View className="content-center items-center" key="1">
                        <Text>First page</Text>
                        <Text>Swipe ➡️</Text>
                    </View>
                    <View className="content-center items-center" key="2">
                        <Text>Second page</Text>
                    </View>
                    <View className="content-center items-center" key="3">
                        <Text>Third page</Text>
                    </View>
                </PagerView>

                <View className="m-5">
                    <View className="flex-row">
                        <Text>Now Showing</Text>
                        <Text>Upcoming</Text>
                    </View>
                    {/* <Card /> */}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
