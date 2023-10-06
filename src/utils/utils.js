import NetInfo from "@react-native-community/netinfo";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import CONSTANTS from "./constants";
import axios from "axios";
import dynamicLinks, { firebase } from "@react-native-firebase/dynamic-links";

export async function buildLink(id) {
  try {
    const link = await dynamicLinks().buildShortLink({
      link: "https://booksonapps.page.link/mKfG?groupId=" + id,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: "https://booksonapps.page.link",
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      android: {
        packageName: "com.booksonapp",
      },
    });
    console.log(link);
    return link;
  } catch (error) {
    console.log(error);
  }
}

export function navigationWithStackClear(ScreenName, props) {
  props.navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: ScreenName }],
    })
  );
}

export function navigationToScreen(ScreenName, props, passObject) {
  props.navigation.navigate(ScreenName, passObject);
}

export function ReplaceToScreen(ScreenName, props, passObject) {
  props.navigation.replace(ScreenName, passObject);
}

export function showAlert(title, message) {
  Alert.alert(title, message);
}

export function goBack(props, num = 1) {
  props.navigation.pop(num);
}

export function resetNavigation(props) {
  props.navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: CONSTANTS.SCREENLIST.ROOT }],
    })
  );
}

export function isValidOtp(number) {
  const tempNumber = number.trim();
  let isNumCheck = true;
  for (let count = 0; count < tempNumber.length; count++) {
    const NumberCharacter = tempNumber.charAt(count);
    if (NumberCharacter < "0" || NumberCharacter > "9") {
      isNumCheck = false;
      break;
    }
  }
  return isNumCheck;
}

export function isValidNumber(number) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (number.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

export function isValidateEmail(emailId) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
  if (re.test(String(emailId).toLowerCase())) {
    return true;
  }
  return false;
}

export function showToast_success(title, message, _onPress = () => {}) {
  return Toast.show({
    type: "success",
    text1: title,
    text2: message,
    position: "top",
    onPress: _onPress,
  });
}

export function showToast_error(title, message, _onPress = () => {}) {
  return Toast.show({
    type: "error",
    text1: title,
    text2: message,
    position: "top",
    onPress: _onPress,
  });
}

export function showToast_info(title, message, _onPress = () => {}) {
  return Toast.show({
    type: "info",
    text1: title,
    text2: message,
    position: "top",
    onPress: _onPress,
  });
}

export function ifDatesSameDay(date1, date2) {
  var d1 = new Date(date1);
  var d2 = new Date(date2);

  if (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() + 1 === d2.getMonth() + 1 &&
    d1.getDate() === d2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
}

export async function isInternetConnected() {
  let status = await NetInfo.fetch();
  // console.log('isInternetConnected: Connection type', status.type);
  // console.log('isInternetConnected: Is connected?', status.isConnected);
  return status.isConnected;
}

export async function getLocationFromLatlong(lat, long) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${CONSTANTS.GOOGLE_PLACES_API_KEY}`;
  let res = await axios.get(url);
  console.log(res);
}

export const isImage = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

// export function checkURL(url) {
//   if (typeof url == "string") {
//     console.log(url?.match(/\.(jpeg|jpg|gif|png)$/) != null);
//     return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
//   } else {
//     return false;
//   }
// }
export function checkURL(string) {
  if (typeof string == "string") {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  } else {
    return false;
  }
}
