import { StyleSheet } from "react-native";
import CONSTANTS from "../utils/constants";

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
  },
  inputStyle: {
    height: 40,
    borderRadius: 10,
    fontSize: 12,
    textAlign: "center",
  },
  uploadContainer: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 10,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    borderWidth: 1,
  },
  profileDetailContainer: {
    flexDirection: "row",
    paddingVertical: "4%",
    paddingHorizontal: "8%",
    alignItems: "center",
  },
  pickerTextStyle: {
    fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    color: CONSTANTS.COLORS.GRAY,
    fontSize: 12,
    textAlign: "center",
  },
  fontStyle: { textAlign: "center", fontSize: 13 },
  imageStyles: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    height: 100,
    marginLeft: "5%",
    width: "60%",
    borderRadius: 10,
    // borderColor: CONSTANTS.COLORS.PRIMARY,
    // borderWidth: 1,
  },
  pickedImageStyle: {
    width: 30,
    height: 35,
    margin: "4%",
    marginVertical: "3%",
  },
});

export default styles;
