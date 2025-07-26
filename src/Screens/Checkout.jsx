// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ScrollView,
//   Dimensions,
//   Alert,
//   Platform,
//   ActivityIndicator, // For loading indicator
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {Picker} from '@react-native-picker/picker';
// import axiosInstance from '../utils/AxiosInstance'; // Your configured axios instance

// const {width} = Dimensions.get('window');

// const CheckoutScreen = ({navigation}) => {
//   // State for Address Details - Directly mapped to API fields (10 fields)
//   const [houseNo, setHouseNo] = useState('');
//   const [street, setStreet] = useState('');
//   const [city, setCity] = useState('');
//   const [district, setDistrict] = useState(''); // This will be the selected state/district
//   const [pincode, setPincode] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [country, setCountry] = useState('');
//   const [landmark, setLandmark] = useState(''); // Optional, but included in API
//   const [mobile, setMobile] = useState('');

//   // Loading state for API call
//   const [isLoading, setIsLoading] = useState(false);

//   const handleAddAddress = async () => {
//     // Basic validation for all required address fields (landmark is optional)
//     if (
//       !houseNo ||
//       !street ||
//       !city ||
//       !district ||
//       !pincode ||
//       !firstName ||
//       !lastName ||
//       !country ||
//       !mobile
//     ) {
//       Alert.alert(
//         'Missing Information',
//         'Please fill in all required fields: House No, Street/Area, City, District, Pincode, First Name, Last Name, Country, and Mobile Number.',
//       );
//       return;
//     }

//     setIsLoading(true);

//     // Prepare data for x-www-form-urlencoded
//     const formData = new URLSearchParams();
//     formData.append('houseNo', houseNo);
//     formData.append('street', street);
//     formData.append('city', city);
//     formData.append('district', district);
//     formData.append('pincode', pincode);
//     formData.append('firstName', firstName);
//     formData.append('lastName', lastName);
//     formData.append('country', country);
//     formData.append('landmark', landmark); // Send even if empty string
//     formData.append('mobile', mobile);

//     try {
//       const response = await axiosInstance.post(
//         '/web/add-address',
//         formData.toString(), // Convert URLSearchParams to string
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             // axiosInstance should already have your Authorization token in its config
//           },
//         },
//       );

//       if (response.data && response.data.success) {
//         Alert.alert(
//           'Success',
//           response.data?.message || 'Address added successfully!',
//         );

//         // Optionally, clear form or navigate back
//         navigation.goBack();
//       } else {
//         Alert.alert(
//           'Error',
//           response.data?.message || 'Failed to add address. Please try again.',
//         );
//       }
//     } catch (error) {
//       console.error('Error adding address:', error);
//       let errorMessage = 'An unexpected error occurred. Please try again.';
//       if (error.response) {
//         errorMessage =
//           error.response.data?.message ||
//           `Server Error: ${error.response.status}`;
//       } else if (error.request) {
//         errorMessage =
//           'Network Error: No response from server. Check your internet connection or server status.';
//       } else {
//         errorMessage = `Error: ${error.message}`;
//       }
//       Alert.alert('API Error', errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={{
//               uri: 'https://placehold.co/24x24/000000/FFFFFF?text=%3C',
//             }} // Placeholder back arrow icon
//             style={styles.backArrowIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add New Address</Text>{' '}
//         {/* Changed title */}
//         <View style={{width: 24}} /> {/* Spacer to balance header */}
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}>
//         {/* User Avatar - Retained for visual consistency if desired, but not strictly for API */}
//         <View style={styles.avatarContainer}>
//           <Image
//             source={require('../../assets/images/group_Profile.png')} // Replace with your avatar image
//           />
//         </View>

//         {/* Address Details Section */}
//         <Text style={styles.sectionTitle}>Address Details</Text>

//         <Text style={styles.label}>First Name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={firstName}
//           onChangeText={setFirstName}
//           editable={!isLoading}
//           placeholder="Enter first name"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>Last Name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={lastName}
//           onChangeText={setLastName}
//           editable={!isLoading}
//           placeholder="Enter last name"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>Mobile Number</Text>
//         <TextInput
//           style={styles.textInput}
//           value={mobile}
//           onChangeText={setMobile}
//           keyboardType="phone-pad"
//           editable={!isLoading}
//           placeholder="Enter mobile number"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>House No.</Text>
//         <TextInput
//           style={styles.textInput}
//           value={houseNo}
//           onChangeText={setHouseNo}
//           editable={!isLoading}
//           placeholder="e.g., 123A"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>Street/Area</Text>
//         <TextInput
//           style={styles.textInput}
//           value={street}
//           onChangeText={setStreet}
//           editable={!isLoading}
//           placeholder="e.g., Main Street, XYZ Society"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>Landmark (Optional)</Text>
//         <TextInput
//           style={styles.textInput}
//           value={landmark}
//           onChangeText={setLandmark}
//           editable={!isLoading}
//           placeholder="e.g., Near ABC Hospital"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>Pincode</Text>
//         <TextInput
//           style={styles.textInput}
//           value={pincode}
//           onChangeText={setPincode}
//           keyboardType="numeric"
//           editable={!isLoading}
//           placeholder="e.g., 110001"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>City</Text>
//         <TextInput
//           style={styles.textInput}
//           value={city}
//           onChangeText={setCity}
//           editable={!isLoading}
//           placeholder="e.g., New Delhi"
//           placeholderTextColor="#999"
//         />

