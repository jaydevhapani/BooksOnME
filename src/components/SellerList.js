//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CONSTANTS from "../utils/constants";

// create a component
const SellerList = ({
  data,
  onClickItem,
  allVisible,
  nameKey,
  distanceKey,
}) => {
  return data.length > 0 ? (
    !allVisible ? (
      <ScrollView horizontal>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          numColumns={Math.ceil(data.length / 2)}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onClickItem(item)}
              style={[
                styles.container,
                {
                  marginHorizontal: allVisible ? "6%" : 10,
                  marginBottom: allVisible ? "3%" : 0,
                },
              ]}
            >
              {/* {item?.profile_photo || item?.profile || item.profile !== null ? ( */}
              <Image
                style={styles.imageStyles}
                defaultSource={require("../../assets/images/proifledp.png")}
                source={{ uri: item?.profile_photo || item?.profile }}
              />
              {/* ) : (
                <Image
                  style={styles.imageStyles}
                  source={require("../../assets/images/proifledp.png")}
                /> */}
              {/* )} */}
              <View style={{ alignItems: "flex-start" }}>
                <Text numberOfLines={1} style={styles.bookNameStyle}>
                  {item[nameKey]}
                </Text>
                <Text numberOfLines={1} style={styles.bookAuthorStyle}>
                  {item[distanceKey]}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    ) : (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={data}
        // numColumns={2}
        contentContainerStyle={{
          paddingLeft: "2%",
          // width: "98%",
          // alignItems: 'center',
          // justifyContent: 'space-between',
        }}
        scrollEnabled={true}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onClickItem(item)}
            style={[styles.container, { width: "100%" }]}
          >
            <Image
              style={styles.imageStyles}
              defaultSource={require("../../assets/images/proifledp.png")}
              source={{ uri: item?.profile_photo || item?.profile }}
            />
            <View style={{ alignItems: "flex-start", width: "100%" }}>
              <Text numberOfLines={1} style={styles.bookNameStyle}>
                {item[nameKey] || "-"}
              </Text>
              <Text numberOfLines={1} style={styles.bookAuthorStyle}>
                {item[distanceKey] || "-"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    )
  ) : (
    <Text style={{ flex: 1, textAlign: "center", paddingVertical: "5%" }}>
      No Record Found
    </Text>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CONSTANTS.COLORS.WHITE,
  },
  imageStyles: {
    margin: 10,
    width: 46,
    height: 46,
    borderRadius: 100,
    backgroundColor: CONSTANTS.COLORS.LIGHTGRAY,
  },
  bookNameStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 14,
    textAlign: "left",
  },
  bookAuthorStyle: {
    width: "100%",

    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.GRAY,
    fontSize: 12,
    textAlign: "left",
    marginBottom: 5,
  },
});

//make this component available to the app
export default SellerList;
