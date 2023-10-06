//import liraries
import React, { Component, useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import CONSTANTS from "../utils/constants";
import { View } from "react-native";

// create a component
const SearchLocations = ({
  onSelect,
  customStyles,
  placeholder,
  onChangeText,
  inputStyle,
  customInputStyle,
  defaultValue,
  val,
}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => row.description} // custom description render
      onPress={(data, details = null) => {
        const lat = details.geometry.location.lat;
        const lng = details.geometry.location.lng;
        onSelect(data, details, lat, lng);
      }}
      query={{
        key: CONSTANTS.GOOGLE_PLACES_API_KEY,
        language: "en", // language of the results
        types: "(cities)", // default: 'geocode'
      }}
      textInputProps={{
        style: [
          {
            color: CONSTANTS.COLORS.GRAY,
            width: "100%",
          },
          customInputStyle,
        ],
        placeholderTextColor: CONSTANTS.COLORS.GRAY,
        onChangeText: onChangeText,
        // value: defaultValue,
        defaultValue: defaultValue,
      }}
      styles={{
        description: {
          fontWeight: "bold",
          color: "black",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
        container: {
          width: "100%",
        },
        listView: {
          width: "100%",
          alignSelf: "center",
          position: "absolute",
          zIndex: 11,
          top: 80,
          backgroundColor: CONSTANTS.COLORS.WHITE,
        },
        textInput: inputStyle,
        textInputContainer: [
          {
            marginTop: "4%",
            borderRadius: 10,
            width: "85%",
            padding: 10,
            height: 65,
            backgroundColor: CONSTANTS.COLORS.WHITE,
            borderWidth: 1,
            justifyContent: "center",
            alignSelf: "center",
            borderColor: CONSTANTS.COLORS.PRIMARY,
          },
          customStyles,
        ],
      }}
      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      // currentLocationLabel="Current location"
      // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      // filterReverseGeocodingByTypes={[
      //   "locality",
      //   "administrative_area_level_3",
      // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // debounce={200}
    />
  );
};

//make this component available to the app
export default SearchLocations;
