//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import BooksList from '../components/BooksList';
import ButtonFilled from '../components/ButtonFilled';
import CenteredSectionHeader from '../components/CenteredSectionHeader';
import Header from '../components/Header';
import OutlinedItem from '../components/OutlinedItem';
import SearchBar from '../components/SearchBar';
import styles from '../styles/AddNewListings-styles';
import CONSTANTS from '../utils/constants';
import {goBack, navigationToScreen} from '../utils/utils';

// create a component
const AddNewListings = props => {
  const [selectType, setSelectType] = useState('');

  return (
    <View style={styles.container}>
      <Header
        showHeaderLeft={true}
        onPressBack={() => {
          goBack(props, 1);
        }}
      />
      <CenteredSectionHeader sectionTitle="NEW LISTINGS" />

      <View style={[styles.container, {paddingTop: '3%'}]}>
        <Text
          numberOfLines={1}
          style={[styles.bookNameStyle, {paddingVertical: '8%'}]}>
          Would you like to sell a
        </Text>
        <ButtonFilled
          customStyle={{height: 65}}
          title="Single Book"
          mode={selectType == 'SINGLE' ? 'CONTAINED' : 'OUTLINED'}
          onPress={() => {
            setSelectType('SINGLE');
          }}
        />
        <Text
          numberOfLines={1}
          style={[styles.bookNameStyle, {paddingVertical: '3%'}]}>
          Or
        </Text>
        <ButtonFilled
          customStyle={{height: 65}}
          title="Books In Bulk"
          mode={selectType == 'BULK' ? 'CONTAINED' : 'OUTLINED'}
          onPress={() => {
            setSelectType('BULK');
          }}
        />
      </View>
      <ButtonFilled
        customStyle={{height: 65, marginBottom: '20%'}}
        title="Confirm"
        disabled={selectType == ''}
        mode={'CONTAINED'}
        onPress={() => {
          navigationToScreen(CONSTANTS.SCREENLIST.ADD_SINGLE_BOOK, props, {
            actionType: selectType,
          });
        }}
      />
    </View>
  );
};

//make this component available to the app
export default AddNewListings;
