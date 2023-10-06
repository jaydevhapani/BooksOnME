import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  Platform,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import CONSTANTS from '../utils/constants';
import styles from '../styles/SplashScreen-styles';

function SplashScreen(props) {
  return (
    <View style={[styles.mainStyle, {}]}>
      {Platform.OS === 'android' ? (
        <StatusBar
          animated={true}
          backgroundColor={CONSTANTS.COLORS.BLACK}
          barStyle={'default'}
          translucent
        />
      ) : null}

      <ImageBackground
        source={require('../../assets/images/SplashBg.png')}
        style={styles.bgStyle}>
        <Image
          style={styles.logoStyle}
          resizeMode="contain"
          source={require('../../assets/images/SplashLogo.png')}
        />
      </ImageBackground>
    </View>
  );
}
export default SplashScreen;
