import { Image, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";

const Button1 = ({
  onPress,
  title,
  buttonColor,
  textColor,
  height,
  width,
  imageSource,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button1,
        height ? { height: height } : {},
        width ? { width: width } : {},
        buttonColor ? { backgroundColor: buttonColor } : {},
      ]}
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.button1_icon} />
      ) : (
        ""
      )}
      <Text
        style={[styles.button1_text, textColor ? { color: textColor } : {}]}
      >
        {title}
      </Text>
      {imageSource ? <View style={styles.button1_fakeIcon} /> : ""}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button1: {
    elevation: 2,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    margin: SIZES.defaultMargin,
    flexDirection: "row",
    justifyContent: "center",
  },
  button1_text: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.Roboto_Mono_Bold,
    color: COLORS.black,
    alignSelf: "center",
  },
  button1_icon: {
    height: SIZES.h2 + 15,
    width: SIZES.h2 + 15,
    resizeMode: "contain",
    borderRadius: 100,
    marginRight: 10,
  },
  button1_fakeIcon: {
    height: SIZES.h2 + 15,
    width: SIZES.h2 + 15,
  },
});

export { Button1 };
