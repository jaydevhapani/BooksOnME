//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/SelectGenre-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import ButtonFilled from "../components/ButtonFilled";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../redux/actions/commonActions";

// create a component
const SelectGenre = (props) => {
  const actionType = !!props.route.params.actionType
    ? props.route.params.actionType
    : "SINGLE";
  const prevData = props?.route?.params;
  const genres = useSelector((state) => state.commonReducer.genres);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (genres && genres.length > 0) {
      let tempArr = genres;
      tempArr.map((it) => (it.selected = false));
      setData(tempArr);
    }
  }, [genres]);
  useEffect(() => {
    if (token?.uuid) {
      dispatch(fetchGenres(token?.uuid));
    }
  }, [token]);

  const selectItems = (ix) => {
    let tempArr = [...data];
    tempArr.map((i, x) => {
      if (x == ix) {
        i.selected = !i.selected;
      } else {
        i.selected = false;
      }
    });
    setData(tempArr);
  };

  const submit = () => {
    const tempArr = [...data];
    const value = tempArr.find((e) => e.selected == true)?.genre_name;
    prevData?.addGenre(value);
    goBack(props, 1);
  };
  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle="Select Genre" />
      <View style={{ padding: 10 }}>
        <Text
          style={styles.pickerTextStyle}
        >{`Please select the genre of the\n Book your are selling.`}</Text>
        <Text
          style={[
            styles.pickerTextStyle,
            { color: CONSTANTS.COLORS.PRIMARY, marginTop: "2%" },
          ]}
        >{`You may only choose one genre`}</Text>
      </View>
      <View style={[styles.container, { paddingTop: "10%" }]}>
        <FlatList
          data={data}
          contentContainerStyle={{
            // flex: 1,
            alignItems: "stretch",
            flexDirection: "row",
            paddingHorizontal: "5%",
            // justifyContent: 'space-between',
            flexWrap: "wrap",
          }}
          renderItem={({ item, index }) => {
            return (
              <OutlinedItem
                title={item.genre_name}
                selected={item.selected}
                onPress={() => {
                  selectItems(index);
                }}
              />
            );
          }}
        />
      </View>
      <ButtonFilled
        customStyle={{ height: 65, marginBottom: "20%" }}
        title="Confirm"
        disabled={data.every((e) => e.selected == false)}
        mode={"CONTAINED"}
        onPress={submit}
      />
    </View>
  );
};

//make this component available to the app
export default SelectGenre;
