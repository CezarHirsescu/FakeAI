import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { SIZES, FONTS, COLORS, SHADOW } from "../constants";

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.Roboto_Mono_Bold, //if you look back at where h2_semiBold is stored there are curly braces, the ... removed the curly braces by saying that it wants to go inside of it.
    fontSize: SIZES.h0 + 20,
    color: COLORS.white,
  },
});

const Countdown = (props) => {
  const [remainingTime, setRemainingTime] = useState(props.timeSet);
  var remainingMinutes;
  var remainingSeconds;

  useEffect(() => {
    {
      if (props.reset === true) {
        setRemainingTime(props.timeSet);
      } else if (props.paused === false) {
        const intervalId = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      } else if (props.paused === true) {
        setRemainingTime(remainingTime);
        return () => null;
      }
    }
  }, [props.paused, props.reset]);

  remainingMinutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");

  remainingSeconds = Math.floor(remainingTime % 60)
    .toString()
    .padStart(2, "0");

  const CountDownDisplay = () => {
    if (remainingTime < 0) {
      return <Text style={styles.text}>Timer's Up!</Text>;
    } else {
      return (
        <Text style={styles.text}>
          {remainingMinutes}:{remainingSeconds}
        </Text>
      );
    }
  };

  return (
    <View>
      <CountDownDisplay />
    </View>
  );
};

export { Countdown };
