//import liraries
import React, { Component, useState } from "react";
import Dropdown from "react-native-dropdown-picker";
import CONSTANTS from "../utils/constants";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import PropTypes from "prop-types";

export const DropdownPicker = ({
  data,
  value,
  setValue,
  dropdownName,
  isvalid,
  customStyle,
  placeholder,
  customPlaceHolderStyle,
  customeDropdownStyle,
  showIcon,
  arrowColor,
  arrowSize,
  customLabelStyle,
  customlistItemlabelStyle,
}) => {
  const [open, setOpen] = useState("");
  return (
    <Dropdown
      ArrowUpIconComponent={() =>
        showIcon ? (
          <Icon
            name="chevron-down"
            color={arrowColor ? arrowColor : CONSTANTS.COLORS.PRIMARY}
            size={arrowSize ? arrowSize : 28}
          />
        ) : null
      }
      ArrowDownIconComponent={() =>
        showIcon ? (
          <Icon
            name="chevron-down"
            color={arrowColor ? arrowColor : CONSTANTS.COLORS.PRIMARY}
            size={arrowSize ? arrowSize : 28}
          />
        ) : null
      }
      style={[
        {
          width: "85%",
          marginVertical: 10,
          marginBottom: "4%",
          alignSelf: "center",
          height: 65,
          borderRadius: 15,
          borderColor: CONSTANTS.COLORS.PRIMARY,
          backgroundColor: CONSTANTS.COLORS.WHITE,
          borderWidth: 1,
        },
        customStyle,
      ]}
      zIndex={4000}
      open={open == dropdownName}
      placeholder={placeholder}
      dropDownContainerStyle={[
        {
          width: "85%",
          borderWidth: 1,
          alignSelf: "center",
          backgroundColor: CONSTANTS.COLORS.WHITE,
          borderColor: CONSTANTS.COLORS.PRIMARY,
          borderTopWidth: 0,
          borderRadius: 15,
        },
        customeDropdownStyle,
      ]}
      labelStyle={[{ textAlign: "left", paddingLeft: "2%" }, customLabelStyle]}
      placeholderStyle={[
        {
          color: CONSTANTS.COLORS.TEXT_PLACEHOLDER,
          alignSelf: "center",
          textAlign: "left",
          paddingLeft: "2%",
          fontSize: 16,
        },
        customPlaceHolderStyle,
      ]}
      listItemContainerStyle={{
        height: 50,
        width: "100%",
        zIndex: 1,
        borderTopWidth: 0,
        alignItems: "center",
        borderBottomColor: CONSTANTS.COLORS.PRIMARY,
      }}
      listItemLabelStyle={[
        { width: "100%", textAlign: "center", flex: 1 },
        customlistItemlabelStyle,
      ]}
      value={value}
      showTickIcon={false}
      items={data}
      setOpen={() => {
        setOpen(open == dropdownName ? "" : dropdownName);
      }}
      setValue={setValue}
    />
  );
};

DropdownPicker.propType = {
  data: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
  dropdownName: PropTypes.string,
  isvalid: PropTypes.bool,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
  customPlaceHolderStyle: PropTypes.object,
  showIcon: PropTypes.bool,
  customeDropdownStyle: PropTypes.object,
  arrowColor: PropTypes.string,
  customLabelStyle: PropTypes.object,
  arrowSize: PropTypes.number,
  customlistItemlabelStyle: PropTypes.object,
};
//make this component available to the app
export default DropdownPicker;
