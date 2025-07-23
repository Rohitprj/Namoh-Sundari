// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   FlatList, // Import FlatList
//   ActivityIndicator, // Import ActivityIndicator for loading state
//   Alert, // Import Alert for error handling
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance';
// import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
// // Adjust this path to your axiosInstance

// const {width} = Dimensions.get('window');

// // Base URL for images
// const IMAGE_BASE_URL = 'https://shopinger.co.in';

// const ProductCard = ({item}) => {
//   // Extracting data from the item object based on the API structure
//   const imageUrl =
//     item.variants &&
//     item.variants.length > 0 &&
//     item.variants[0].images.length > 0
//       ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
//       : 'https://via.placeholder.com/120'; // Placeholder if no image is available

//   const price =
//     item.variants && item.variants.length > 0
//       ? `₹${item.variants[0].price}`
//       : 'N/A';

//   const categoryText = `${item.mainCategory.name} • ${item.subCategory.name}`;
//   const stockStatus =
//     item.variants && item.variants.length > 0 && item.variants[0].stock > 0
//       ? 'In Stock'
//       : 'Out of Stock';

//   return (
//     <TouchableOpacity style={styles.productCard}>
//       <View style={styles.imageContainer}>
//         <Image source={{uri: imageUrl}} style={styles.productImage} />
//       </View>
//       <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
//         {item.name}
//       </Text>
//       <Text style={styles.productCategory}>{categoryText}</Text>
//       <View style={styles.priceStockContainer}>
//         <Text style={styles.productPrice}>{price}</Text>
//         <Text
//           style={[
//             styles.stockStatus,
//             {color: stockStatus === 'In Stock' ? 'green' : 'red'},
//           ]}>
//           {stockStatus}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const WishlistScreen = () => {
//   const [wishlistData, setWishlistData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Wrap fetchWishlist in useCallback to prevent unnecessary re-creations
//   const fetchWishlist = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null); // Clear previous errors
//       const response = await axiosInstance.get('/web/get-wishlist');
//       console.log(
//         'Wishlist Screen response',
//         JSON.stringify(response, null, 2),
//       );
//       // The actual product data is inside response.data.data
//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setWishlistData(response.data.data);
//       } else {
//         setWishlistData([]);
//         console.warn('API response data structure unexpected:', response.data);
//         setError('No wishlist items found or unexpected data format.');
//       }
//     } catch (err) {
//       setError(err);
//       console.error('Failed to fetch wishlist:', err);
//       Alert.alert('Error', 'Failed to load wishlist. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Empty dependency array means fetchWishlist won't change unless its definition changes

//   // Use useFocusEffect to call fetchWishlist whenever the screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       fetchWishlist();
//       // You can return a cleanup function here if needed
//       return () => {
//         // Optional: Any cleanup when the screen loses focus
//       };
//     }, [fetchWishlist]), // Depend on fetchWishlist to re-run when it changes
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#ff6600" />
//         <Text>Loading Wishlist...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={[styles.safeArea, styles.errorContainer]}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchWishlist}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <Image
//           source={require('../../assets/images/logo.png')}
//           style={styles.logo}
//         />
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerAvatarContainer}>
//             <Image
//               source={require('../../assets/images/Profile.png')}
//               style={styles.logo}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {wishlistData.length > 0 ? (
//         <FlatList
//           data={wishlistData}
//           renderItem={({item}) => <ProductCard item={item} />}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={styles.flatListContent}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.emptyWishlistContainer}>
//           <Text style={styles.emptyWishlistText}>Your wishlist is empty.</Text>
//           <Text style={styles.emptyWishlistSubText}>
//             Add some products you love!
//           </Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   FlatList, // Import FlatList
//   ActivityIndicator, // Import ActivityIndicator for loading state
//   Alert, // Import Alert for error handling
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance';
// import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
// // Adjust this path to your axiosInstance

// const {width} = Dimensions.get('window');

// // Base URL for images
// const IMAGE_BASE_URL = 'https://shopinger.co.in';

// const ProductCard = ({item, navigation}) => { // Add navigation prop
//   // Extracting data from the item object based on the API structure
//   const imageUrl =
//     item.variants &&
//     item.variants.length > 0 &&
//     item.variants[0].images.length > 0
//       ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
//       : 'https://via.placeholder.com/120'; // Placeholder if no image is available

