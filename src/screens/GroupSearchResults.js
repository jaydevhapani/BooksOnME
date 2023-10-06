//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import { joinGroup } from "../redux/actions/chatActions";
import styles from "../styles/GroupsSearchResults-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const GroupSearchResults = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const actionType = !!props.route.params.actionType
    ? props.route.params.actionType
    : "";
  const text = !!props.route.params.text ? props.route.params.text : "";
  const token = useSelector((state) => state.authReducer.token);
  const data = !!props.route.params.data ? props.route.params.data : [];
  console.log(props, data);
  const dispatch = useDispatch();

  const renderHeader = () => {
    switch (actionType) {
      case "PUBLIC":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`PUBLIC GROUP\n SEARCH`}
          />
        );
      case "PRIVATE":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`PRIVATE GROUP\n SEARCH`}
          />
        );

      default:
        break;
    }
  };

  const GroupJoin = async (group, type, id) => {
    const params = {
      user_id: token?.id,
      group_id: id,
      group_type: group,
    };
    const res = await dispatch(joinGroup(params));
    if (res) {
      goBack(props, 1);
    }
  };

  const renderItem = ({ item, index }) => {
    const userNameStyle = { color: CONSTANTS.COLORS.PRIMARY };
    const titleStyle = {
      fontSize: 15,
      color: "black",
      textAlign: "center",
      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    };
    return (
      <View
        style={{
          marginBottom: "5%",
          padding: "4%",
          borderRadius: 8,
          width: "95%",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: CONSTANTS.COLORS.PRIMARY,
        }}
      >
        <View>
          <Text style={[titleStyle]}>{item.group_name}</Text>
          <Text numberOfLines={1} style={[titleStyle]}>
            {item.group_location}
          </Text>
        </View>
        <View style={{ paddingTop: "2%" }}>
          <Text style={[titleStyle, { fontSize: 10, paddingBottom: "2%" }]}>
            Created By - {item.user_name}
          </Text>
          {/* {item.user_id !== token?.id && ( */}
          <ButtonFilled
            mode="CONTAINED"
            title={
              actionType == "PUBLIC"
                ? "JOIN PUBLIC GROUP"
                : "REQUEST TO JOIN GROUP"
            }
            onPress={() => {
              console.log(item);
              GroupJoin(
                item.type === "private" ? "PRIVATE" : "PUBLIC",
                actionType,
                item.group_id
              );
            }}
            customStyle={{
              borderWidth: 0,
              height: 40,
              borderRadius: 10,
              width: "95%",
            }}
          />
          {/* )} */}
        </View>
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
      {renderHeader()}
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            color: CONSTANTS.COLORS.PRIMARY,
            fontSize: 20,
            fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
          }}
        >
          SHOWING RESULTS FOR
        </Text>
        <Text style={styles.searchWordStyle}>"{text}"</Text>
      </View>
      <View style={[styles.container, { paddingTop: "2%" }]}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

//make this component available to the app
export default GroupSearchResults;
