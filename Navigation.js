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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
        {/* <Stack.Screen name="TestScreen" component={TestScreen}></Stack.Screen> */}
        <Stack.Screen
          name="RegisterScreen"
          component={SignUpScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="RegisterConfirmScreen"
          component={ConfirmSignUpScreen}
        ></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      </Stack.Navigator>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={LoginScreen} />
        <Tab.Screen name="Settings" component={SignUpScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
};

export default Navigation;
