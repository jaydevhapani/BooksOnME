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
  profileNameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: "4%",
  },
  imageStyles: {
    width: 115,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 115,
    // marginTop: 10,
    borderRadius: 100,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    borderWidth: 1,
  },
  profileDetailContainer: {
    flexDirection: "row",
    padding: "2%",
    paddingHorizontal: "8%",
    alignItems: "center",
  },
  titleStyle: {
    textAlign: "center",
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 16,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
  buttonStyle: { height: 40, borderRadius: 8 },
  fontStyle: { fontSize: 14, fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR },
});

//make this component available to the app
export default styles;
