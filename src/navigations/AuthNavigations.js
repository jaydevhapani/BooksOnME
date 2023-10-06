import * as React from "react";
import { Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import CONSTANTS from "../utils/constants";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import ForgotPassword from "../screens/ForgotPassword";
import PaymentGateway from "../screens/PaymentGateway";
import WelcomeScreen from "../screens/WelcomeScreen";
import ForgotPasswordOtp from "../screens/ForgotPasswordOtp";
import ForgotPasswordConfirm from "../screens/ForgotPasswordConfirm";

const Stack = createStackNavigator();

export default function AuthNavigations() {
  return (
    <Stack.Navigator
      //starting point
      initialRouteName={CONSTANTS.SCREENLIST.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.LOGIN_SCREEN}
        component={Login}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.REGISTER_SCREEN}
        component={Registration}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FORGOT_PASSWORD_OTP_SCREEN}
        component={ForgotPasswordOtp}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FORGOT_PASSWORD_CONFIRM_SCREEN}
        component={ForgotPasswordConfirm}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PAYMENT_GATEWAY_SCREEN}
        component={PaymentGateway}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.WELCOME_SCREEN}
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
}
