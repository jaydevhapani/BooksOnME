import {StyleSheet} from 'react-native';
import CONSTANTS from '../utils/constants';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    // alignItems: 'center',
  },
  searchWordStyle: {
    textAlign: 'center',
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 16,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
});

//make this component available to the app
export default styles;
