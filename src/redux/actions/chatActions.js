import { Alert } from "react-native";
import { apiCall_get, apiCall_post_withHeaders } from "../../utils/apis";
import { API } from "../../utils/URLs";
import { showAlert } from "../../utils/utils";

export const CreateGroup = (body) => {
  return async (dispatch) => {
    try {
      let params = new FormData();

      params.append("group_name", body?.name);
      params.append("group_latitude", body?.location?.lat);
      params.append("group_longitude", body?.location?.long);
      params.append("group_location", body?.location?.address);
      params.append("type", body?.groupType);
      params.append("user_id", body?.user_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.create_user_group,
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

export const searchPrivateGroup = (body) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("search_text", body?.text);
      params.append("type", body?.groupType);
      params.append("user_id", body?.user_id);
      if (body?.groupType === "public") {
        params.append("latitude", body?.lat);
        params.append("longitude", body?.long);
      }

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.search_user_group_private,
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

export const joinGroup = (body) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("group_id", body?.group_id);
      params.append("user_id", body?.user_id);
      params.append("group_type", body?.group_type);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(API.join_group, params, headers);
      console.log("resss", res);
      if (res.data.status == "success") {
        Alert.alert("", res.data.message);
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
