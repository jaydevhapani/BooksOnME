import {StyleSheet} from 'react-native';
import CONSTANTS from '../utils/constants';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    // alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: CONSTANTS.COLORS.PRIMARY,
  },
  iconStyle: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 100,
  },
  notificationContainer: {
    flex: 1,
    paddingLeft: '6%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  fontStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.BLACK,
  },
});

//make this component available to the app
export default styles;
