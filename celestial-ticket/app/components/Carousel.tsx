import { Image, ScrollView, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Carousel() {
    return (
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
    );
}