//   const price =
//     item.variants && item.variants.length > 0
//       ? `₹${item.variants[0].price}`
//       : 'N/A';

//   const categoryText = `${item.mainCategory.name} • ${item.subCategory.name}`;
//   const stockStatus =
//     item.variants && item.variants.length > 0 && item.variants[0].stock > 0
//       ? 'In Stock'
//       : 'Out of Stock';

//   const handleCardPress = () => {
//     // Navigate to ProductDetails screen, passing the product slug
//     if (navigation && item.slug) {
//       navigation.navigate('ProductDetails', {slug: item.slug});
//     } else {
//       console.warn('Navigation object or product slug is missing.');
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.productCard} onPress={handleCardPress}>
//       <View style={styles.imageContainer}>
//         <Image source={{uri: imageUrl}} style={styles.productImage} />
//       </View>
//       <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
//         {item.name}
//       </Text>
//       <Text style={styles.productCategory}>{categoryText}</Text>
//       <View style={styles.priceStockContainer}>
//         <Text style={styles.productPrice}>{price}</Text>
//         <Text
//           style={[
//             styles.stockStatus,
//             {color: stockStatus === 'In Stock' ? 'green' : 'red'},
//           ]}>
//           {stockStatus}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const WishlistScreen = ({navigation}) => { // Add navigation prop here
//   const [wishlistData, setWishlistData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Wrap fetchWishlist in useCallback to prevent unnecessary re-creations
//   const fetchWishlist = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null); // Clear previous errors
//       const response = await axiosInstance.get('/web/get-wishlist');
//       console.log(
//         'Wishlist Screen response',
//         JSON.stringify(response, null, 2),
//       );
//       // The actual product data is inside response.data.data
//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setWishlistData(response.data.data);
//       } else {
//         setWishlistData([]);
//         console.warn('API response data structure unexpected:', response.data);
//         setError('No wishlist items found or unexpected data format.');
//       }
//     } catch (err) {
//       setError(err);
//       console.error('Failed to fetch wishlist:', err);
//       Alert.alert('Error', 'Failed to load wishlist. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Empty dependency array means fetchWishlist won't change unless its definition changes

//   // Use useFocusEffect to call fetchWishlist whenever the screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       fetchWishlist();
//       // You can return a cleanup function here if needed
//       return () => {
//         // Optional: Any cleanup when the screen loses focus
//       };
//     }, [fetchWishlist]), // Depend on fetchWishlist to re-run when it changes
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#ff6600" />
//         <Text>Loading Wishlist...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={[styles.safeArea, styles.errorContainer]}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchWishlist}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <Image
//           source={require('../../assets/images/logo.png')}
//           style={styles.logo}
//         />
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerAvatarContainer}>
//             <Image
//               source={require('../../assets/images/Profile.png')}
//               style={styles.logo}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {wishlistData.length > 0 ? (
//         <FlatList
//           data={wishlistData}
//           renderItem={({item}) => <ProductCard item={item} navigation={navigation} />} {/* Pass navigation prop */}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={styles.flatListContent}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.emptyWishlistContainer}>
//           <Text style={styles.emptyWishlistText}>Your wishlist is empty.</Text>
//           <Text style={styles.emptyWishlistSubText}>
//             Add some products you love!
//           </Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   FlatList, // Import FlatList
//   ActivityIndicator, // Import ActivityIndicator for loading state
//   Alert, // Import Alert for error handling
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance';
// import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
// // Adjust this path to your axiosInstance

// const {width} = Dimensions.get('window');

// // Base URL for images
// const IMAGE_BASE_URL = 'https://shopinger.co.in';

// const ProductCard = ({item, navigation}) => { // Add navigation prop
//   // Extracting data from the item object based on the API structure
//   const imageUrl =
//     item.variants &&
//     item.variants.length > 0 &&
//     item.variants[0].images.length > 0
//       ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
//       : 'https://via.placeholder.com/120'; // Placeholder if no image is available

//   const price =
//     item.variants && item.variants.length > 0
//       ? `₹${item.variants[0].price}`
//       : 'N/A';

//   const categoryText = `${item.mainCategory.name} • ${item.subCategory.name}`;
//   const stockStatus =
//     item.variants && item.variants.length > 0 && item.variants[0].stock > 0
//       ? 'In Stock'
//       : 'Out of Stock';

