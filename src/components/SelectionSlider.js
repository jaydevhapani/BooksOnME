//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../utils/constants";
import { wp } from "../utils/responsive";
// create a component
const SelectionSlider = ({
  data,
  onselect,
  onClickSubItem,
  verticalLayout,
  layout,
  customStyle,
  banners,
  layoutType,
  brandId,
  showAll,
  onPress,
  titleString,
}) => {
  const [items, setItems] = useState([]);
  const [subData, setSubdata] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.userDetails);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const selectItem = (index) => {
    let tempArr = [...items];
    tempArr = tempArr.map((it, ix) => {
      if (ix == index) {
        it.selected = true;
        console.log(it.id);
      } else {
        it.selected = false;
      }
      return it;
    });

    setItems(tempArr);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={[{ paddingVertical: wp("2%") }, customStyle]}
      >
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <View style={index == 0 && { marginLeft: 30 }}>
                <TouchableOpacity
                  onPress={() => {
                    onPress(item);
                  }}
                  style={[
                    styles.selectorStyle,
                    {
                      minWidth: item.selected ? wp("20%") : wp("20%"),
                      backgroundColor: CONSTANTS.COLORS.WHITE,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      letterSpacing: 0.5,
                      color: CONSTANTS.COLORS.BLACK,
                      fontSize: 12,
                    }}
                  >
                    {item[titleString]}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectorStyle: {
    backgroundColor: CONSTANTS.COLORS.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    padding: wp("2%"),
    justifyContent: "center",
    marginEnd: wp("4%"),
  },
  emptyContainer: {
    paddingVertical: wp("2%"),
    height: wp("45%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default SelectionSlider;
