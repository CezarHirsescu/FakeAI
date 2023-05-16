import { Text, View, StyleSheet, TextInput } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";

const TextInput1 = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  height,
  width,
}) => {
  return (
    <View
      style={[
        styles.textinput1,
        height ? { height: height } : {},
        width ? { width: width } : {},
      ]}
    >
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.textinput1_text}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  textinput1: {
    elevation: 2,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 10,
    margin: SIZES.defaultMargin,
    width: "80%",
  },
  textinput1_text: {
    fontSize: 20,
    color: COLORS.black,
    fontFamily: FONTS.Roboto_Mono_Light,
    paddingLeft: SIZES.padding,
  },
});

export { TextInput1 };