//   const handleCardPress = () => {
//     // Navigate to ProductDetails screen, passing the product slug
//     if (navigation && item.slug) {
//       navigation.navigate('ProductDetails', {slug: item.slug});
//     } else {
//       console.warn('Navigation object or product slug is missing.');
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.productCard} onPress={handleCardPress}>
//       <View style={styles.imageContainer}>
//         <Image source={{uri: imageUrl}} style={styles.productImage} />
//       </View>
//       <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
//         {item.name}
//       </Text>
//       <Text style={styles.productCategory}>{categoryText}</Text>
//       <View style={styles.priceStockContainer}>
//         <Text style={styles.productPrice}>{price}</Text>
//         <Text
//           style={[
//             styles.stockStatus,
//             {color: stockStatus === 'In Stock' ? 'green' : 'red'},
//           ]}>
//           {stockStatus}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const WishlistScreen = ({navigation}) => { // Add navigation prop here
//   const [wishlistData, setWishlistData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Wrap fetchWishlist in useCallback to prevent unnecessary re-creations
//   const fetchWishlist = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null); // Clear previous errors
//       const response = await axiosInstance.get('/web/get-wishlist');
//       console.log(
//         'Wishlist Screen response',
//         JSON.stringify(response, null, 2),
//       );
//       // The actual product data is inside response.data.data
//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setWishlistData(response.data.data);
//       } else {
//         setWishlistData([]);
//         console.warn('API response data structure unexpected:', response.data);
//         setError('No wishlist items found or unexpected data format.');
//       }
//     } catch (err) {
//       setError(err);
//       console.error('Failed to fetch wishlist:', err);
//       Alert.alert('Error', 'Failed to load wishlist. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Empty dependency array means fetchWishlist won't change unless its definition changes

