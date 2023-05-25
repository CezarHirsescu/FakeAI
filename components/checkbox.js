import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

var initialRender = true;
const RememberMeCheckBox = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    if (initialRender === false) {
      saveRememberState(isEnabled);
    } else {
      initialRender = false;
    }
  }, [isEnabled]);

  const saveRememberState = async (isEnabled) => {
    try {
      value = isEnabled.toString();
      await AsyncStorage.setItem("@rememberstate", value);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.text}>Remember Me</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: "10%",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export { RememberMeCheckBox };
