//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NewIcon, DoneIcon } from "../../assets";
import Icon from "react-native-vector-icons/AntDesign";
import BooksList from "../components/BooksList";
import ButtonFilled from "../components/ButtonFilled";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/MyWishList-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import {
  deleteWishListItem,
  getUserWishlist,
} from "../redux/actions/commonActions";
import { useDispatch, useSelector } from "react-redux";

// create a component
const MyWishList = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  const userid = props?.route?.params.sellerid || token?.id;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const type = props.route?.params?.type || "other";

  useEffect(() => {
    fetchWishList();
  }, [token]);

  const fetchWishList = async () => {
    try {
      const res = await dispatch(getUserWishlist(userid));
      if (res && res.length > 0) {
        console.log(res);
        setData(res);
      } else {
        Alert.alert("", "No wishlist found.");
      }
    } catch (error) {}
  };

  const deleteWishlist = async (id) => {
    try {
      const res = await dispatch(deleteWishListItem(id, token?.id));
      if (res) {
        let temparr = [...data];
        temparr = temparr.filter((e) => e.id !== id);
        setData(temparr);
      }
    } catch (error) {}
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          borderRadius: 10,
          paddingVertical: "3%",
          borderWidth: 1,
          alignSelf: "center",
          borderColor: CONSTANTS.COLORS.PRIMARY,
          paddingHorizontal: "3%",
          marginVertical: "2%",
        }}
      >
        <View style={styles.notificationContainer}>
          <Text
            style={[
              styles.fontStyle,
              { fontSize: 18, fontWeight: "400", marginBottom: 5 },
            ]}
          >
            {item.book_name}{" "}
          </Text>

          <Text
            style={[
              styles.fontStyle,
              {
                fontSize: 12,
                fontWeight: "400",
              },
            ]}
          >
            {item.book_author}
          </Text>
        </View>
        {type === "MYWISHLIST" && (
          <TouchableOpacity
            onPress={() => {
              deleteWishlist(item.id);
            }}
            style={[
              styles.iconContainer,
              { borderColor: CONSTANTS.COLORS.PRIMARY },
            ]}
          >
            <Text
              style={[
                styles.fontStyle,
                {
                  fontSize: 12,
                  fontWeight: "400",
                  color: CONSTANTS.COLORS.PRIMARY,
                },
              ]}
            >
              Remove
            </Text>
          </TouchableOpacity>
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
      <CenteredSectionHeader sectionTitle="My WishList" />

      <View style={[styles.container, { paddingTop: "6%" }]}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
      {userid === token?.id && (
        <ButtonFilled
          title="ADD TO WISHLIST"
          onPress={() =>
            navigationToScreen(
              CONSTANTS.SCREENLIST.MY_WISH_LIST_DETAILS,
              props,
              {}
            )
          }
        />
      )}
    </View>
  );
};

//make this component available to the app
export default MyWishList;
