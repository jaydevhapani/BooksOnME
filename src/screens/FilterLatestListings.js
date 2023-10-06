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
import DropdownPicker from "../components/DropDown";
import styles from "../styles/GenreFilter-styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGenres } from "../redux/actions/commonActions";
import SearchLocations from "../components/SearchLocations";

// create a component
const FilterLatestListings = (props) => {
  const [searchByLocation, setSearchByLocation] = useState(true);
  const [genre, setGenre] = useState("");
  const [data, setData] = useState([]);
  const prevData = props.route.params;
  const [latlong, setLatLong] = useState({});
  const [radius, setRadius] = useState(0);
  const genres = useSelector((state) => state.commonReducer.genres);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !!token.uuid) {
      const UUID = token?.uuid;
      dispatch(fetchGenres(UUID));
    }
  }, [token]);

  useEffect(() => {
    if (genres && genres.length > 0) {
      let tempArr = genres;
      tempArr = tempArr.map(
        (e, x) => ({ value: e.genre_name, label: e.genre_name }),
        []
      );
      setData(tempArr);
    }
  }, [genres]);

  const submitData = async () => {
    try {
      let body = {
        genre: genre,
        lat: latlong?.lat,
        long: latlong?.long,
        distance: radius,
      };
      prevData?.filterLatestBooks(body);
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
      <CenteredSectionHeader sectionTitle={`FILTER\n LATEST LISTINGS`} />
      <View style={{ flex: 1, paddingVertical: "5%" }}>
        <View style={{ paddingTop: "5%" }}>
          <Text style={styles.inputHeaderStyle}> Filter By Genre</Text>
          <DropdownPicker
            placeholder="Select Genre"
            data={data}
            showIcon={true}
            value={genre}
            setValue={setGenre}
          />
        </View>
        <View style={{ paddingTop: "5%", zIndex: -1 }}>
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
        </View>

        <View style={{ paddingTop: "5%", zIndex: -2 }}>
          <Text style={styles.inputHeaderStyle}> Radius around location</Text>
          <RangePicker
            enabled={searchByLocation}
            lineColor={CONSTANTS.COLORS.PRIMARY}
            startingValue={0}
            endingValue={150}
            onChangeValue={(val) => {
              console.log(val, "value");
            }}
          />
        </View>
        <View style={{ paddingTop: "3%", zIndex: -3 }}>
          <CheckBox
            color={CONSTANTS.COLORS.PRIMARY}
            labelColor={CONSTANTS.COLORS.PRIMARY}
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
export default FilterLatestListings;
