import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CONSTANTS from "../utils/constants";
import Home from "../screens/Home";
import MyLibrary from "../screens/MyLibrary";
import AddNewListings from "../screens/AddNewListings";
import AddSingleBook from "../screens/AddSingleBook";
import SelectGenre from "../screens/SelectGenre";
import ConfirmBookListing from "../screens/ConfirmBookListing";
import EditBook from "../screens/EditBook";

const Stack = createStackNavigator();

export default function MyLibraryNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENLIST.MY_LIBRARY}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.MY_LIBRARY}
        component={MyLibrary}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.ADD_NEW_LISTING}
        component={AddNewListings}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.EDIT_SINGLE_BOOK}
        component={EditBook}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.ADD_SINGLE_BOOK}
        component={AddSingleBook}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SELECT_GENRE}
        component={SelectGenre}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.CONFIRM_BOOK_LISTING}
        component={ConfirmBookListing}
      />
    </Stack.Navigator>
  );
}
