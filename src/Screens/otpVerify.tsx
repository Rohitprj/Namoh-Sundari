// import {View, Text} from 'react-native';
// import React from 'react';

// export default function otpVerify({navigation, route}) {
//   const {userId, phone} = route.params;
//   console.log('userId and Phone', userId, phone);
//   return (
//     <View>
//       <Text>otpVerify</Text>
//     </View>
//   );
// }

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Import the axiosInstance from your axiosConfig.js file
import axiosInstance from '../utils/AxiosInstance'; // Adjust the path as per your project structure

const {width} = Dimensions.get('window');

const OtpVerify = ({navigation, route}) => {
  // Extract userId and phone from route params
  const {userId, phone} = route.params;

  const [otp, setOtp] = useState('');
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 seconds countdown for resend
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Initially disabled

  useEffect(() => {
    let timer;
    if (isResendDisabled && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false); // Enable resend button
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup on unmount
  }, [resendTimer, isResendDisabled]);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }
    if (otp.length !== 4) {
      // Assuming OTP is 4 digits based on your curl example
      Alert.alert('Error', 'Please enter a 4-digit OTP.');
      return;
    }

    setLoadingVerify(true);

    try {
      const response = await axiosInstance.post(
        '/public/user-otp-verify',
        {
          phone: phone,
          otp: otp,
          userId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('OTP Verification successful:', response.data);

      if (response.data.success) {
        Alert.alert(
          'Success',
          'OTP verified successfully! You can now log in.',
        );
        navigation.navigate('LoginScreen'); // Navigate to LoginScreen on successful verification
      } else {
        Alert.alert(
          'Verification Failed',
          response.data.message || 'Failed to verify OTP. Please try again.',
        );
      }
    } catch (error) {
      console.error('OTP Verification error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        Alert.alert(
          'Verification Failed',
          error.response.data.message ||
            'An error occurred during OTP verification. Please try again.',
        );
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert(
          'Network Error',
          'No response from server. Please check your internet connection.',
        );
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', error.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResendOtp = async () => {
    setLoadingResend(true);
    setIsResendDisabled(true); // Disable resend button immediately
    setResendTimer(60); // Reset timer

    try {
      const response = await axiosInstance.post(
        '/public/user-otp-resend',
        {
          phone: phone,
          userId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('OTP Resend successful:', response.data);

      if (response.data.success) {
        Alert.alert('Success', 'OTP has been re-sent to your phone.');
      } else {
        Alert.alert(
          'Resend Failed',
          response.data.message || 'Failed to resend OTP. Please try again.',
        );
      }
    } catch (error) {
      console.error('OTP Resend error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        Alert.alert(
          'Resend Failed',
          error.response.data.message ||
            'An error occurred during OTP resend. Please try again.',
        );
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert(
          'Network Error',
          'No response from server. Please check your internet connection.',
        );
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', error.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verify OTP</Text>
      <Text style={styles.subtitleText}>
        A 4-digit code has been sent to your phone number: {phone}
      </Text>

      {/* OTP Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="hash" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter 4-digit OTP"
          placeholderTextColor="#999"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={4} // Assuming a 4-digit OTP
          editable={!loadingVerify}
        />
      </View>

      <TouchableOpacity
        style={styles.createAccountButton} // Reusing button style
        onPress={handleVerifyOtp}
        disabled={loadingVerify}>
        {loadingVerify ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createAccountButtonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccountText}>Didn't receive OTP? </Text>
        <TouchableOpacity
          onPress={handleResendOtp}
          disabled={isResendDisabled || loadingResend}>
          {loadingResend ? (
            <ActivityIndicator color="#FF6F00" />
          ) : (
            <Text
              style={[styles.loginLink, isResendDisabled && {color: '#ccc'}]}>
              Resend OTP {isResendDisabled ? `(${resendTimer}s)` : ''}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccountText}>Go back to </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20, // Adjusted for subtitle
    alignSelf: 'flex-start',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
    textAlign: 'center', // Center OTP text
    letterSpacing: 5, // Add some spacing for OTP digits
  },
  createAccountButton: {
    backgroundColor: '#FF6F00',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    marginTop: 10, // Adjusted margin
  },
  alreadyHaveAccountText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#FF6F00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpVerify;
