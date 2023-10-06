import { StyleSheet } from "react-native";
import CONSTANTS from "../utils/constants";

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.COLORS.WHITE,
    paddingBottom: "5%",
  },
  inputHeaderStyle: {
    fontSize: 15,
    width: "85%",
    color: CONSTANTS.COLORS.BLACK,
    alignSelf: "center",
  },
  textContainer: {
    marginVertical: "2%",
    width: "85%",
    alignSelf: "center",
    height: 65,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    justifyContent: "center",
    padding: 5,
  },
});
//make this component available to the app
export default styles;
