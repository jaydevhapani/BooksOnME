//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BooksList from "../components/BooksList";
import CenteredSectionHeader from "../components/CenteredSectionHeader";
import Header from "../components/Header";
import OutlinedItem from "../components/OutlinedItem";
import SearchBar from "../components/SearchBar";
import SellerList from "../components/SellerList";
import styles from "../styles/AboutApp-styles";
import CONSTANTS from "../utils/constants";
import { goBack, navigationToScreen } from "../utils/utils";
import ButtonFilled from "../components/ButtonFilled";

// create a component
const AboutApp = (props) => {
  const searchType = !!props.route.params.searchType
    ? props.route.params.searchType
    : "";

  const data = [
    { id: 1, name: "Biography" },
    { id: 1, name: "LifeStyle" },
    { id: 1, name: "Cooking" },
    { id: 1, name: "Art & Photography" },
    { id: 1, name: "Cooking" },
    { id: 1, name: "Art & Photography" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Cooking" },
    { id: 1, name: "Art & Photography" },
    { id: 1, name: "Cooking" },
    { id: 1, name: "Art & Photography" },
    { id: 1, name: "Cooking" },
    { id: 1, name: "Art & Photography" },
    { id: 1, name: "Cooking" },
    { id: 1, name: "Art & Photography" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Biology" },
    { id: 1, name: "Biology" },
  ];

  const latestBooks = [
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
    { name: "Book Name", distance: "KM Away", price: 159 },
  ];

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle="ABOUT THIS APP" />

      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView
          style={{ flex: 1, padding: "6%", paddingTop: 10, paddingBottom: 10 }}
        >
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: "400",
                color: CONSTANTS.COLORS.BLACK,
                // textAlign: "justify",
                fontFamily: CONSTANTS.FONTS.PROXIMA_NOVA_REGULAR,
              },
            ]}
          >
            {`BooksOnApp is free from the App Store to download and browse. In order to buy or sell you will need to subscribe for a small fee of only R19.99 per month and you will be able to enjoy full functionality. Reasons why YOU should be subscribing today! \n\n1. This is a growing community of booklovers! Don't miss out. Join the club! We are connecting booklovers from all over our beautiful country.\n\n2. Booklovers, small bookshop ventures, home based businesses buying/selling books, charity shops, students, book collectors and many others... all around South Africa now have everything they have ever dreamed of in the palm of their hands with BooksOnApp. \n\n3. Buy books the easy way from a network across the whole of South Africa or focus only on what is near you - you choose - no more hours and hours of scrolling and surfing the net. \n\n4. Sell books the easy way from the comfort of your home. No need to sit for hours at markets, or re-posting multiple adverts online through various social media mediums, no more waiting for people to walk into your bookstore (this will bring them to you). \n\n5. Raise funds for charity - charity shops can now upload their books and create more awareness about what is available at their charity shop and bring more feet through your doors when buyers come to collect. \n\n6. Work from home opportunity - work from your couch ... or in fact ... from anywhere you choose. This app brings you so much more freedom. \n\n7. Sell book collections in bulk. Clear out your old stock, old collections, or unwanted books by offering a great deal on bulk sales. \n\n8. Source specific books by authors/titles or ISBN number. 9. Identify book sellers, buyers, dealers, charity shops, bookstores etc ... in your area and nearby vicinity or if you choose - into neighbouring towns or provinces. \n\n10. South African authors can use this platform to promote their books.\n\n11. Read & share book reviews \n\n12. Generate some extra income from books you no longer want - bring out your collection of books and turn those old dusty books to cash! \n\n13. Join in with our regular competitions and giveaways. \n\n14. Discover a whole new world of books that may otherwise never see the light of day...this app makes it so easy so that book lovers sitting with valuable and collectable books may now decide to part with them... perhaps to YOU? \n\n15. Refresh and build your personal library by tapping into other subscribers' libraries. \n\n16. With our easy search options, you will enjoy the simple process in browsing through BooksOnApp. \n\n17. Our easy step by step processes ensure books are current and sold items quickly updated to avoid disappointment. \n\n18. Search through the libraries of specific users... you may find more books you want when buying that one book.\n\n19. Textbooks should make students richer and not poorer. Students will be able to source their textbooks at a fraction of the price. \n\n20. We connect you - you do the rest.\n\n21. And the list goes on! All THIS for less than the price of a cup of coffee a month`}
          </Text>
          <ButtonFilled
            title="BACK"
            customStyle={{ height: 45, width: "100%", marginVertical: 20 }}
            onPress={() => {
              goBack(props, 3);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

//make this component available to the app
export default AboutApp;
