//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CONSTANTS from "../utils/constants";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";

// create a component
const Input = ({
  editable,
  maxChar,
  invalid,
  onChange,
  onBlur,
  onSubmitEditing,
  onChangeText,
  value,
  defaultValue,
  secureTextEntry,
  keyboardType,
  customStyles,
  placeholder,
  onShowIcon,
  radius,
  multiline,
  errorMessage,
  inputCustomStyle,
}) => {
  return (
    <View>
      <View style={[styles.inputStyle, customStyles]}>
        <TextInput
          autoCapitalize="none"
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          maxLength={maxChar}
          keyboardType={keyboardType}
          onChange={onChange}
          placeholder={placeholder}
          placeholderTextColor={CONSTANTS.COLORS.GRAY}
          underlineColor={CONSTANTS.COLORS.TRANSPARENT}
          style={[
            { flex: 1, justifyContent: "center", color: "black" },
            multiline && { textAlignVertical: "top", height: 200 },
            inputCustomStyle,
          ]}
          mode="outlined"
          multiline={multiline}
          theme={{
            colors: {
              outline: CONSTANTS.COLORS.PRIMARY,
              primary: CONSTANTS.COLORS.PRIMARY,
              text: CONSTANTS.COLORS.BLACK,
              underlineColor: "transparent",
            },
            fonts: { regular: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR },
            roundness: radius !== undefined ? radius : 15,
          }}
          defaultValue={defaultValue}
          secureTextEntry={
            secureTextEntry == undefined ? false : secureTextEntry
          }
          right={
            secureTextEntry !== undefined && (
              <TextInput.Icon
                onPress={onShowIcon}
                name={secureTextEntry ? "eye-off" : "eye"}
                iconColor={CONSTANTS.COLORS.PRIMARY}
                style={{ bottom: 0 }}
              />
            )
          }
        />
      </View>
      {invalid && <Text style={styles.errorTextStyle}>{errorMessage}</Text>}
    </View>
  );
};

Input.proptypes = {
  editable: PropTypes.bool,
  maxChar: PropTypes.number,
  invalid: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  customStyles: PropTypes.object,
  placeholder: PropTypes.string,
  onShowIcon: PropTypes.func,
  multiline: PropTypes.bool,
  errorMessage: PropTypes.string,
};

// define your styles
const styles = StyleSheet.create({
  inputStyle: {
    width: "85%",
    backgroundColor: CONSTANTS.COLORS.WHITE,
    marginVertical: "2%",
    height: 65,
    justifyContent: "center",
    alignSelf: "center",
    borderColor: CONSTANTS.COLORS.PRIMARY,
  },
  errorTextStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: 16,
    color: CONSTANTS.COLORS.RED,
    width: "85%",
    alignSelf: "center",
  },
});

//make this component available to the app
export default Input;
