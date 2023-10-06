//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import { saveUserDetails, signIn } from "../redux/actions/authActions";
import styles from "../styles/LoginScreen-styles";
import CONSTANTS from "../utils/constants";
import { navigationToScreen, ReplaceToScreen } from "../utils/utils";

// create a component
const Login = (props) => {
  const initVals = {
    email: "",
    password: "",
  };
  const [intitialValues, setInitialValues] = useState(initVals);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, showPassword] = useState(true);
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter valid email"),
    password: Yup.string()
      .required("No password provided.")
      .min(6, "Password is too short - should be 8 chars minimum."),
  });

  const doLogin = async (values) => {
    await dispatch(signIn(values.email, values.password));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoStyle}
        resizeMode="contain"
        source={require("../../assets/images/SplashLogo.png")}
      />
      {/* <View style={styles.secondaryContainer}> */}
      <View style={styles.appTitleContainer}>
        <Text style={styles.titleStyle}>Welcome to BooksOnApp</Text>
        <Text style={styles.subTitleStyle}>
          {`Enter you login information or click register \n and create your profile now`}
        </Text>
      </View>
      <Formik
        initialValues={intitialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => doLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
        }) => (
          <View>
            <Input
              placeholder="Email"
              value={values.email}
              invalid={!!errors.email}
              errorMessage={errors.email}
              onBlur={handleBlur("email")}
              onChangeText={(val) => setFieldValue("email", val.trim())}
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
            <TouchableOpacity
              onPress={() => {
                navigationToScreen(
                  CONSTANTS.SCREENLIST.FORGOT_PASSWORD_SCREEN,
                  props,
                  {}
                );
              }}
            >
              <Text style={styles.forgotPaswordStyle}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{ paddingTop: "10%" }}>
              <ButtonFilled title="Login" onPress={handleSubmit} />
              <ButtonOutlined
                title="Register"
                onPress={() => {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.REGISTER_SCREEN,
                    props,
                    {}
                  );
                }}
                customStyle={{ borderWidth: 0 }}
              />
            </View>
          </View>
        )}
      </Formik>
      {/* </View> */}
    </View>
  );
};

//make this component available to the app
export default Login;
