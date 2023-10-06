//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
  Alert,
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
import moment from "moment";

// create a component
const JoinedGroups = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const token = useSelector((state) => state.authReducer.token);

  const [groups, setgroups] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
          navigationToScreen(CONSTANTS.SCREENLIST.CHAT_DETAILS, props, {
            data: item,
          });
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
          <Text style={titleStyle}>{item?.group?.group_name}</Text>
        </View>
        <View>
          <Text style={[titleStyle, { color: CONSTANTS.COLORS.GRAY }]}>
            {/* (USER NAME) - Last Message Sent preview… Last Message Sent preview…
            Last Message Sent prev… */}
            Admin - {item.group.group_admin_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (isFocused) {
      getGroups();
    }
  }, [token, isFocused]);

  const fetchFirestore = async (data) => {
    try {
      await firestore().collection("Users").doc(token?.id).set({
        Groups: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async () => {
    try {
      const res = await dispatch(fetchGroups(token?.id));
      console.log(res);
      if (res && res.length > 0) {
        console.log(res);
        setgroups(res);
        fetchFirestore(res);
      } else {
        Alert.alert("No groups found");
        setgroups([]);
      }
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
      <CenteredSectionHeader sectionTitle="JOINED GROUPS" />

      <View style={[styles.container, { paddingTop: "15%" }]}>
        {console.log(
          groups.sort((a, b) => console.log(moment(a?.group?.created_at)))
        )}
        <FlatList
          data={
            groups?.length > 0
              ? groups.sort(
                  (a, b) =>
                    moment(b?.group?.created_at) - moment(a?.group?.created_at)
                )
              : []
          }
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default JoinedGroups;
