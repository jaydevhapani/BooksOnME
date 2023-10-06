import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CONSTANTS from "../utils/constants";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import ForgotPassword from "../screens/ForgotPassword";
import ForgotPasswordOtp from "../screens/ForgotPasswordOtp";
import ForgotPasswordConfirm from "../screens/ForgotPasswordConfirm";
import MyWishList from "../screens/MyWishList";
import WishListDetails from "../screens/WishListDetails";
import SearchWishList from "../screens/SearchWishList";
import WishListTitleSearch from "../screens/WishListTitleSearch";
import MyFollowers from "../screens/MyFollowers";
import AboutApp from "../screens/AboutApp";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import WishListSearchResults from "../screens/WishListSearchResult";
import SellersScreen from "../screens/SellersScreen";
import PaymentGateway from "../screens/PaymentGateway";

const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENLIST.PROFILE_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PROFILE_SCREEN}
        component={Profile}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.EDIT_PROFILE_SCREEN}
        component={EditProfile}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PAYMENT_GATEWAY_SCREEN}
        component={PaymentGateway}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FORGOT_PASSWORD_OTP_SCREEN}
        component={ForgotPasswordOtp}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FORGOT_PASSWORD_CONFIRM_SCREEN}
        component={ForgotPasswordConfirm}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.MY_WISH_LIST}
        component={MyWishList}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.MY_WISH_LIST_DETAILS}
        component={WishListDetails}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SELLER_DETAILS}
        component={SellersScreen}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_WISHLIST}
        component={SearchWishList}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.WISH_LIST_SEARCH_TITLE}
        component={WishListTitleSearch}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.WISH_LIST_SEARCH_RESULTS}
        component={WishListSearchResults}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.MY_FOLLOWERS}
        component={MyFollowers}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.ABOUT_APP}
        component={AboutApp}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PRIVACY_POLICY}
        component={PrivacyPolicy}
      />
    </Stack.Navigator>
  );
}
