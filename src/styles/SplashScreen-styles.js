import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
import CONSTANTS from '../utils/constants';

import {wp} from '../utils/responsive';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor: CONSTANTS.COLORS.WHITE,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  bgStyle: {width: '100%', height: '100%'},
  logoStyle: {
    top: wp('30%'),
    width: wp('70%'),
    alignSelf: 'center',
    height: wp('20%'),
  },
});
export default styles;
