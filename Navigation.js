import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SignInScreen from "../screens/SignInScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import ConfirmSignUpScreen from "../screens/ConfirmSignUpScreen";
// import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
// import NewPasswordScreen from "../screens/NewPasswordScreen";
// import HomeScreen from "../screens/HomeScreen";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ConfirmSignUpScreen from "./screens/ConfirmSignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";

import LoadingScreen from "./screens/LoadingScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SignUpScreen} />
    </Tab.Navigator>
  );
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
  );
};

export default Navigation;
