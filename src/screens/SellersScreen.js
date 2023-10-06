import { View, Text, Alert } from "react-native";
import React from "react";
import styles from "../styles/SellersScreen-styles";
import Header from "../components/Header";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import FastImage from "react-native-fast-image";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import ButtonFilled from "../components/ButtonFilled";
import { ScrollView } from "react-native-gesture-handler";
import BooksList from "../components/BooksList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooksFromSeller,
  followSeller,
  getSeller,
} from "../redux/actions/commonActions";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";

export default function SellersScreen(props) {
  const data = props?.route?.params?.data || {};
  const token = useSelector((state) => state.authReducer.token);
  console.log(data);
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);

  const [tempBooks, setTempBooks] = useState([]);
  const [seller, setSeller] = useState({});

  const fetchSeller = async () => {
    try {
      const res = await dispatch(getSeller(data?.id, token?.id));
      console.log(res);
      if (res) {
        setSeller(res);
      }
    } catch (error) {}
  };
  const fetchBooks = async () => {
    try {
      const params = { id: token?.id, sellerId: data?.id };
      const res = await dispatch(fetchBooksFromSeller(params));

      if (res && res.length > 0) {
        setBooks(res);
        setTempBooks(res);
      } else {
        Alert.alert("", "No record found");
        setBooks([]);
        setTempBooks([]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchBooks();
    fetchSeller();
  }, [token]);

  const followSellers = async () => {
    try {
      const res = await dispatch(
        followSeller(token?.id, data?.id, seller.is_following == 1 ? 0 : 1)
      );
      fetchSeller();
    } catch (error) {}
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
        numOfLines={2}
        customLabelStyle={{ width: "80%" }}
        sectionTitle={`${seller?.first_name} ${seller?.last_name}'s\n Library`}
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.imageStyles, { marginTop: 10 }]}>
            {data?.profile_photo ? (
              <FastImage
                style={[styles.imageStyles, { borderWidth: 0 }]}
                source={{ uri: data?.profile_photo, priority: "low" }}
              />
            ) : (
              <Text style={{ color: CONSTANTS.COLORS.GRAY }}>Image</Text>
            )}
          </View>
          <ButtonFilled
            // disabled={seller?.is_following == 1}
            onPress={followSellers}
            customStyle={{
              height: 40,
              borderRadius: 10,
              width: "95%",
              marginVertical: 20,
            }}
            customFontStyle={{ textAlign: "center" }}
            title={
              seller?.is_following == 1
                ? "UNFOLLOW"
                : "FOLLOW (" +
                  seller?.first_name +
                  " " +
                  seller?.last_name +
                  ")"
            }
          />
          <ButtonFilled
            // disabled={seller?.is_following == 1}
            onPress={() => {
              navigationToScreen(CONSTANTS.SCREENLIST.MY_WISH_LIST, props, {
                sellerid: data?.id,
              });
            }}
            customStyle={{
              height: 40,
              borderRadius: 10,
              width: "95%",
              marginTop: 0,
              marginVertical: 20,
            }}
            customFontStyle={{ textAlign: "center" }}
            title={"Seller's Wishlist"}
          />
          <SearchBar
            onChangeText={(text) => {
              const match = tempBooks.filter((e) =>
                e?.book_name.toLowerCase().includes(text.trim().toLowerCase())
              );
              setBooks(match);
            }}
          />
          <BooksList
            onClickItem={(item) => {
              navigationToScreen(CONSTANTS.SCREENLIST.BOOK_DETAIL, props, {
                data: item,
              });
            }}
            data={books}
            allVisible={true}
          />
        </ScrollView>
      </View>
    </View>
  );
}
