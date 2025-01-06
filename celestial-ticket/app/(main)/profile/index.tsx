import { useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

const GET_DATA = gql`
  query Users {
    users {
      _id
      name
      email
      phoneNumber
      address
      gender
    }
  }
`;

export default function ProfileScreen() {
  const { loading, error, data } = useQuery(GET_DATA);
  console.log("🚀 ~ ProfileScreen ~ data", data);
  const navigation = useNavigation();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <View>
      {data.users.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
      <Text>Profile Screen</Text>
      <Link href="login">About</Link>
    </View>
  );
}
