//import liraries
import moment from "moment";
import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Linking } from "react-native";
import { useDispatch } from "react-redux";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import { openNotification } from "../redux/actions/commonActions";
import styles from "../styles/NotificationDetails-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const NotificationDetails = (props) => {
  const data = props?.route?.params?.data || {};
  const dispatch = useDispatch();
  console.log(data);
  useEffect(() => {
    dispatch(openNotification(data.id));
  }, []);

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />

      <View style={[styles.container, { paddingVertical: "10%" }]}>
        <Text style={[styles.sectionTitleStyle]}>{data?.title}</Text>
        <Text
          style={{
            paddingTop: "2%",
            textAlign: "center",
            color: CONSTANTS.COLORS.PRIMARY,
            fontSize: 20,
            fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
          }}
        >
          {moment(data?.created_at).format("MMM DD, YYYY (HH:mm a)")}
        </Text>
        <View style={{ flex: 1, padding: "6%", alignItems: "center" }}>
          <Text
            style={[
              styles.fontStyle,
              { fontSize: 14, fontWeight: "400", color: CONSTANTS.COLORS.GRAY },
            ]}
          >
            {data?.message}
          </Text>
        </View>
        <ButtonFilled
          title="VIEW"
          onPress={() => (data?.link ? Linking.openURL(data?.link) : null)}
        />
        <ButtonFilled title="BACK" onPress={() => goBack(props, 1)} />
      </View>
    </View>
  );
};

//make this component available to the app
export default NotificationDetails;
