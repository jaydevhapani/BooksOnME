//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import {
  filterBooksNearbyGenres,
  filterBooksNearbyLatest,
} from "../redux/actions/commonActions";
import styles from "../styles/LatestListings-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const LatestListings = (props) => {
  const title = !!props.route.params.title ? props.route.params.title : "";
  const data = !!props.route.params.latestBooks
    ? props.route.params.latestBooks
    : [];
  const books = useSelector((state) => state.commonReducer.latestBooks);
  const [dataSource, setDataSource] = useState(books);
  const dispatch = useDispatch();
  console.log(books);
  const filterLatestBooks = async (values) => {
    try {
      dispatch(
        filterBooksNearbyLatest(
          values?.lat || "",
          values?.long || "",
          values?.distance || 0,
          values?.genre || ""
        )
      );
    } catch (error) {
      console.log(error);
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
      <CenteredSectionHeader sectionTitle={title} />
      <View style={{ height: 10 }}></View>
      <ButtonFilled
        title="Filter"
        customFontStyle={{
          fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_BOLD,
          fontSize: 15,
        }}
        customStyle={{
          height: 30,
          borderRadius: 6,
        }}
        onPress={() => {
          navigationToScreen(
            CONSTANTS.SCREENLIST.FILTER_LATEST_LISTINGS,
            props,
            { filterLatestBooks: filterLatestBooks }
          );
        }}
      />
      <View style={[styles.container, { paddingLeft: "0%" }]}>
        <BooksList
          onClickItem={(item) => {
            navigationToScreen(CONSTANTS.SCREENLIST.BOOK_DETAIL, props, {
              data: item,
            });
          }}
          data={books}
          allVisible={true}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default LatestListings;
