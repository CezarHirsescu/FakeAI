import { Image, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button1, TextInput1 } from "../components";
import { COLORS, SIZES } from "../constants";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const navigation = useNavigation();
  const user = auth.currentUser;

  const handleSignUp = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:" + user.email);
        if (user.emailVerified === true) {
          navigation.navigate("Tabs");
        } else {
          navigation.navigate("RegisterConfirmScreen");
        }
      })
      .catch((error) => alert(error.message));
  };

  const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

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
    console.log(userInfo);
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
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/adaptive-icon.png")}
      ></Image>
      <TextInput1
        setValue={setEmail}
        value={email}
        placeholder={"Email"}
      ></TextInput1>
      <TextInput1
        setValue={setPassword}
        value={password}
        placeholder={"Password"}
        secureTextEntry={true}
      ></TextInput1>
      <Button1 title={"Login"} width={"80%"} onPress={handleLogin}></Button1>
      <Button1
        title={"Get Started"}
        width={"80%"}
        onPress={handleSignUp}
      ></Button1>
      <Button1
        title={accessToken ? "Get User Data" : "Sign In With Google"}
        width={"80%"}
        onPress={
          accessToken
            ? getUserData
            : () => promptAsync({ useProxy: true, showInRecents: true })
        }
      ></Button1>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  logo: {
    height: 300,
    width: 300,
    margin: SIZES.largeMargin,
  },
});
