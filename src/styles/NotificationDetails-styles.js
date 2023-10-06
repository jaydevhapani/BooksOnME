import {StyleSheet} from 'react-native';
import CONSTANTS from '../utils/constants';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    // alignItems: 'center',
  },
  sectionTitleStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontWeight: '300',
    color: CONSTANTS.COLORS.BLACK,
    paddingHorizontal: '2%',
  },
  fontStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.BLACK,
  },
});

//make this component available to the app
export default styles;
