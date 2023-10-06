//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonFilled from "../components/ButtonFilled";
import Header from "../components/Header";
import styles from "../styles/ConfirmBookListing-styles";
import CONSTANTS from "../utils/constants";
import { getLocationFromLatlong, goBack } from "../utils/utils";
import {
  addBulkBooks,
  addsingleBook,
  uploadImages,
} from "../redux/actions/addBookActions";

// create a component
const ConfirmBookListing = (props) => {
  const actionType = !!props.route.params.actionType
    ? props.route.params.actionType
    : "SINGLE";
  const token = useSelector((state) => state.authReducer.token);

  const data = props?.route?.params?.formData;
  console.log(data);
  const dispatch = useDispatch();
  const [currentImage, selectImage] = useState(
    data?.images?.length > 0 ? data?.images[0] : {}
  );
  const [uploadedImages, setUploadedImages] = useState([]);

  const fetchAddress = () => {
    let res = getLocationFromLatlong(
      data?.location?.latitude,
      data?.location?.longitude
    );
    console.log(res);
  };

  const postImages = async () => {
    try {
      let params = data.images;
      params = params.map((it, ix) => {
        return {
          name:
            it?.filename || it?.path.substring(it?.path.lastIndexOf("/") + 1),
          type: it.mime,
          uri: it.path,
        };
      }, []);
      console.log(params);
      let res = await dispatch(uploadImages(params));
      if (res && res.length > 0) {
        publishSingleBook(res);
      }
    } catch (error) {}
  };

  const publishSingleBook = async (photos) => {
    try {
      let params = data;
      params.uploadedImages = photos;
      params.user_id = token?.id;
      let res =
        actionType === "SINGLE"
          ? await dispatch(addsingleBook(params))
          : await dispatch(addBulkBooks(params));
      console.log(res);
      if (res == true) {
        Alert.alert("", "Books added successfully");

        goBack(props, 3);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: 300,
          backgroundColor: CONSTANTS.COLORS.LIGHTGRAY,
        }}
      >
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: currentImage?.path }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={data?.images.length > 0 ? data.images : []}
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectImage(item);
                }}
                style={[styles.imagesContainer]}
              >
                <Image
                  style={[
                    styles.imagesStyle,
                    {
                      borderWidth: currentImage?.id == item.id ? 1 : 0,
                      borderColor: CONSTANTS.COLORS.PRIMARY,
                    },
                  ]}
                  source={{ uri: item.path }}
                />
              </TouchableOpacity>
            );
          }}
        />
        <View style={{ flex: 3.5 }}>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 30,
                  backgroundColor: CONSTANTS.COLORS.PRIMARY,
                }}
              />
              <View style={{ paddingLeft: "2%" }}>
                <Text style={styles.bookNameStyle}>
                  {actionType === "SINGLE" ? data?.name || "" : "Listing Title"}
                </Text>
                {actionType === "SINGLE" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "55%" }}>
                      <Text numberOfLines={1} style={styles.contentStyle}>
                        {data?.author || ""}
                      </Text>
                      <Text numberOfLines={1} style={styles.contentStyle}>
                        {data?.genre || ""}
                      </Text>
                      <Text numberOfLines={1} style={styles.contentStyle}>
                        {data?.location?.address || ""}
                      </Text>
                    </View>
                    <View style={styles.priceLabelStyle}>
                      <Text style={styles.priceStyle}>
                        {data?.currency} {data?.price}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "55%" }}>
                      <Text numberOfLines={1} style={styles.contentStyle}>
                        {data?.name || ""}
                      </Text>

                      <Text numberOfLines={1} style={styles.contentStyle}>
                        {data?.location?.address}
                      </Text>
                    </View>
                    <View style={styles.priceLabelStyle}>
                      <Text style={styles.priceStyle}>
                        {data?.currency} {data?.price}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: "4%" }}>
              <View
                style={{
                  width: 30,
                  backgroundColor: CONSTANTS.COLORS.PRIMARY,
                }}
              />
              <View style={{ paddingLeft: "2%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <Text
                      style={[
                        styles.bookNameStyle,
                        { marginBottom: 0, fontSize: 18 },
                      ]}
                    >
                      {token?.first_name + " " + token?.last_name}
                    </Text>
                    <Text style={styles.contentStyle}>
                      {data?.sellers_contact_number || "-"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, padding: "5%" }}>
              <Text
                style={[
                  styles.contentStyle,
                  { textAlign: "justify", fontSize: 15 },
                ]}
              >
                {data?.description}
              </Text>
            </View>
            <ButtonFilled
              title="Publish Book Listing"
              onPress={() => {
                postImages();
              }}
            />
            <ButtonFilled
              title="Back to edit"
              customStyle={{ backgroundColor: CONSTANTS.COLORS.GRAY }}
              onPress={() => {
                goBack(props, 1);
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

//make this component available to the app
export default ConfirmBookListing;
