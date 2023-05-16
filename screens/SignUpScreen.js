import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import { Button1, TextInput1 } from "../components";
import { COLORS, SIZES, FONTS } from "../constants";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      signOut(auth)
        .then(() => {})
        .catch((error) => {
          console.error;
        });
    }
  });
  const confirmedPassword = (password, passwordRepeat) => {
    if (password == passwordRepeat) {
      return password;
    } else {
      return console.warn("Your passwords do not match");
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(
      auth,
      email,
      confirmedPassword(password, passwordRepeat)
    )
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:" + user.email);
        navigation.navigate("RegisterConfirmScreen");
      })
      .catch((error) => alert(error.message));
  };

  const onSignInPressed = () => {
    navigation.navigate("LoginScreen");
  };

  const onTermsOfUsePressed = () => {
    console.warn("Terms of Use Pressed");
  };

  const onPrivacyPolicyPressed = () => {
    console.warn("Privacy Policy Pressed");
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Create an account</Text>
      <TextInput1 placeholder={"Email"} value={email} setValue={setEmail} />
      <TextInput1
        placeholder={"Password"}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <TextInput1
        placeholder={"Repeat Password"}
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry={true}
      />
      <Button1 title="Register" onPress={handleSignUp} width={"80%"} />
      <Text style={styles.text}>
        By registering, you confirm that you accept our{" "}
        <Text style={styles.text_link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{" "}
        and{" "}
        <Text style={styles.text_link} onPress={onPrivacyPolicyPressed}>
          Privacy Policy
        </Text>
      </Text>
      <Button1
        title={"Back To Sign In"}
        onPress={onSignInPressed}
        width={"80%"}
      />
    </ScrollView>
  );
};

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
  title: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.Roboto_Mono_Bold,
    color: COLORS.white,
  },
  text: {
    color: COLORS.white,
    width: "80%",
  },
  text_link: {
    color: COLORS.hyperlink,
  },
});

export default SignUpScreen;
