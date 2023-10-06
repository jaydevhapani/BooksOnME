export const checkValidFirstName = (value) => {
  if (value.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

export const checkvalidFullName = (value) => {
  if (value.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

export const checkValidSurName = (value) => {
  if (value.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

export const checkValidMobileNumber = (value) => {
  if (/^[0-9]{10}$/.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const checkValidEmail = (value) => {
  if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const checkValidPassword = (value) => {
  if (value.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

export const checkValidConfirmPassword = (value, password) => {
  if (value == password) {
    return true;
  } else if (value.trim() == "") {
    return false;
  } else {
    return false;
  }
};
