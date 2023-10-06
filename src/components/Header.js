//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CONSTANTS from "../utils/constants";
import PropTypes from "prop-types";

// create a component
const Header = ({
  leftChildren,
  rightChildren,
  renderTitle,
  customStyle,
  showHeaderLeft,
  onPressBack,
}) => {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.leftContainer}>
        {showHeaderLeft && (
          <TouchableOpacity onPress={onPressBack}>
            <Icon
              name="ios-chevron-back-outline"
              color={CONSTANTS.COLORS.PRIMARY}
              size={40}
            />
          </TouchableOpacity>
        )}
        {leftChildren}
      </View>
      <View style={styles.titleStyle}>
        <Image
          style={{ width: 180, height: 24 }}
          resizeMode="contain"
          source={require("../../assets/images/SplashLogo.png")}
        />
      </View>
      <View style={styles.rightContainer}>{rightChildren}</View>
    </View>
  );
};

Header.proptypes = {
  leftChildren: PropTypes.element,
  rightChildren: PropTypes.element,
  renderTitle: PropTypes.element,
  showHeaderLeft: PropTypes.bool,
  onPressBack: PropTypes.func,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: CONSTANTS.COLORS.WHITE,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

//make this component available to the app
export default Header;
