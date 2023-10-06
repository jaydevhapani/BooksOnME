import { apiCall_get, apiCall_post_withHeaders } from "../../utils/apis";
import { API } from "../../utils/URLs";
import { showAlert } from "../../utils/utils";
import { RESET_REDUX, SAVE_TOKEN, SAVE_USER_DETAILS } from "../actionTypes";

export const addsingleBook = (val) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", val?.user_id);
      params.append("book_name", val?.name);
      params.append("author", val?.author);
      params.append("genre", val?.genre);
      params.append("book_description", val?.description);
      params.append("isbn_number", val?.isbn || "");
      params.append("book_price", val?.price);
      params.append("book_location", val?.location?.address);
      params.append("book_images", JSON.stringify(val?.uploadedImages));
      params.append("seller_contact", val?.sellers_contact_number || "");
      params.append("publish_type", "single");
      params.append("currency", val?.currency);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.publish_single_book,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const editsingleBook = (val) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("book_id", val?.book_id);
      params.append("user_id", val?.user_id);
      params.append("book_name", val?.name);
      params.append("author", val?.author);
      params.append("genre", val?.genre);
      params.append("book_description", val?.description);
      params.append("isbn_number", val?.isbn || "");
      params.append("book_price", val?.price);
      params.append("book_location", val?.location?.address);
      if (val?.uploadedImages?.length > 0) {
        params.append("book_images", JSON.stringify(val?.uploadedImages));
      }
      params.append("seller_contact", val?.sellers_contact_number || "");
      params.append("publish_type", "single");
      params.append("currency", val?.currency);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.update_publish_single_book,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const addBulkBooks = (val) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", val?.user_id);
      params.append("list_title", val?.name);
      params.append("book_description", val?.description);
      params.append("price", val?.price);
      params.append("location", val?.location?.address);
      if (val?.uploadedImages?.length > 0) {
        params.append("images", JSON.stringify(val?.uploadedImages));
      }
      params.append("seller_contact_number", val?.sellers_contact_number);
      params.append("publish_type", "bulk");
      params.append("currency", val?.currency);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.publish_bulk_books,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const editBulkBooks = (val) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("book_id", val?.book_id);

      params.append("user_id", val?.user_id);
      params.append("list_title", val?.name);
      params.append("book_description", val?.description);
      params.append("price", val?.price);
      params.append("location", val?.location?.address);
      params.append("images", JSON.stringify(val?.uploadedImages));
      params.append("seller_contact_number", val?.sellers_contact_number);
      params.append("publish_type", "bulk");
      params.append("currency", val?.currency);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log("--->", params);
      let res = await apiCall_post_withHeaders(
        API.update_publish_bulk_books,
        params,
        headers
      );
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const uploadImages = (val) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      if (val.length > 0) {
        val?.reverse().map((item, index) => {
          params.append(`images[${index}]`, item);
        });
      }
      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let res = await apiCall_post_withHeaders(API.addImages, params, headers);
      console.log("resss", res.data);
      if (res.data.status == "success") {
        return res.data.data;
      } else {
        console.log(res.data.data);
        showAlert("Failed", res.data.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};
