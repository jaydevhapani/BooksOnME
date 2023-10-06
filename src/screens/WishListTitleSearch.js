//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { goBack, navigationToScreen } from "../utils/utils";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Input from "../components/Input";
import CONSTANTS from "../utils/constants";
import RangePicker from "../components/RangePicker";
import CheckBox from "../components/CheckBox";
import ButtonFilled from "../components/ButtonFilled";
import Dropdown from "../components/DropDown";
import styles from "../styles/WishListTitleSearch-styles";

// create a component
const WishListTitleSearch = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";

  const [searchByLocation, setSearchByLocation] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const searchTypeInput = () => {
    switch (searchType) {
      case "TITLE":
        return (
          <View>
            <Text
              numberOfLines={1}
              style={[
                styles.bookNameStyle,
                { paddingVertical: "3%", textAlign: "center" },
              ]}
            >
              Book Title
            </Text>
            <Input
              radius={8}
              customStyles={{
                height: 40,
                borderRadius: 10,
                fontSize: 12,
                textAlign: "center",
              }}
              onChangeText={setSearchValue}
              placeholder="Enter Book Title"
            />
          </View>
        );
      case "AUTHOR":
        return (
          <View>
            <Text
              numberOfLines={1}
              style={[
                styles.bookNameStyle,
                { paddingVertical: "3%", textAlign: "center" },
              ]}
            >
              Book Author
            </Text>
            <Input
              radius={8}
              customStyles={{
                height: 40,
                borderRadius: 10,
                fontSize: 12,
                textAlign: "center",
              }}
              onChangeText={setSearchValue}
              placeholder="Enter Author Name"
            />
          </View>
        );

      default:
        break;
    }
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
        sectionTitle={`WISH SEARCH`}
      />

      <View style={{ flex: 1, paddingVertical: "5%" }}>
        <View>{searchTypeInput()}</View>
      </View>
      <ButtonFilled
        onPress={() => {
          if (searchValue.trim().length > 0) {
            navigationToScreen(
              CONSTANTS.SCREENLIST.WISH_LIST_SEARCH_RESULTS,
              props,
              {
                searchType: searchType,
                searchValue: searchValue,
              }
            );
          }
        }}
        title="SEARCH"
        customStyle={{ marginBottom: "30%" }}
      />
    </View>
  );
};

//make this component available to the app
export default WishListTitleSearch;
