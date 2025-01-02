import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import "../../global.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";

export default function Page() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="m-7">
                    <Text>Location</Text>
                </View>
                <View className="flex-1">
                    <PagerView style={{ flex: 1 }} initialPage={0}>
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
                </View>
                <View className="m-5">
                    <View className="flex-row">
                        <Text>Now Showing</Text>
                        <Text>Upcoming</Text>
                    </View>
                    <View></View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
