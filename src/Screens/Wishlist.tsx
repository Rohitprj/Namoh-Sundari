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
// const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

// const ProductCard = ({item, navigation}) => {
//   console.log('WishlistScreen slug', item.slug);
//   // Add navigation prop
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
//       navigation.navigate('ProductDetails', {productSlug: item.slug});
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

// const WishlistScreen = ({navigation}) => {
//   // Add navigation prop here
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
//           // Pass navigation prop to ProductCard
//           renderItem={({item}) => (
//             <ProductCard item={item} navigation={navigation} />
//           )}
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
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 20,
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
//     tintColor: '#555',
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

// import {View, Text} from 'react-native';
// import React from 'react';

// export default function Wishlist() {
//   return (
//     <View>
//       <Text>Wishlist</Text>
//     </View>
//   );
// }

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance'; // Make sure this path is correct
// import Icon from 'react-native-vector-icons/Feather'; // Import the Feather icon

// const {width} = Dimensions.get('window');

// const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

// // Re-using the ProductCard component from your ProductAllData file
// // Make sure this ProductCard is either imported or defined in a common place
// // or copied here. For this example, I'm assuming you'll put it in a common place
// // or define it directly here for simplicity.
// const ProductCard = ({item, onPress, isWishlisted, onToggleWishlist}) => {
//   const imageUrl =
//     item.variants &&
//     item.variants.length > 0 &&
//     item.variants[0].images &&
//     item.variants[0].images.length > 0
//       ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
//       : 'https://placehold.co/120x120/cccccc/000000?text=No+Image';

//   const displayPrice =
//     item.variants && item.variants.length > 0
//       ? `₹${parseFloat(
//           item.variants[0].sellingprice || item.variants[0].price,
//         ).toFixed(2)}`
//       : 'N/A';

//   const rating =
//     item.averageRating !== null && item.averageRating !== undefined
//       ? item.averageRating.toFixed(1)
//       : 'N/A';

//   return (
//     <TouchableOpacity style={styles.productCard} onPress={onPress}>
//       <View style={styles.imageContainer}>
//         <Image
//           source={{uri: imageUrl}}
//           style={styles.productImage}
//           onError={e =>
//             console.log(
//               'Product image loading error:',
//               e.nativeEvent.error,
//               'URL:',
//               imageUrl,
//             )
//           }
//         />
//         <TouchableOpacity
//           style={styles.wishlistButton}
//           onPress={() => onToggleWishlist(item.id)}>
//           <Icon
//             name={isWishlisted ? 'heart' : 'heart-o'}
//             size={20}
//             color={isWishlisted ? '#FF0000' : '#888'}
//           />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
//         {item.name}
//       </Text>
//       <Text
//         style={styles.productDescription}
//         numberOfLines={2}
//         ellipsizeMode="tail">
//         {item.description}
//       </Text>
//       <Text style={styles.productPrice}>{displayPrice}</Text>
//       <View style={styles.ratingContainer}>
//         {rating !== 'N/A' && (
//           <Image
//             source={{
//               uri: 'https://placehold.co/12x12/FFD700/000000?text=%E2%98%85',
//             }}
//             style={styles.starIcon}
//           />
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default function WishlistScreen({navigation}) {
//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [wishlistProductIds, setWishlistProductIds] = useState(new Set()); // To manage local state for toggle

//   // Fetch the user's wishlist products
//   const fetchWishlistProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axiosInstance.get('/web/get-wishlist');

//       console.log(
//         'Wishlist Screen response',
//         JSON.stringify(response.data, null, 2),
//       );

//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         // Assuming the API returns full product objects for the wishlist
//         setWishlistProducts(response.data.data);
//         // Also update the set of product IDs for local state management
//         const ids = new Set(response.data.data.map(product => product.id));
//         setWishlistProductIds(ids);
//       } else {
//         setWishlistProducts([]);
//         console.warn(
//           'Wishlist API response data structure unexpected:',
//           response.data,
//         );
//         setError('No items in wishlist or unexpected data format.');
//       }
//     } catch (err) {
//       console.error('Error fetching wishlist products:', err);
//       let errorMessage = 'Failed to load wishlist. Please try again.';
//       if (err.response) {
//         errorMessage =
//           err.response.data?.message || `Server Error: ${err.response.status}`;
//       } else if (err.request) {
//         errorMessage =
//           'Network Error: No response from server. Check your internet connection.';
//       } else {
//         errorMessage = `Error: ${err.message}`;
//       }
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchWishlistProducts();
//   }, [fetchWishlistProducts]);

//   // Function to add a product to the wishlist (re-used logic)
//   const addToWishlist = async productId => {
//     try {
//       const response = await axiosInstance.post('/web/add-to-wishlist', {
//         productId: productId,
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product added to wishlist!');
//         // Re-fetch the wishlist to ensure data is consistent, or manually add
//         fetchWishlistProducts(); // Simple approach: re-fetch all
//       } else {
//         Alert.alert(
//           'Error',
//           response.data.message || 'Failed to add to wishlist.',
//         );
//       }
//     } catch (error) {
//       console.error('Error adding to wishlist:', error);
//       Alert.alert(
//         'Error',
//         'Could not add product to wishlist. Please try again.',
//       );
//     }
//   };

//   // Function to remove a product from the wishlist (re-used logic)
//   const removeFromWishlist = async productId => {
//     try {
//       const response = await axiosInstance.delete(
//         `/web/remove-from-wishlist/${productId}`,
//       );

//       if (response.data.success) {
//         Alert.alert('Success', 'Product removed from wishlist!');
//         // Re-fetch the wishlist to ensure data is consistent, or manually remove
//         fetchWishlistProducts(); // Simple approach: re-fetch all
//       } else {
//         Alert.alert(
//           'Error',
//           response.data.message || 'Failed to remove from wishlist.',
//         );
//       }
//     } catch (error) {
//       console.error('Error removing from wishlist:', error);
//       Alert.alert(
//         'Error',
//         'Could not remove product from wishlist. Please try again.',
//       );
//     }
//   };

//   // Handler for toggling wishlist status
//   const handleToggleWishlist = async productId => {
//     // In wishlist screen, toggling always means removing
//     await removeFromWishlist(productId);
//   };

//   const handleProductPress = productSlug => {
//     navigation.navigate('ProductDetails', {productSlug: productSlug});
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{padding: 5}}>
//           <Icon name="arrow-left" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.screenTitle}>My Wishlist</Text>
//         <View style={styles.headerRight}></View>
//       </View>

