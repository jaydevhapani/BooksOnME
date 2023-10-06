//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CONSTANTS from "../utils/constants";

// create a component
const CenteredSectionHeader = ({
  sectionTitle,
  onViewAllClick,
  customLabelStyle,
  numOfLines,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperStyle} />
      <Text
        numberOfLines={numOfLines}
        style={[styles.sectionTitleStyle, customLabelStyle]}
      >
        {sectionTitle}
      </Text>
      <View onPress={onViewAllClick} style={styles.wrapperStyle} />
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
    flex: 1,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CONSTANTS.COLORS.PRIMARY,

    paddingHorizontal: 15,
  },
  sectionTitleStyle: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontWeight: "300",
    paddingHorizontal: "2%",
    color: CONSTANTS.COLORS.BLACK,
  },
  viewallStyle: {
    fontSize: 10,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.WHITE,
  },
});

//make this component available to the app
export default CenteredSectionHeader;
