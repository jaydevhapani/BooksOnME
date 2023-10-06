import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import CONSTANTS from "../utils/constants";
import Genres from "../screens/Genres";
import BooksByGenre from "../screens/BooksByGenre";
import LatestListings from "../screens/LatestListings";
import RecommendedSellers from "../screens/RecommendedSellers";
import GenreFilter from "../screens/GenreFilter";
import FilterLatestListings from "../screens/FilterLatestListings";
import FilterRecommendedSellers from "../screens/FilterRecommendedSeller";
import { Linking } from "react-native";
import { navigationToScreen } from "../utils/utils";
import SelectGenre from "../screens/SelectGenre";
import SearchTypeResults from "../screens/SearchTypeResults";
import BookDetails from "../screens/BookDetails";
import SellersScreen from "../screens/SellersScreen";
import PrivateChatDetails from "../screens/PrivateChatDetails";
import PrivateChats from "../screens/PrivateChats";
import MyWishList from "../screens/MyWishList";
import EditBook from "../screens/EditBook";

const Stack = createStackNavigator();

export default function HomeNavigation(props) {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENLIST.HOME_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={CONSTANTS.SCREENLIST.HOME_SCREEN} component={Home} />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.BOOK_GENRES}
        component={Genres}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SELECT_GENRE}
        component={SelectGenre}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.BOOK_DETAIL}
        component={BookDetails}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PRIVATE_CHATS}
        component={PrivateChats}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.EDIT_SINGLE_BOOK}
        component={EditBook}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.MY_WISH_LIST}
        component={MyWishList}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PRIVATE_CHATS_DETAILS}
        component={PrivateChatDetails}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SELLER_DETAILS}
        component={SellersScreen}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.BOOKS_BY_GENRES}
        component={BooksByGenre}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS}
        component={SearchTypeResults}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.LATEST_LISTINGS}
        component={LatestListings}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.RECOMMENDED_SELLERS}
        component={RecommendedSellers}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.GENRE_FILTER}
        component={GenreFilter}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FILTER_LATEST_LISTINGS}
        component={FilterLatestListings}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.FILTER_RECOMM_SELLERS}
        component={FilterRecommendedSellers}
      />
    </Stack.Navigator>
  );
}
