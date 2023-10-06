//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import {
  fetchBooksByGenres,
  filterBooksNearbyGenres,
} from "../redux/actions/commonActions";
import styles from "../styles/BooksByGenre-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const BooksByGenre = (props) => {
  const genre = !!props.route.params.genre ? props.route.params.genre : "";
  const books = useSelector((state) => state.commonReducer.books);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBooksByGenres(genre));
    setLoading(false);
  }, []);

  const filterBooks = async (values) => {
    try {
      console.log(values);
      dispatch(
        filterBooksNearbyGenres(
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
      <CenteredSectionHeader sectionTitle="BOOK GENRES" />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            color: CONSTANTS.COLORS.PRIMARY,
            fontSize: 20,
            fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
          }}
        >
          ({genre})
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={CONSTANTS.COLORS.PRIMARY}
          style={{ marginTop: "10%" }}
        />
      ) : (
        <>
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
              navigationToScreen(CONSTANTS.SCREENLIST.GENRE_FILTER, props, {
                genre: genre,
                filterBooks: filterBooks,
              });
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
        </>
      )}
    </View>
  );
};

//make this component available to the app
export default BooksByGenre;
