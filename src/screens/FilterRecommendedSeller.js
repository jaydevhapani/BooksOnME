//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { goBack, navigationToScreen } from "../utils/utils";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Input from "../components/Input";
import CONSTANTS from "../utils/constants";
import RangePicker from "../components/RangePicker";
import CheckBox from "../components/CheckBox";
import ButtonFilled from "../components/ButtonFilled";
import Dropdown from "../components/DropDown";
import styles from "../styles/FilterRecommendedSellers-styles";
import {
  fetchSellers,
  filterNearBySellers,
} from "../redux/actions/commonActions";
import SearchLocations from "../components/SearchLocations";

// create a component
const FilterRecommendedSellers = (props) => {
  const [searchByLocation, setSearchByLocation] = useState(true);
  const [latlong, setLatLong] = useState({});
  const [distance, setDistance] = useState(0);
  const prevData = props.route.params;

  const submitData = async () => {
    try {
      let body = {
        lat: latlong?.lat,
        long: latlong?.long,
        distance: distance,
      };
      prevData?.filterSellers(body);
      goBack(props, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle={`FILTER\n RECOMMENDED SELLERS`} />

      <View style={{ flex: 1, paddingVertical: "5%" }}>
        <View style={{ height: 120 }}>
          <Text style={styles.inputHeaderStyle}> Filter By Location</Text>
          <SearchLocations
            onSelect={(data, details, lat, long) => {
              setLatLong({
                lat: lat,
                long: long,
              });
            }}
          />
        </View>

        <View style={{ paddingTop: "5%", zIndex: -1 }}>
          <Text style={styles.inputHeaderStyle}> Radius around location</Text>
          <RangePicker
            enabled={searchByLocation}
            lineColor={CONSTANTS.COLORS.PRIMARY}
            startingValue={0}
            endingValue={150}
            onChangeValue={(val) => {
              setDistance(val);
            }}
          />
        </View>
        <View style={{ paddingTop: "3%", zIndex: -1 }}>
          <CheckBox
            color={CONSTANTS.COLORS.PRIMARY}
            size={22}
            onCheck={(val) => {
              setSearchByLocation(val);
            }}
            label={"Search Any Distance"}
          />
        </View>
      </View>
      <ButtonFilled onPress={submitData} title="FILTER" />
    </View>
  );
};

//make this component available to the app
export default FilterRecommendedSellers;
