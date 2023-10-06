import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Swiper from "react-native-swiper";
import CONSTANTS from "../utils/constants";
import { wp } from "../utils/responsive";
const { width } = Dimensions.get("window");

const styles = {
  container: {
    width: "100%",
    height: 200,
    marginVertical: "5%",
    marginBottom: 0,
  },
  wrapper: { backgroundColor: "black" },

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },

  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width,
    flex: 1,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderColor: CONSTANTS.COLORS.PRIMARY,
    borderWidth: 1,
  },
};

const BannerSwiper = ({ data, onClickbanner }) => {
  console.log(data);
  return (
    <View style={styles.container}>
      <Swiper
        dotColor={CONSTANTS.COLORS.PRIMARY}
        activeDotStyle={[
          {
            backgroundColor: CONSTANTS.COLORS.PRIMARY,
          },
          styles.dotStyle,
        ]}
        dotStyle={[
          styles.dotStyle,
          { backgroundColor: CONSTANTS.COLORS.WHITE },
        ]}
        height={150}
        autoplayTimeout={3}
        horizontal={true}
        autoplay={true}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => {
                console.log(item?.link);
                Linking.openURL(item?.link);
              }}
            >
              <Image
                resizeMode="stretch"
                style={{ width: "100%", height: 150 }}
                source={{ uri: item.image }}
              />
            </TouchableOpacity>
          );
        })}
      </Swiper>
    </View>
  );
};

export default BannerSwiper;
