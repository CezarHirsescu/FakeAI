import { TouchableOpacity } from "react-native"
import { Text, View, StyleSheet } from "react-native"
import { SIZES, COLORS, FONTS } from "../constants"

const Button1 = ({
	onPress,
	title,
	buttonColor,
	textColor,
	height,
	width,
	fontSize,
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
			<Text
				style={[
					styles.button1_text,
					textColor ? { color: textColor } : {},
					fontSize ? { fontSize: fontSize } : {},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button1: {
		elevation: 2,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: SIZES.padding,
		margin: SIZES.defaultMargin,
    justifyContent: "center",
	},
	button1_text: {
		fontSize: SIZES.h2,
		fontFamily: FONTS.Roboto_Mono_Bold,
		color: COLORS.black,
		alignSelf: "center",
	},
})

export { Button1 }
