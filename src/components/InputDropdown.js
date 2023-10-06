//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CONSTANTS from "../utils/constants";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import DropDown from "../components/DropDown";
import { wp } from "../utils/responsive";

// create a component
const InputDropdown = ({
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
  onChangeDropdownValue,
  dropdownValue,
}) => {
  return (
    <View>
      <View style={[styles.inputStyle, customStyles, { flexDirection: "row" }]}>
        <View style={{ width: wp("35%") }}>
          <DropDown
            placeholder="Select Options"
            data={
              [
                { label: "R", value: "R" },
                { label: "$", value: "$" },
                { label: "₹", value: "₹" },
                { label: "£", value: "£" },
                { label: "€", value: "€" },
              ] || []
            }
            showIcon={true}
            value={dropdownValue}
            setValue={onChangeDropdownValue}
            customStyle={styles.dropdownStyle}
            arrowColor={CONSTANTS.COLORS.PRIMARY}
            arrowSize={20}
            customPlaceHolderStyle={{
              fontSize: wp("2.5%"),
              fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
              color: CONSTANTS.COLORS.WHITE,
            }}
            
            customLabelStyle={{
              color: CONSTANTS.COLORS.BLACK,
              fontSize: wp("3.5%"),
            }}
            customeDropdownStyle={styles.customeDropdownStyle}
            customlistItemlabelStyle={styles.customlistItemlabelStyle}
          />
        </View>
        <TextInput
          autoCapitalize="none"
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          maxLength={maxChar}
          onChange={onChange}
          placeholder={placeholder}
          placeholderTextColor={CONSTANTS.COLORS.GRAY}
          underlineColor={CONSTANTS.COLORS.TRANSPARENT}
          style={[
            { flex: 1, justifyContent: "center" },
            multiline && { textAlignVertical: "top", height: 200 },
            inputCustomStyle,
            {
              width: "80%",
              textAlign: "left",
              left: -wp("5%"),
              top: -wp("1%"),
            },
          ]}
          mode="outlined"
          multiline={multiline}
          theme={{
            colors: {
              outline: CONSTANTS.COLORS.TRANSPARENT,
              primary: CONSTANTS.COLORS.TRANSPARENT,
              underlineColor: "transparent",
            },
            fonts: { regular: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR },
            roundness: radius !== undefined ? radius : 15,
          }}
          defaultValue={defaultValue}
          secureTextEntry={
            secureTextEntry == undefined ? false : secureTextEntry
          }
          keyboardType={keyboardType}
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

// define your styles
const styles = StyleSheet.create({
  inputStyle: {
    width: "85%",
    backgroundColor: CONSTANTS.COLORS.WHITE,
    marginVertical: "2%",
    borderWidth: 1,
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
  textStyle: {
    fontSize: wp("3.5%"),
    width: "100%",
    color: CONSTANTS.COLORS.WHITE,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
  dropdownStyle: {
    backgroundColor: CONSTANTS.COLORS.WHITE,
    width: wp("20%"),
    minHeight: 34,
    height: 0,
    borderRadius: 8,
    top: -8,
    left: -wp("7%"),
    borderWidth: 1,
    borderColor: CONSTANTS.COLORS.PRIMARY,
  },
  customeDropdownStyle: {
    borderWidth: 1,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    zIndex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    width: wp("20%"),
    left: wp("0.5%"),

    top: 25,
  },
  customlistItemlabelStyle: {
    paddingVertical: 2,
    // borderWidth: 1,
    // height: 25,
    justifyContent: "center",
    borderColor: CONSTANTS.COLORS.PRIMARY,
    borderRadius: 15,
    fontSize: wp("5%"),
    width: "30%",
    color: CONSTANTS.COLORS.BLACK,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
});

//make this component available to the app
export default InputDropdown;
