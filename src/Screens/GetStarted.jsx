import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  console.log('Hello');
  //   const handleGetStarted = () => {
  //     // Navigate to your main application screen, onboarding, or login screen
  //     navigation.navigate('Onboarding'); // Example: Navigating to an Onboarding screen
  //   };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/GetStartedBack.jpg')} // Your specified background image path
        style={styles.backgroundImage}
        resizeMode="cover" // Ensures the image covers the entire background
      >
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>You want</Text>
            <Text style={styles.titleBold}>Authentic, here</Text>
            <Text style={styles.titleBold}>you go!</Text>
            <Text style={styles.subtitle}>Find it here, buy it now!</Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('MainTabs')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns content (overlay) to the bottom
    width: '100%',
    height: '100%',
  },
  overlay: {
    // backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black overlay
    paddingHorizontal: 20,
    paddingVertical: 40, // Adjust vertical padding as needed
    justifyContent: 'flex-end', // Aligns text and button within the overlay to its bottom
    minHeight: height * 0.4, // Ensures the overlay covers enough of the bottom screen
  },
  textContainer: {
    marginBottom: 40, // Space between text block and the button
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    lineHeight: 38, // Enhances readability of multi-line text
  },
  titleBold: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF6F00', // Bright orange, matching typical UI
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%', // Makes the button full width within its padding
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
