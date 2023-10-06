//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import {
  fetchSellers,
  filterNearBySellers,
} from "../redux/actions/commonActions";
import styles from "../styles/RecommendedSellers-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const RecommendedSellers = (props) => {
  const sellers = useSelector((state) => state.commonReducer.sellers);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSellers());
    setLoading(false);
  }, []);

  const filterSellers = async (values) => {
    try {
      console.log(values);
      dispatch(
        filterNearBySellers(
          values?.lat || "",
          values?.long || "",
          values?.distance || 0
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header showHeaderLeft={true} onPressBack={() => goBack(props, 1)} />
      <CenteredSectionHeader sectionTitle="RECOMMENDED SELLERS" />
      <View style={{ height: 10 }}></View>
      <ButtonFilled
        title="Filter"
        onPress={() => {
          navigationToScreen(
            CONSTANTS.SCREENLIST.FILTER_RECOMM_SELLERS,
            props,
            { filterSellers: filterSellers }
          );
        }}
        customFontStyle={{
          fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_BOLD,
          fontSize: 15,
          textAlign: "center",
        }}
        customStyle={{
          height: 30,
          borderRadius: 6,
        }}
      />
      <View style={[styles.container]}>
        <SellerList
          nameKey={"seller_name"}
          distanceKey={"city"}
          data={sellers}
          allVisible={true}
          onClickItem={(it) => {
            if (token?.paid === "1") {
              navigationToScreen(CONSTANTS.SCREENLIST.SELLER_DETAILS, props, {
                data: it,
              });
            } else {
              Alert.alert(
                "Message",
                "Please Subscribe to access sellers details"
              );
            }
          }}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default RecommendedSellers;
