import * as React from "react";
import {
  Image,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Linking,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import CONSTANTS from "../utils/constants";
import HomeNavigations from "./HomeNavigations";
import MyLibraryNavigation from "./MyLibraryNavigations";
import SearchNavigations from "./SearchNavigations";
import NotificationNavigation from "./NotificationNavigations";
import ProfileNavigation from "./ProfileNavigations";
import ChatNavigation from "./ChatNavigations";
import {
  HomeIcon,
  MyLibraryIcon,
  SearchIcon,
  ChatIcon,
  ProfileIcon,
  NotificationIcon,
  HomeIconFill,
  MyLibraryIconFill,
  SearchIconFill,
  ProfileIconFill,
  NotificationIconFill,
  ChatIconFill,
} from "../../assets";
import { buildLink, navigationToScreen, resetNavigation } from "../utils/utils";
import { joinGroup } from "../redux/actions/chatActions";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [showtab, setTabVisible] = React.useState(true);
  const user = useSelector((state) => state.authReducer.token);
  const getTabBarVisibility = (routeState) => {
    const allRoutes = !!routeState.routes
      ? !!routeState.routes[routeState.index].state
        ? routeState.routes[routeState.index].state
        : ""
      : "";

    const routeName =
      allRoutes !== "" && !!allRoutes.routes
        ? allRoutes.routes[allRoutes.index].name
        : "";

    if (
      routeName === CONSTANTS.SCREENLIST.ADD_NEW_LISTING ||
      routeName === CONSTANTS.SCREENLIST.EDIT_PROFILE_SCREEN ||
      routeName === CONSTANTS.SCREENLIST.ADD_NEW_LISTING ||
      routeName === CONSTANTS.SCREENLIST.ADD_SINGLE_BOOK ||
      routeName === CONSTANTS.SCREENLIST.SELECT_GENRE ||
      routeName === CONSTANTS.SCREENLIST.CONFIRM_BOOK_LISTING ||
      routeName === CONSTANTS.SCREENLIST.CHAT_DETAILS ||
      routeName === CONSTANTS.SCREENLIST.PRIVATE_CHATS ||
      routeName === CONSTANTS.SCREENLIST.PRIVATE_CHATS_DETAILS
    ) {
      return false;
    }

    return true;
  };

  React.useEffect(() => {
    const tempVal = getTabBarVisibility(state);
    setTabVisible(tempVal);
  }, [state]);

  return showtab == true ? (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 60,
        justifyContent: "center",
        shadowColor: "#000",
        width: "100%",
        alignSelf: "center",
        borderBottomWidth: 0,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: CONSTANTS.COLORS.PRIMARY,
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const icon =
          index == 0 ? (
            <HomeIcon />
          ) : index == 1 ? (
            <MyLibraryIcon />
          ) : index == 2 ? (
            <SearchIcon />
          ) : index == 3 ? (
            <NotificationIcon />
          ) : index == 4 ? (
            <ProfileIcon />
          ) : (
            <ChatIcon />
          );
        const selectedIcon =
          index == 0 ? (
            <HomeIconFill />
          ) : index == 1 ? (
            <MyLibraryIconFill />
          ) : index == 2 ? (
            <SearchIconFill />
          ) : index == 3 ? (
            <NotificationIconFill />
          ) : index == 4 ? (
            <ProfileIconFill />
          ) : (
            <ChatIconFill />
          );

        const size =
          index == 0
            ? 22
            : index == 1
            ? 22
            : index == 2
            ? 35
            : index == 3
            ? 22
            : 22;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (user == null || user == undefined) {
            navigation.navigate(CONSTANTS.SCREENLIST.AUTH_SELECTION);
          } else {
            if (!isFocused && !event.defaultPrevented) {
              if (
                route.name === CONSTANTS.SCREENLIST.CHAT_NAVIGATIONS &&
                user.paid === "0"
              ) {
                Alert.alert(
                  "Message",
                  "Please Subscribe to access sellers details"
                );
              } else {
                navigation.navigate(route.name);
              }
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            {isFocused ? selectedIcon : icon}
          </TouchableOpacity>
        );
      })}
    </View>
  ) : null;
}

export default function AppNavigation(props) {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  const handleDynamicLink = (link) => {
    console.log("foreground", link);
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(link.url))) {
      params[match[1]] = match[2];
    }
    console.log(params);
    // Handle dynamic link inside your own application
    if (params?.groupId) {
      // ...navigate to your offers screen
      dispatch(joinGroup({ group_id: params?.groupId, user_id: token?.id }));
    }
  };

  React.useEffect(() => {
    const res = buildLink();
    console.log(res, "new");
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        console.log(link);
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
        while ((match = regex.exec(link.url))) {
          params[match[1]] = match[2];
        }
        console.log(params);
        // Handle dynamic link inside your own application
        if (params?.groupId) {
          // ...navigate to your offers screen
          dispatch(
            joinGroup({ group_id: params?.groupId, user_id: token?.id })
          );
          props.navigation.pop();
        }
      }, []);
  }, []);
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={CONSTANTS.SCREENLIST.HOME_NAV}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={CONSTANTS.SCREENLIST.HOME_NAV}
        component={HomeNavigations}
      />
      <Tab.Screen
        name={CONSTANTS.SCREENLIST.MY_LIBRARY_NAV}
        component={MyLibraryNavigation}
      />
      <Tab.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_NAVIGATIONS}
        component={SearchNavigations}
      />
      <Tab.Screen
        name={CONSTANTS.SCREENLIST.NOTIFICATION_NAV}
        component={NotificationNavigation}
      />
      <Tab.Screen
        name={CONSTANTS.SCREENLIST.PROFILE_NAVIGATION}
        component={ProfileNavigation}
      />
      <Tab.Screen
        name={CONSTANTS.SCREENLIST.CHAT_NAVIGATIONS}
        component={ChatNavigation}
      />
    </Tab.Navigator>
  );
}
