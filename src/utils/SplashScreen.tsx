// src/components/SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Optional: Adjust status bar for the splash screen */}
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Image
        source={require('../../assets/namo-logo.png')} 
        style={styles.logo}
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  logo: {
    width: 200,
    height: 200, 
  },
});

export default SplashScreen;