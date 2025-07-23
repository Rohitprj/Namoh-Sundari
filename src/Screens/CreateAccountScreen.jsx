// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import Icon from '/Feather'; // For eye icon
// import GoogleIcon from 'react-native-vector-icons/AntDesign'; // For Google icon
// import AppleIcon from 'react-native-vector-icons/FontAwesome'; // For Apple icon
// import FacebookIcon from 'react-native-vector-icons/FontAwesome'; // For Facebook icon

// const { width } = Dimensions.get('window');

// const CreateAccountScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleCreateAccount = () => {
//     console.log('Create account attempt:', { email, password, confirmPassword });
//     // Implement your account creation logic here
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleText}>Create an account</Text>

//       <View style={styles.inputContainer}>
//         <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Username or Email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
//           <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           placeholderTextColor="#999"
//           secureTextEntry={!showConfirmPassword}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />
//         <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//           <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.termsText}>
//         By clicking the <Text style={styles.registerLink}>Register</Text> button, you agree to
//         the public offer
//       </Text>

//       <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
//         <Text style={styles.createAccountButtonText}>Create Account</Text>
//       </TouchableOpacity>

//       <Text style={styles.orContinueWith}>- OR Continue with -</Text>

//       <View style={styles.socialButtonsContainer}>
//         <TouchableOpacity style={styles.socialButton}>
//           <GoogleIcon name="google" size={30} color="#DB4437" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <AppleIcon name="apple" size={30} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <FacebookIcon name="facebook" size={30} color="#4267B2" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.alreadyHaveAccountContainer}>
//         <Text style={styles.alreadyHaveAccountText}>I Already Have an Account </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.loginLink}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   titleText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 40,
//     alignSelf: 'flex-start',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     color: '#333',
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 5,
//   },
//   termsText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 30,
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   registerLink: {
//     color: '#FF6F00',
//     fontWeight: 'bold',
//   },
//   createAccountButton: {
//     backgroundColor: '#FF6F00',
//     width: '100%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   createAccountButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   orContinueWith: {
//     color: '#888',
//     fontSize: 16,
//     marginBottom: 30,
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '70%',
//     marginBottom: 50,
//   },
//   socialButton: {
//     backgroundColor: '#f0f0f0',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   alreadyHaveAccountContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   alreadyHaveAccountText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   loginLink: {
//     color: '#FF6F00',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CreateAccountScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator, // Import ActivityIndicator for loading state
//   Alert, // Import Alert for user feedback
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'; // For eye icon

// // Import the axiosInstance from your axiosConfig.js file
// import axiosInstance from '../utils/AxiosInstance'; // Adjust the path as per your project structure

// const {width} = Dimensions.get('window');

// const CreateAccountScreen = ({navigation}) => {
//   const [name, setName] = useState(''); // New state for name
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // Removed confirmPassword state as it's no longer needed
//   const [showPassword, setShowPassword] = useState(false);
//   // Removed showConfirmPassword state as it's no longer needed
//   const [loading, setLoading] = useState(false); // New state for loading indicator

//   const handleCreateAccount = async () => {
//     // Basic validation - now only checks for name, email, and password
//     if (!name || !email || !password) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     setLoading(true); // Start loading

//     try {
//       // Prepare data for x-www-form-urlencoded
//       // The API expects 'name', 'email' and 'password' in this format for registration
//       const requestBody = new URLSearchParams();
//       requestBody.append('name', name); // Append the new name field
//       requestBody.append('email', email);
//       requestBody.append('password', password);

//       const response = await axiosInstance.post(
//         '/public/user-register',
//         requestBody.toString(),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         },
//       );

//       console.log('Registration successful:', response.data);

//       if (response.data.success) {
//         Alert.alert('Success', 'Account created successfully! Please log in.');
//         // Navigate to the GetStarted screen upon successful registration
//         // Make sure 'GetStarted' is a valid route in your navigation stack
//         navigation.navigate('LoginScreen');
//       } else {
//         // Handle API success: false, but still a 200 OK response
//         Alert.alert(
//           'Registration Failed',
//           response.data.message ||
//             'Failed to create account. Please try again.',
//         );
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error('Error response data:', error.response.data);
//         console.error('Error response status:', error.response.status);
//         console.error('Error response headers:', error.response.headers);
//         Alert.alert(
//           'Registration Failed',
//           error.response.data.message ||
//             'An error occurred during registration. Please try again.',
//         );
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('Error request:', error.request);
//         Alert.alert(
//           'Network Error',
//           'No response from server. Please check your internet connection.',
//         );
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error('Error message:', error.message);
//         Alert.alert('Error', error.message || 'An unexpected error occurred.');
//       }
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleText}>Create an account</Text>

//       {/* Name Input Field */}
//       <View style={styles.inputContainer}>
//         <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Full Name"
//           placeholderTextColor="#999"
//           value={name}
//           onChangeText={setName}
//           keyboardType="default"
//           autoCapitalize="words"
//           editable={!loading} // Disable input when loading
//         />
//       </View>

//       {/* Email Input Field */}
//       <View style={styles.inputContainer}>
//         <Icon name="mail" size={20} color="#888" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Email Address"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           editable={!loading} // Disable input when loading
//         />
//       </View>