//       {/* Filter and Count Bar Section */}
//       <View style={styles.filterBar}>
//         {loading ? (
//           <Text style={styles.itemsCount}>Loading Items...</Text>
//         ) : error ? (
//           <Text style={styles.itemsCount}>Error Loading Items</Text>
//         ) : (
//           <Text style={styles.itemsCount}>{wishlistProducts.length} Items</Text>
//         )}
//       </View>

//       {/* Product Grid / Loading / Error / No Products */}
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#01088c"
//           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
//         />
//       ) : error ? (
//         <Text style={{color: 'red', textAlign: 'center', marginTop: 50}}>
//           {error}
//         </Text>
//       ) : wishlistProducts.length === 0 ? (
//         <Text
//           style={{
//             textAlign: 'center',
//             marginTop: 50,
//             fontSize: 16,
//             color: '#555',
//           }}>
//           Your wishlist is empty. Add some products!
//         </Text>
//       ) : (
//         <FlatList
//           data={wishlistProducts}
//           renderItem={({item}) => (
//             <ProductCard
//               item={item}
//               onPress={() => handleProductPress(item.slug)}
//               isWishlisted={wishlistProductIds.has(item.id)} // Will always be true for items in this list
//               onToggleWishlist={handleToggleWishlist} // This will primarily be for 'remove' here
//             />
//           )}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={styles.flatListContent}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 5,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   screenTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
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
//     position: 'relative',
//   },
//   imageContainer: {
//     position: 'relative',
//     width: '100%',
//     height: 120,
//     borderRadius: 8,
//     marginBottom: 8,
//     overflow: 'hidden',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//     borderRadius: 8,
//   },
//   wishlistButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     borderRadius: 15,
//     padding: 5,
//     zIndex: 1,
//   },
//   productTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//     minHeight: 36,
//   },
//   productDescription: {
//     fontSize: 11,
//     color: '#777',
//     marginBottom: 8,
//     minHeight: 30,
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#161881',
//     marginBottom: 5,
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
//     tintColor: '#FFD700',
//   },
// });

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../utils/AxiosInstance'; // Make sure this path is correct
import Icon from 'react-native-vector-icons/Feather'; // Import the Feather icon
import Heart from 'react-native-vector-icons/Fontisto'; // Import the Feather icon

const {width} = Dimensions.get('window');

const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

