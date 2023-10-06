import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
import CONSTANTS from '../utils/constants';

import {wp} from '../utils/responsive';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.WHITE,
    justifyContent: 'center',
    flex: 1,
  },
  buttonStyle: {height: 45, borderRadius: 10},
});
export default styles;
