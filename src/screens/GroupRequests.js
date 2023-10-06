//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonFilled from "../components/ButtonFilled";
import ButtonOutlined from "../components/ButtonOutlined";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";

import Input from "../components/Input";
import SectionHeader from "../components/SectionHeader";
import { acceptRejectReq, groupRequests } from "../redux/actions/commonActions";
import styles from "../styles/GroupRequests-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";

// create a component
const GroupRequests = (props) => {
  // const latestBooks = [
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "ACCEPT" },
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "" },
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "" },
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "" },
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "" },
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "" },
  //   { name: "Book Name", distance: "KM Away", price: 159, Type: "" },
  // ];
  const token = useSelector((state) => state.authReducer.token);
  const [groupType, setGroupType] = useState("PUBLIC");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token?.id) {
      getrequests();
    }
  }, [token]);

  const getrequests = async () => {
    try {
      const res = await dispatch(groupRequests(token?.id));
      if (res && res.length > 0) {
        setData(res);
      } else {
        Alert.alert("", "No requests found");
      }
    } catch (error) {}
  };

  const AcceptReq = async (it, action) => {
    try {
      const res = await dispatch(
        acceptRejectReq(it?.user_id, it.group_id, action)
      );
      if (res) {
        getrequests();
      }
    } catch (error) {}
  };

  const renderItem = ({ item, index }) => {
    const userNameStyle = { color: CONSTANTS.COLORS.PRIMARY };
    const titleStyle = {
      fontSize: 15,
      textAlign: "center",
      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
    };

    return (
      <View
        style={{
          marginBottom: "5%",
          padding: "5%",
          borderRadius: 8,
          width: "100%",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: CONSTANTS.COLORS.PRIMARY,
        }}
      >
        <View>
          <Text style={[titleStyle]}>{item.user_name}</Text>
          <Text style={[titleStyle, { fontSize: 12 }]}>
            {"Has requested to join " + item.group_name}
          </Text>
        </View>
        <View style={{ paddingTop: "2%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ButtonFilled
              mode={item.status !== "ACCEPTED" ? "OUTLINED" : "CONTAINED"}
              title="ACCEPT"
              customStyle={{
                height: 45,
                width: "45%",
                borderRadius: 10,
                backgroundColor: CONSTANTS.COLORS.PRIMARY,
              }}
              onPress={() => {
                if (item.status === "PENDING") {
                  AcceptReq(item, "ACCEPTED");
                }
              }}
            />
            <ButtonFilled
              mode={item.Type !== "REJECTED" ? "OUTLINED" : "CONTAINED"}
              title="REJECT"
              customStyle={{
                height: 45,
                width: "45%",
                borderRadius: 10,
                backgroundColor: CONSTANTS.COLORS.PRIMARY,
              }}
              onPress={() => {
                if (item.status === "PENDING") {
                  AcceptReq(item, "REJECTED");
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle={`GROUP \nREQUESTS`} />
      <View style={[styles.appTitleContainer, { paddingTop: "2%" }]}>
        <View style={[styles.container, { paddingTop: "2%" }]}>
          <FlatList
            ListHeaderComponent={() => (
              <Text style={styles.subTitleStyle}>
                {`These are requests from people who have asked to join
your private group`}
              </Text>
            )}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={() => {
            //   return (
            //     <ButtonOutlined
            //       title="BACK"
            //       customStyle={{height: 40, borderRadius: 10, width: '100%'}}
            //     />
            //   );
            // }}
            data={data}
            renderItem={renderItem}
          />
        </View>
        <ButtonOutlined
          title="BACK"
          onPress={() => {
            goBack(props, 1);
          }}
          customStyle={{
            height: 40,
            borderRadius: 10,
            width: "90%",
            marginVertical: 15,
          }}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default GroupRequests;
