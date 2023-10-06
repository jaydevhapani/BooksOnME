//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CONSTANTS from "../utils/constants";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { wp } from "../utils/responsive";
import FastImage from "react-native-fast-image";
// create a component
const BooksList = ({ data, onClickItem, allVisible, canDelete, onDelete }) => {
  return data.length > 0 ? (
    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    //   showsHorizontalScrollIndicator={false}
    //   style={{ paddingLeft: !allVisible ? "4%" : "1%" }}
    //   horizontal={!allVisible ? true : false}
    // >
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       flexWrap: "wrap",
    //       justifyContent: "flex-start",
    //     }}
    //   >
    //     {data.map((item, index) => (
    //       <View
    //         style={[
    //           styles.container,
    //           // {
    //           //   marginHorizontal: allVisible == false && 10,
    //           //   marginBottom: allVisible ? '3%' : 0,
    //           // },
    //         ]}
    //       >
    //         <FastImage
    //           style={styles.imageStyles}
    //           source={{
    //             uri: item?.images?.length > 0 ? item.images[0] : "",
    //             priority: FastImage.priority.high,
    //           }}
    //         />
    //         <Text numberOfLines={1} style={styles.bookNameStyle}>
    //           {item.book_name}
    //         </Text>
    //         <Text numberOfLines={1} style={styles.bookAuthorStyle}>
    //           {item.book_author}
    //         </Text>
    //         <Text numberOfLines={1} style={styles.bookNameStyle}>
    //           R {item.price}
    //         </Text>
    //         {canDelete && (
    //           <TouchableOpacity style={styles.deleteButton}>
    //             <Icon name="delete" color={CONSTANTS.COLORS.WHITE} size={18} />
    //           </TouchableOpacity>
    //         )}
    //       </View>
    //     ))}
    //   </View>
    // </ScrollView>

    <FlatList
      style={{ paddingLeft: !allVisible ? "4%" : "2%" }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={!allVisible ? true : false}
      data={data}
      removeClippedSubviews={true}
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            onPress={() => onClickItem(item)}
            style={[
              styles.container,
              allVisible && { width: wp("30%"), marginHorizontal: wp("1%") },
            ]}
          >
            <FastImage
              style={styles.imageStyles}
              source={{
                uri: item?.images?.length > 0 ? item.images[0] : "",
                priority: FastImage.priority.high,
              }}
            />
            <Text numberOfLines={1} style={styles.bookNameStyle}>
              {item.book_name}
            </Text>
            <Text numberOfLines={1} style={styles.bookAuthorStyle}>
              {item.book_author}
            </Text>
            <Text numberOfLines={1} style={styles.bookNameStyle}>
              {item?.currency || "R"} {item.price}
            </Text>
            {canDelete && (
              <TouchableOpacity
                onPress={() => onDelete && onDelete(item)}
                style={styles.deleteButton}
              >
                <Icon name="delete" color={CONSTANTS.COLORS.WHITE} size={18} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      }}
    />
  ) : (
    <Text style={{ flex: 1, paddingVertical: "5%", textAlign: "center" }}>
      No Record Found
    </Text>
  );
};

BooksList.proptype = {
  data: PropTypes.array,
  onClickItem: PropTypes.func,
  allVisible: PropTypes.bool,
  canDelete: PropTypes.bool,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: wp("31.5%"),
    // marginHorizontal: 10,
    height: wp("50%"),
    alignItems: "center",
    backgroundColor: CONSTANTS.COLORS.WHITE,
  },
  imageStyles: {
    margin: 10,
    width: wp("28%"),
    height: wp("24%"),
    borderRadius: 10,
    backgroundColor: CONSTANTS.COLORS.LIGHTGRAY,
  },
  bookNameStyle: {
    width: "100%",
    paddingHorizontal: 10,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 14,
    textAlign: "left",
  },
  bookAuthorStyle: {
    width: "100%",
    paddingHorizontal: 10,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.GRAY,
    fontSize: 12,
    textAlign: "left",
    marginBottom: 5,
  },
  deleteButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    right: 0,
    padding: "2%",
    backgroundColor: CONSTANTS.COLORS.PRIMARY,
  },
});

//make this component available to the app
export default BooksList;
