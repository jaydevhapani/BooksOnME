//import liraries
import React, {Component, useState} from 'react';
import {View, Text, Image} from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import ButtonOutlined from '../components/ButtonOutlined';

import Input from '../components/Input';
import styles from '../styles/WelcomScreen-styles';
import CONSTANTS from '../utils/constants';
import {goBack, navigationToScreen} from '../utils/utils';

// create a component
const WelcomeScreen = props => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoStyle}
        resizeMode="contain"
        source={require('../../assets/images/SplashLogo.png')}
      />
      {/* <View style={styles.secondaryContainer}> */}
      <View style={styles.appTitleContainer}>
        <Text style={styles.titleStyle}>Welcome to BooksOnApp</Text>
        <Text style={styles.subTitleStyle}>
          {`You can now login with the email
And password you created`}
        </Text>
      </View>

      <View style={{paddingTop: '10%'}}>
        <ButtonFilled
          title="Login"
          onPress={() => {
            goBack(props, 3);
          }}
        />
      </View>
      {/* </View> */}
    </View>
  );
};

//make this component available to the app
export default WelcomeScreen;
