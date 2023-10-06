import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CONSTANTS from '../utils/constants';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import NotificationDetails from '../screens/NotificationDetails';

const Stack = createStackNavigator();

export default function NotificationNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENLIST.NOTIFICATION_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.NOTIFICATION_SCREEN}
        component={Notifications}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.NOTIFICATION_DETAIL}
        component={NotificationDetails}
      />
    </Stack.Navigator>
  );
}
