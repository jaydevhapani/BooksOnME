//import liraries
import { useIsFocused } from "@react-navigation/core";
import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import { DeleteBook, fetchMyBooks } from "../redux/actions/commonActions";
import styles from "../styles/MyLibrary-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const MyLibrary = (props) => {
  const books = useSelector((state) => state.commonReducer.mybooks);
  const token = useSelector((state) => state.authReducer.token);

  const latestBooks = [
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
  ];

  const [myBooks, setMyBooks] = useState([]);
  const [searchval, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused && token?.id) {
      dispatch(fetchMyBooks(token?.id));
    }
  }, [token, isFocused]);

  useEffect(() => {
    if (books && books.length > 0) {
      console.log(books);
      setMyBooks(books);
    } else {
      setMyBooks([]);
    }
  }, [books]);

  const deleteBook = async (id) => {
    try {
      console.log(id);
      const res = await dispatch(DeleteBook(id?.book_id, token?.id));
      if (res) {
        let temp = [...myBooks];
        temp = temp.filter((e) => e.book_id !== id?.book_id);
        setMyBooks(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchBooks = () => {
    let temparr = books;
    temparr = temparr.filter((e) =>
      e.book_name && searchval?.trim().length > 0
        ? e.book_name.toLowerCase().includes(searchval.toLowerCase())
        : e
    );
    setMyBooks(temparr);
  };
  return (
    <View style={styles.container}>
      <Header
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle="MY LIBRARY" />
      <SearchBar
        placeHolder="Search Books"
        onChangeText={setSearchValue}
        onSubmitEditing={() => {
          searchBooks();
        }}
      />
      <View
        style={[styles.container, { paddingVertical: 20, paddingLeft: "0%" }]}
      >
        <BooksList
          onDelete={(it) => deleteBook(it)}
          onClickItem={(item) => {
            navigationToScreen(CONSTANTS.SCREENLIST.BOOK_DETAIL, props, {
              data: item,
            });
          }}
          canDelete={true}
          data={myBooks}
          allVisible={true}
        />
      </View>
      <ButtonFilled
        title="ADD NEW LISTING"
        customFontStyle={{
          fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_BOLD,
          fontSize: 15,
        }}
        customStyle={{
          height: 65,
          borderRadius: 10,
        }}
        onPress={() => {
          navigationToScreen(CONSTANTS.SCREENLIST.ADD_NEW_LISTING, props, {});
        }}
      />
    </View>
  );
};

//make this component available to the app
export default MyLibrary;