//         <Text style={styles.label}>District</Text>
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={district}
//             onValueChange={itemValue => setDistrict(itemValue)}
//             style={styles.picker}
//             dropdownIconColor="#000"
//             enabled={!isLoading}>
//             <Picker.Item label="Select District" value="" />
//             {/* Add more district options here as needed, or fetch dynamically */}
//             <Picker.Item label="West Delhi" value="West Delhi" />
//             <Picker.Item label="North Delhi" value="North Delhi" />
//             <Picker.Item label="South Delhi" value="South Delhi" />
//             <Picker.Item label="East Delhi" value="East Delhi" />
//             <Picker.Item label="Central Delhi" value="Central Delhi" />
//             <Picker.Item label="New Delhi" value="New Delhi" />
//             <Picker.Item label="North East Delhi" value="North East Delhi" />
//             <Picker.Item label="North West Delhi" value="North West Delhi" />
//             <Picker.Item label="Shahdara" value="Shahdara" />
//             <Picker.Item label="South East Delhi" value="South East Delhi" />
//             <Picker.Item label="South West Delhi" value="South West Delhi" />
//             <Picker.Item label="Yamuna Paar" value="Yamuna Paar" />
//             {/* You can expand this list based on common districts in India or specific to your service area */}
//           </Picker>
//           <Image
//             source={{
//               uri: 'https://placehold.co/15x15/555555/FFFFFF?text=%E2%96%BC',
//             }} // Placeholder dropdown arrow
//             style={styles.dropdownArrow}
//           />
//         </View>

//         <Text style={styles.label}>Country</Text>
//         <TextInput
//           style={styles.textInput}
//           value={country}
//           onChangeText={setCountry}
//           editable={!isLoading}
//           placeholder="e.g., India"
//           placeholderTextColor="#999"
//         />

//         {/* Add Address Button */}
//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleAddAddress} // Call the API on save
//           disabled={isLoading} // Disable button when loading
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.saveButtonText}>Add Address</Text>
//           )}
//         </TouchableOpacity>

//         {/* Extra space at the bottom */}
//         <View style={{height: 40}} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   backArrowIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 25,
//   },
//   avatarContainer: {
//     alignSelf: 'center',
//     marginBottom: 30,
//     marginTop: 10,
//   },
//   // avatarImage: { /* You had this commented out */ },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     marginTop: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//     marginTop: 15,
//   },
//   textInput: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#333',
//     borderWidth: 1,
//     borderColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#eee',
//     marginBottom: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//     justifyContent: 'center',
//     height: 50,
//     overflow: 'hidden',
//   },
//   picker: {
//     color: '#333',
//     height: Platform.OS === 'ios' ? 150 : 50,
//     width: '100%',
//   },
//   dropdownArrow: {
//     position: 'absolute',
//     right: 15,
//     width: 15,
//     height: 15,
//     resizeMode: 'contain',
//     tintColor: '#555',
//   },
//   saveButton: {
//     backgroundColor: '#161881',
//     borderRadius: 10,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 40,
//     marginBottom: 20,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default CheckoutScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator, // For loading indicator
  KeyboardAvoidingView, // Import KeyboardAvoidingView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import axiosInstance from '../utils/AxiosInstance'; // Your configured axios instance

const {width} = Dimensions.get('window');

