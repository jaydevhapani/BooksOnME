import { apiCall_get, apiCall_post_withHeaders } from "../../utils/apis";
import { API } from "../../utils/URLs";
import { showAlert } from "../../utils/utils";
import { RESET_REDUX, SAVE_TOKEN, SAVE_USER_DETAILS } from "../actionTypes";
import { persistor } from "./../../redux/store";
import firestore from "@react-native-firebase/firestore";

export const resetRedux = (value) => {
  return {
    type: RESET_REDUX,
    payload: value,
  };
};

export const createUser = async (token) => {
  try {
    const isExist = await firestore().collection(token?.id).get();
    console.log(isExist.empty);
    if (isExist.empty) {
      const users = await firestore().collection("Users").doc(token?.id).set({
        Groups: [],
      });
      console.log(users);
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveToken = (value) => {
  return {
    type: SAVE_TOKEN,
    payload: value,
  };
};

export const saveUserDetails = (value) => {
  return {
    type: SAVE_USER_DETAILS,
    payload: value,
  };
};

export const DeleteAccount = (user_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };

      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.delete_user,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        persistor.purge();
        persistor.flush();
        dispatch(resetRedux());
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
      }
    } catch (error) {}
  };
};
export const signUp = (body) => {
  return async (dispatch) => {
    try {
      let formdata = new FormData();
      formdata.append("email", body?.email);
      formdata.append("password", body?.password);
      formdata.append("cpassword", body?.confirmPassword);
      formdata.append("first_name", body?.firstName);
      formdata.append("last_name", body?.lastName);
      formdata.append("latitude", body?.lat);
      formdata.append("longitude", body?.long);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", body);
      let res = await apiCall_post_withHeaders(API.register, formdata, headers);
      console.log("resss", res.data.payment_url);
      if (res.data.status == "success") {
        return res.data.payment_url;
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      let device_token =
        "efaTv-aUSvOamYWSJkWSMv:APA91bHniUMiwlki_YTS16pMtLZLPiORtYR6esW77hZuJG9S1pKMe-y9e1BUqPQiK4SV2-o-3x94G77f8SwQbSI7Sl8V8AFEEqv8Pq34zds0lucztlExp8ziaCjLpR9_OWisxWelac_Z";
      params.append("email", email);
      params.append("password", password);
      params.append("device_token", device_token);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(API.login, params, headers);
      console.log("resss", res.data);
      if (res.data.status == "success") {
        createUser(res.data.data);

        dispatch(saveToken(res.data.data));
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      let params = new FormData();

      params.append("email", email);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.forgotPassword,
        params,
        headers
      );
      console.log("resss", res);
      if (res.data.status == "success") {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const changePassword = (password, confirmPassword, uuid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("new_password", password);
      params.append("new_cpassword", confirmPassword);
      params.append("uuid", uuid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.change_password,
        params,
        headers
      );
      console.log("resss", res);
      if (res.data.status == "success") {
        return true;
      } else {
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};
