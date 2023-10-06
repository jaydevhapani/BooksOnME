import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CONSTANTS from "../utils/constants";
import { useSelector } from "react-redux";
import AppNavigation from "./AppNavigations";
import AuthNavigations from "./AuthNavigations";
import SplashScreen from "../screens/SplashScreen";
import { navigationToScreen, ReplaceToScreen } from "../utils/utils";
import { Linking, SafeAreaView } from "react-native";

const Stack = createStackNavigator();

export const MainStack = (props) => {
  const user = useSelector((state) => state.authReducer.token);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    console.log(user);
    if (user == null || user == undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: CONSTANTS.COLORS.WHITE }}>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigations />}
    </SafeAreaView>
  );
};

export const RootStack = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      ReplaceToScreen(CONSTANTS.SCREENLIST.MAIN, props, {});
    }, 2500);
  }, []);

  return (
    <Stack.Navigator
      //starting point
      initialRouteName={CONSTANTS.SCREENLIST.SPLASH}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SPLASH}
        component={SplashScreen}
      />
      <Stack.Screen name={CONSTANTS.SCREENLIST.MAIN} component={MainStack} />
    </Stack.Navigator>
  );
};

const linking = {
  prefixes: ["https://", "https://www.example.com/"],
  config: {
    screens: {
      ROOT: {
        screens: {
          SPLASH: {
            screens: {},
          },
          MAIN: {
            screens: {
              HOME_NAV: {
                path: "/user/:id",
                parse: {
                  id: (id) => `user-${id}`,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default function RootNavigation() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        //starting point
        initialRouteName={CONSTANTS.SCREENLIST.SPLASH}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={CONSTANTS.SCREENLIST.ROOT} component={RootStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
