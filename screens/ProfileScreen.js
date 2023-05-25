import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { COLORS } from "../constants";
import { auth } from "../firebase";
import { Button1 } from "../components";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
export default function ProfileScreen() {
  const navigation = useNavigation();
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.navigate("LoginScreen");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
      <Text style={styles.text}>UID: {auth.currentUser.uid}</Text>
      <Button1 title={"Sign Out"} onPress={() => handleLogout()}></Button1>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "white",
  },
});
