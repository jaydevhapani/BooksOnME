//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import styles from "../styles/SearchTypeResults-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const SearchTypeResults = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const val = !!props.route.params.val ? props.route.params.val : "";
  const data = props?.route?.params?.data || [];

  const renderHeader = () => {
    switch (searchType) {
      case "TITLE":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`TITLE SEARCH`}
          />
        );
      case "AUTHOR":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`AUTHOR SEARCH`}
          />
        );
      case "ISBN":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`ISBN SEARCH`}
          />
        );
      case "SELLER":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`SELLER SEARCH`}
          />
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
        <Text style={styles.searchWordStyle}>"{val}"</Text>
      </View>
      <View style={[styles.container, { paddingTop: "2%" }]}>
        {searchType !== "SELLER" ? (
          <BooksList
            onClickItem={(item) => {
              navigationToScreen(CONSTANTS.SCREENLIST.BOOK_DETAIL, props, {
                data: item,
              });
            }}
            data={data}
            allVisible={true}
          />
        ) : (
          <SellerList
            data={data}
            distanceKey={"city"}
            nameKey={"seller_name"}
            allVisible={true}
            onClickItem={(item) => {
              navigationToScreen(CONSTANTS.SCREENLIST.SELLER_DETAILS, props, {
                data: {
                  id: item?.id,
                  seller_name: item?.seller_name,
                },
              });
            }}
          />
        )}
      </View>
    </View>
  );
};

//make this component available to the app
export default SearchTypeResults;
