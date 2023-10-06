//import liraries
import React, { Component, useState, useRef, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Animated,
  Dimensions,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonFilled from "../components/ButtonFilled";
import Header from "../components/Header";
import styles from "../styles/ConfirmBookListing-styles";
import CONSTANTS from "../utils/constants";
import firestore from "@react-native-firebase/firestore";
import Ionicon from "react-native-vector-icons/FontAwesome";

import {
  getLocationFromLatlong,
  goBack,
  navigationToScreen,
} from "../utils/utils";
import {
  addBulkBooks,
  addsingleBook,
  uploadImages,
} from "../redux/actions/addBookActions";
import Icon from "react-native-vector-icons/Ionicons";
// import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import ImageView from "react-native-image-viewing";
import FastImage from "react-native-fast-image";

// create a component
const BookDetails = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  // const scale = new Animated.Value(1);
  const data = props?.route?.params?.data;
  console.log(data);
  const dispatch = useDispatch();
  const [currentImage, selectImage] = useState(
    data?.images?.length > 0 ? data?.images[0] : ""
  );
  const [uploadedImages, setUploadedImages] = useState([]);
  const [panEnabled, setPanEnabled] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [visible, setIsVisible] = useState(false);

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };
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
        return { name: it.filename, type: it.mime, uri: it.path };
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

  const onZoomEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: true,
  });

  const onZoomStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const messageSeller = async () => {
    try {
      let admin = {
        group_admin_id: data?.user_id,
        admin_name: data?.seller_name || data?.seller_lname || "",
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: 300,
            backgroundColor: CONSTANTS.COLORS.LIGHTGRAY,
          }}
        >
          {/* <PinchGestureHandler
            onGestureEvent={onZoomEvent}
            onHandlerStateChange={onZoomStateChange}
          >
            <Animated.Image
              style={{
                width: Dimensions.get("window").width,
                height: 300,
                transform: [{ scale: scale }],
              }}
              source={{ uri: currentImage }}
            />
          </PinchGestureHandler> */}
          {/* <PanGestureHandler
            onGestureEvent={onPanEvent}
            ref={panRef}
            simultaneousHandlers={[pinchRef]}
            enabled={panEnabled}
            failOffsetX={[-1000, 1000]}
            shouldCancelWhenOutside
          >
            <Animated.View>
              <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={onPinchEvent}
                simultaneousHandlers={[panRef]}
                onHandlerStateChange={handlePinchStateChange}
              > */}
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
          >
            <FastImage
              source={{ uri: currentImage, priority: "normal" }}
              style={{
                width: "100%",
                height: 300,

                // transform: [{ scale }, { translateX }, { translateY }],
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {/* </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler> */}
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={data?.images?.length > 0 ? data.images : []}
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
                  <FastImage
                    style={[
                      styles.imagesStyle,
                      {
                        borderWidth: currentImage?.id == item.id ? 1 : 0,
                        borderColor: CONSTANTS.COLORS.PRIMARY,
                      },
                    ]}
                    source={{ uri: item, priority: "normal" }}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <View style={{ flex: 3.5, paddingTop: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 30,
                  backgroundColor: CONSTANTS.COLORS.PRIMARY,
                }}
              />
              <View style={{ paddingLeft: "2%", width: "86%" }}>
                <Text style={styles.bookNameStyle}>
                  {data?.book_name || ""}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "55%" }}>
                    <Text numberOfLines={1} style={styles.contentStyle}>
                      {data?.book_author || ""}
                    </Text>
                    <Text numberOfLines={1} style={styles.contentStyle}>
                      {data?.book_genre || ""}
                    </Text>
                    <Text numberOfLines={1} style={styles.contentStyle}>
                      {data?.city || ""}
                    </Text>
                  </View>
                  <View style={styles.priceLabelStyle}>
                    <Text style={styles.priceStyle}>
                      {data?.currency || "R"} {data?.price}
                    </Text>
                  </View>
                </View>
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
                  {token?.paid == "1" && (
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          styles.bookNameStyle,
                          { marginBottom: 0, fontSize: 18 },
                        ]}
                      >
                        {data?.seller_name || data?.seller_lname}
                      </Text>
                      {token?.paid == "1" ? (
                        <Text style={styles.contentStyle}>
                          {data?.contact_number}
                        </Text>
                      ) : (
                        <Text style={styles.contentStyle}></Text>
                      )}
                    </View>
                  )}
                  {token?.paid === "1" && (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(data);
                          if (token?.paid == "1") {
                            navigationToScreen(
                              CONSTANTS.SCREENLIST.SELLER_DETAILS,
                              props,
                              {
                                data: {
                                  id: data?.user_id,
                                  seller_name: data?.seller_name,
                                },
                              }
                            );
                          } else {
                            Alert.alert(
                              "Message",
                              "Please Subscribe to access sellers details"
                            );
                          }
                        }}
                        style={{
                          backgroundColor: CONSTANTS.COLORS.PRIMARY,
                          height: 30,
                          paddingHorizontal: 10,
                          justifyContent: "center",
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={[
                            styles.bookNameStyle,
                            {
                              marginBottom: 0,
                              fontSize: 15,
                              color: CONSTANTS.COLORS.WHITE,
                            },
                          ]}
                        >
                          View Library
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {token?.paid === "1" && token?.id !== data?.user_id && (
              <ButtonFilled
                // disabled={seller?.is_following == 1}
                onPress={() => {
                  messageSeller();
                }}
                customStyle={{
                  height: 40,
                  borderRadius: 10,
                  width: "95%",
                  marginVertical: 20,
                }}
                customFontStyle={{ textAlign: "center" }}
                title={"Message Seller"}
              />
            )}
            {token?.paid === "1" &&
              token?.id !== data?.user_id &&
              data?.contact_number && (
                <ButtonFilled
                  // disabled={seller?.is_following == 1}
                  onPress={() => {
                    console.log(data);
                    if (data?.contact_number) {
                      Linking.openURL(
                        `whatsapp://send?text=Hello , I am interested in your book titled ${
                          data?.book_name
                        } from BooksOnApp&phone=${parseInt(
                          data?.contact_number
                        )}`
                      );
                    } else {
                      Alert.alert("", "No contact number found");
                    }
                  }}
                  icon={() => (
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        left: -20,
                        position: "absolute",
                        tintColor: "#fff",
                      }}
                      source={require("../../assets/images/wp.png")}
                    />
                  )}
                  customStyle={{
                    height: 40,
                    borderRadius: 10,
                    width: "95%",
                    marginVertical: 20,
                    marginTop: 0,
                  }}
                  customFontStyle={{ textAlign: "center" }}
                  title={"Contact Seller"}
                />
              )}
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
          </View>
        </View>
      </ScrollView>
      <Header
        customStyle={{ position: "absolute" }}
        onPressBack={() => goBack(props, 1)}
        showHeaderLeft={true}
        rightChildren={[
          token?.id === data?.user_id && (
            <TouchableOpacity
              onPress={() => {
                if (data?.publish_type === "single") {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.EDIT_SINGLE_BOOK,
                    props,
                    { bookData: data, actionType: "SINGLE" }
                  );
                } else {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.EDIT_SINGLE_BOOK,
                    props,
                    { bookData: data, actionType: "BULK" }
                  );
                }
              }}
            >
              <Ionicon
                style={{ paddingEnd: 10 }}
                name="edit"
                size={20}
                color={CONSTANTS.COLORS.PRIMARY}
              />
            </TouchableOpacity>
          ),
        ]}
      />
      <ImageView
        images={[{ uri: currentImage }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

//make this component available to the app
export default BookDetails;
