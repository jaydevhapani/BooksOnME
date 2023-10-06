//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CONSTANTS from "../utils/constants";
import Icon from "react-native-vector-icons/Feather";

// create a component
const SearchBar = ({ placeHolder, onChangeText, onSubmitEditing }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color={CONSTANTS.COLORS.PRIMARY} />
      <TextInput
        style={styles.inputStyle}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    height: 42,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    paddingHorizontal: "6%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    paddingLeft: "4%",
    fontSize: 14,
    color: "black",
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
});

//make this component available to the app
export default SearchBar;
