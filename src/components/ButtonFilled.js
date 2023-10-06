//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import CONSTANTS from "../utils/constants";

// create a component
const ButtonFilled = ({
  title,
  onPress,
  customStyle,
  customFontStyle,
  mode,
  disabled,
  icon,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        customStyle,
        mode == "OUTLINED" && {
          backgroundColor: CONSTANTS.COLORS.WHITE,
          borderWidth: 1,
          borderColor: CONSTANTS.COLORS.PRIMARY,
        },
        disabled && { backgroundColor: CONSTANTS.COLORS.GRAY },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {icon && icon()}
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              customFontStyle,
              mode === "OUTLINED" && { color: CONSTANTS.COLORS.PRIMARY },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

ButtonFilled.proptypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  customStyle: PropTypes.object,
  mode: PropTypes.string,
  disabled: PropTypes.bool,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 65,
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: "2%",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: CONSTANTS.COLORS.PRIMARY,
  },
  title: {
    fontSize: 16,
    width: "80%",
    textAlign: "center",
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.WHITE,
  },
});

//make this component available to the app
export default ButtonFilled;
