import { BASE_URL } from "./URLs";

export const apiCall_get = (url) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method: "GET",
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_get_withHeaders = (url, headers) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method: "GET",
      headers,
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_post_withHeaders = (url, body, headers) => {
  return new Promise((resolve, reject) => {
    console.log(BASE_URL + url);
    fetch(BASE_URL + url, {
      method: "POST",
      body,
      headers,
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_put_withHeaders = (url, body, headers) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method: "PUT",
      body,
      headers,
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_del_withHeaders = (url, body, headers) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method: "DELETE",
      body,
      headers,
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_post_withHeaders_customURL = (url, body, headers) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      body,
      headers,
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_put_withHeaders_customURL = (url, body, headers) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      body,
      headers,
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const apiCall_get_customURL = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, responseObj]) => {
        return resolve({
          statusCode: response.status,
          message: response.statusText,
          data: responseObj,
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
