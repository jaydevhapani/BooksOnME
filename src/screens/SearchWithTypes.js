//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import { goBack, navigationToScreen } from "../utils/utils";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Input from "../components/Input";
import CONSTANTS from "../utils/constants";
import RangePicker from "../components/RangePicker";
import CheckBox from "../components/CheckBox";
import ButtonFilled from "../components/ButtonFilled";
import Dropdown from "../components/DropDown";
import styles from "../styles/SearchWithTypes-styles";
import { useDispatch } from "react-redux";
import {
  searchBookByAuthor,
  searchBookByISBN,
  searchBookByTitle,
  searchSellerByName,
} from "../redux/actions/searchBooksActions";
import SearchLocations from "../components/SearchLocations";
import { ScrollView } from "react-native-gesture-handler";

// create a component
const SearchWithType = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";
  const prevData = props.route.params;
  const [searchByLocation, setSearchByLocation] = useState(true);
  const [latlong, setLatLong] = useState({});
  const [radius, setRadius] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const searchBook = async () => {
    switch (searchType) {
      case "TITLE":
        let resByTitle = await dispatch(
          searchBookByTitle(
            latlong?.lat || "",
            latlong?.long || "",
            radius,
            searchValue
          )
        );
        console.log(resByTitle);
        if (resByTitle && resByTitle?.length > 0) {
          navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS, props, {
            searchType: searchType,
            data: resByTitle,
            val: searchValue,
          });
        } else {
          Alert.alert("", "No Books Found");
        }
        break;
      case "AUTHOR":
        let resByAuthor = await dispatch(
          searchBookByAuthor(
            latlong?.lat || "",
            latlong?.long || "",
            radius,
            searchValue
          )
        );
        if (resByAuthor && resByAuthor?.length > 0) {
          navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS, props, {
            searchType: searchType,
            data: resByAuthor,
            val: searchValue,
          });
        } else {
          Alert.alert("", "No Books Found");
        }
        break;
      case "ISBN":
        let resByISBN = await dispatch(
          searchBookByISBN(
            latlong?.lat || "",
            latlong?.long || "",
            radius,
            searchValue
          )
        );
        if (resByISBN && resByISBN?.length > 0) {
          navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS, props, {
            searchType: searchType,
            data: resByISBN,
            val: searchValue,
          });
        } else {
          Alert.alert("", "No Books Found");
        }

        break;
      case "SELLER":
        let resByseller = await dispatch(searchSellerByName(searchValue));
        if (resByseller && resByseller?.length > 0) {
          navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_TYPES_RESULTS, props, {
            searchType: searchType,
            data: resByseller,
            val: searchValue,
          });
        } else {
          Alert.alert("", "No seller found");
        }
        break;

      default:
        break;
    }
  };

  const searchTypeInput = () => {
    switch (searchType) {
      case "TITLE":
        return (
          <View>
            <Text
              style={[
                styles.inputHeaderStyle,
                { textAlign: "center", paddingBottom: 10 },
              ]}
            >
              Book Title
            </Text>
            <Input
              inputCustomStyle={{ textAlign: "center", fontSize: 13 }}
              radius={8}
              customStyles={{
                height: 40,
                borderRadius: 10,
                fontSize: 12,
                textAlign: "center",
              }}
              onChangeText={(e) => setSearchValue(e)}
              placeholder="Enter Book Title"
            />
          </View>
        );
      case "AUTHOR":
        return (
          <View>
            <Input
              inputCustomStyle={{ textAlign: "center", fontSize: 13 }}
              radius={8}
              customStyles={{
                height: 40,
                borderRadius: 10,
                fontSize: 12,
                textAlign: "center",
              }}
              onChangeText={(e) => setSearchValue(e)}
              placeholder="Enter Author Name"
            />
          </View>
        );
      case "ISBN":
        return (
          <View>
            <Input
              inputCustomStyle={{ textAlign: "center", fontSize: 13 }}
              onChangeText={(e) => setSearchValue(e)}
              radius={8}
              customStyles={{
                height: 40,
                borderRadius: 10,
                fontSize: 12,
                textAlign: "center",
              }}
              placeholder="Enter ISBN Number"
            />
          </View>
        );
      case "SELLER":
        return (
          <View>
            <Text
              style={[
                styles.inputHeaderStyle,
                { textAlign: "center", paddingBottom: 15 },
              ]}
            >
              Seller Name
            </Text>

            <Input
              radius={8}
              customStyles={{
                height: 40,
                borderRadius: 10,
                fontSize: 12,
                textAlign: "center",
              }}
              inputCustomStyle={{ textAlign: "center", fontSize: 13 }}
              onChangeText={(e) => setSearchValue(e)}
              placeholder="Enter Seller Name"
            />
          </View>
        );
      default:
        break;
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
      <CenteredSectionHeader
        customLabelStyle={{ paddingHorizontal: "10%" }}
        sectionTitle={`SEARCH`}
      />
      <ScrollView>
        <View style={{ flex: 1, paddingVertical: "5%" }}>
          <View>{searchTypeInput()}</View>
          {searchType !== "SELLER" && (
            <>
              <View style={{ paddingTop: "5%" }}>
                <View style={{ height: 120 }}>
                  <Text style={styles.inputHeaderStyle}> Location</Text>
                  <SearchLocations
                    placeholder="Enter location"
                    onSelect={(data, details, lat, long) => {
                      setLatLong({
                        lat: lat,
                        long: long,
                      });
                    }}
                  />
                </View>
              </View>

              <View style={{ paddingTop: "5%", zIndex: -1 }}>
                <Text style={styles.inputHeaderStyle}>
                  Radius around location
                </Text>
                <RangePicker
                  enabled={searchByLocation}
                  lineColor={CONSTANTS.COLORS.PRIMARY}
                  startingValue={0}
                  endingValue={150}
                  onChangeValue={(val) => {
                    setRadius(val);
                  }}
                />
                <View style={{ paddingTop: "3%" }}>
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
            </>
          )}
        </View>
        <ButtonFilled
          onPress={() => {
            searchBook();
          }}
          title="SEARCH"
        />
        <View style={{ height: 400 }} />
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default SearchWithType;
