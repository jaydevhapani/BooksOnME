import {StyleSheet} from 'react-native';
import CONSTANTS from '../utils/constants';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
  },
  imagesContainer: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  imagesStyle: {
    width: 70,
    marginHorizontal: '5%',
    height: 70,
    backgroundColor: CONSTANTS.COLORS.LIGHTGRAY,
  },
  bookNameStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: 20,
    marginBottom: '2%',
    color: CONSTANTS.COLORS.BLACK,
  },
  priceStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: 20,
    color: CONSTANTS.COLORS.BLACK,
  },
  contentStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    fontSize: 16,
    color: CONSTANTS.COLORS.GRAY,
  },
  priceLabelStyle: {
    minWidth: 131,
    padding: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
