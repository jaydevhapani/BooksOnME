//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image } from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import styles from "../styles/ForgotPasswordConfirm.styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen, showAlert } from "../utils/utils";
import { changePassword } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

// create a component
const ForgotPasswordConfirm = (props) => {
  const isLoggedIn = !!props.route.params.isLoggedIn
    ? props.route.params.isLoggedIn
    : false;
  const uuid = !!props.route.params.UUID ? props.route.params.UUID : "";
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setPassVisible] = useState("");
  const [visibleInputType, showPassword] = useState("");
  const initVals = {
    password: "",
    confirmPassword: "",
  };
  const [intitialValues, setInitialValues] = useState(initVals);

  const schema = Yup.object().shape({
    password: Yup.string()
      .required("No password provided.")
      .min(6, "Password is too short - should be 8 chars minimum."),
    confirmPassword: Yup.string()
      .required("Please enter confirm password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const PasswordChange = async (value) => {
    let res = await dispatch(
      changePassword(value.password, value.confirmPassword, uuid)
    );
    console.log(res);
    if (res == true) {
      showAlert("", "Password changed successfully");
      goBack(props, 3);
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
        validationSchema={schema}
        onSubmit={(values) => {
          PasswordChange(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Input
              placeholder="Password"
              invalid={!!errors.password}
              errorMessage={errors.password}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              secureTextEntry={visiblePassword == "PASS" ? false : true}
              onShowIcon={() => {
                setPassVisible(visiblePassword === "PASS" ? "" : "PASS");
              }}
            />
            <Input
              placeholder="Confirm Password"
              invalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              onBlur={handleBlur("confirmPassword")}
              onChangeText={handleChange("confirmPassword")}
              secureTextEntry={visiblePassword == "CONFIRM_PASS" ? false : true}
              onShowIcon={() => {
                setPassVisible(
                  visiblePassword === "CONFIRM_PASS" ? "" : "CONFIRM_PASS"
                );
              }}
            />

            <View style={{ flex: 1, justifyContent: "center" }}>
              <ButtonFilled title="Next" onPress={handleSubmit} />
              {isLoggedIn ? null : (
                <ButtonOutlined
                  title="Back"
                  onPress={() => {
                    goBack(props, 3);
                  }}
                  customStyle={{ borderWidth: 0 }}
                />
              )}
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

//make this component available to the app
export default ForgotPasswordConfirm;
