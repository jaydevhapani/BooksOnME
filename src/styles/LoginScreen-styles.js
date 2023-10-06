import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
import CONSTANTS from '../utils/constants';

import {wp} from '../utils/responsive';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.WHITE,
    justifyContent: 'flex-end',
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
    paddingVertical: '6%',
  },
  titleStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: wp('4.5%'),
    color: CONSTANTS.COLORS.PRIMARY,
  },
  subTitleStyle: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: wp('4%'),
    color: CONSTANTS.COLORS.GRAY,
  },
  forgotPaswordStyle: {
    paddingVertical: '5%',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    color: CONSTANTS.COLORS.PRIMARY,
  },
});
export default styles;
