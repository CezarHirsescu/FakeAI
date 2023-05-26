import {
	StyleSheet,
	Text,
	View,
	Animated,
	ActivityIndicator,
	Easing,
} from "react-native"
import { useRef, useState, useEffect } from "react"
import LottieView from "lottie-react-native"
import { COLORS, FONTS, SIZES } from "../constants"
import { Button1 } from "../components"

export default function HomeScreen() {
	const [queued, setQueued] = useState(false)
	const [animationCompleted, setAnimationCompleted] = useState(false)

	const buttonTranslateY = useRef(new Animated.Value(0)).current
	const firstTextTranslateY = useRef(new Animated.Value(0)).current
	const secondTextTranslateY = useRef(new Animated.Value(-450)).current
	const dotContainerTranslateY = Animated.multiply(-1, secondTextTranslateY)

	const lottieRef = useRef(null)

	useEffect(() => {
		if (lottieRef.current) {
			setTimeout(() => {
				lottieRef.current.reset()
				lottieRef.current.play()
			}, 100)
		}
	}, [animationCompleted])

	const loadingAnimation = () => {
		Animated.parallel([
			Animated.timing(firstTextTranslateY, {
				toValue: -450,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.timing(buttonTranslateY, {
				toValue: 450,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start(({ finished }) => {
			if (finished) {
				setAnimationCompleted(true)
				Animated.parallel([
					Animated.timing(secondTextTranslateY, {
						toValue: 0,
						duration: 500,
						useNativeDriver: true,
					}),
				]).start()
			}
		})
	}

	const handleButtonPress = () => {
		setQueued(true)
		loadingAnimation()
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
					ref={lottieRef}
					style={{ height: 75 }}
					loop={true}
					source={require("../assets/lottiefiles/loading.json")}
					renderMode={"SOFTWARE"}
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
