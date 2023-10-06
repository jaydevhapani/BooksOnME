//import liraries
import React, { Component, useState } from "react";
import { View, Text, Image, Alert, ScrollView } from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";

import Input from "../components/Input";
import SectionHeader from "../components/SectionHeader";
import styles from "../styles/CreateGroups-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import * as yup from "yup";
import { Formik } from "formik";
import SearchLocations from "../components/SearchLocations";
import { useDispatch, useSelector } from "react-redux";
import { CreateGroup } from "../redux/actions/chatActions";
// create a component
const CreateGroups = (props) => {
  const initVals = {
    name: "",
    location: { lat: "", long: "", address: "" },
    groupType: "",
  };
  const [groupType, setGroupType] = useState("PUBLIC");
  const [initState, setInitState] = useState(initVals);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  const groupSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    location: yup.object().shape({
      lat: yup.string().required("location is required"),
      long: yup.string().required("location is required"),
      address: yup.string().required("location is required"),
    }),
    groupType: yup.string().required("Required"),
  });

  const createNewGroup = async (values) => {
    try {
      let params = values;
      params.user_id = token?.id;
      const res = await dispatch(CreateGroup(params));
      if (res) {
        Alert.alert("Success", "You have create a new group.");
        goBack(props, 1);
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Header showHeaderLeft={true} onPressBack={() => goBack(props, 1)} />
      <CenteredSectionHeader sectionTitle="CREATE GROUP" />
      <Formik
        initialValues={initState}
        // validateOnChange={false}
        validationSchema={groupSchema}
        onSubmit={(values) => createNewGroup(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <ScrollView style={{ flex: 1 }}>
            <View style={[styles.appTitleContainer, { paddingTop: "5%" }]}>
              <View style={{ width: "100%" }}>
                <Input
                  placeholder="Enter Group Name"
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  invalid={!!errors.name}
                  errorMessage={errors.name}
                />
              </View>
              <SearchLocations
                placeholder="Enter Group Location"
                customStyles={{
                  height: 50,
                  padding: 2,
                  zIndex: 1,
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
                      lat: "",
                      long: "",
                      address: "",
                    });
                  }
                }}
                onSelect={(data, details, lat, long) => {
                  console.log(data, details);
                  setFieldValue("location", {
                    lat: lat,
                    long: long,
                    address: data.description,
                  });
                }}
              />
              <View style={{ zIndex: -1, marginTop: 10 }}>
                {(errors?.location?.lat || errors?.location?.long) && (
                  <Text
                    style={{
                      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                      fontSize: 16,
                      color: CONSTANTS.COLORS.RED,
                      width: "85%",
                    }}
                  >
                    Required
                  </Text>
                )}
                <Text style={styles.subTitleStyle}>
                  {`Would you like this group to be\nPublic or Private? `}
                </Text>
                <View
                  style={{
                    width: "85%",
                    flexDirection: "row",
                    alignItems: "center",
                    zIndex: -1,
                    justifyContent: "space-around",
                  }}
                >
                  <ButtonFilled
                    mode={
                      values.groupType !== "public" ? "OUTLINED" : "CONTAINED"
                    }
                    title="PUBLIC"
                    customStyle={{
                      height: 45,
                      width: "45%",
                      borderRadius: 10,
                      backgroundColor: CONSTANTS.COLORS.PRIMARY,
                    }}
                    onPress={() => {
                      setFieldValue("groupType", "public");
                    }}
                  />
                  <ButtonFilled
                    mode={
                      values.groupType !== "private" ? "OUTLINED" : "CONTAINED"
                    }
                    title="PRIVATE"
                    customStyle={{
                      height: 45,
                      width: "45%",
                      borderRadius: 10,
                      backgroundColor: CONSTANTS.COLORS.PRIMARY,
                    }}
                    onPress={() => {
                      setFieldValue("groupType", "private");
                    }}
                  />
                </View>
              </View>
            </View>
            {console.log(Object.keys(errors).length, errors)}
            <View style={{ flex: 1, justifyContent: "center", zIndex: -1 }}>
              <ButtonFilled
                title="CREATE"
                disabled={Object.keys(errors).length > 0 ? true : false}
                customStyle={{ height: 65 }}
                onPress={handleSubmit}
              />
              <ButtonFilled
                title="BACK"
                mode="OUTLINED"
                customStyle={{ height: 35, borderRadius: 10 }}
                onPress={() => {
                  goBack(props, 3);
                }}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

//make this component available to the app
export default CreateGroups;
