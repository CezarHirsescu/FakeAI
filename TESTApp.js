import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from "react-native";

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

// import SignInScreen from "./src/screens/SignInScreen";
// import SignUpScreen from "./src/screens/SignUpScreen";
// import ConfirmSignUpScreen from "./src/screens/ConfirmSignUpScreen";
// import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
// import NewPasswordScreen from "./src/screens/NewPasswordScreen";
import Navigation from "./Navigation";
import { TextInput1, Button1 } from "./components";
import { useFonts } from "expo-font";
import { COLORS } from "./constants";
import { Button } from "react-native";

export default function App() {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androindClientId:
      "769641830991-cm8l9lf8thbi4kumpdtn1bit8t2inm3v.apps.googleusercontent.com",
    iosClientId:
      "769641830991-pe5jhahg8mtj3g01ap0a1tosert5ckp5.apps.googleusercontent.com",
    expoClientId:
      "769641830991-68910qre3f7c5o4f14jg2ogakaaqvc5v.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  };

  const showUserData = () => {
    if (userInfo) {
      console.log(userInfo);
      return (
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userInfo.picture }}
            style={styles.profilePic}
          ></Image>
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.root}>
      {showUserData()}
      <Button
        title={accessToken ? "Get User Data" : "Login"}
        onPress={
          accessToken
            ? getUserData
            : () => promptAsync({ useProxy: true, showInRecents: true })
        }
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.darkGray,
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});
