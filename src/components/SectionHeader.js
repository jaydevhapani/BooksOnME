//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CONSTANTS from "../utils/constants";

// create a component
const SectionHeader = ({ sectionTitle, onViewAllClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperStyle} />
      <Text style={styles.sectionTitleStyle}>{sectionTitle}</Text>
      <TouchableOpacity onPress={onViewAllClick} style={styles.wrapperStyle}>
        <Text style={styles.viewallStyle}>VIEW ALL</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 0,
  },
  wrapperStyle: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CONSTANTS.COLORS.PRIMARY,

    paddingHorizontal: 15,
  },
  sectionTitleStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontWeight: "300",
    color: "black",
    paddingHorizontal: "1%",
  },
  viewallStyle: {
    fontSize: 10,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.WHITE,
  },
});

//make this component available to the app
export default SectionHeader;
