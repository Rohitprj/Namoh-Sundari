// src/components/SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Optional: Adjust status bar for the splash screen */}
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Image
        source={require('../../assets/ShopingerLogo.png')} // <-- IMPORTANT: Adjust this path relative to THIS FILE
        style={styles.logo}
        resizeMode="contain" // Ensures the logo fits within its bounds
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Your desired splash screen background color
  },
  logo: {
    width: 200, // Adjust logo width as needed
    height: 200, // Adjust logo height as needed
  },
});

export default SplashScreen;