//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import { Formik } from "formik";
import Input from "../components/Input";
import styles from "../styles/RegistrationScreen-styles";
import CONSTANTS from "../utils/constants";
import * as Yup from "yup";
import { goBack, navigationToScreen } from "../utils/utils";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/actions/authActions";
import Geolocation from "@react-native-community/geolocation";
import ScreenList from "../utils/constants";

// create a component
const Registration = (props) => {
  const initVals = {
    email: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [intitialValues, setInitialValues] = useState(initVals);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, showPassword] = useState(true);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string()
      .required("Please enter confirm password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });
  const dispatch = useDispatch();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const register = async (value) => {
    try {
      Geolocation.getCurrentPosition(async (info) => {
        const body = value;
        body.lat = info.coords.latitude;
        body.long = info.coords.longitude;
        const res = await dispatch(signUp(value));
        console.log(res);
        if (res) {
          if (Platform.OS == "android") {
            navigationToScreen(
              CONSTANTS.SCREENLIST.PAYMENT_GATEWAY_SCREEN,
              props,
              { url: res }
            );
          } else {
            goBack(props, 1);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingTop: "15%" }}>
        <Image
          style={styles.logoStyle}
          resizeMode="contain"
          source={require("../../assets/images/SplashLogo.png")}
        />

        <Formik
          initialValues={intitialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => register(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => (
            <View>
              <Input
                placeholder="First Name"
                onBlur={handleBlur("firstName")}
                onChangeText={handleChange("firstName")}
                value={values.firstName}
                invalid={!!errors.firstName}
                errorMessage={errors.firstName}
              />
              <Input
                placeholder="Last Name"
                value={values.lastName}
                onBlur={handleBlur("lastName")}
                onChangeText={handleChange("lastName")}
                invalid={!!errors.lastName}
                errorMessage={errors.lastName}
              />

              <Input
                placeholder="Email Address"
                value={values.email}
                invalid={!!errors.email}
                errorMessage={errors.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />
              <Input
                placeholder="Password"
                invalid={!!errors.password}
                errorMessage={errors.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                secureTextEntry={visiblePassword}
                onShowIcon={() => {
                  showPassword(!visiblePassword);
                }}
              />
              <Input
                placeholder="Confirm Password"
                invalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
                secureTextEntry={visiblePassword}
                onShowIcon={() => {
                  showPassword(!visiblePassword);
                }}
              />

              <View style={{ paddingTop: "4%" }}>
                <ButtonFilled
                  title="Next"
                  // onPress={() => {
                  //   navigationToScreen(
                  //     CONSTANTS.SCREENLIST.WELCOME_SCREEN,
                  //     props,
                  //     {}
                  //   );
                  // }}
                  onPress={handleSubmit}
                />
                <ButtonOutlined
                  title="Login"
                  onPress={() => goBack(props, 1)}
                  customStyle={{ borderWidth: 0 }}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default Registration;
