//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CheckedIcon } from "../../assets";
import PropTypes from "prop-types";
import CONSTANTS from "../utils/constants";

const CheckBox = ({ size, color, labelColor, label, onCheck }) => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setChecked(true);
  }, []);

  const stateSwitcher = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    onCheck(checked);
  }, [checked]);

  return (
    <TouchableOpacity onPress={stateSwitcher} style={{ paddingHorizontal: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setChecked(!checked);
          }}
          style={{
            padding: 5,
            width: size + 10,
            height: size + 10,
            borderWidth: 2,
            borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            borderColor: CONSTANTS.COLORS.PRIMARY,
            backgroundColor: CONSTANTS.COLORS.WHITE,
          }}
        >
          {!checked ? (
            <Image
              style={{ width: size, height: size }}
              source={require("../../assets/images/CheckedIcon.png")}
            />
          ) : (
            <View style={styles.uncheckedCheckbox} />
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.checkboxLabel,
            { color: labelColor || CONSTANTS.COLORS.PRIMARY },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CheckBox.proptypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  label: PropTypes.string,
};

const styles = StyleSheet.create({
  CheckboxContainer: {
    flex: 1,
    padding: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 25 : 0,
  },
  showSelectedButton: {
    padding: 20,
    marginTop: 25,
    alignSelf: "stretch",
    backgroundColor: "#5D52FF",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    alignSelf: "stretch",
  },
  selectedUI: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxTickImg: {
    width: "85%",
    height: "85%",
    tintColor: "#ffffff",
    resizeMode: "contain",
  },
  uncheckedCheckbox: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  checkboxLabel: {
    fontSize: 15,
    paddingLeft: 15,
    color: CONSTANTS.COLORS.PRIMARY,
  },
});

export default CheckBox;
