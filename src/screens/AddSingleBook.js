//import liraries
import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import DropdownPicker from "../components/DropDown";
import Header from "../components/Header";
import Input from "../components/Input";
import styles from "../styles/AddSingleBook-styles";
import { goBack, navigationToScreen } from "../utils/utils";
import Icon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import CONSTANTS from "../utils/constants";
import ButtonFilled from "../components/ButtonFilled";
import { useSelector } from "react-redux";
import ButtonOutlined from "../components/ButtonOutlined";
import * as yup from "yup";
import { Formik } from "formik";
import ImageCropPicker from "react-native-image-crop-picker";
import SearchLocations from "../components/SearchLocations";
import InputDropdown from "../components/InputDropdown";

// create a component
const AddSingleBook = (props) => {
  const actionType = !!props.route.params.actionType
    ? props.route.params.actionType
    : "SINGLE";
  const genres = useSelector((state) => state.commonReducer.genres);
  const [genre, setGenre] = useState("");
  const [uploading, setUploading] = useState(false);
  const singleBookValues = {
    name: "",
    author: "",
    description: "",
    genre: "",
    isbn: "",
    price: "",
    location: { latitude: "", longitude: "", address: "" },
    images: [],
    sellers_contact_number: "",
    currency: "R",
  };

  const bulkBookValues = {
    name: "",
    description: "",
    price: "",
    location: { latitude: "", longitude: "", address: "" },
    images: [],
    sellers_contact_number: "",
    currency: "R",
  };

  const [initState, setInitState] = useState(
    actionType === "SINGLE" ? singleBookValues : bulkBookValues
  );
  const images = [
    { img: require("../../assets/images/SplashBg.png") },
    { img: require("../../assets/images/SplashBg.png") },
    { img: require("../../assets/images/SplashBg.png") },
    { img: require("../../assets/images/SplashBg.png") },
    { img: require("../../assets/images/SplashBg.png") },
    { img: require("../../assets/images/SplashBg.png") },
  ];
  const [genresData, setGenresData] = useState([]);
  const formRef = useRef();
  useEffect(() => {
    if (genres && genres.length > 0) {
      let tempArr = genres;
      tempArr = tempArr.map(
        (it) => ({ value: it.genre_name, label: it.genre_name }),
        []
      );
      setGenresData(tempArr);
    }
  }, [genres]);

  const SignupSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    author: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: yup
      .string()
      .min(2, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    genre: yup.string().required("Required"),
    isbn: yup.string().min(6, "Invalid ISBN Number"),
    price: yup.string().required("Required"),
    currency: yup.string().required("Required"),

    location: yup.object().shape({
      latitude: yup.string().required("location is required"),
      longitude: yup.string().required("location is required"),
      address: yup.string().required("location is required"),
    }),
    images: yup.array().min(1, "Required").required("required"),
    sellers_contact_number: yup
      .string()
      .matches(/^\+[1-9]{1}[0-9]{3,14}$/, "Phone number is not valid"),
  });

  const bulkSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    description: yup
      .string()
      .min(2, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    currency: yup.string().required("Required"),

    price: yup.string().required("Required"),
    location: yup.object().shape({
      latitude: yup.string().required("location is required"),
      longitude: yup.string().required("location is required"),
      address: yup.string().required("location is required"),
    }),
    images: yup.array().min(1, "Required").required("required"),
    sellers_contact_number: yup
      .string()
      .matches(/^\+[1-9]{1}[0-9]{3,14}$/, "Phone number is not valid"),
  });

  const renderImage = (item, index) => {
    return (
      <View style={[styles.pickedImageStyle]}>
        <Image
          source={{ uri: item.path }}
          style={[
            styles.pickedImageStyle,
            { borderWidth: 1, borderColor: CONSTANTS.COLORS.GRAY },
          ]}
        />
        <TouchableOpacity
          onPress={() => {
            removeImage(index);
          }}
          style={{ top: -5, right: -5, position: "absolute" }}
        >
          <Ionicon
            name="md-close-circle"
            size={14}
            color={CONSTANTS.COLORS.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const addGenre = (genre) => {
    console.log(genre);
    formRef?.current?.setFieldValue("genre", genre);
  };

  const cameraPicker = async () => {
    try {
      const images = await ImageCropPicker.openCamera({
        // multiple: true,
        mediaType: "photo",
        // maxFiles: 5,
      });
      if (images) {
        let tempImages = formRef?.current?.values.images;
        console.log(tempImages);

        if (tempImages.length > 6) {
          Alert.alert("warning", "select less then 6 images");
        } else {
          tempImages = [images, ...tempImages];
          console.log(tempImages);
          formRef?.current?.setFieldValue("images", tempImages);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    const images = await ImageCropPicker.openPicker({
      multiple: true,
      mediaType: "photo",
      maxFiles: 5,
    });

    if (images && images.length > 0) {
      let tempImages = formRef?.current?.values.images;
      console.log(tempImages);
      if (tempImages.length > 6) {
      }
      tempImages = [...tempImages, ...images];
      console.log(tempImages);
      formRef?.current?.setFieldValue("images", tempImages);
    } else {
      Alert.alert("warning", "select less then 6 images");
    }
  };

  const removeImage = async (i) => {
    let tempArr = formRef?.current?.values.images;
    tempArr.splice(i, 1);
    formRef?.current?.setFieldValue("images", tempArr);
  };
  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <Formik
          innerRef={formRef}
          initialValues={initState}
          validateOnChange={true}
          validateOnBlur={false}
          enableReinitialize={true}
          validationSchema={actionType === "SINGLE" ? SignupSchema : bulkSchema}
          onSubmit={(values) => {
            navigationToScreen(
              CONSTANTS.SCREENLIST.CONFIRM_BOOK_LISTING,
              props,
              {
                actionType: actionType,
                formData: values,
              }
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => (
            <View>
              {actionType === "SINGLE" ? (
                <>
                  <Input
                    inputCustomStyle={styles.fontStyle}
                    radius={8}
                    customStyles={styles.inputStyle}
                    placeholder="Enter Book Name"
                    value={values.name}
                    onBlur={handleBlur("name")}
                    onChangeText={handleChange("name")}
                    invalid={!!errors.name}
                    errorMessage={errors.name}
                  />
                  <Input
                    radius={8}
                    inputCustomStyle={styles.fontStyle}
                    customStyles={styles.inputStyle}
                    value={values.author}
                    placeholder="Enter Book Author"
                    onBlur={handleBlur("author")}
                    onChangeText={handleChange("author")}
                    invalid={!!errors.author}
                    errorMessage={errors.author}
                  />

                  <ButtonOutlined
                    title={values?.genre ? values.genre : "Select Book Genre"}
                    onPress={() => {
                      navigationToScreen(
                        CONSTANTS.SCREENLIST.SELECT_GENRE,
                        props,
                        { addGenre: addGenre }
                      );
                    }}
                    customTitleStyle={[
                      {
                        color: values?.genre
                          ? CONSTANTS.COLORS.BLACK
                          : CONSTANTS.COLORS.GRAY,
                      },
                      styles.fontStyle,
                    ]}
                    customStyle={{
                      height: 35,
                      borderRadius: 8,
                      width: "86%",
                      borderWidth: 1,
                      color: "gray",
                    }}
                  />
                  {errors.genre && (
                    <Text
                      style={{
                        fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                        fontSize: 16,
                        color: CONSTANTS.COLORS.RED,
                        width: "85%",
                        alignSelf: "center",
                      }}
                    >
                      {errors.genre}
                    </Text>
                  )}
                </>
              ) : (
                <Input
                  radius={8}
                  inputCustomStyle={styles.fontStyle}
                  customStyles={styles.inputStyle}
                  placeholder="Enter Listing Title"
                  value={values.name}
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                  invalid={!!errors.name}
                  errorMessage={errors.name}
                />
              )}
              <Input
                radius={8}
                multiline={true}
                inputCustomStyle={styles.fontStyle}
                customStyles={[
                  styles.inputStyle,
                  {
                    justifyContent: "flex-start",
                    height: 200,
                    textAlignVertical: "top",
                    borderRadius: 8,
                  },
                ]}
                value={values.description}
                placeholder="Enter Book Description"
                onBlur={handleBlur("description")}
                onChangeText={handleChange("description")}
                invalid={!!errors.description}
                errorMessage={errors.description}
              />

              {actionType === "SINGLE" && (
                <Input
                  radius={8}
                  inputCustomStyle={styles.fontStyle}
                  customStyles={styles.inputStyle}
                  placeholder="Enter ISBN"
                  // keyboardType="phone-pad"
                  value={values.isbn}
                  onBlur={handleBlur("isbn")}
                  onChangeText={handleChange("isbn")}
                  invalid={!!errors.isbn}
                  errorMessage={errors.isbn}
                />
              )}

              <View style={{ zIndex: -1 }}>
                <SearchLocations
                  placeholder="Enter Location of Book"
                  customStyles={{
                    height: 50,
                    padding: 2,
                    color: CONSTANTS.COLORS.GRAY,
                  }}
                  inputStyle={{
                    width: "100%",
                    textAlign: "center",
                    color: CONSTANTS.COLORS.GRAY,
                  }}
                  customInputStyle={{ textAlign: "center" }}
                  onChangeText={(txt) => {
                    if (txt.trim().length === 0) {
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
                    errors?.location?.longitude) && (
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
                <View style={{ zIndex: -2, paddingTop: 10 }}>
                  <InputDropdown
                    radius={8}
                    dropdownValue={values?.currency || ""}
                    onChangeDropdownValue={(e) =>
                      setFieldValue("currency", e())
                    }
                    inputCustomStyle={styles.fontStyle}
                    customStyles={[styles.inputStyle, { zIndex: 100 }]}
                    placeholder="Enter Price"
                    keyboardType="numeric"
                    onBlur={handleBlur("price")}
                    // maxChar={10}
                    onChangeText={handleChange("price")}
                    invalid={!!errors.price}
                    errorMessage={errors.price}
                    value={values.price}
                  />
                  {!errors?.price && errors?.currency && (
                    <Text
                      style={{
                        fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                        fontSize: 16,
                        zIndex: -1,
                        paddingTop: 5,
                        color: CONSTANTS.COLORS.RED,
                        width: "85%",
                        alignSelf: "center",
                      }}
                    >
                      Required
                    </Text>
                  )}

                  <View style={[styles.profileDetailContainer, { zIndex: -1 }]}>
                    <TouchableOpacity
                      onPress={() => {
                        // pickImage();
                        Alert.alert("", "Select an option", [
                          {
                            text: "Camera",
                            onPress: () => {
                              cameraPicker();
                            },
                          },
                          {
                            text: "Gallery",
                            onPress: () => {
                              pickImage();
                            },
                          },
                        ]);
                      }}
                      style={styles.uploadContainer}
                    >
                      <Icon
                        name="upload"
                        color={CONSTANTS.COLORS.PRIMARY}
                        size={16}
                      />
                      <Text
                        style={styles.pickerTextStyle}
                      >{` Upload Book\n Images`}</Text>
                      {/* <Image style={[styles.imageStyles, {borderWidth: 0}]} /> */}
                    </TouchableOpacity>
                    <View style={[styles.imageStyles]}>
                      {values.images.length > 0 &&
                        values.images.map((it, ix) => renderImage(it, ix))}
                    </View>
                  </View>
                  {errors.images && (
                    <Text
                      style={{
                        fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                        fontSize: 16,
                        zIndex: -1,
                        color: CONSTANTS.COLORS.RED,
                        width: "85%",
                        alignSelf: "center",
                      }}
                    >
                      {errors.images}
                    </Text>
                  )}
                  <View style={{ zIndex: -1, paddingBottom: 10 }}>
                    <Text
                      style={{
                        fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                        fontSize: 16,
                        paddingTop: 15,
                        zIndex: -1,
                        color: CONSTANTS.COLORS.GRAY,
                        width: "85%",
                        alignSelf: "center",
                        bottom: -5,
                      }}
                    >
                      Add seller number with area code
                    </Text>
                    <Input
                      radius={8}
                      customStyles={[styles.inputStyle, { zIndex: -1 }]}
                      keyboardType="phone-pad"
                      inputCustomStyle={styles.fontStyle}
                      placeholder="eg. +27631234567"
                      onBlur={handleBlur("sellers_contact_number")}
                      onChangeText={handleChange("sellers_contact_number")}
                      invalid={!!errors.sellers_contact_number}
                      errorMessage={errors.sellers_contact_number}
                      value={values.sellers_contact_number}
                    />
                  </View>
                  <ButtonFilled
                    title="NEXT"
                    customStyle={{ width: "85%", zIndex: -1 }}
                    onPress={handleSubmit}
                  />
                  <ButtonFilled
                    title="BACK"
                    customStyle={{ width: "85%", zIndex: -1 }}
                    onPress={() => {
                      goBack(props, 1);
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default AddSingleBook;
