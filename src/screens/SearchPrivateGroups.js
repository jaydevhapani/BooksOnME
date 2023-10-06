//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import BooksList from '../components/BooksList';
import ButtonFilled from '../components/ButtonFilled';
import CenteredSectionHeader from '../components/CenteredSectionHeader';
import Header from '../components/Header';
import OutlinedItem from '../components/OutlinedItem';
import SearchBar from '../components/SearchBar';
import styles from '../styles/SearchPrivateGroups-styles';
import CONSTANTS from '../utils/constants';
import {goBack, navigationToScreen} from '../utils/utils';

// create a component
const SearchPrivateGroups = props => {
  const [options, setOptions] = useState([
    {name: 'Search By Name', selected: false},
    {name: 'Search By Location', selected: false},
  ]);
  const [selectType, setSelectType] = useState('');

  const renderItem = ({item, index}) => {
    return (
      <ButtonFilled
        customStyle={{height: 65}}
        title={item.name}
        mode={item.selected ? 'CONTAINED' : 'OUTLINED'}
        onPress={() => {
          selectOption(index);
        }}
      />
    );
  };

  const selectOption = i => {
    // let tempArr = [...options];
    // tempArr.map((it, ix) => {
    //   if (i == ix) {
    //     it.selected = true;
    //   } else {
    //     it.selected = false;
    //   }
    // });
    // setOptions(tempArr);
    switch (i) {
      case 0:
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES, props, {
          searchType: 'NAME',
        });
        break;
      case 1:
        navigationToScreen(CONSTANTS.SCREENLIST.SEARCH_WITH_TYPES, props, {
          searchType: 'LOCATION',
        });
        break;

      default:
        break;
    }
  };
  const ItemSeparatorComponent = () => {
    return (
      <Text
        numberOfLines={1}
        style={[styles.bookNameStyle, {paddingVertical: '3%'}]}>
        Or
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
      <CenteredSectionHeader sectionTitle={`Public Search\n Groups`} />

      <View style={[styles.container, {paddingTop: '3%'}]}>
        <FlatList
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          data={options}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default SearchPrivateGroups;
