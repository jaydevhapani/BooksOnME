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
import { searchWishlist } from "../redux/actions/commonActions";
import styles from "../styles/WIshListSearchResults-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import firestore from "@react-native-firebase/firestore";

// create a component
const WishListSearchResults = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const searchVal = !!props.route.params.searchValue
    ? props.route.params.searchValue
    : "";
  const token = useSelector((state) => state.authReducer.token);
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  const renderHeader = () => {
    switch (searchType) {
      case "TITLE":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`WISHLIST TITLE\n SEARCH`}
          />
        );
      case "AUTHOR":
        return (
          <CenteredSectionHeader
            customLabelStyle={{ paddingHorizontal: "10%" }}
            sectionTitle={`WISHLIST AUTHOR\n SEARCH`}
          />
        );

      default:
        break;
    }
  };

  useEffect(() => {
    if (token?.id) {
      fetchWishList();
    }
  }, [token]);

  const fetchWishList = async () => {
    try {
      let res = await dispatch(
        searchWishlist(searchVal, searchType, token?.id)
      );
      console.log(res);
      if (res.length > 0) {
        setBooks(res);
      } else {
        Alert.alert("", "No record found");
      }
    } catch (error) {}
  };

  const messageSeller = async (data) => {
    try {
      let admin = {
        group_admin_id: data?.user_id,
        admin_name: data?.user_name || data?.seller_name || "No name",
        type: "SELLER",
      };
      let curretnUder = {
        group_admin_id: token?.id,
        admin_name: token?.first_name + " " + token?.last_name,
        type: "SELLER",
      };
      console.log(data);
      const adminRef = await firestore()
        .collection("Users")
        .doc(token?.id)
        .collection("PrivateChats")
        .doc(admin.group_admin_id);
      const recieverRef = await firestore()
        .collection("Users")
        .doc(admin.group_admin_id)
        .collection("PrivateChats")
        .doc(token?.id);

      const chats = await firestore()
        .collection("Users")
        .doc(token?.id)
        .collection("PrivateChats")
        .doc(admin.group_admin_id)
        .collection("Chats");

      let isExist = (await adminRef.get()).exists;
      let isReciverExist = (await recieverRef.get()).exists;
      console.log(isExist);

      if (isExist == false && isReciverExist == false) {
        adminRef
          .set({
            admin: admin,
          })
          .then(() => {
            recieverRef
              .set({
                admin: curretnUder,
              })
              .then(() => {
                navigationToScreen(CONSTANTS.SCREENLIST.PRIVATE_CHATS, props, {
                  data: admin,
                });
              });
          });
      } else if (isExist == true && isReciverExist == false) {
        recieverRef
          .set({
            admin: curretnUder,
          })
          .then(() => {
            navigationToScreen(CONSTANTS.SCREENLIST.PRIVATE_CHATS, props, {
              data: admin,
            });
          });
      } else if (isExist == false && isReciverExist == true) {
        adminRef
          .set({
            admin: admin,
          })
          .then(() => {
            navigationToScreen(CONSTANTS.SCREENLIST.PRIVATE_CHATS, props, {
              data: admin,
            });
          });
      } else if (isExist == true && isReciverExist == true) {
        navigationToScreen(CONSTANTS.SCREENLIST.PRIVATE_CHATS, props, {
          data: admin,
        });
      }
    } catch (e) {
      console.log(e);
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
      <View
        style={{
          marginBottom: "5%",
          padding: "4%",
          borderRadius: 8,
          width: "95%",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: CONSTANTS.COLORS.PRIMARY,
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: "3%",
            borderBottomColor: CONSTANTS.COLORS.PRIMARY,
          }}
        >
          <Text style={titleStyle}>{item.book_name} </Text>
          <Text style={[titleStyle, { fontSize: 10 }]}>
            {item.book_author}{" "}
          </Text>
        </View>
        <View style={{ paddingTop: "2%" }}>
          <Text style={[titleStyle, { fontSize: 10, paddingBottom: "2%" }]}>
            Added by -{" "}
            <Text style={userNameStyle}> {item?.user_name || ""}</Text>
          </Text>
          <Text style={[titleStyle, { fontSize: 10 }]}>
            Contact Number -
            <Text style={userNameStyle}> {item.contact_number}</Text>
          </Text>
        </View>
        {token?.id !== item.user_id && (
          <ButtonFilled
            onPress={() => {
              // console.log(item);
              messageSeller(item);
            }}
            customStyle={{
              height: 40,
              borderRadius: 10,
              width: "100%",
              marginVertical: 20,
              marginBottom: 0,
            }}
            customFontStyle={{ textAlign: "center" }}
            title={"Message Seller"}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      {renderHeader()}
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            color: CONSTANTS.COLORS.PRIMARY,
            fontSize: 20,
            fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
          }}
        >
          SHOWING RESULTS FOR
        </Text>
        <Text style={styles.searchWordStyle}>"{searchVal}"</Text>
      </View>
      <View style={[styles.container, { paddingTop: "2%" }]}>
        <FlatList data={books} renderItem={renderItem} />
      </View>
    </View>
  );
};

//make this component available to the app
export default WishListSearchResults;
