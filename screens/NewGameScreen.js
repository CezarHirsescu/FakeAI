import { StyleSheet, View, Animated, Text } from "react-native"
import { useRef, useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import LottieView from "lottie-react-native"
import { COLORS, FONTS, SIZES } from "../constants"
import { Button1 } from "../components"
import { set, ref, push } from "firebase/database"
import { auth, db } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useList } from "react-firebase-hooks/database"

/*
structure of data: 
{
  rooms: [
    chatid1: {
      uid1: cezarhrisescu
      uid2: randomuser
      isReady: true
    },
    chatid2: {
      uid1: rudradey
      uid2: null
      isReady: false
    },
    ...
  ],
  messages: [
    chatid1: [
      {user: 1, text: Hello there!},
      {user: 0, text: Hi!},
      ...
    ],
    ...
  ]
}

*/

function createRoom(uid1) {
	const route = ref(db, "rooms")
	const list = push(route)
	set(list, {
		uid1: uid1,
		isReady: false,
	})

	return list.key
}

function addSecondPlayer(roomID, uid1, uid2) {
	const route = ref(db, "rooms/" + roomID)
	set(route, {
		uid1: uid1,
		uid2: uid2,
		isReady: true,
	})
}

export default function NewGameScreen() {
	const [user] = useAuthState(auth)
	const [roomSnapshot, loading, error] = useList(ref(db, "rooms"))
	const roomID = useRef(null)

	const navigation = useNavigation()

	const [animationCompleted, setAnimationCompleted] = useState(false)

	const buttonTranslateY = useRef(new Animated.Value(0)).current
	const firstTextTranslateY = Animated.multiply(-1, buttonTranslateY)
	const secondTextTranslateY = useRef(new Animated.Value(-450)).current
	const dotContainerTranslateY = Animated.multiply(-1, secondTextTranslateY)

	const lottieRef = useRef(null)

  // searches through all rooms and joins if room is not ready
  // if all rooms are full then creates a new room
	function joinGame() {
		let foundGame = false

		roomSnapshot.forEach((value) => {
			if (!value.val().isReady) {
				addSecondPlayer(value.key, value.val().uid1, user.uid)
				roomID.current = value.key
				foundGame = true
				return
			}
		})

		if (!foundGame) {
			roomID.current = createRoom(user.uid)
		}
	}

	// navigate to ChatScreen when our room is ready
	useEffect(() => {
		const room = roomSnapshot.find((value) => value.key === roomID.current)

		// if a room is created and the room has both players
		if (room && room.val().isReady) {
      // create chat instance in database

      // navigate to chat screen when game is found
			navigation.navigate("Chat", {
				roomID: roomID.current,
			}) 

			// reset animation values
			setAnimationCompleted(false)
			buttonTranslateY.setValue(0)
			secondTextTranslateY.setValue(-450)
		}
	}, [roomSnapshot])

	// for animation purposes
	useEffect(() => {
		if (lottieRef.current && animationCompleted) {
			setTimeout(() => {
				lottieRef.current.reset()
				lottieRef.current.play()
			}, 100)
		}
	}, [animationCompleted])

	function loadingAnimation() {
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

	const handleNewGamePress = () => {
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
					onPress={handleNewGamePress}
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
