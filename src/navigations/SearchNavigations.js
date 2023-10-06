import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CONSTANTS from '../utils/constants';
import Home from '../screens/Home';
import Search from '../screens/Search';
import SearchWithType from '../screens/SearchWithTypes';
import SearchTypeResults from '../screens/SearchTypeResults';

const Stack = createStackNavigator();

export default function SearchNavigations() {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENLIST.SEARCH_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_SCREEN}
        component={Search}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES}
        component={SearchWithType}
      />
      <Stack.Screen
        name={CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS}
        component={SearchTypeResults}
      />
    </Stack.Navigator>
  );
}
