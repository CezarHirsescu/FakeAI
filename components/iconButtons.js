import { TouchableOpacity } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { SIZES } from "../constants"

const BackIconButton = ({ onPress, color, size }) => {
	return (
		<TouchableOpacity
			style={{ margin: SIZES.defaultMargin }}
			onPress={onPress}
		>
			<Ionicons name="arrow-back-outline" size={size} color={color} />
		</TouchableOpacity>
	)
}

export { BackIconButton }
