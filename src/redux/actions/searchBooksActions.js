import { apiCall_get, apiCall_post_withHeaders } from "../../utils/apis";
import { API } from "../../utils/URLs";
import { showAlert } from "../../utils/utils";
import {
  SET_BANNERS,
  SET_BOOKS,
  SET_GENRES,
  SET_LATEST_BOOKS,
  SET_SELLERS,
  SET_MY_BOOKS,
} from "../actionTypes";

export const setBooks = (data) => {
  return {
    type: SET_BOOKS,
    payload: data,
  };
};

export const searchBookByTitle = (lat, long, distance, title) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("latitude", lat);
      params.append("longitude", long);
      params.append("distance", distance);
      params.append("booktitle", title);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.get_title_near_by,
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

export const searchBookByAuthor = (lat, long, distance, author) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("latitude", lat);
      params.append("longitude", long);
      params.append("distance", distance);
      params.append("author", author);

      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let res = await apiCall_post_withHeaders(
        API.get_author_book_near_by,
        params,
        headers
      );
      console.log("resss", res.data.data);
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

export const searchBookByISBN = (lat, long, distance, isbn) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("latitude", lat);
      params.append("longitude", long);
      params.append("distance", distance);
      params.append("isbn_number", isbn);

      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let res = await apiCall_post_withHeaders(
        API.get_isbn_number_book_near_by,
        params,
        headers
      );
      console.log("resss", res.data.data);
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

export const searchSellerByName = (name) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("seller_name", name);

      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let res = await apiCall_post_withHeaders(
        API.search_seller_by_name,
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
