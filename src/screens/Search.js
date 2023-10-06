//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Search-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const Search = (props) => {
  const [options, setOptions] = useState([
    { name: "Book Title", selected: false },
    { name: "Book Author", selected: false },
    { name: "ISBN Number", selected: false },
    { name: "Seller name", selected: false },
  ]);
  const [selectType, setSelectType] = useState("");

  const renderItem = ({ item, index }) => {
    return (
      <ButtonFilled
        customStyle={{ height: 65 }}
        title={item.name}
        mode={item.selected ? "CONTAINED" : "OUTLINED"}
        onPress={() => {
          selectOption(index);
        }}
      />
    );
  };

  const selectOption = (i) => {
    // let tempArr = [...options];
    // tempArr.map((it, ix) => {
    //   if (i == ix) {
    //     it.selected = true;
    //   } else {
    //     it.selected = false;
    //   }
    // });
    // setOptions(tempArr);
    switch (i) {
      case 0:
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES, props, {
          searchType: "TITLE",
        });
        break;
      case 1:
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES, props, {
          searchType: "AUTHOR",
        });
        break;
      case 2:
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES, props, {
          searchType: "ISBN",
        });
        break;
      case 3:
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES, props, {
          searchType: "SELLER",
        });
        break;

      default:
        break;
    }
  };
  const ItemSeparatorComponent = () => {
    return (
      <Text
        numberOfLines={1}
        style={[styles.bookNameStyle, { paddingVertical: "3%" }]}
      >
        Or
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
      <CenteredSectionHeader sectionTitle="SEARCH BOOKS" />

      <View style={[styles.container, { paddingTop: "3%" }]}>
        <Text
          numberOfLines={1}
          style={[styles.bookNameStyle, { paddingVertical: "8%" }]}
        >
          Would you like to Search by
        </Text>
        <FlatList
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          data={options}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default Search;
