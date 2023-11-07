//import liraries
import React, { Component, useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import BannerSwiper from "../components/BannerSwiper";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import SelectionSlider from "../components/SelectionSlider";
import SellerList from "../components/SellerList";
import styles from "../styles/Profile-styles";
import CONSTANTS from "../utils/constants";
import ButtonFilled from "../components/ButtonFilled";
import { navigationToScreen } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { resetRedux, saveToken } from "./../redux/actions/authActions";
import { persistor } from "./../redux/store";
import { getProfile } from "../redux/actions/profileAction";
import { useIsFocused } from "@react-navigation/core";
import FastImage from "react-native-fast-image";
import { subscribe, unsubscribe } from "../redux/actions/commonActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  isIosStorekit2,
  PurchaseError,
  requestSubscription,
  useIAP,
} from "react-native-iap";

// create a component
const Profile = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const isFocused = useIsFocused();
  const [subscribed, setSubscribe] = useState(false);

  const signOut = async () => {
    persistor.purge();
    persistor.flush();
    dispatch(resetRedux());
  };
  useEffect(() => {
    console.log(
      token?.expired_at,
      moment(token?.expired_at, "YYYY-MM-DD").diff(moment(), "minutes")
    );
    if (isFocused && token?.id) {
      fetchProfile(token?.id);
      if (token?.expired_at) {
        AsyncStorage.setItem("SUB_EXP", token.expired_at);
        if (
          moment(token?.expired_at, "YYYY-MM-DD").diff(moment(), "minutes") < 0
        ) {
          dispatch(unsubscribe(token?.id));

          let d = token;
          token.paid = "0";
          dispatch(saveToken(token));
          AsyncStorage.removeItem("SUB_EXP");
          setSubscribe(false);
        }
      }
    }
  }, [isFocused]);

  const fetchProfile = async (id) => {
    const res = await dispatch(getProfile(id));
    console.log(res);
    if (res) {
      dispatch(saveToken(res));
      setProfileData(res);

      if (res?.paid == "1") {
        setSubscribe(true);
      } else {
        setSubscribe(false);
      }
    }
  };

  const SubscribeNew = async () => {
    try {
      const res = await dispatch(unsubscribe(token?.id));
      if (res) {
        let user = token;
        user.paid = token?.paid == "1" ? "0" : "1";
        dispatch(saveToken(user));
        setSubscribe(subscribed ? false : true);
      }
    } catch (error) {}
  };
  const Subscribe = () => {
    console.log(token);

    if (Platform.OS == "android") {
      const res = `https://booksonapp.co.za/payment?user_id=${token?.uuid}`;
      navigationToScreen(CONSTANTS.SCREENLIST.PAYMENT_GATEWAY_SCREEN, props, {
        url: res,
        type: "sub",
      });
    } else {
      // letsDoIosInAppPurches();
    }
  };

  //only for ios handler of InAPpPurches
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
  } = useIAP();

  //WHEN CLICK ON SUBCRIPTION
  const letsDoIosInAppPurches = (productId) => {
    handleBuySubscription(productId); //here you have to pass productId mandotrotuy.
  };

  //ownedSubscriptions you can get your subction parts
  const [ownedSubscriptions, setOwnedSubscriptions] = useState([]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: "" }).then(() => {
        console.log("iosSubsctption Data :: ", subscriptions);
      }); //Here you have to add your product_id from ios
    } catch (error) {
      errorLog({ message: "handleGetSubscriptions", error });
    }
  };

  const handleBuySubscription = async (productId) => {
    try {
      // here you have to pass product Id from ios
      await requestSubscription({
        sku: productId,
      });
    } catch (error) {
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        errorLog({ message: "handleBuySubscription", error });
      }
    }
  };

  useEffect(() => {
    //getSubScrioption from Server
    handleGetSubscriptions();
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: true,
          }).then(() => {
            // Here you have complete your process with your bk
            alert("Payment Successfull.");
            const res = dispatch(subscribe(token?.id));
            if (res) {
              let user = token;
              user.paid = "1";
              dispatch(saveToken(user));
              fetchProfile(token?.id);
            }
          });

          setOwnedSubscriptions((prev) => [
            ...prev,
            currentPurchase?.productId,
          ]);
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          errorLog({ message: `[${error.code}]: ${error.message}`, error });
        } else {
          errorLog({ message: "handleBuyProduct", error });
        }
      }
    };
    checkCurrentPurchase();
  }, [Platform.OS == "ios" && currentPurchase & finishTransaction]);

  return (
    <View style={styles.container}>
      <Header showHeaderLeft={false} />
      <CenteredSectionHeader
        sectionTitle="MY PROFILE"
        customLabelStyle={{ paddingHorizontal: 30 }}
      />
      <ScrollView>
        <View style={[styles.container]}>
          <View style={styles.profileDetailContainer}>
            <View style={styles.imageStyles}>
              {profileData?.profile_photo ? (
                <FastImage
                  style={[styles.imageStyles, { borderWidth: 0 }]}
                  source={{ uri: profileData?.profile_photo, priority: "high" }}
                />
              ) : (
                <Text style={{ color: CONSTANTS.COLORS.GRAY }}>Image</Text>
              )}
            </View>
            <View style={styles.profileNameContainer}>
              <Text style={[styles.titleStyle, { fontSize: 16 }]}>
                {profileData?.first_name + " " + profileData?.last_name}
              </Text>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: CONSTANTS.COLORS.GRAY,
                    width: "100%",
                    textAlign: "left",
                  },
                ]}
              >
                {token?.email}
              </Text>
              <ButtonFilled
                mode="CONTAINED"
                onPress={() => {
                  navigationToScreen(
                    CONSTANTS.SCREENLIST.EDIT_PROFILE_SCREEN,
                    props,
                    { data: profileData }
                  );
                }}
                title="Edit My Information"
                customStyle={[
                  {
                    width: "100%",
                    height: 30,
                    borderRadius: 5,
                  },
                ]}
                customFontStyle={styles.fontStyle}
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleStyle}>
              Hey {profileData?.first_name}!
            </Text>
            <ButtonFilled
              mode="OUTLINED"
              onPress={() => {
                navigationToScreen(CONSTANTS.SCREENLIST.MY_WISH_LIST, props, {
                  sellerid: token?.id,
                  type: "MYWISHLIST",
                });
              }}
              title="My Wishlist"
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
            <ButtonFilled
              mode="OUTLINED"
              onPress={() => {
                navigationToScreen(
                  CONSTANTS.SCREENLIST.SEARCH_WISHLIST,
                  props,
                  {}
                );
              }}
              title="Sellers Wishlist"
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
            <ButtonFilled
              onPress={() =>
                navigationToScreen(CONSTANTS.SCREENLIST.MY_FOLLOWERS, props, {})
              }
              mode="OUTLINED"
              title="My Followers"
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
          </View>
          <View style={{ paddingTop: "4%" }}>
            <Text style={styles.titleStyle}>INFORMATION</Text>
            <ButtonFilled
              mode="OUTLINED"
              onPress={() =>
                navigationToScreen(CONSTANTS.SCREENLIST.ABOUT_APP, props, {})
              }
              title="About This App"
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
            <ButtonFilled
              mode="OUTLINED"
              onPress={() =>
                navigationToScreen(
                  CONSTANTS.SCREENLIST.PRIVACY_POLICY,
                  props,
                  {}
                )
              }
              title="Privacy Policy"
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
            <ButtonFilled
              mode="CONTAINED"
              title="Contact Admin"
              onPress={() => {
                Linking.openURL("mailto:support@luna9.co.za");
              }}
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
            <ButtonFilled
              mode="CONTAINED"
              title={token?.paid == "1" ? "Unsubscribe" : "Subscribe"}
              onPress={() => {
                console.log(token);
                if (Platform.OS == "android") {
                  if (token?.paid == "0") {
                    Subscribe();
                  } else {
                    SubscribeNew();
                  }
                }
                //this condition is only for ios
                if (Platform.OS == "ios") {
                  letsDoIosInAppPurches(subscriptions[0].productId); // we have one subscription that's why.
                }
              }}
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
            <ButtonFilled
              onPress={() => {
                signOut();
              }}
              mode="CONTAINED"
              title="Logout"
              customStyle={styles.buttonStyle}
              customFontStyle={styles.fontStyle}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default Profile;
