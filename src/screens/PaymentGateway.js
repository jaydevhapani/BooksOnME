//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "../redux/actions/authActions";
import { subscribe, unsubscribe } from "../redux/actions/commonActions";
import { goBack } from "../utils/utils";

// create a component
const PaymentGateway = (props) => {
  const type = props?.route?.params?.type || "";
  const token = useSelector((state) => state.authReducer.token);

  const dispatch = useDispatch();
  const onNavigationStateChange = async (state) => {
    try {
      console.log(state);
      console.log(state.url);
      // if (state.url.includes("ozow-success")) {
      //   checkpayment(state.url);
      //   setTransaction("");
      //   setLoading(true);
      // } else if (state.url.includes("ozow-success")) {
      //   checkpayment(state.url);
      //   setTransaction("");
      //   setLoading(true);
      // } else if (state.url.includes("ozow-cancel")) {
      //   checkpayment(state.url);
      //   setTransaction("");
      //   setLoading(true);
      // } else
      if (type === "sub") {
        if (state?.url?.includes("cancel")) {
          setTimeout(() => {
            alert("Transaction Cancelled.");
            goBack(props, 1);
          }, 1000);
        }
        if (state?.url?.includes("success")) {
          // setTimeout(() => {
          alert("Payment Successfull.");
          const res = await dispatch(subscribe(token?.id));
          if (res) {
            let user = token;
            user.paid = "1";
            dispatch(saveToken(user));
            goBack(props, 1);
          }
          // goBack(props, 1);
          // }, 1000);
        }
      } else {
        if (!state.navigationType && state.url.includes("post_peach_payment")) {
          setTimeout(() => {
            alert("Registration SuccessFul.");
            goBack(props, 2);
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {props?.route?.params?.url && (
        <WebView
          source={{ uri: props?.route?.params?.url }}
          style={{ flex: 1 }}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1, maximum-scale=1, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          // scalesPageToFit={false}
          onMessage={(text) => {
            console.log(text);
          }}
          onNavigationStateChange={onNavigationStateChange}
        />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default PaymentGateway;
