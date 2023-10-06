//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";

import Input from "../components/Input";
import SectionHeader from "../components/SectionHeader";
import { publishwishList } from "../redux/actions/commonActions";
import styles from "../styles/WishlistDetails-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const WishListDetails = (props) => {
  const isLoggedIn = !!props.route.params.isLoggedIn
    ? props.route.params.isLoggedIn
    : false;
  const [name, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [contact, setContact] = useState("");
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      let params = {
        book_name: name,
        book_author: author,
        contact: contact,
      };
      const res = dispatch(publishwishList(params, token?.id));
      if (res) {
        goBack(props, 3);
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Header showHeaderLeft={true} />
      <CenteredSectionHeader sectionTitle="MT WISHLIST" />
      <View style={styles.appTitleContainer}>
        <Text style={styles.subTitleStyle}>
          {`Add a book to your Wishlist`}
        </Text>
        <Input placeholder="Book Name" onChangeText={setBookName} />
        <Input placeholder="Book Author" onChangeText={setAuthor} />
        <Input
          placeholder="Your Contact Number"
          keyboardType={"number-pad"}
          onChangeText={setContact}
          maxChar={10}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <ButtonFilled
          title="ADD TO WISHLIST"
          customStyle={{ height: 45 }}
          onPress={() => {
            // goBack(props, 3);
            if (
              name.trim().length > 0 &&
              author.trim().length > 0 &&
              contact.trim().length > 0
            ) {
              submit();
            }
          }}
        />
        <ButtonFilled
          title="BACK"
          mode="OUTLINED"
          customStyle={{ height: 45 }}
          onPress={() => {
            goBack(props, 3);
          }}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default WishListDetails;
