import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator, // Import ActivityIndicator for loading state
  // Removed Alert import as it's replaced by state-based messages
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For eye icon

// Import the axiosInstance from your axiosConfig.js file
import axiosInstance from '../utils/AxiosInstance'; // Adjust the path as per your project structure
// Import the storeUserData function from your new tokenStorage.js file
import {storeUserData} from '../utils/tokenStorage';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [message, setMessage] = useState(null); // State for displaying messages to the user

  const handleLogin = async () => {
    // Clear previous messages
    setMessage(null);

    // Basic validation
    if (!email || !password) {
      setMessage({
        type: 'error',
        text: 'Please enter both email and password.',
      });
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        email: email,
        password: password,
      };

      const response = await axiosInstance.post(
        '/public/user-login',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Login successful:', JSON.stringify(response.data, null, 2));

      if (response.data.success) {
        setMessage({type: 'success', text: 'Login successful!'});

        // Extract data from the response
        const {token, user} = response.data;
        const userEmail = user.email;
        const userId = user.id;
        const userRole = user.role;
        const userName = user.name;

        // Store the extracted data using the storeUserData function
        await storeUserData({
          email: userEmail,
          token: token,
          userId: userId,
          role: userRole,
          name: userName,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'GetStarted'}], // Navigate to the 'Home' screen, clearing the stack
        });
      } else {
        // Handle API success: false, but still a 200 OK response
        setMessage({
          type: 'error',
          text: response.data.message || 'Invalid credentials.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setMessage({
          type: 'error',
          text:
            error.response.data.message ||
            'An error occurred during login. Please try again.',
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setMessage({
          type: 'error',
          text: 'Network Error: No response from server. Please check your internet connection.',
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setMessage({
          type: 'error',
          text: error.message || 'An unexpected error occurred.',
        });
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading} // Disable input when loading
        />
      </View>

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

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordButton}>
        {/* <Text style={styles.forgotPasswordText}>Forgot Password?</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Message display for success/error */}
      {message && (
        <View
          style={[
            styles.messageContainer,
            message.type === 'error'
              ? styles.errorMessage
              : styles.successMessage,
          ]}>
          <Text
            style={
              message.type === 'error'
                ? styles.errorMessageText
                : styles.successMessageText
            }>
            {message.text}
          </Text>
        </View>
      )}

      <Text style={styles.orContinueWith}>- OR Continue with -</Text>

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Create An Account </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccountScreen')}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
  welcomeText: {
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#FF6F00',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#161881',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
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
  createAccountContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  createAccountText: {
    color: '#666',
    fontSize: 16,
  },
  signUpText: {
    color: '#161881',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginTop: -20, // Adjust to fit above "OR Continue with"
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  errorMessage: {
    backgroundColor: '#ffe0e0',
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessageText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  successMessage: {
    backgroundColor: '#e0ffe0',
    borderColor: 'green',
    borderWidth: 1,
  },
  successMessageText: {
    color: 'green',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;
