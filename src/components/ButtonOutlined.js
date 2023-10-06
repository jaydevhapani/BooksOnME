//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import CONSTANTS from "../utils/constants";

// create a component
const ButtonOutlined = ({ title, onPress, customStyle, customTitleStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, customStyle]}>
      <Text style={[styles.title, customTitleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

ButtonOutlined.proptypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  customStyle: PropTypes.object,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 65,
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: "2%",
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: CONSTANTS.COLORS.WHITE,
    borderColor: CONSTANTS.COLORS.PRIMARY,
  },
  title: {
    fontSize: 14,
    color: CONSTANTS.COLORS.PRIMARY,
  },
});

//make this component available to the app
export default ButtonOutlined;