const CheckoutScreen = ({navigation}) => {
  // State for Address Details - Directly mapped to API fields (10 fields)
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState(''); // This will be the selected state/district
  const [pincode, setPincode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [landmark, setLandmark] = useState(''); // Optional, but included in API
  const [mobile, setMobile] = useState('');

  // Loading state for API call
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAddress = async () => {
    // Basic validation for all required address fields (landmark is optional)
    if (
      !houseNo ||
      !street ||
      !city ||
      !district ||
      !pincode ||
      !firstName ||
      !lastName ||
      !country ||
      !mobile
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields: House No, Street/Area, City, District, Pincode, First Name, Last Name, Country, and Mobile Number.',
      );
      return;
    }

    setIsLoading(true);

    // Prepare data for x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('houseNo', houseNo);
    formData.append('street', street);
    formData.append('city', city);
    formData.append('district', district);
    formData.append('pincode', pincode);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('country', country);
    formData.append('landmark', landmark); // Send even if empty string
    formData.append('mobile', mobile);

    try {
      const response = await axiosInstance.post(
        '/web/add-address',
        formData.toString(), // Convert URLSearchParams to string
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // axiosInstance should already have your Authorization token in its config
          },
        },
      );

      if (response.data && response.data.success) {
        Alert.alert(
          'Success',
          response.data?.message || 'Address added successfully!',
        );

        // Optionally, clear form or navigate back
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          response.data?.message || 'Failed to add address. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error adding address:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          'Network Error: No response from server. Check your internet connection or server status.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      Alert.alert('API Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://placehold.co/24x24/000000/FFFFFF?text=%3C',
            }} // Placeholder back arrow icon
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>{' '}
        {/* Changed title */}
        <View style={{width: 24}} /> {/* Spacer to balance header */}
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' for iOS, 'height' for Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust offset as needed
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          {/* User Avatar - Retained for visual consistency if desired, but not strictly for API */}
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/images/group_Profile.png')} // Replace with your avatar image
            />
          </View>

          {/* Address Details Section */}
          <Text style={styles.sectionTitle}>Address Details</Text>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={setFirstName}
            editable={!isLoading}
            placeholder="Enter first name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            value={lastName}
            onChangeText={setLastName}
            editable={!isLoading}
            placeholder="Enter last name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            editable={!isLoading}
            placeholder="Enter mobile number"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>House No.</Text>
          <TextInput
            style={styles.textInput}
            value={houseNo}
            onChangeText={setHouseNo}
            editable={!isLoading}
            placeholder="e.g., 123A"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Street/Area</Text>
          <TextInput
            style={styles.textInput}
            value={street}
            onChangeText={setStreet}
            editable={!isLoading}
            placeholder="e.g., Main Street, XYZ Society"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Landmark (Optional)</Text>
          <TextInput
            style={styles.textInput}
            value={landmark}
            onChangeText={setLandmark}
            editable={!isLoading}
            placeholder="e.g., Near ABC Hospital"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.textInput}
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            editable={!isLoading}
            placeholder="e.g., 110001"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.textInput}
            value={city}
            onChangeText={setCity}
            editable={!isLoading}
            placeholder="e.g., New Delhi"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>District</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={district}
              onValueChange={itemValue => setDistrict(itemValue)}
              style={styles.picker}
              dropdownIconColor="#000"
              enabled={!isLoading}>
              <Picker.Item label="Select District" value="" />
              {/* Add more district options here as needed, or fetch dynamically */}
              <Picker.Item label="West Delhi" value="West Delhi" />
              <Picker.Item label="North Delhi" value="North Delhi" />
              <Picker.Item label="South Delhi" value="South Delhi" />
              <Picker.Item label="East Delhi" value="East Delhi" />
              <Picker.Item label="Central Delhi" value="Central Delhi" />
              <Picker.Item label="New Delhi" value="New Delhi" />
              <Picker.Item label="North East Delhi" value="North East Delhi" />
              <Picker.Item label="North West Delhi" value="North West Delhi" />
              <Picker.Item label="Shahdara" value="Shahdara" />
              <Picker.Item label="South East Delhi" value="South East Delhi" />
              <Picker.Item label="South West Delhi" value="South West Delhi" />
              <Picker.Item label="Yamuna Paar" value="Yamuna Paar" />
              {/* You can expand this list based on common districts in India or specific to your service area */}
            </Picker>
            <Image
              source={{
                uri: 'https://placehold.co/15x15/555555/FFFFFF?text=%E2%96%BC',
              }} // Placeholder dropdown arrow
              style={styles.dropdownArrow}
            />
          </View>

          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.textInput}
            value={country}
            onChangeText={setCountry}
            editable={!isLoading}
            placeholder="e.g., India"
            placeholderTextColor="#999"
          />

          {/* Add Address Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddAddress} // Call the API on save
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Add Address</Text>
            )}
          </TouchableOpacity>

          {/* Extra space at the bottom */}
          <View style={{height: 40}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backArrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  // avatarImage: { /* You had this commented out */ },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    marginTop: 15,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
    height: 50,
    overflow: 'hidden',
  },
  picker: {
    color: '#333',
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
  },
  dropdownArrow: {
    position: 'absolute',
    right: 15,
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  saveButton: {
    backgroundColor: '#161881',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;