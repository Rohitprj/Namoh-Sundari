import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper'; // You'll need to install this library: npm install react-native-swiper

const {width, height} = Dimensions.get('window');

// Assuming these images are in your assets folder
const ChooseProductsImage = require('../../assets/images/product.png'); // Replace with your actual path
const MakePaymentImage = require('../../assets/images/payment.png'); // Replace with your actual path
const GetYourOrderImage = require('../../assets/images/order.png'); // Replace with your actual path

const OnboardingScreen = ({navigation}) => {
  const handleSkip = () => {
    navigation.navigate('Home'); // Navigate to your main app screen
  };

  const handleGetStarted = () => {
    navigation.navigate('Home'); // Navigate to your main app screen
  };

  return (
    <Swiper
      loop={false}
      showsButtons={false}
      showsPagination={true}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      paginationStyle={styles.paginationStyle}>
      {/* Page 1: Choose Products */}
      <View style={styles.slide}>
        {/* <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity> */}
        <Text style={styles.pageNumber}>1/3</Text>
        <Image
          source={ChooseProductsImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Choose Products</Text>
        <Text style={styles.description}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Text>
        {/* <TouchableOpacity style={styles.nextButton} onPress={() => {}}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity> */}
      </View>

      {/* Page 2: Make Payment */}
      <View style={styles.slide}>
        {/* <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity> */}
        <Text style={styles.pageNumber}>2/3</Text>
        <Image
          source={MakePaymentImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Make Payment</Text>
        <Text style={styles.description}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Text>
        <View style={styles.navigationButtons}>
          {/* <TouchableOpacity
            style={styles.prevButton}
            onPress={() => {
              
            }}>
            <Text style={styles.prevText}>Prev</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              
            }}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Page 3: Get Your Order */}
      <View style={styles.slide}>
        {/* <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity> */}
        <Text style={styles.pageNumber}>3/3</Text>
        <Image
          source={GetYourOrderImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Get Your Order</Text>
        <Text style={styles.description}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Text>
        <View style={styles.navigationButtons}>
          {/* <TouchableOpacity
          
            onPress={() => {
              
            }}>
            <Text style={styles.prevText}></Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.nextText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 50, // Adjust as needed
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#888',
  },
  pageNumber: {
    position: 'absolute',
    top: 50, // Adjust as needed
    left: 20,
    fontSize: 16,
    color: '#888',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 50,
  },
  dotStyle: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: '#FF6F00', // Orange color for active dot
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  paginationStyle: {
    bottom: height * 0.05, // Adjust vertical position of dots
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30, // Position above the pagination dots
  },
  nextButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 50,
    marginLeft: 60,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prevButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  prevText: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
