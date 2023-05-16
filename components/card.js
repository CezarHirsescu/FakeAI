import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";
import { Countdown } from "./countdown";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  view: {
    width: "100%",
    height: "100%",
    paddingVertical: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: FONTS.Roboto_Mono_Bold, //if you look back at where h2_semiBold is stored there are curly braces, the ... removed the curly braces by saying that it wants to go inside of it.
    fontSize: SIZES.h0,
    color: COLORS.white,
    position: "absolute",
    left: 1,
    bottom: 1,
    paddingLeft: SIZES.padding + 20,
    paddingBottom: SIZES.padding,
  },
  // image: {
  //   position: "absolute",
  //   resizeMode: "stretch",
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: SIZES.borderRadius,
  // },
  viewLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  viewRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default function Card(props) {
  const [pauseState, setPauseState] = useState(false);
  const [resetState, setResetState] = useState(false);

  useEffect(() => {
    setResetState(false);
  }, [resetState, pauseState]);

  const rightFunction = () => {
    setResetState(true);
  };

  const leftFunction = () => {
    if (pauseState === false) {
      setPauseState(true);
    } else if (pauseState === true) {
      setPauseState(false);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../../assets/images/upload1.png")}
        style={styles.image}
      ></Image> */}
      <View style={styles.view}>
        <TouchableOpacity style={styles.viewLeft} onPress={leftFunction}>
          <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewRight} onPress={rightFunction}>
          <Countdown
            timeSet={props.timeSet}
            paused={pauseState}
            reset={resetState}
          ></Countdown>
        </TouchableOpacity>
      </View>
    </View>
  );
}
