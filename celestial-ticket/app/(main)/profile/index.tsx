import { useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Profile Screen</Text>
      <Link href="login">About</Link>
    </View>
  );
}
