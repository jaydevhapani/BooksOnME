import {StyleSheet} from 'react-native';
import CONSTANTS from '../utils/constants';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    // alignItems: 'center',
  },
  bookNameStyle: {
    width: '100%',
    paddingHorizontal: 10,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 16,
    textAlign: 'center',
  },
});

//make this component available to the app
export default styles;
