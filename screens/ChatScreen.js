import { useState, useEffect } from "react"
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	Alert,
} from "react-native"
import { Button1, TextInput1, BackIconButton } from "../components"
import { COLORS, FONTS } from "../constants"
import { useNavigation, useRoute } from "@react-navigation/native"
import { db } from "../firebase"
import { ref, set, push } from "firebase/database"
import { useList, useListVals, useObject } from "react-firebase-hooks/database"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"

function deleteRoom(roomID) {
	const route = ref(db, "rooms/" + roomID)
	set(route, null)
}

function deleteMessages(roomID) {
	const route = ref(db, "messages/" + roomID)
	set(route, null)
}

function sendMessage(roomID, uid, message) {
	const route = ref(db, "messages/" + roomID)
	const list = push(route)
	set(list, {
		uid: uid,
		message: message,
	})
}

const confirm = (onPress) => {
	Alert.alert("Leave Game", "Are you sure you want to exit this game?", [
		{ text: "Cancel" },
		{ text: "OK", onPress: onPress },
	])
}

const Message = ({ isSent, text }) => {
	return (
		<View
			style={[
				// styles.messageWrapper,
				isSent ? styles.messageWrapperSent : styles.messsageWrapperRecieved,
			]}
		>
			<Text
				style={[
					isSent ? styles.messageSent : styles.messageReceived,
					styles.message,
				]}
			>
				{text}
			</Text>
		</View>
	)
}

const ChatScreen = () => {
	const { roomID } = useRoute().params
	const [user] = useAuthState(auth)
	const [singleRoomSnapshot] = useObject(ref(db, "rooms/" + roomID))
	const [messagesSnapshot, loading, error] = useListVals(
		ref(db, "messages/" + roomID)
	)

	const navigation = useNavigation()
	
	const [newMessage, setNewMessage] = useState("")

	function exit() {
		navigation.navigate("NewGame")
		deleteRoom(roomID)
	}

	function handleButtonPress() {
		sendMessage(roomID, user.uid, newMessage)
		setNewMessage("")
	}

  // if a user disconnects or closes the app, close the screen and exit the room
  useEffect(() => {
    if (!user) {
      exit()
    }
  }, [user])

	// if one user quits game and deletes room, leave this screen
	useEffect(() => {
		if (singleRoomSnapshot && !singleRoomSnapshot.exists()) {
			alert("The other user has left the game")
			navigation.navigate("NewGame")
			deleteMessages(roomID)
		}
	}, [singleRoomSnapshot])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<BackIconButton
					onPress={() => confirm(exit)}
					size={32}
					color={COLORS.white}
				/>
			</View>
			{!loading ? (
				<FlatList
					style={styles.messageContainer}
					data={messagesSnapshot}
					renderItem={({ item }) => (
						<Message isSent={item.uid === user.uid} text={item.message} />
					)}
				/>
			) : (
				<Text>Loading...</Text>
			)}

			<View style={styles.bottomBar}>
				<TextInput1
					value={newMessage}
					setValue={setNewMessage}
					placeholder={"Type Something..."}
				/>
				<Button1 onPress={handleButtonPress} title={"Send"} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		// borderStyle: "dashed",
		// borderColor: "red",
		// borderWidth: "2px",
		flex: 1,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.darkGray,
	},
	topBar: {
		width: "100%",
	},
	messageContainer: {
		width: "100%",
		backgroundColor: "#111111",
	},
	messageWrapper: {
		// borderStyle: "dashed",
		// borderColor: "red",
		// borderWidth: "2px",
	},
	messageWrapperSent: {
		alignItems: "flex-end",
	},
	messsageWrapperRecieved: {
		alignItems: "flex-start",
	},
	message: {
		maxWidth: 250,
		fontFamily: FONTS.Roboto_Mono_Regular,
		color: "white",
		padding: 10,
		margin: 5,
		borderRadius: 10,
		overflow: "hidden", // this fixes the border radius on ios, idk why lol!
	},
	messageSent: {
		backgroundColor: "#1982FC", // imessage blue
	},
	messageReceived: {
		backgroundColor: COLORS.gray,
	},
	bottomBar: {
		paddingHorizontal: 10,
		flexDirection: "row",
	},
})

export default ChatScreen
