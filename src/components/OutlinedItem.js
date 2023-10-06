//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import CONSTANTS from "../utils/constants";
import PropTypes from "prop-types";

// create a component
const OutlinedItem = ({ title, onPress, selected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.selectorStyle,
        selected && { backgroundColor: CONSTANTS.COLORS.PRIMARY },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textStyle,
          selected && { color: CONSTANTS.COLORS.WHITE },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

OutlinedItem.proptypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

// define your styles
const styles = StyleSheet.create({
  selectorStyle: {
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 6,
    padding: 5,
    margin: 5,
    borderColor: CONSTANTS.COLORS.PRIMARY,
  },
  textStyle: {
    fontWeight: "400",
    textAlign: "justify",
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 14,
  },
});

//make this component available to the app
export default OutlinedItem;
