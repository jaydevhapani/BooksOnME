import { StyleSheet } from "react-native";
import CONSTANTS from "../utils/constants";
import { wp } from "../utils/responsive";

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    paddingBottom: 20,
    // alignItems: 'center',
  },
  searchWordStyle: {
    textAlign: "center",
    color: CONSTANTS.COLORS.BLACK,
    fontSize: 16,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
  chatHeaderStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    width: "100%",
    paddingHorizontal: "2%",
    backgroundColor: CONSTANTS.COLORS.PRIMARY,
  },
  textStyle: {
    fontSize: wp("3.5%"),
    width: "100%",
    color: CONSTANTS.COLORS.WHITE,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
  dropdownStyle: {
    backgroundColor: CONSTANTS.COLORS.PRIMARY,
    width: wp("32%"),
    height: 0,
    minHeight: 32,
    top: -15,
    borderWidth: 1,
    borderColor: CONSTANTS.COLORS.WHITE,
  },
  customeDropdownStyle: {
    borderWidth: 1,
    borderColor: CONSTANTS.COLORS.WHITE,

    backgroundColor: CONSTANTS.COLORS.PRIMARY,
    width: wp("32%"),
    top: 25,
  },
  customlistItemlabelStyle: {
    paddingVertical: 2,
    borderWidth: 1,
    // height: 25,
    justifyContent: "center",
    borderColor: CONSTANTS.COLORS.WHITE,
    borderRadius: 15,
    fontSize: wp("3%"),
    width: "30%",
    color: CONSTANTS.COLORS.WHITE,
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
  },
});

//make this component available to the app
export default styles;
