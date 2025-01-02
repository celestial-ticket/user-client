import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RegisterPage() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-white items-center justify-center flex-1">
                {/* NAME */}
                <TextInput
                    className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
                    placeholder="Name"
                    placeholderTextColor={"grey"}
                    // value={username}
                    // onChangeText={setUsername}
                ></TextInput>
                {/* PHONE NUMBER */}
                <TextInput
                    className="bg-gray-900 border-slate-600 w-96 h-16 px-5 border-2 rounded-3xl mb-3 font-bold color-white"
                    placeholder="Phone Number"
                    placeholderTextColor={"grey"}
                    // value={username}
                    // onChangeText={setUsername}
                ></TextInput>
                {/* EMAIL */}
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
                    // value={username}
                    // onChangeText={setUsername}
                ></TextInput>
                {/* REGISTER BUTTON */}
                <TouchableOpacity
                    // title={loading ? "Submitting..." : "Login"}
                    className="bg-blue-600 w-96 h-12 rounded-2xl mb-3 flex justify-center"
                    onPress={() => {
                        console.log("Register");
                        // navigation.navigate("Register");
                        // handleLogin();
                        // }}
                    }}
                >
                    <Text className="text-center font-bold color-black">
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
