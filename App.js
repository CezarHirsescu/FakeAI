import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
// import SignInScreen from "./src/screens/SignInScreen";
// import SignUpScreen from "./src/screens/SignUpScreen";
// import ConfirmSignUpScreen from "./src/screens/ConfirmSignUpScreen";
// import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
// import NewPasswordScreen from "./src/screens/NewPasswordScreen";
import Navigation from "./Navigation";
import { TextInput1, Button1 } from "./components";
import { useFonts } from "expo-font";
import { COLORS } from "./constants";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_Mono_Light: require("./assets/fonts/RobotoMono-Light.ttf"),
    Roboto_Mono_Regular: require("./assets/fonts/RobotoMono-Regular.ttf"),
    Roboto_Mono_SemiBold: require("./assets/fonts/RobotoMono-SemiBold.ttf"),
    Roboto_Mono_Bold: require("./assets/fonts/RobotoMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
      <StatusBar style="light"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.darkGray,
  },
});
