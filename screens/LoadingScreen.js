import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";

export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    this.checkIfLoggedIn();
  });

  checkIfLoggedIn = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Tabs");
      } else {
        navigation.navigate("LoginScreen");
      }
    });
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
