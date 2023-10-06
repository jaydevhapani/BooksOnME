//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Genres-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const Genres = (props) => {
  const data = !!props.route.params.Genres ? props.route.params.Genres : [];
  const [dataSource, setDataSource] = useState(data);

  const searchFlatList = async (txt) => {
    let tempArr = data;
    tempArr = tempArr.filter((e) => e.book_genre.match(txt));
    console.log(tempArr);
    setDataSource(tempArr);
  };

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle="BOOK GENRES" />
      {/* <View style={{ padding: 10 }}>
        <SearchBar placeHolder="Search Genres" onChangeText={searchFlatList} />
      </View> */}
      <View style={[styles.container, { paddingTop: "10%" }]}>
        <FlatList
          data={dataSource}
          contentContainerStyle={{
            flexDirection: "row",
            paddingHorizontal: "5%",
            // justifyContent: 'space-between',
            flexWrap: "wrap",
          }}
          renderItem={({ item, index }) => {
            return (
              <OutlinedItem
                title={item.genre_name}
                onPress={() => {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.BOOKS_BY_GENRES,
                    props,
                    { genre: item.genre_name }
                  );
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default Genres;
