//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import { fetchGroups, setGenres } from "../redux/actions/commonActions";
import styles from "../styles/JoinedGroups-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

// create a component
const PrivateChats = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const token = useSelector((state) => state.authReducer.token);

  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const ref = firestore()
    .collection("Users")
    .doc(token?.id)
    .collection("PrivateChats");

  const getChats = async () => {
    try {
      const group = await ref.get();

      console.log(group.empty);
      if (group.empty) {
      } else {
        let temparr = [];
        console.log(group.docs);
        group.docs.map((it) => {
          console.log(it.data());
          temparr.push(it.data().admin);
        });
        console.log(temparr);
        setChats(temparr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => {
    const userNameStyle = { color: CONSTANTS.COLORS.PRIMARY };
    const titleStyle = {
      fontSize: 15,
      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
      color: "black",
    };
    return (
      <TouchableOpacity
        onPress={() => {
          // alert("Implementation In progress...");
          navigationToScreen(
            CONSTANTS.SCREENLIST.PRIVATE_CHATS_DETAILS,
            props,
            {
              data: item,
            }
          );
        }}
        style={{
          marginBottom: "5%",
          paddingHorizontal: "1%",
          paddingBottom: "2%",
          borderRadius: 8,
          width: "92%",
          alignSelf: "center",
          borderBottomWidth: 1,
          borderBottomColor: CONSTANTS.COLORS.PRIMARY,
        }}
      >
        <View>
          <Text style={titleStyle}>{item?.admin_name}</Text>
        </View>
        <View>
          {item?.type === "GROUP" ? (
            <Text style={[titleStyle, { color: CONSTANTS.COLORS.GRAY }]}>
              Group: {item?.group}
            </Text>
          ) : (
            <Text style={[titleStyle, { color: CONSTANTS.COLORS.GRAY }]}>
              Seller
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (isFocused) {
      getChats();
    }
  }, [token, isFocused]);

  const fetchFirestore = async (data) => {
    try {
      // const groups = await firestore().collection("Users").doc(token?.id).set({
      //   PrivateChats: data,
      // });
      // console.log(groups);
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
      <CenteredSectionHeader sectionTitle="PRIVATE CHATS" />

      <View style={[styles.container, { paddingTop: "15%" }]}>
        <FlatList data={chats} renderItem={renderItem} />
      </View>
    </View>
  );
};

//make this component available to the app
export default PrivateChats;
