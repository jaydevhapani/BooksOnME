//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image } from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import VirtualKeyboard from "../components/VirtualKeyboard/VirtualKeyboard";
import Input from "../components/Input";
import styles from "../styles/ForgotPasswordOtpScreen-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen, showAlert } from "../utils/utils";

// create a component
const ForgotPasswordOtp = (props) => {
  const isLoggedIn = !!props.route.params.isLoggedIn
    ? props.route.params.isLoggedIn
    : false;
  const data = !!props.route.params.data ? props.route.params.data : {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, showPassword] = useState(true);
  const [otp, setOtp] = useState("");

  const confirmOtp = async () => {
    try {
      if (otp.length > 0 && parseInt(otp) === data.code) {
        navigationToScreen(
          CONSTANTS.SCREENLIST.FORGOT_PASSWORD_CONFIRM_SCREEN,
          props,
          { isLoggedIn, UUID: data.UUID }
        );
      } else {
        showAlert("Failed", "Invalid OTP. Enter valid otp");
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.appTitleContainer}>
        <Image
          style={styles.logoStyle}
          resizeMode="contain"
          source={require("../../assets/images/SplashLogo.png")}
        />
        <Text style={styles.subTitleStyle}>
          {`Type the verification code \nwe’ve emailed you`}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Text style={styles.otpStyle}>{otp}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ paddingVertical: 20 }}>
          <VirtualKeyboard
            color="black"
            pressMode="string"
            onPress={(val) => setOtp(val)}
          />
        </View>
        <ButtonFilled
          title="Next"
          onPress={() => {
            confirmOtp();
          }}
        />
        <ButtonOutlined
          title="Back"
          onPress={() => {
            goBack(props, 1);
          }}
          customStyle={{ borderWidth: 0 }}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default ForgotPasswordOtp;
