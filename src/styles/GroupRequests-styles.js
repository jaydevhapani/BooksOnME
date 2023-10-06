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
  logoStyle: {
    width: wp('70%'),
    alignSelf: 'center',
    height: wp('20%'),
  },
  secondaryContainer: {justifyContent: 'center', flex: 1},
  appTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  titleStyle: {
    paddingTop: '8%',
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: wp('5%'),
    color: CONSTANTS.COLORS.BLACK,
  },
  subTitleStyle: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: wp('3.5%'),
    color: CONSTANTS.COLORS.BLACK,
  },
  forgotPaswordStyle: {
    paddingVertical: '5%',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    color: CONSTANTS.COLORS.PRIMARY,
  },
});
export default styles;
