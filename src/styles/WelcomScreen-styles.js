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
    flex: 0.6,
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: wp('5%'),
    color: CONSTANTS.COLORS.PRIMARY,
  },
  subTitleStyle: {
    paddingVertical: '4%',
    textAlign: 'center',
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: wp('4.5%'),
    color: CONSTANTS.COLORS.GRAY,
  },
});
export default styles;
