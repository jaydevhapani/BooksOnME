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
import SearchLocations from "../components/SearchLocations";

// create a component
const SearchPublicGroupsInput = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [searchByLocation, setSearchByLocation] = useState(true);
  const [disance, setDistance] = useState(0);
  const [location, setLocation] = useState({});

  const searchGroups = async () => {
    const params = {
      user_id: token?.id,
      text: text,
      groupType: "public",
      lat: location?.lat || "",
      long: location?.long || "",
    };
    const res = await dispatch(searchPrivateGroup(params));
    console.log(res);
    if (res?.length == 0) {
      Alert.alert("", "No Record Found");
    } else if (res?.length > 0) {
      navigationToScreen(CONSTANTS.SCREENLIST.GROUP_SEARCH_RESULTS, props, {
        searchType: searchType,
        actionType: "PUBLIC",
        data: res,
        text: text,
      });
    }
  };

  const searchTypeInput = () => {
    switch (searchType) {
      case "NAME":
        return (
          <View>
            <Text
              numberOfLines={2}
              style={[
                styles.bookNameStyle,
                { paddingVertical: "3%", textAlign: "center" },
              ]}
            >
              {` Enter The Public Group Name\nYou Are Looking For`}
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
              onChangeText={(txt) => setText(txt)}
              placeholder="Enter Group Name"
            />
          </View>
        );
      case "LOCATION":
        return (
          <View>
            <Text
              numberOfLines={2}
              style={[
                styles.bookNameStyle,
                { paddingVertical: "3%", textAlign: "center" },
              ]}
            >
              {` Enter The Location of Public Group\nThat You Are Looking For`}
            </Text>
            <View style={{ height: 100, zIndex: 1 }}>
              <Text style={styles.inputHeaderStyle}>Location</Text>
              <SearchLocations
                placeholder="Enter Location of Book"
                customStyles={{
                  height: 50,
                  padding: 2,
                  color: CONSTANTS.COLORS.GRAY,
                }}
                inputStyle={{
                  width: "100%",
                  textAlign: "center",
                  color: CONSTANTS.COLORS.GRAY,
                }}
                customInputStyle={{ textAlign: "center" }}
                onChangeText={(txt) => {
                  if (txt.trim().length === 0) {
                    setLocation({
                      latitude: "",
                      longitude: "",
                      address: "",
                    });
                  }
                }}
                onSelect={(data, details, lat, long) => {
                  console.log(data, details);
                  setLocation({
                    lat: lat,
                    long: long,
                    address: data.description,
                  });
                }}
              />
            </View>
            <View style={{ paddingTop: "5%", zIndex: -1 }}>
              <Text style={styles.inputHeaderStyle}>
                Radius around location
              </Text>
              <RangePicker
                enabled={searchByLocation}
                lineColor={CONSTANTS.COLORS.PRIMARY}
                startingValue={0}
                endingValue={150}
                onChangeValue={(val) => {
                  setDistance(val);
                }}
              />
            </View>
            <View style={{ paddingTop: "3%" }}>
              <CheckBox
                color={CONSTANTS.COLORS.PRIMARY}
                size={22}
                onCheck={(val) => {
                  setSearchByLocation(val);
                }}
                label={"Search Any Distance"}
              />
            </View>
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
        sectionTitle={`PUBLIC SEARCH\n GROUPS`}
      />

      <View style={{ flex: 1, paddingVertical: "5%" }}>
        <View>{searchTypeInput()}</View>
      </View>
      <ButtonFilled
        onPress={() => {
          //
          searchGroups();
        }}
        title="SEARCH"
        customStyle={{ marginBottom: "30%" }}
      />
    </View>
  );
};

//make this component available to the app
export default SearchPublicGroupsInput;
