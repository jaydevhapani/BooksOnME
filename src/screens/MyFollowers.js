//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import { getFollowers } from "../redux/actions/profileAction";
import styles from "../styles/MyFollowers-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const MyFollowers = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (token?.id) {
      fetchFollowers(token?.id);
    }
  }, [token]);

  const fetchFollowers = async (id) => {
    const res = await dispatch(getFollowers(id));
    console.log(res);
    if (res?.length > 0) {
      setFollowers(res);
    } else {
      Alert.alert("", "No follower found.");
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
      <CenteredSectionHeader sectionTitle="MY FOLLOWERS" />

      <View style={[styles.container, { paddingTop: "2%" }]}>
        <SellerList
          onClickItem={(it) => {
            if (token?.paid === "1") {
              navigationToScreen(CONSTANTS.SCREENLIST.SELLER_DETAILS, props, {
                data: {
                  id: it.seller_id,
                  seller_name: it.user_name,
                  profile_photo: it.profile,
                },
              });
            } else {
              Alert.alert(
                "Message",
                "Please Subscribe to access sellers details"
              );
            }
          }}
          data={followers}
          allVisible={true}
          nameKey="user_name"
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default MyFollowers;
