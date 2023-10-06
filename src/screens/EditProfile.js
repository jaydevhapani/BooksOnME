//import liraries
import React, { Component, useRef } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import BannerSwiper from "../components/BannerSwiper";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Input from "../components/Input";
import SelectionSlider from "../components/SelectionSlider";
import SellerList from "../components/SellerList";
import styles from "../styles/EditProfile-styles";
import CONSTANTS from "../utils/constants";
import Icon from "react-native-vector-icons/Feather";
import ButtonFilled from "../components/ButtonFilled";
import { goBack, navigationToScreen } from "../utils/utils";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../redux/actions/profileAction";
import ImageCropPicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import { DeleteAccount } from "../redux/actions/authActions";
import SearchLocations from "../components/SearchLocations";

// create a component
const EditProfile = (props) => {
  const data = props?.route?.params?.data || {};
  const token = useSelector((state) => state.authReducer.token);
  const initVals = {
    firstName: data?.first_name || "",
    lastName: data?.last_name || "",
    image: !!data.profile_photo ? { path: data.profile_photo } : "",
    mobile: data?.mobile_number
      ? parseInt(data?.mobile_number)?.toString()
      : "",
    location: {
      latitude: token?.latitude || "",
      longitude: token?.longitude || "",
      address: token?.city + "," + token?.province + "," + token?.suburb || "",
    },
  };
  console.log(initVals);
  const [intitialValues, setInitialValues] = useState(initVals);

  const dispatch = useDispatch();
  const formRef = useRef();
  const phoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/;
  const profileSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    image: Yup.mixed().required("Required"),
    mobile: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Phone number is not valid"),
    // .min(10, "too short")
    // .max(10, "too long"),
    location: Yup.object().shape({
      latitude: Yup.string().required("location is required"),
      longitude: Yup.string().required("location is required"),
      address: Yup.string().required("location is required"),
    }),
    // .test("FILE_SIZE", "Uploaded file is too big.",
    //     value => !value || (value && value.size <= FILE_SIZE))
    // .test("FILE_FORMAT", "Uploaded file has unsupported format.",
    //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
  });

  const saveChanges = async (values) => {
    let params = values;
    params.user_id = token?.id;

    let res = await dispatch(UpdateProfile(params));
    if (res == true) {
      goBack(props, 1);
    }
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const pickImage = async () => {
    const image = await ImageCropPicker.openPicker({
      multiple: false,
      mediaType: "photo",
      maxFiles: 5,
      compressImageQuality: 0.4,
    });

    console.log(image);
    if (image && image.size) {
      const fileSize = formatBytes(image.size);
      console.log(fileSize);
      if (fileSize > 5) {
        Alert.alert("warning", "Image size must be less then 5 MB");
      } else {
        formRef?.current?.setFieldValue("image", image);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header showHeaderLeft={true} onPressBack={() => goBack(props, 1)} />
      <CenteredSectionHeader
        sectionTitle="MY EDIT PROFILE"
        customLabelStyle={{ paddingHorizontal: 30 }}
      />
      <View style={[styles.container]}>
        <Formik
          innerRef={formRef}
          initialValues={intitialValues}
          enableReinitialize
          validationSchema={profileSchema}
          onSubmit={(values) => saveChanges(values)}
        >
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            values,
            errors,
          }) => (
            <ScrollView style={{ paddingTop: "4%" }}>
              <Text style={styles.titleStyle}>
                {` If you change any information please press\n Save at the bottom of the page`}
              </Text>
              <Input
                placeholder="(Profiles First Name)"
                onBlur={handleBlur("firstName")}
                onChangeText={handleChange("firstName")}
                value={values.firstName}
                invalid={!!errors.firstName}
                errorMessage={errors.firstName}
              />
              <Input
                placeholder="(Profiles Last Name)"
                value={values.lastName}
                onBlur={handleBlur("lastName")}
                onChangeText={handleChange("lastName")}
                invalid={!!errors.lastName}
                errorMessage={errors.lastName}
              />
              <SearchLocations
                // placeholder="Enter Location of Book"
                placeholder={values?.location?.address || "Enter Location"}
                defaultValue={values?.location?.address}
                customStyles={{
                  height: 56,
                  borderRadius: 15,
                  padding: 2,
                  color: CONSTANTS.COLORS.GRAY,
                }}
                inputStyle={{
                  width: "100%",
                  textAlign: "left",
                  color: CONSTANTS.COLORS.GRAY,
                }}
                customInputStyle={{
                  textAlign: "left",
                  fontSize: 16,
                  paddingHorizontal: 10,
                }}
                onChangeText={(txt) => {
                  if (txt.trim().length > 0) {
                    setFieldValue("location", {
                      latitude: "",
                      longitude: "",
                      address: "",
                    });
                  }
                }}
                onSelect={(data, details, lat, long) => {
                  console.log(data, details);
                  setFieldValue("location", {
                    latitude: lat,
                    longitude: long,
                    address: data.description,
                  });
                }}
              />
              <View style={{ zIndex: -1 }}>
                {(errors?.location?.latitude ||
                  errors?.location?.longitude ||
                  errors?.location?.address) && (
                  <Text
                    style={{
                      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                      fontSize: 16,
                      paddingTop: 5,
                      color: CONSTANTS.COLORS.RED,
                      width: "85%",
                      alignSelf: "center",
                    }}
                  >
                    Required
                  </Text>
                )}
              </View>
              <View style={styles.profileDetailContainer}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.uploadContainer}
                >
                  <Icon
                    name="upload"
                    color={CONSTANTS.COLORS.PRIMARY}
                    size={16}
                  />
                  <Text
                    style={styles.pickerTextStyle}
                  >{` Upload / Change\nProfile Picture`}</Text>
                  {/* <Image style={[styles.imageStyles, {borderWidth: 0}]} /> */}
                </TouchableOpacity>
                <View style={[styles.imageStyles, { marginHorizontal: "20%" }]}>
                  {errors?.image ? (
                    <Text style={styles.pickerTextStyle}>Image</Text>
                  ) : (
                    <FastImage
                      style={[styles.imageStyles, { borderWidth: 0 }]}
                      source={{
                        uri: values?.image?.path,
                        priority: "low",
                      }}
                    />
                  )}
                </View>
              </View>
              {errors?.image && (
                <Text style={[styles.errorTextStyle, { paddingBottom: 20 }]}>
                  {errors?.image}
                </Text>
              )}

              <Text
                style={{
                  fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                  fontSize: 16,
                  paddingTop: 5,
                  zIndex: -1,
                  color: CONSTANTS.COLORS.GRAY,
                  width: "85%",
                  alignSelf: "center",
                  bottom: -5,
                }}
              >
                Add mobile number with area code
              </Text>
              <Input
                placeholder="eg. +27631234567"
                keyboardType="phone-pad"
                onBlur={handleBlur("mobile")}
                onChangeText={handleChange("mobile")}
                // maxChar={10}
                value={values.mobile}
                invalid={!!errors.mobile}
                errorMessage={errors.mobile}
              />

              <View style={{ zIndex: -1 }}>
                <ButtonFilled
                  mode="CONTAINED"
                  onPress={() => {
                    navigationToScreen(
                      CONSTANTS.SCREENLIST.FORGOT_PASSWORD_SCREEN,
                      props,
                      { isLoggedIn: true }
                    );
                  }}
                  title="Change Password"
                  customStyle={[styles.buttonStyle, { marginTop: 20 }]}
                  customFontStyle={styles.fontStyle}
                />
                <ButtonFilled
                  mode="CONTAINED"
                  onPress={() => {
                    Alert.alert(
                      "warning",
                      "Are you sure you want to delete account?",
                      [
                        {
                          text: "No",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => dispatch(DeleteAccount(token?.id)),
                        },
                      ]
                    );
                  }}
                  title="Delete My Account"
                  customStyle={styles.buttonStyle}
                  customFontStyle={styles.fontStyle}
                />
                <ButtonFilled
                  onPress={handleSubmit}
                  mode="CONTAINED"
                  title="SAVE CHANGES"
                  customStyle={[styles.buttonStyle, { marginVertical: "10%" }]}
                  customFontStyle={styles.fontStyle}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </View>
  );
};

//make this component available to the app
export default EditProfile;
