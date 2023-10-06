import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CONSTANTS from "../utils/constants";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import JoinedGroups from "../screens/JoinedGroups";
import ChatDetails from "../screens/ChatDetails";
import SearchPublicGroups from "../screens/SearchPublicGroups";
import SearchPrivateGroups from "../screens/SearchPrivateGroups";
import SearchPublicGroupsInput from "../screens/SearchPublicGroupsInput";
import GroupSearchResults from "../screens/GroupSearchResults";
import SearchPrivateGroupsInput from "../screens/SearchPrivateGroupsInput";
import CreateGroups from "../screens/CreateGroups";
import GroupRequests from "../screens/GroupRequests";
import PrivateChats from "../screens/PrivateChats";
import PrivateChatDetails from "../screens/PrivateChatDetails";

const Stack = createStackNavigator();

export default function ChatNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENLIST.CHAT_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={CONSTANTS.SCREENLIST.CHAT_SCREEN} component={Chat} />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.JOINED_GROUPS}
        component={JoinedGroups}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PRIVATE_CHATS}
        component={PrivateChats}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.PRIVATE_CHATS_DETAILS}
        component={PrivateChatDetails}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.CHAT_DETAILS}
        component={ChatDetails}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_PUBLIC_GROUPS}
        component={SearchPublicGroups}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_PRIVATE_GROUPS}
        component={SearchPrivateGroups}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_PUBLIC_GROUPS_INPUT}
        component={SearchPublicGroupsInput}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.GROUP_SEARCH_RESULTS}
        component={GroupSearchResults}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_PRIVATE_GROUPS_INPUT}
        component={SearchPrivateGroupsInput}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.CREATE_GROUP}
        component={CreateGroups}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.GROUP_REQUESTS}
        component={GroupRequests}
      />
    </Stack.Navigator>
  );
}
