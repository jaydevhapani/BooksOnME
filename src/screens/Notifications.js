//import liraries
import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NewIcon, DoneIcon } from "../../assets";
import Icon from "react-native-vector-icons/AntDesign";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Notifications-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../redux/actions/commonActions";
import { useIsFocused } from "@react-navigation/core";
import moment from "moment";

// create a component
const Notifications = (props) => {
  const data = useSelector((state) => state.commonReducer.notifications);
  const token = useSelector((state) => state.authReducer.token);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && token && token?.id) {
      dispatch(getNotifications(313));
    }
  }, [token, isFocused]);

  useEffect(() => {}, [data]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigationToScreen(CONSTANTS.SCREENLIST.NOTIFICATION_DETAIL, props, {
            data: item,
          });
        }}
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: "5%",
          marginVertical: "4%",
        }}
      >
        <View
          style={[
            styles.iconContainer,
            item.is_read === "1" && { borderColor: CONSTANTS.COLORS.BLACK },
          ]}
        >
          {item.is_read === "1" ? (
            <DoneIcon />
          ) : (
            <NewIcon style={{ left: 3 }} />
          )}
        </View>
        <View style={styles.notificationContainer}>
          <Text style={[styles.fontStyle, { fontSize: 18, fontWeight: "400" }]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.fontStyle,
              { fontSize: 14, fontWeight: "400", color: CONSTANTS.COLORS.GRAY },
            ]}
          >
            {item.message}
          </Text>

          <Text
            style={[
              styles.fontStyle,
              {
                fontSize: 12,
                fontWeight: "400",
                paddingVertical: 5,
                color: CONSTANTS.COLORS.PRIMARY,
              },
            ]}
          >
            {moment(item.created_at).format("MMM DD, YYYY (HH:mm a)")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <Header showHeaderLeft={false} />
      <CenteredSectionHeader sectionTitle="NOTIFICATIONS" />

      <View style={[styles.container, { paddingTop: "6%" }]}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

//make this component available to the app
export default Notifications;
