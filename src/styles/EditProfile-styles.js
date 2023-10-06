//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CONSTANTS from "../utils/constants";

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
  },
  errorTextStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: 16,
    color: CONSTANTS.COLORS.RED,
    width: "85%",
    alignSelf: "center",
  },
  profileNameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: "4%",
  },
  pickerTextStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.GRAY,
    textAlign: "center",
  },
  uploadContainer: {
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    borderRadius: 15,

    borderColor: CONSTANTS.COLORS.PRIMARY,
    borderWidth: 1,
  },
  imageStyles: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 100,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    borderWidth: 1,
  },
  profileDetailContainer: {
    flexDirection: "row",
    paddingVertical: "4%",
    paddingHorizontal: "8%",
    alignItems: "center",
  },
  titleStyle: {
    alignSelf: "center",
    textAlign: "center",
    color: CONSTANTS.COLORS.GRAY,
    fontSize: 14,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
  buttonStyle: { height: 40, borderRadius: 8 },
  fontStyle: { fontSize: 14, fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR },
});

//make this component available to the app
export default styles;
