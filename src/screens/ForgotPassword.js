//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image } from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";

import Input from "../components/Input";
import styles from "../styles/ForgotPasswordScreen-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/actions/authActions";

// create a component
const ForgotPassword = (props) => {
  const isLoggedIn = !!props.route.params.isLoggedIn
    ? props.route.params.isLoggedIn
    : false;
  const initVals = {
    email: "",
  };
  const [intitialValues, setInitialValues] = useState(initVals);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter valid email"),
  });

  const sendOtp = async (value) => {
    console.log(value);
    let res = await dispatch(forgotPassword(value.email));
    console.log(res);
    if (res && !!res.code) {
      navigationToScreen(
        CONSTANTS.SCREENLIST.FORGOT_PASSWORD_OTP_SCREEN,
        props,
        { isLoggedIn, data: res }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appTitleContainer}>
        <Image
          style={styles.logoStyle}
          resizeMode="contain"
          source={require("../../assets/images/SplashLogo.png")}
        />
        <Text style={styles.titleStyle}>
          {isLoggedIn ? "Change Password" : `Forgot Password`}
        </Text>
        <Text style={styles.subTitleStyle}>
          {`Enter email address associated with your account \nand we’ll send an email with instructions to reset \nyour password`}
        </Text>
      </View>
      <Formik
        initialValues={intitialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          sendOtp(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Input
              placeholder="Email"
              value={values.email}
              invalid={!!errors.email}
              errorMessage={errors.email}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
            />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <ButtonFilled title="Next" onPress={handleSubmit} />
              <ButtonOutlined
                title="Back"
                onPress={() => {
                  goBack(props, 1);
                }}
                customStyle={{ borderWidth: 0 }}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

//make this component available to the app
export default ForgotPassword;