//       {/* Password Input Field */}
//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={setPassword}
//           editable={!loading} // Disable input when loading
//         />
//         <TouchableOpacity
//           style={styles.eyeIcon}
//           onPress={() => setShowPassword(!showPassword)}
//           disabled={loading}>
//           <Icon
//             name={showPassword ? 'eye' : 'eye-off'}
//             size={20}
//             color="#888"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Removed Confirm Password Input Field */}

//       <Text style={styles.termsText}>
//         By clicking the <Text style={styles.registerLink}>Register</Text>{' '}
//         button, you agree to the public offer
//       </Text>

//       <TouchableOpacity
//         style={styles.createAccountButton}
//         onPress={handleCreateAccount}
//         disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.createAccountButtonText}>Create Account</Text>
//         )}
//       </TouchableOpacity>

//       <Text style={styles.orContinueWith}>- OR Continue with -</Text>

//       {/* <View style={styles.socialButtonsContainer}>
//         <TouchableOpacity style={styles.socialButton}>
//           <GoogleIcon name="google" size={30} color="#DB4437" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <AppleIcon name="apple" size={30} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <FacebookIcon name="facebook" size={30} color="#4267B2" />
//         </TouchableOpacity>
//       </View> */}

//       <View style={styles.alreadyHaveAccountContainer}>
//         <Text style={styles.alreadyHaveAccountText}>
//           I Already Have an Account{' '}
//         </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.loginLink}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   titleText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 40,
//     alignSelf: 'flex-start',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     color: '#333',
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 5,
//   },
//   termsText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 30,
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   registerLink: {
//     color: '#FF6F00',
//     fontWeight: 'bold',
//   },
//   createAccountButton: {
//     backgroundColor: '#FF6F00',
//     width: '100%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   createAccountButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   orContinueWith: {
//     color: '#888',
//     fontSize: 16,
//     marginBottom: 30,
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '70%',
//     marginBottom: 50,
//   },
//   socialButton: {
//     backgroundColor: '#f0f0f0',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   alreadyHaveAccountContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   alreadyHaveAccountText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   loginLink: {
//     color: '#FF6F00',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CreateAccountScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator, // Import ActivityIndicator for loading state
  Alert, // Import Alert for user feedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For eye icon

// Import the axiosInstance from your axiosConfig.js file
import axiosInstance from '../utils/AxiosInstance'; // Adjust the path as per your project structure

const {width} = Dimensions.get('window');

const CreateAccountScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [phone, setPhone] = useState(''); // New state for phone number
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password eye icon
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleCreateAccount = async () => {
    // Basic validation - now checks for name, email, password, confirm password, and phone
    if (!name || !email || !password || !confirmPassword || !phone) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Frontend validation for confirm password
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Basic phone number validation (optional, but good practice)
    if (phone.length < 10 || isNaN(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Prepare data for x-www-form-urlencoded
      // The API expects 'name', 'email', 'password', and 'phone' in this format for registration
      const requestBody = new URLSearchParams();
      requestBody.append('name', name);
      requestBody.append('email', email);
      requestBody.append('password', password);
      requestBody.append('phone', phone); // Append the new phone field

      const response = await axiosInstance.post(
        '/public/user-register',
        requestBody.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log('Registration successful:', response.data);

      if (response.data.success) {
        Alert.alert('Success', 'Account created successfully! OTP sent.');
        navigation.navigate('otpVerify', {
          userId: response.data.user.id,
          phone: response.data.user.phone,
        });
      } else {
        // Handle API success: false, but still a 200 OK response
        Alert.alert(
          'Registration Failed',
          response.data.message ||
            'Failed to create account. Please try again.',
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        Alert.alert(
          'Registration Failed',
          error.response.data.message ||
            'An error occurred during registration. Please try again.',
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        Alert.alert(
          'Network Error',
          'No response from server. Please check your internet connection.',
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        Alert.alert('Error', error.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create an account</Text>

      {/* Name Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          autoCapitalize="words"
          editable={!loading} // Disable input when loading
        />
      </View>

      {/* Email Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading} // Disable input when loading
        />
      </View>

      {/* Phone Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad" // Use phone-pad keyboard
          editable={!loading} // Disable input when loading
          maxLength={10} // Assuming a 10-digit phone number
        />
      </View>

      {/* Password Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          editable={!loading} // Disable input when loading
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
          disabled={loading}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading} // Disable input when loading
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={loading}>
          <Icon
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        By clicking the <Text style={styles.registerLink}>Register</Text>{' '}
        button, you agree to the public offer
      </Text>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orContinueWith}>- OR Continue with -</Text>

      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccountText}>
          I Already Have an Account{' '}
        </Text>
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
    marginBottom: 40,
    alignSelf: 'flex-start',
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
  },
  eyeIcon: {
    padding: 5,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
  registerLink: {
    color: '#FF6F00',
    fontWeight: 'bold',
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
  orContinueWith: {
    color: '#888',
    fontSize: 16,
    marginBottom: 30,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: 50,
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    marginTop: 20,
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

export default CreateAccountScreen;
