//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import { goBack, navigationToScreen } from "../utils/utils";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Input from "../components/Input";
import CONSTANTS from "../utils/constants";
import RangePicker from "../components/RangePicker";
import CheckBox from "../components/CheckBox";
import ButtonFilled from "../components/ButtonFilled";
import Dropdown from "../components/DropDown";
import styles from "../styles/SearchPublicGroupsInput-styles";
import { useDispatch, useSelector } from "react-redux";
import { searchPrivateGroup } from "../redux/actions/chatActions";

// create a component
const SearchPrivateGroupsInput = (props) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  const searchGroups = async () => {
    const params = {
      user_id: token?.id,
      text: text,
      groupType: "private",
    };
    const res = await dispatch(searchPrivateGroup(params));
    console.log(res);
    if (res?.length == 0) {
      Alert.alert("", "No Record Found");
    } else if (res?.length > 0) {
      navigationToScreen(CONSTANTS.SCREENLIST.GROUP_SEARCH_RESULTS, props, {
        actionType: "PRIVATE",
        data: res,
        text: text,
      });
    }
  };

  const searchTypeInput = () => {
    return (
      <View>
        <Text
          numberOfLines={2}
          style={[
            styles.bookNameStyle,
            { paddingVertical: "3%", textAlign: "center" },
          ]}
        >
          {`Enter Group name`}
        </Text>
        <Input
          radius={8}
          defaultValue={text}
          customStyles={{
            height: 40,
            borderRadius: 10,
            fontSize: 12,
            textAlign: "center",
          }}
          onChangeText={(txt) => {
            setText(txt);
          }}
          placeholder="Enter Group Name"
        />
        <ButtonFilled
          onPress={() => {
            searchGroups();
          }}
          title="SEARCH"
          customStyle={{
            marginBottom: "30%",
            height: 40,
            width: "85%",
            borderRadius: 10,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader
        customLabelStyle={{ paddingHorizontal: "10%" }}
        sectionTitle={`PRIVATE SEARCH\n GROUPS`}
      />

      <View style={{ flex: 1, paddingVertical: "5%" }}>
        <View>{searchTypeInput()}</View>
      </View>
    </View>
  );
};

//make this component available to the app
export default SearchPrivateGroupsInput;