//   // Use useFocusEffect to call fetchWishlist whenever the screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       fetchWishlist();
//       // You can return a cleanup function here if needed
//       return () => {
//         // Optional: Any cleanup when the screen loses focus
//       };
//     }, [fetchWishlist]), // Depend on fetchWishlist to re-run when it changes
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#ff6600" />
//         <Text>Loading Wishlist...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={[styles.safeArea, styles.errorContainer]}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchWishlist}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <Image
//           source={require('../../assets/images/logo.png')}
//           style={styles.logo}
//         />
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerAvatarContainer}>
//             <Image
//               source={require('../../assets/images/Profile.png')}
//               style={styles.logo}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {wishlistData.length > 0 ? (
//         <FlatList
//           data={wishlistData}
//           renderItem={({item}) => <ProductCard item={item} navigation={navigation} />} {/* Pass navigation prop */}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           // columnWrapperStyle={styles.row}
//           // contentContainerStyle={styles.flatListContent}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.emptyWishlistContainer}>
//           <Text style={styles.emptyWishlistText}>Your wishlist is empty.</Text>
//           <Text style={styles.emptyWishlistSubText}>
//             Add some products you love!
//           </Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#ff6600',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   backArrowIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   logo: {
//     width: 100,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   headerIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   headerAvatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerAvatarText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginHorizontal: 15,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: '#eee',
//     marginBottom: 10,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//     color: '#333',
//   },
//   micIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     marginLeft: 10,
//   },
//   filterBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 15,
//     marginBottom: 15,
//   },
//   itemsCount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   filterActions: {
//     flexDirection: 'row',
//   },
//   filterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginLeft: 10,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   filterIcon: {
//     width: 15,
//     height: 15,
//     resizeMode: 'contain',
//     marginRight: 5,
//     tintColor: '#555',
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   flatListContent: {
//     paddingHorizontal: 15,
//     paddingBottom: 20,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   productCard: {
//     width: (width - 45) / 2,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   imageContainer: {
//     position: 'relative',
//     width: '100%',
//     height: 120,
//     borderRadius: 8,
//     marginBottom: 8,
//     overflow: 'hidden', // Ensures image and heart icon stay within bounds
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   heartIconContainer: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 15,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heartIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     tintColor: 'red', // You can change the color of the heart
//   },
//   productTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//     minHeight: 36, // Ensure consistent height for titles across cards
//   },
//   productCategory: {
//     fontSize: 11,
//     color: '#777',
//     marginBottom: 8,
//   },
//   priceStockContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#ff6600',
//   },
//   stockStatus: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   starIcon: {
//     width: 12,
//     height: 12,
//     resizeMode: 'contain',
//     marginRight: 3,
//   },
//   ratingText: {
//     fontSize: 12,
//     color: '#777',
//     marginRight: 5,
//   },
//   reviewCount: {
//     fontSize: 11,
//     color: '#999',
//   },
//   emptyWishlistContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyWishlistText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#555',
//     marginBottom: 10,
//   },
//   emptyWishlistSubText: {
//     fontSize: 14,
//     color: '#888',
//     textAlign: 'center',
//   },
// });

// export default WishlistScreen;

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList, // Import FlatList
  ActivityIndicator, // Import ActivityIndicator for loading state
  Alert, // Import Alert for error handling
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../utils/AxiosInstance';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
// Adjust this path to your axiosInstance

const {width} = Dimensions.get('window');

// Base URL for images
const IMAGE_BASE_URL = 'https://shopinger.co.in';

const ProductCard = ({item, navigation}) => {
  console.log('WishlistScreen slug', item.slug);
  // Add navigation prop
  // Extracting data from the item object based on the API structure
  const imageUrl =
    item.variants &&
    item.variants.length > 0 &&
    item.variants[0].images.length > 0
      ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
      : 'https://via.placeholder.com/120'; // Placeholder if no image is available

  const price =
    item.variants && item.variants.length > 0
      ? `₹${item.variants[0].price}`
      : 'N/A';

  const categoryText = `${item.mainCategory.name} • ${item.subCategory.name}`;
  const stockStatus =
    item.variants && item.variants.length > 0 && item.variants[0].stock > 0
      ? 'In Stock'
      : 'Out of Stock';

  const handleCardPress = () => {
    // Navigate to ProductDetails screen, passing the product slug
    if (navigation && item.slug) {
      navigation.navigate('ProductDetails', {productSlug: item.slug});
    } else {
      console.warn('Navigation object or product slug is missing.');
    }
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={handleCardPress}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={styles.productImage} />
      </View>
      <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={styles.productCategory}>{categoryText}</Text>
      <View style={styles.priceStockContainer}>
        <Text style={styles.productPrice}>{price}</Text>
        <Text
          style={[
            styles.stockStatus,
            {color: stockStatus === 'In Stock' ? 'green' : 'red'},
          ]}>
          {stockStatus}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const WishlistScreen = ({navigation}) => {
  // Add navigation prop here
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchWishlist in useCallback to prevent unnecessary re-creations
  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axiosInstance.get('/web/get-wishlist');
      console.log(
        'Wishlist Screen response',
        JSON.stringify(response, null, 2),
      );
      // The actual product data is inside response.data.data
      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setWishlistData(response.data.data);
      } else {
        setWishlistData([]);
        console.warn('API response data structure unexpected:', response.data);
        setError('No wishlist items found or unexpected data format.');
      }
    } catch (err) {
      setError(err);
      console.error('Failed to fetch wishlist:', err);
      Alert.alert('Error', 'Failed to load wishlist. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means fetchWishlist won't change unless its definition changes

  // Use useFocusEffect to call fetchWishlist whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
      // You can return a cleanup function here if needed
      return () => {
        // Optional: Any cleanup when the screen loses focus
      };
    }, [fetchWishlist]), // Depend on fetchWishlist to re-run when it changes
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text>Loading Wishlist...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.errorContainer]}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchWishlist}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerAvatarContainer}>
            <Image
              source={require('../../assets/images/Profile.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>

      {wishlistData.length > 0 ? (
        <FlatList
          data={wishlistData}
          // Pass navigation prop to ProductCard
          renderItem={({item}) => (
            <ProductCard item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyWishlistContainer}>
          <Text style={styles.emptyWishlistText}>Your wishlist is empty.</Text>
          <Text style={styles.emptyWishlistSubText}>
            Add some products you love!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  backArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  headerAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  micIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  itemsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  filterActions: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#555',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  flatListContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden', // Ensures image and heart icon stay within bounds
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'red', // You can change the color of the heart
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    minHeight: 36, // Ensure consistent height for titles across cards
  },
  productCategory: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
  },
  priceStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    color: '#777',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 11,
    color: '#999',
  },
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyWishlistText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  emptyWishlistSubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default WishlistScreen;
