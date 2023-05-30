import { View, Text, Image } from "react-native"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import ConfirmSignUpScreen from "./screens/ConfirmSignUpScreen"
import NewGameScreen from "./screens/NewGameScreen"
import ChatScreen from "./screens/ChatScreen"

import LoadingScreen from "./screens/LoadingScreen"
import ProfileScreen from "./screens/ProfileScreen"

import { COLORS } from "./constants"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

function Home() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="NewGame" component={NewGameScreen}></Stack.Screen>
			<Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
		</Stack.Navigator>
	)
}

function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: COLORS.darkGray },
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Chat"
				component={ChatScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="chat" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="account" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{/* <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
        ></Stack.Screen> */}
				<Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
				<Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
				<Stack.Screen
					name="RegisterScreen"
					component={SignUpScreen}
				></Stack.Screen>
				<Stack.Screen
					name="RegisterConfirmScreen"
					component={ConfirmSignUpScreen}
				></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