// Re-using the ProductCard component.
// It's highly recommended to place this in a separate file (e.g., components/ProductCard.js)
// and import it into both ProductAllData and WishlistScreen.
const ProductCard = ({item, onPress, isWishlisted, onToggleWishlist}) => {
  // Ensure item.product is used as the base for data extraction
  const productData = item.product || item; // Use item.product if available, else use item directly (for flexibility)

  const imageUrl =
    productData.variants &&
    productData.variants.length > 0 &&
    productData.variants[0].images &&
    productData.variants[0].images.length > 0
      ? `${IMAGE_BASE_URL}${productData.variants[0].images[0]}`
      : 'https://placehold.co/120x120/cccccc/000000?text=No+Image';

  const displayPrice =
    productData.variants && productData.variants.length > 0
      ? `₹${parseFloat(
          productData.variants[0].sellingprice || productData.variants[0].price,
        ).toFixed(2)}`
      : 'N/A';

  const rating =
    productData.averageRating !== null &&
    productData.averageRating !== undefined
      ? productData.averageRating.toFixed(1)
      : 'N/A';

  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUrl}}
          style={styles.productImage}
          onError={e =>
            console.log(
              'Product image loading error:',
              e.nativeEvent.error,
              'URL:',
              imageUrl,
            )
          }
        />
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => onToggleWishlist(productData.id)}>
          {/* Use productData.id */}
          <Heart
            name={isWishlisted ? 'heart' : 'heart-alt'}
            size={20}
            color={isWishlisted ? '#ffccd5' : '#888'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
        {productData.name}
      </Text>
      <Text
        style={styles.productDescription}
        numberOfLines={2}
        ellipsizeMode="tail">
        {productData.description}
      </Text>
      <Text style={styles.productPrice}>{displayPrice}</Text>
      <View style={styles.ratingContainer}>
        {rating !== 'N/A' && (
          <Image
            source={{
              uri: 'https://placehold.co/12x12/FFD700/000000?text=%E2%98%85',
            }}
            style={styles.starIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function WishlistScreen({navigation}) {
  const [wishlistItems, setWishlistItems] = useState([]); // Stores the raw wishlist items (id, userId, productId, product:{...})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set()); // To manage local state for heart icon

  // Fetch the user's wishlist products
  const fetchWishlistProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get('/web/get-wishlist');

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setWishlistItems(response.data.data); // Store the entire wishlist item object
        // Extract product IDs for the Set
        const ids = new Set(response.data.data.map(item => item.productId)); // Use item.productId from the wishlist object
        setWishlistProductIds(ids);
      } else {
        setWishlistItems([]);
        console.warn(
          'Wishlist API response data structure unexpected:',
          response.data,
        );
        setError('No items in wishlist or unexpected data format.');
      }
    } catch (err) {
      console.error('Error fetching wishlist products:', err);
      let errorMessage = 'Failed to load wishlist. Please try again.';
      if (err.response) {
        errorMessage =
          err.response.data?.message || `Server Error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage =
          'Network Error: No response from server. Check your internet connection.';
      } else {
        errorMessage = `Error: ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlistProducts();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchWishlistProducts();
    });
    return unsubscribe; // Clean up the listener
  }, [fetchWishlistProducts, navigation]);

  // Function to add a product to the wishlist
  // This might be used if you allow adding from the wishlist screen, but generally remove is more common here.
  // const addToWishlist = async productId => {
  //   try {
  //     const response = await axiosInstance.post('/web/add-to-wishlist', {
  //       productId: productId,
  //     });

  //     if (response.data.success) {
  //       Alert.alert('Success', 'Product added to wishlist!');
  //       fetchWishlistProducts(); // Re-fetch to ensure UI is updated
  //     } else {
  //       Alert.alert(
  //         'Error',
  //         response.data.message || 'Failed to add to wishlist.',
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error adding to wishlist:', error);
  //     Alert.alert(
  //       'Error',
  //       'Could not add product to wishlist. Please try again.',
  //     );
  //   }
  // };

  // Function to remove a product from the wishlist
  const removeFromWishlist = async productId => {
    try {
      const response = await axiosInstance.delete(
        `/web/remove-from-wishlist/${productId}`,
      );

      if (response.data.success) {
        Alert.alert('Success', 'Product removed from wishlist!');
        fetchWishlistProducts(); // Re-fetch to ensure UI is updated and item disappears
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to remove from wishlist.',
        );
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert(
        'Error',
        'Could not remove product from wishlist. Please try again.',
      );
    }
  };

  const handleToggleWishlist = async productId => {
    await removeFromWishlist(productId);
  };

  const handleProductPress = productSlug => {
    navigation.navigate('ProductDetails', {productSlug: productSlug});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 5}}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>My Wishlist</Text>
        <View style={styles.headerRight}></View>
      </View>

      {/* Filter and Count Bar Section */}
      <View style={styles.filterBar}>
        {loading ? (
          <Text style={styles.itemsCount}>Loading Items...</Text>
        ) : error ? (
          <Text style={styles.itemsCount}>Error Loading Items</Text>
        ) : (
          <Text style={styles.itemsCount}>{wishlistItems.length} Items</Text>
        )}
      </View>

      {/* Product Grid / Loading / Error / No Products */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#01088c"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : error ? (
        <Text style={{color: 'red', textAlign: 'center', marginTop: 50}}>
          {error}
        </Text>
      ) : wishlistItems.length === 0 ? (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 50,
            fontSize: 16,
            color: '#555',
          }}>
          Your wishlist is empty. Add some products!
        </Text>
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={({item}) => (
            <ProductCard
              item={item}
              onPress={() => handleProductPress(item.product.slug)}
              isWishlisted={wishlistProductIds.has(item.productId)}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    minHeight: 36,
  },
  productDescription: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
    minHeight: 30,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#161881',
    marginBottom: 5,
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
    tintColor: '#FFD700',
  },
});
