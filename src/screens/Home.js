//import liraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { Component, useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BannerSwiper from "../components/BannerSwiper";
import BooksList from "../components/BooksList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import SelectionSlider from "../components/SelectionSlider";
import SellerList from "../components/SellerList";
import { saveToken } from "../redux/actions/authActions";
import {
  fetchBanners,
  fetchGenres,
  fetchLatestBooks,
  fetchSellers,
  unsubscribe,
} from "../redux/actions/commonActions";
import { getProfile } from "../redux/actions/profileAction";
import { searchBookByTitle } from "../redux/actions/searchBooksActions";
import CONSTANTS from "../utils/constants";
import { navigationToScreen } from "../utils/utils";

// create a component
const Home = (props) => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.commonReducer.banners);
  const genres = useSelector((state) => state.commonReducer.genres);
  const latestBooks = useSelector((state) => state.commonReducer.latestBooks);
  const sellers = useSelector((state) => state.commonReducer.sellers);
  const [searchValue, setSearchValue] = useState("");
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.authReducer.token);

  const fetchProfile = async () => {
    try {
      const res = await dispatch(getProfile(token?.id));
      console.log(res);
      if (res) {
        dispatch(saveToken(res));
      }
      if (token?.expired_at) {
        AsyncStorage.setItem("SUB_EXP", token.expired_at);

        if (
          moment(token?.expired_at, "YYYY-MM-DD").diff(moment(), "minutes") < 0
        ) {
          dispatch(unsubscribe(token?.id));

          let d = token;
          d.paid = "0";
          console.log(d);
          dispatch(saveToken(d));
          AsyncStorage.removeItem("SUB_EXP");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(token);
    if (token && !!token.uuid && isFocused) {
      const UUID = token?.uuid;
      dispatch(fetchBanners());
      dispatch(fetchSellers());
      dispatch(fetchGenres(UUID));
      dispatch(fetchLatestBooks(UUID));

      fetchProfile();
    }
  }, [isFocused]);

  useEffect(() => {
    console.log("sellers", sellers);
  }, [genres]);

  const searchBooks = async () => {
    try {
      let resByTitle = await dispatch(
        searchBookByTitle("", "", 0, searchValue)
      );

      if (resByTitle && resByTitle?.length > 0) {
        console.log(resByTitle);
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS, props, {
          searchType: "TITLE",
          data: resByTitle,
          val: searchValue,
        });
      } else {
        Alert.alert("", "No books found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header showHeaderLeft={false} />
      <View style={styles.innerContainer}>
        <SearchBar
          placeHolder="Search Books"
          onChangeText={setSearchValue}
          onSubmitEditing={() => {
            searchBooks();
          }}
        />
        <ScrollView style={{ marginTop: 10 }}>
          <BannerSwiper data={banners} />

          <View style={{ marginBottom: 20 }}>
            <SectionHeader
              onViewAllClick={() => {
                navigationToScreen(CONSTANTS.SCREENLIST.BOOK_GENRES, props, {
                  Genres: genres,
                });
              }}
              sectionTitle="GENRES"
            />
            <SelectionSlider
              data={genres}
              onPress={(item) => {
                navigationToScreen(
                  CONSTANTS.SCREENLIST.BOOKS_BY_GENRES,
                  props,
                  { genre: item.genre_name }
                );
              }}
              showAll={showAll}
              titleString={"genre_name"}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <SectionHeader
              onViewAllClick={() => {
                // setShowAll(!showAll);
                navigationToScreen(
                  CONSTANTS.SCREENLIST.LATEST_LISTINGS,
                  props,
                  { latestBooks: latestBooks, title: "LATEST LISTINGS" }
                );
              }}
              sectionTitle="LATEST LISTINGS AROUND YOU"
            />
            <BooksList
              onClickItem={(item) => {
                navigationToScreen(CONSTANTS.SCREENLIST.BOOK_DETAIL, props, {
                  data: item,
                });
              }}
              data={latestBooks}
              allVisible={showAll}
            />
          </View>

          <View>
            <SectionHeader
              onViewAllClick={() => {
                // setShowAll(!showAll);
                if (token?.paid === "1") {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.RECOMMENDED_SELLERS,
                    props,
                    { sellers: sellers }
                  );
                } else {
                  Alert.alert(
                    "Message",
                    "Please Subscribe to access sellers details"
                  );
                }
              }}
              sectionTitle="RECOMMENDED SELLERS"
            />
            <SellerList
              onClickItem={(item) => {
                if (token?.paid === "1") {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.SELLER_DETAILS,
                    props,
                    {
                      data: item,
                    }
                  );
                } else {
                  Alert.alert(
                    "Message",
                    "Please Subscribe to access sellers details"
                  );
                }
              }}
              nameKey={"seller_name"}
              distanceKey={"city"}
              data={sellers}
              allVisible={showAll}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
  },
});

//make this component available to the app
export default Home;
