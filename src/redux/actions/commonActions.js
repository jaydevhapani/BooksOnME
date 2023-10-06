import {
  apiCall_get,
  apiCall_get_withHeaders,
  apiCall_post_withHeaders,
} from "../../utils/apis";
import { API } from "../../utils/URLs";
import { showAlert } from "../../utils/utils";
import {
  SET_BANNERS,
  SET_BOOKS,
  SET_GENRES,
  SET_LATEST_BOOKS,
  SET_SELLERS,
  SET_MY_BOOKS,
  SET_NOTIFICATIONS,
} from "../actionTypes";

export const setBanners = (data) => {
  return {
    type: SET_BANNERS,
    payload: data,
  };
};

export const setGenres = (data) => {
  return {
    type: SET_GENRES,
    payload: data,
  };
};

export const setLatestBooks = (data) => {
  return {
    type: SET_LATEST_BOOKS,
    payload: data,
  };
};

export const setSellers = (data) => {
  return {
    type: SET_SELLERS,
    payload: data,
  };
};

export const setBooks = (data) => {
  return {
    type: SET_BOOKS,
    payload: data,
  };
};

export const setMyBooks = (data) => {
  return {
    type: SET_MY_BOOKS,
    payload: data,
  };
};

export const setNotifications = (data) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: data,
  };
};

export const fetchBanners = () => {
  return async (dispatch) => {
    try {
      let res = await apiCall_get(API.getBanners);
      console.log("resss", res);
      if (res.data.status == "success") {
        dispatch(setBanners(res.data.data));
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

export const fetchGenres = (uuid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("uuid", uuid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let res = await apiCall_post_withHeaders(API.genres, params, headers);
      console.log("resss", res.data.data);
      if (res.data.status == "success") {
        dispatch(setGenres(res.data.data));
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

export const fetchLatestBooks = (uuid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("uuid", uuid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let res = await apiCall_post_withHeaders(
        API.latestListingBooks,
        params,
        headers
      );
      console.log("books", res.data.data);
      if (res.data.status == "success") {
        dispatch(setLatestBooks(res.data.data));
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

export const fetchBooksFromSeller = (body) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("seller_id", body?.sellerId);

      params.append("user_id", body?.id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let res = await apiCall_post_withHeaders(
        API.GetBookBySellerID,
        params,
        headers
      );
      console.log("books", res.data.data);
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

export const fetchSellers = () => {
  return async (dispatch) => {
    try {
      let res = await apiCall_get(API.sold_book_top_seller);
      console.log("sellers", res.data.data);
      if (res.data.status == "success") {
        dispatch(setSellers(res.data.data));
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

export const fetchBooksByGenres = (genre) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("book_genre", genre);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let res = await apiCall_post_withHeaders(
        API.GetBookByGenre,
        params,
        headers
      );
      console.log("booksbyGenres", res.data.data);
      if (res.data.status == "success") {
        dispatch(setBooks(res.data.data));
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

export const filterBooksNearbyGenres = (lat, long, distance, genre) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("latitude", lat);
      params.append("longitude", long);
      params.append("distance", distance);
      params.append("genre", genre);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.search_genre_near_by,
        params,
        headers
      );
      console.log(res);
      if (res.data.status == "success") {
        dispatch(setBooks(res.data.data));
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

export const filterBooksNearbyLatest = (lat, long, distance, genre) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("latitude", lat);
      params.append("longitude", long);
      params.append("distance", distance);
      params.append("genre", genre);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.search_genre_near_by,
        params,
        headers
      );

      if (res.data.status == "success") {
        dispatch(setLatestBooks(res.data.data));
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

export const filterNearBySellers = (lat, long, distance, genre) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("latitude", lat);
      params.append("longitude", long);
      params.append("distance", distance);

      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let res = await apiCall_post_withHeaders(
        API.search_seller_recommanded_near_by,
        params,
        headers
      );
      console.log(res);
      if (res.data.status == "success") {
        dispatch(setSellers(res.data.data));
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

export const fetchMyBooks = (user_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(API.my_books, params, headers);
      console.log(res);
      if (res.data.status == "success") {
        dispatch(setMyBooks(res.data.data));
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

export const getNotifications = (user_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.get_user_notifications,
        params,
        headers
      );
      console.log(res);
      if (res.data.status == "success") {
        dispatch(setNotifications(res.data.data));
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

export const fetchGroups = (user_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.user_groups,
        params,
        headers
      );
      console.log(res);
      if (res.statusCode == 200) {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const followSeller = (user_id, seller_id, isFollow) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);
      params.append("seller_id", seller_id);
      params.append("is_following", isFollow);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.follow_seller,
        params,
        headers
      );
      console.log(res.data);
      if (res.data.type == "success") {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const openNotification = (notif_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("notification_id", notif_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let res = await apiCall_post_withHeaders(
        API.change_notification_status,
        params,
        headers
      );
      console.log(res);
      if (res.data.status == "success") {
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

export const getSeller = (seller_id, user_id) => {
  return async (dispatch) => {
    try {
      let res = await apiCall_get(
        API.get_seller + "?seller_id=" + seller_id + "&user_id=" + user_id
      );
      console.log(res);
      if (res.statusCode == 200) {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const getUserWishlist = (user_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.user_wishlist,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const publishwishList = (body, user_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", user_id);
      params.append("book_name", body?.book_name);
      params.append("book_author", body?.book_author);
      params.append("contact_number", body?.contact);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.addToWishlist,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
        return true;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const DeleteBook = (id, userid) => {
  return async (dispatch) => {
    try {
      // alert(id);
      let params = new FormData();
      params.append("user_id", userid);
      params.append("book_id", id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.delete_Book_by_id,
        params,
        headers
      );
      console.log(res);
      if (res.data.status == "success") {
        return true;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const deleteWishListItem = (id, userid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);
      params.append("wishlist_id", id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.delete_from_wishlist,
        params,
        headers
      );
      console.log(res);
      if (res.data.status == "success") {
        return true;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const subscribe = (userid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(API.subscribe, params, headers);
      console.log(res);
      if (res.data.type == "success") {
        showAlert("Subscribed", res.data.message);
        return true;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const getFollowers = (userid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(API.followers, params, headers);
      console.log(res);
      if (res.data.type == "success") {
        return res.data.data;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const unsubscribe = (userid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.unsubscribe,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
        showAlert("Unsubscribed", res.data.message);

        return true;
      } else {
        showAlert("Failed", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed", "Someting went wrong!");
      throw error;
    }
  };
};

export const searchWishlist = (val, type, userid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);
      if (type == "TITLE") {
        params.append("title", val);
      } else {
        params.append("author", val);
      }

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.search_wishlist,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
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

export const leaveGroup = (userid, group_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);

      params.append("group_id", group_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.leave_group,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
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

export const deleteGroup = (userid, group_id) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);

      params.append("group_id", group_id);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.delete_group,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
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

export const groupRequests = (userid) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.list_groups_requests,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
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

export const acceptRejectReq = (userid, group_id, status) => {
  return async (dispatch) => {
    try {
      let params = new FormData();
      params.append("user_id", userid);
      params.append("group_id", group_id);
      params.append("status", status);

      let headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(params);
      let res = await apiCall_post_withHeaders(
        API.accept_reject_group,
        params,
        headers
      );
      console.log(res);
      if (res.data.type == "success") {
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
