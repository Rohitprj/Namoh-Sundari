// import React, { useState } from 'react';
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
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// const AddReviewScreen = ({ navigation,route }) => {
//   const {productId} = route.params;
//   console.log("Product ID in AddReviewScreen:", productId);
//   const [name, setName] = useState('');
//   const [experience, setExperience] = useState('');
//   const [rating, setRating] = useState(0); // State to store selected star rating

//   const handleStarPress = (selectedRating) => {
//     setRating(selectedRating);
//   };

//   const handleSubmitReview = () => {
//     if (!name || !experience || rating === 0) {
//       Alert.alert('Missing Information', 'Please fill in your name, describe your experience, and select a star rating.');
//       return;
//     }
//     // Here you would typically send the review data to your backend
//     Alert.alert('Review Submitted', `Thank you for your ${rating}-star review, ${name}!`);
//     // Reset form or navigate back
//     setName('');
//     setExperience('');
//     setRating(0);
//     navigation.goBack(); // Navigate back after submission
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             // source={require('./assets/back_arrow.png')} // Replace with your back arrow icon
//             style={styles.backArrowIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add Review</Text>
//         <View style={{ width: 24 }} /> {/* Spacer to balance header */}
//       </View>

//       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//         {/* Name Input */}
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Type your name"
//           placeholderTextColor="#999"
//           value={name}
//           onChangeText={setName}
//         />

//         {/* Experience Input */}
//         <Text style={styles.label}>How was your experience ?</Text>
//         <TextInput
//           style={styles.textAreaInput}
//           placeholder="Describe your experience?"
//           placeholderTextColor="#999"
//           multiline
//           numberOfLines={6} // Approx lines visible
//           value={experience}
//           onChangeText={setExperience}
//           textAlignVertical="top" // Important for multiline Android
//         />

//         {/* Star Rating */}
//         <Text style={styles.label}>Star</Text>
//         <View style={styles.starRatingContainer}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
//               {/* <Image
//                 // source={
//                 //   star <= rating
//                 //     ? require('./assets/star_icon_filled.png') // Filled star icon
//                 //     : require('./assets/star_icon_outline.png') // Outline star icon
//                 // }
//                 style={styles.starIcon}
//               /> */}
//               <Text>⭐</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Submit Button (not in screenshot, but essential for functionality) */}
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
//           <Text style={styles.submitButtonText}>Submit Review</Text>
//         </TouchableOpacity>
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
//     flexGrow: 1, // Allows content to grow and scroll if needed
//     paddingHorizontal: 20,
//     paddingVertical: 25,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//     marginTop: 20, // Space above each section
//   },
//   textInput: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#333',
//     borderWidth: 1,
//     borderColor: '#eee',
//     shadowColor: '#000', // Small shadow for depth
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   textAreaInput: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#333',
//     borderWidth: 1,
//     borderColor: '#eee',
//     minHeight: 120, // Increased height for multiline input
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   starRatingContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//     marginBottom: 30, // Space below stars
//   },
//   starIcon: {
//     width: 35, // Larger stars
//     height: 35,
//     resizeMode: 'contain',
//     marginRight: 10,
//     tintColor: '#ffc107', // Gold color for stars
//   },
//   submitButton: {
//     backgroundColor: '#ff6600',
//     borderRadius: 10,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 30, // Space above button
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default AddReviewScreen;

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
  ActivityIndicator, // Added for loading indicator
  Animated, // For message animation
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../utils/AxiosInstance'; // Import your axios instance

const {width} = Dimensions.get('window');

const AddReviewScreen = ({navigation, route}) => {
  // Get productId from navigation params
  const {productId, productName} = route.params;
  console.log('Product ID in AddReviewScreen:', productId);
  console.log('Product Name in AddReviewScreen:', productName);

  const [comment, setComment] = useState(''); // Renamed from experience to comment
  const [stars, setStars] = useState(0); // Renamed from rating to stars
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [message, setMessage] = useState(''); // Message to display to the user
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
  const messageAnim = useState(new Animated.Value(-100))[0]; // For message animation

  // Function to show the custom message
  const showCustomMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    Animated.timing(messageAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(messageAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setMessage(''));
      }, 3000); // Message visible for 3 seconds
    });
  };

  const handleStarPress = selectedStars => {
    setStars(selectedStars);
  };

  const handleSubmitReview = async () => {
    if (!comment.trim() || stars === 0) {
      showCustomMessage(
        'Please describe your experience and select a star rating.',
        'error',
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        productId: productId,
        stars: stars,
        comment: comment.trim(),
      };
      console.log('Sending review payload:', payload);

      const response = await axiosInstance.post('web/add-review', payload);
      console.log('Review API response:', response.data);

      if (response.data.success) {
        showCustomMessage('Review submitted successfully!', 'success');
        // Reset form
        setComment('');
        setStars(0);
        // Optionally navigate back after a short delay
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        showCustomMessage(
          response.data.message || 'Failed to submit review.',
          'error',
        );
      }
    } catch (e) {
      console.error('Error submitting review:', e);
      if (e.response) {
        // Server responded with a status other than 2xx
        showCustomMessage(
          e.response.data.message ||
            `Error: ${e.response.status} - ${e.response.data.error}`,
          'error',
        );
      } else if (e.request) {
        // Request was made but no response was received
        showCustomMessage(
          'Network error: No response from server. Check your connection.',
          'error',
        );
      } else {
        // Something else happened in setting up the request
        showCustomMessage('An unexpected error occurred.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Message Display */}
      {message ? (
        <Animated.View
          style={[
            styles.messageBox,
            messageType === 'success' ? styles.successBox : styles.errorBox,
            {transform: [{translateY: messageAnim}]},
          ]}>
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      ) : null}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            // source={require('./assets/back_arrow.png')} // Replace with your back arrow icon
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Review</Text>
        <View style={{width: 24}} /> {/* Spacer to balance header */}
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.productNameText}>{productName || 'Product'}</Text>

        {/* Experience Input */}
        <Text style={styles.label}>How was your experience?</Text>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Describe your experience?"
          placeholderTextColor="#999"
          multiline
          numberOfLines={6} // Approx lines visible
          value={comment}
          onChangeText={setComment}
          textAlignVertical="top" // Important for multiline Android
        />

        {/* Star Rating */}
        <Text style={styles.label}>Star Rating</Text>
        <View style={styles.starRatingContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Text style={styles.starIcon}>
                {star <= stars ? '⭐' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
    flexGrow: 1, // Allows content to grow and scroll if needed
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  productNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20, // Space above each section
  },
  textAreaInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
    minHeight: 120, // Increased height for multiline input
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30, // Space below stars
  },
  starIcon: {
    fontSize: 35, // Larger stars
    marginRight: 10,
    // tintColor: '#ffc107', // Gold color for stars - not applicable for emoji directly
  },
  submitButton: {
    backgroundColor: '#ff6600',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30, // Space above button
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageBox: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top
  },
  successBox: {
    backgroundColor: '#4CAF50', // Green for success
  },
  errorBox: {
    backgroundColor: '#f44336', // Red for error
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddReviewScreen;