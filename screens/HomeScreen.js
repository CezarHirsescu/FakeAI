import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ChatScreen from "./ChatScreen"
import { COLORS } from "../constants";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>This is home.</Text> */}
      <ChatScreen />
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
});
