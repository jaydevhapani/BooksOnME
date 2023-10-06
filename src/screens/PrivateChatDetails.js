//import liraries
import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import styles from "../styles/ChatDetails-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import DropDown from "../components/DropDown";
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { leaveGroup } from "../redux/actions/commonActions";
import { wp } from "../utils/responsive";

// create a component
const PrivateChatDetails = (props) => {
  const data = props?.route?.params?.data || {};
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  const [option, selectOption] = useState("");
  const dispatch = useDispatch();
  console.log(data);
  const ref = firestore()
    .collection("Users")
    .doc(token?.id)
    .collection("PrivateChats")
    .doc(data.group_admin_id)
    .collection("Chats");

  const reciverRef = firestore()
    .collection("Users")
    .doc(data.group_admin_id)
    .collection("PrivateChats")
    .doc(token?.id)
    .collection("Chats");

  useEffect(() => {
    if (data?.group_admin_id) {
      getPrivateChatDetails(data);
    }
  }, []);

  const getPrivateChatDetails = async (data) => {
    try {
      const group = await ref.get();
      console.log(group.empty, data);
      if (group.empty) {
        ref.add({
          _id: null,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: data?.group_admin_id,
            name: data?.admin_name,
          },
        });
      } else {
        let temparr = [];
        group.docs.map((it) => {
          console.log(it.data());
          if (it.data()._id !== null && it.data()?.text) {
            temparr.push(it.data());
          }
        });
        setMessages(temparr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscriber = ref?.onSnapshot((documentSnapshot) => {
      console.log(" data: ", documentSnapshot.docs);
      let temparr = [];
      documentSnapshot.docs.map((it) => {
        console.log(it.data());
        if (it.data()._id !== null && it.data()?.text) {
          temparr.push(it.data());
        }
      });
      setMessages(temparr);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [token?.id]);

  const onSend = useCallback((messages = []) => {
    const tempref = reciverRef;
    const senderRef = ref;
    console.log(messages[0]);
    tempref.add(messages[0]);
    senderRef.add(messages[0]);
  }, []);

  const deleteChat = async () => {
    firestore()
      .collection("Users")
      .doc(token?.id)
      .collection("PrivateChats")
      .doc(data.group_admin_id)
      .delete()
      .then(() => {
        goBack(props, 2);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />

      <View style={[styles.chatHeaderStyle]}>
        <Text
          numberOfLines={1}
          style={[styles.textStyle, { width: wp("62%"), textAlign: "left" }]}
        >
          {data?.admin_name || ""}
        </Text>
        <View style={{ width: wp("35%") }}>
          <DropDown
            placeholder="Select Options"
            data={
              [
                // { label: "Leave Group", value: "LEAVE" },
                { label: "Delete Chat", value: "delete" },
              ] || []
            }
            showIcon={true}
            value={option}
            setValue={(it) => deleteChat()}
            customStyle={styles.dropdownStyle}
            arrowColor={CONSTANTS.COLORS.WHITE}
            arrowSize={20}
            customPlaceHolderStyle={{
              fontSize: wp("2.5%"),
              fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
              color: CONSTANTS.COLORS.WHITE,
            }}
            customLabelStyle={{ color: CONSTANTS.COLORS.WHITE }}
            customeDropdownStyle={styles.customeDropdownStyle}
            customlistItemlabelStyle={styles.customlistItemlabelStyle}
          />
        </View>
      </View>
      <View style={{ flex: 1, zIndex: -1 }}>
        <GiftedChat
          messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: token?.id,
            name: token?.first_name + " " + token?.last_name,
          }}
          renderDay={() => <View style={{ height: 20 }} />}
          bottomOffset={Platform.OS === "ios" ? 60 : 0}
          // textInputProps={{
          //   borderWidth: 1,
          //   borderColor: CONSTANTS.COLORS.PRIMARY,
          //   borderRadius: 15,
          //   fontSize: 14,
          //   margin: 10,
          //   padding: '2%',
          // }}
          renderBubble={(props) => {
            return (
              <View style={{ maxWidth: "75%", minWidth: "50%" }}>
                {props.currentMessage.user._id === token?.id ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        // flex: 1,
                        width: "40%",
                        fontSize: 14,
                        color: CONSTANTS.COLORS.GRAY,
                      }}
                    >
                      {props.currentMessage.user.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flex: 1,
                        textAlign: "right",
                        color: CONSTANTS.COLORS.GRAY,
                      }}
                    >
                      {moment(
                        props?.currentMessage?.createdAt?.toDate()
                      ).format("DD/MM/YYYY  HH:mm ")}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        flex: 1,

                        fontSize: 12,
                        color: CONSTANTS.COLORS.GRAY,
                      }}
                    >
                      {moment(
                        props?.currentMessage?.createdAt?.toDate()
                      ).format("DD/MM/YYYY  HH:mm ")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: "40%",
                        fontSize: 14,
                        color: CONSTANTS.COLORS.GRAY,
                      }}
                    >
                      {props.currentMessage.user.name}
                    </Text>
                  </View>
                )}
                <Bubble
                  {...props}
                  textStyle={{
                    right: {
                      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                      color: CONSTANTS.COLORS.PRIMARY,
                    },
                    left: {
                      fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
                      color: CONSTANTS.COLORS.GRAY,
                    },
                  }}
                  renderTime={() => null}
                  wrapperStyle={{
                    left: {
                      width: "100%",
                      borderWidth: 1,
                      borderRadius: 15,
                      backgroundColor: CONSTANTS.COLORS.WHITE,
                      borderColor: CONSTANTS.COLORS.GRAY,
                    },
                    right: {
                      width: "100%",
                      backgroundColor: CONSTANTS.COLORS.WHITE,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: CONSTANTS.COLORS.PRIMARY,
                    },
                  }}
                />
              </View>
            );
          }}
          renderAvatar={null}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              // renderSend={this.renderSend}
              primaryStyle={{
                top: 10,
                width: "95%",
                alignSelf: "center",
                // height: 30,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: CONSTANTS.COLORS.PRIMARY,
              }}
              renderComposer={(props1) => (
                <Composer
                  {...props1}
                  textInputStyle={{
                    textAlignVertical: "top",
                    overflow: "hidden",
                    borderRadius: 10,
                    color: "black",
                  }}
                />
              )}
            />
          )}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default PrivateChatDetails;
