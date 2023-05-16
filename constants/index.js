const COLORS = {
	white: "#FFFFFF",
	black: "#000000",
	darkGray: "#333333",
	gray: "#555555",
	primary: "#9d9dac", // dark greyish blue
	secondary: "#fda801", // orange
	tertiary: "#01bbdd", // cyan
	quaternary: "#7b04cb", // purple
	quinary: "#30c899", // cyanish lighter green
	hyperlink: "#FDB075",
}

const SIZES = {
	padding: 12,
	borderRadius: 18,
	textBoxRadius: 25,
	h0: 35,
	h1: 25,
	h2: 20,
	defaultMargin: 10,
	largeMargin: 50,
}

const FONTS = {
	Roboto_Mono_Light: "Roboto_Mono_Light",
	Roboto_Mono_Regular: "Roboto_Mono_Regular",
	Roboto_Mono_Semibold: "Roboto_Mono_Semibold",
	Roboto_Mono_Bold: "Roboto_Mono_Bold",
}

const SHADOW = {
	elevation: 12,
	shadowColor: COLORS.secondary,
	shadowOffset: { width: 2, height: 12 },
	shadowRadius: 12,
}

export { COLORS, SIZES, FONTS, SHADOW }
