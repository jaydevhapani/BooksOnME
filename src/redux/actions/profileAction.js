import { apiCall_get, apiCall_post_withHeaders } from "../../utils/apis";
import { API } from "../../utils/URLs";
import { isImage, showAlert } from "../../utils/utils";
import { RESET_REDUX, SAVE_TOKEN, SAVE_USER_DETAILS } from "../actionTypes";

export const UpdateProfile = (body) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("first_name", body?.firstName);
      params.append("last_name", body?.lastName);
      params.append("user_id", body?.user_id);
      params.append("mobile_number", body?.mobile);
      params.append("lat", body?.location?.latitude);
      params.append("long", body?.location?.longitude);
      params.append("city", body?.location?.address?.split(",")[0] || "");
      params.append("province", body?.location?.address?.split(",")[1] || "");
      params.append("suburb", body?.location?.address?.split(",")[2] || "");

      if (!isImage(body?.image?.path)) {
        params.append("profile_photo", {
          name:
            body?.image?.filename ||
            body?.image?.path.substring(body?.image?.path.lastIndexOf("/") + 1),
          type: body?.image?.mime,
          uri: body?.image?.path,
        });
      }
      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("params", params);
      let res = await apiCall_post_withHeaders(
        API.update_profile_details,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getProfile = (id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();

      params.append("user_id", id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("params", params);
      let res = await apiCall_post_withHeaders(
        API.get_profile_details,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getFollowers = (id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();

      params.append("user_id", id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("params", params);
      let res = await apiCall_post_withHeaders(API.followers, params, headers);
      if (res.data.status == "success") {
        return res.data.data.data.followers;
      } else {
        showAlert("Failed", res.data.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
