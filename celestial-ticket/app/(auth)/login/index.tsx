import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex justify-center items-center h-full">
        <View>
          <Text className="text-3xl">CelTix</Text>
        </View>
        <View className="m-32">
          {/* USERNAME */}
          <TextInput
            className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
            placeholder="Email"
            placeholderTextColor={"grey"}
            // value={username}
            // onChangeText={setUsername}
          ></TextInput>
          {/* PASSWORD */}
          <TextInput
            className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
            placeholder="Password"
            placeholderTextColor={"grey"}
            secureTextEntry={true}
            // value={password}
            // onChangeText={setPassword}
          ></TextInput>
          {/* LOGIN BUTTON */}
          <TouchableOpacity
            // title={loading ? "Submitting..." : "Login"}
            className="bg-blue-600 w-96 h-12 rounded-2xl mb-3 flex justify-center"
            onPress={() => {
              console.log("Login");
              // navigation.navigate("Register");
              // handleLogin();
              // }}
            }}
          >
            <Text className="text-center font-bold color-black">Log In</Text>
          </TouchableOpacity>
          {/* CREATE AN ACCOUNT */}
          <TouchableOpacity
            className="w-96 h-12 border-2 rounded-2xl flex justify-center border-blue-500"
            onPress={() => {
              console.log("Create Account");
              router.push("register");
            }}
          >
            <Text className="text-center font-bold color-black">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
