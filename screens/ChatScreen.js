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
import { ref, set } from "firebase/database"
import { useObject } from "react-firebase-hooks/database"


function deleteRoom(roomID) {
	const route = ref(db, "rooms/" + roomID)
	set(route, null)
}

const confirm = (onPress) => {
	Alert.alert("Leave Game", "Are you sure you want to exit this game?", [
		{ text: "Cancel" },
		{ text: "OK", onPress: onPress },
	])
}

const Message = ({ user, text }) => {
	return (
		<View
			style={[
				// styles.messageWrapper,
				user === 0 ? styles.messageWrapperSent : styles.messsageWrapperRecieved,
			]}
		>
			<Text
				style={[
					user === 0 ? styles.messageSent : styles.messageReceived,
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
	const [singleRoomSnapshot, loading, error] = useObject(
		ref(db, "rooms/", roomID)
	)

	const navigation = useNavigation()
	const [messages, setMessages] = useState([
		{ user: 0, text: "Hello there" },
		{ user: 1, text: "General Kenobi... You are a bold one." },
		{ user: 1, text: "Kill Him..." },
		{ user: 0, text: "*defeats droid enemies with ease" },
		{ user: 1, text: "Back away! I will deal with this jedi slime myself." },
		{ user: 0, text: "Your move." },
		{
			user: 1,
			text: "You fool! I've been trained in your jedi arts by count Dooku himself...",
		},
		{ user: 1, text: "Attack, Kenobi..." },
	])
	const [newMessage, setNewMessage] = useState("")

	function exit() {
    navigation.navigate("NewGame")
		deleteRoom(roomID)
	}

	// if one user quits game and deletes room, leave this screen
	useEffect(() => {
    if (singleRoomSnapshot && !singleRoomSnapshot.exists()) {
        alert("The other user has left the game")
        navigation.navigate("NewGame")
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
			<FlatList
				style={styles.messageContainer}
				data={messages}
				renderItem={({ item }) => <Message user={item.user} text={item.text} />}
			/>
			<View style={styles.bottomBar}>
				<TextInput1
					value={newMessage}
					setValue={setNewMessage}
					placeholder={"Type Something..."}
				/>
				<Button1
					onPress={() => {
						setMessages((prev) => [...prev, { user: 0, text: newMessage }])
						setNewMessage("")
					}}
					title={"Send"}
				/>
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
