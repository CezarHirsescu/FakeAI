import {
  Image,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../firebase";
import { set, get, ref, update, child } from "firebase/database";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { Button1, TextInput1 } from "../components";
import { COLORS, SIZES } from "../constants";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [saveLoginInfo, setSaveLoginInfo] = useState({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "484419710239-7vdtskqgv5f2rdqgk2f57mtr1mcannv8.apps.googleusercontent.com",
    iosClientId:
      "484419710239-7ajkq2l6lddnv6m2tegada7e1lml768r.apps.googleusercontent.com",
    expoClientId:
      "484419710239-l6752ivpn6f8ikets34iq3ip5m1fn34b.apps.googleusercontent.com",
    webClientId:
      "484419710239-l6752ivpn6f8ikets34iq3ip5m1fn34b.apps.googleusercontent.com",
  });
  const navigation = useNavigation();

  // Call Auto Login
  useEffect(() => {
    readUserData((userInfo) => autoLogin(userInfo));
  }, []);

  // Call Google Login
  useEffect(() => {
    if (response) {
      handleSignInWithGoogle();
    }
  }, [response]);

  // Auto Login
  const autoLogin = (userInfo) => {
    setEmail(userInfo.email);
    setPassword(userInfo.password);
    handleLogin(userInfo.email, userInfo.password);
  };

  //Google Login
  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
        googleEmailRegisterOrLogin();
      }
    } else {
      userCreds = {
        email: user.email,
        password: user.id,
      };
      setEmail(user.email);
      setPassword(user.id);
      saveUserData(JSON.stringify(userCreds));
      googleEmailRegisterOrLogin();
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      userData = {
        id: user.id,
        email: user.email,
        verified: user.verified_email,
        name: user.name,
      };
      setEmail(user.email);
      setPassword(user.id);
      userCreds = {
        email: user.email,
        password: user.id,
      };
      saveUserData(JSON.stringify(userCreds));
    } catch (error) {}
  };

  //Firebase Authentication Login
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        userData = {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          verified: userCredentials.user.emailVerified,
          name: userCredentials.user.displayName,
        };
        userCreds = {
          email: email,
          password: password,
        };
        saveUserData(JSON.stringify(userCreds));
        if (userData.emailVerified === true) {
          navigation.navigate("Tabs");
        } else {
          navigation.navigate("RegisterConfirmScreen");
        }
      })
      .catch((error) => alert(error.message));
  };

  // Authentication Process Local Save
  const saveUserData = async (userCredentials) => {
    try {
      await AsyncStorage.setItem("@usercredentials", userCredentials);
      setSaveLoginInfo(JSON.parse(userCredentials));
      // setSaveLoginInfo({ email: "hey", password: "dad" });
    } catch (e) {
      alert("failed to save the data");
      alert(e);
    }
  };

  // Authentication Process Local Read
  const readUserData = async (callBack) => {
    try {
      const value = await AsyncStorage.getItem("@usercredentials");
      if (value !== null) {
        setSaveLoginInfo(JSON.parse(value));
        callBack(JSON.parse(value));
      }
    } catch (e) {
      alert("HEY I THISI S UR ERROr");
    }
  };

  // Google Sign Up Email & Password
  const googleEmailRegisterOrLogin = () => {
    fetchSignInMethodsForEmail(auth, email).then((result) => {
      if (result[0] === "password") {
        handleLogin(email, password);
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Registered with:" + user.email);
            navigation.navigate("RegisterConfirmScreen");
          })
          .catch((error) => alert(error.message));
      }
    });
  };

  const handleSignUp = () => {
    navigation.navigate("RegisterScreen");
  };

  const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
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
      <Button1
        title={"Login"}
        width={"80%"}
        onPress={() => handleLogin(email, password)}
      ></Button1>
      <Button1
        title={"Get Started"}
        width={"80%"}
        onPress={handleSignUp}
      ></Button1>
      <Button
        title={"Sign In With Google"}
        onPress={() => promptAsync()}
      ></Button>
      <Button
        title={"Delete Local Storage Google"}
        onPress={() => AsyncStorage.removeItem("@user")}
      ></Button>
      <Button title={"Get Info"} onPress={() => console.log(userInfo)}></Button>
      <Button
        title={"Get Email"}
        onPress={() => console.log(saveLoginInfo.email)}
      ></Button>
      <Button
        title={"Get Pass"}
        onPress={() => console.log(saveLoginInfo.password)}
      ></Button>
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
