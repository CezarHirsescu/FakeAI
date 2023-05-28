import { StyleSheet, View, Animated } from "react-native"
import { useRef, useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import LottieView from "lottie-react-native"
import { COLORS, FONTS, SIZES } from "../constants"
import { Button1 } from "../components"


export default function HomeScreen() {
  const navigation = useNavigation()

	const [animationCompleted, setAnimationCompleted] = useState(false)

	const buttonTranslateY = useRef(new Animated.Value(0)).current
	const firstTextTranslateY = Animated.multiply(-1, buttonTranslateY)
	const secondTextTranslateY = useRef(new Animated.Value(-450)).current
	const dotContainerTranslateY = Animated.multiply(-1, secondTextTranslateY)

	const lottieRef = useRef(null)

	const joinGame = () => {
    setTimeout(() => {
      navigation.navigate("Chat")
      setAnimationCompleted(false)
      // reset values
      buttonTranslateY.setValue(0)
      secondTextTranslateY.setValue(-450)
    }, 3000)  // simulate loading time
  }


	useEffect(() => {
		if (lottieRef.current && animationCompleted) {
			setTimeout(() => {
				lottieRef.current.reset()
				lottieRef.current.play()
			}, 100)
		}
	}, [animationCompleted])

	const loadingAnimation = () => {
    Animated.timing(buttonTranslateY, {
      toValue: 450,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
			if (finished) {
				setAnimationCompleted(true)

        Animated.timing(secondTextTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start()
			}
		})
	}

	const handleButtonPress = () => {
		loadingAnimation()
    joinGame()
	}

	return animationCompleted ? (
		<View style={{ ...styles.container, gap: 20 }}>
			<Animated.Text
				style={{
					...styles.text,
					transform: [{ translateY: secondTextTranslateY }],
				}}
			>
				Looking for Human or AI
			</Animated.Text>

			<Animated.View
				style={{
					...styles.loadingDotsContainer,
					transform: [{ translateY: dotContainerTranslateY }],
				}}
			>
				<LottieView
					source={require("../assets/lottiefiles/loading.json")}
					ref={lottieRef}
					style={{ height: 75, width: "auto" }}
					colorFilters={[
						{
							keypath: "Layer 3",
							color: COLORS.white,
						},
						{
							keypath: "Layer 2",
							color: COLORS.white,
						},
						{
							keypath: "Layer 1",
							color: COLORS.white,
						},
					]}
				/>
			</Animated.View>
		</View>
	) : (
		<View style={styles.container}>
			<Animated.Text
				style={{
					...styles.text,
					transform: [{ translateY: firstTextTranslateY }],
				}}
			>
				Looking For a Game...?
			</Animated.Text>
			<Animated.View
				style={{
					width: "100%",
					transform: [{ translateY: buttonTranslateY }],
				}}
			>
				<Button1
					onPress={handleButtonPress}
					title={"Play"}
					buttonColor={COLORS.quinary}
					textColor={COLORS.white}
					fontSize={SIZES.h0}
				/>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.darkGray,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	loadingDots: {
		width: 12,
		height: 12,
		backgroundColor: COLORS.white,
		borderRadius: 12,
	},
	loadingDotsContainer: {
		gap: 10,
		flexDirection: "row",
	},
	text: {
		color: COLORS.white,
		fontFamily: FONTS.Roboto_Mono_Bold,
		fontSize: SIZES.h1,
	},
})
