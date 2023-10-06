import {StyleSheet} from 'react-native';
import CONSTANTS from '../utils/constants';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    paddingBottom: '5%',
  },
  inputHeaderStyle: {
    fontSize: 15,
    width: '85%',
    alignSelf: 'center',
  },
});
//make this component available to the app
export default styles;
