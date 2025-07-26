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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password eye icon
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleCreateAccount = async () => {
    // Basic validation - now checks for name, email, password, and confirm password
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Frontend validation for confirm password
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Prepare data for application/json
      // The API expects 'name', 'email', and 'password' in this format for registration
      const requestBody = {
        name: name,
        email: email,
        password: password,
      };

      const response = await axiosInstance.post(
        '/public/user-register',
        requestBody, // Send as JSON object
        {
          headers: {
            'Content-Type': 'application/json', // Set content type to application/json
          },
        },
      );

      console.log('Registration successful:', response.data);

      if (response.data.success) {
        Alert.alert('Success', 'Account created successfully!');
        // Navigate to LoginScreen as per the new API response structure
        navigation.navigate('LoginScreen');
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

      {/* <Text style={styles.termsText}>
        By clicking the <Text style={styles.registerLink}>Register</Text>{' '}
        button, you agree to the public offer
      </Text> */}

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
    backgroundColor: '#161881',
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
    color: '#161881',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;
