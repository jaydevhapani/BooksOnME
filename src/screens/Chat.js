//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image } from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";

import Input from "../components/Input";
import SectionHeader from "../components/SectionHeader";
import styles from "../styles/Chat-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const Chat = (props) => {
  return (
    <View style={styles.container}>
      <Header showHeaderLeft={false} />
      <CenteredSectionHeader sectionTitle="Chat" />

      <View style={{ flex: 1 }}>
        <ButtonFilled
          title="Private Chats"
          mode="OUTLINED"
          customStyle={[styles.buttonStyle, { marginVertical: "10%" }]}
          onPress={() => {
            navigationToScreen(CONSTANTS.SCREENLIST.PRIVATE_CHATS, props, {});
          }}
        />
        <ButtonFilled
          title="Joined Groups"
          mode="OUTLINED"
          customStyle={[styles.buttonStyle]}
          onPress={() => {
            navigationToScreen(CONSTANTS.SCREENLIST.JOINED_GROUPS, props, {});
          }}
        />
        <ButtonFilled
          title="Search Public Groups"
          mode="OUTLINED"
          customStyle={[styles.buttonStyle, { marginTop: "10%" }]}
          onPress={() => {
            navigationToScreen(
              CONSTANTS.SCREENLIST.SEARCH_PUBLIC_GROUPS,
              props,
              { actionType: "PUBLIC" }
            );
          }}
        />
        <ButtonFilled
          title="Search Private Groups"
          mode="OUTLINED"
          customStyle={[styles.buttonStyle, { marginBottom: "10%" }]}
          onPress={() => {
            navigationToScreen(
              CONSTANTS.SCREENLIST.SEARCH_PRIVATE_GROUPS_INPUT,
              props,
              { actionType: "PRIVATE" }
            );
          }}
        />
        <ButtonFilled
          title="Create Groups"
          customStyle={styles.buttonStyle}
          onPress={() => {
            navigationToScreen(CONSTANTS.SCREENLIST.CREATE_GROUP, props, {});
          }}
        />
        <ButtonFilled
          title="Group Requests"
          mode="CONTAINED"
          customStyle={styles.buttonStyle}
          onPress={() => {
            navigationToScreen(CONSTANTS.SCREENLIST.GROUP_REQUESTS, props, {});
          }}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default Chat;
