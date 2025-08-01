// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
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

// const ProductCard = ({item, onPress}) => {
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

//   // --- MODIFIED CODE START ---
//   // Safely access averageRating and convert to fixed decimal
//   const rating =
//     item.averageRating !== null && item.averageRating !== undefined
//       ? item.averageRating.toFixed(1)
//       : 'N/A';

//   // Safely access _count.ProductReview
//   const reviewCount =
//     item._count &&
//     item._count.ProductReview !== undefined &&
//     item._count.ProductReview !== null
//       ? item._count.ProductReview.toLocaleString()
//       : '0';
//   // --- MODIFIED CODE END ---

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
//         {/* Only render star icon if rating is a number */}
//         {rating !== 'N/A' && (
//           <Image
//             source={{
//               uri: 'https://placehold.co/12x12/FFD700/000000?text=%E2%98%85',
//             }}
//             style={styles.starIcon}
//           />
//         )}
//         {/* <Text style={styles.ratingText}>{rating}</Text> */}
//         {/* <Text style={styles.reviewCount}>({reviewCount})</Text> */}
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default function ProductAllData({navigation, route}) {
//   // Extract categoryId from route params
//   const {categoryId} = route.params;

//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [errorProducts, setErrorProducts] = useState(null);

//   /**
//    * Fetches product data from the API based on the categoryId.
//    */
//   const fetchProductsData = async () => {
//     try {
//       setLoadingProducts(true);
//       setErrorProducts(null); // Clear any previous errors

//       // API call to fetch products by main category ID
//       const response = await axiosInstance.get(
//         `/web/get-products-by-main-category/${categoryId}`,
//       );

//       console.log(`Products data for category ID ${categoryId}:`);
//       console.log(
//         'Products Whole data:',
//         JSON.stringify(response.data, null, 2),
//       );

//       // Check if the API response is successful and contains valid data
//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setProducts(response.data.data);
//       } else {
//         // Handle cases where no products are found or data format is unexpected
//         setProducts([]);
//         console.warn('API response data structure unexpected:', response.data);
//         setErrorProducts('No products found or unexpected data format.');
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       // Construct a user-friendly error message
//       let errorMessage = 'Failed to load products. Please try again.';
//       if (error.response) {
//         errorMessage =
//           error.response.data?.message ||
//           `Server Error: ${error.response.status}`;
//       } else if (error.request) {
//         errorMessage =
//           'Network Error: No response from server. Check your internet connection.';
//       } else {
//         errorMessage = `Error: ${error.message}`;
//       }
//       setErrorProducts(errorMessage);
//     } finally {
//       setLoadingProducts(false); // Always set loading to false after attempt
//     }
//   };

//   // Fetch products when the component mounts or categoryId changes
//   useEffect(() => {
//     fetchProductsData();
//   }, [categoryId]); // Depend on categoryId so products refetch if navigation params change

//   /**
//    * Navigates to the ProductDetails screen with the product's slug.
//    * @param {string} productSlug The slug of the product to navigate to.
//    */
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
//         <Image
//           source={require('../../assets/namo-logo.png')}
//           style={{...styles.logo, width: 80, height: 80, right: 20}}
//         />
//         <View style={styles.headerRight}></View>
//       </View>

//       {/* Search Bar Section */}
//       {/* <View style={styles.searchContainer}>
//         <Icon
//           name="search"
//           size={20}
//           color="lightgrey"
//           style={{marginRight: 10}}
//         />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search any product..."
//           placeholderTextColor="#888"
//         />
//       </View> */}

//       {/* Filter and Count Bar Section */}
//       <View style={styles.filterBar}>
//         {loadingProducts ? (
//           <Text style={styles.itemsCount}>Loading Items...</Text>
//         ) : errorProducts ? (
//           <Text style={styles.itemsCount}>Error Loading Items</Text>
//         ) : (
//           <Text style={styles.itemsCount}>{products.length} Items</Text>
//         )}
//         {/* <View style={styles.filterActions}>
//           <TouchableOpacity style={styles.filterButton}>
//             <Icon
//               name="filter"
//               size={15}
//               color="#555"
//               style={{marginRight: 5}}
//             />
//             <Text style={styles.filterText}>Sort ↑↓</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.filterButton}>
//             <Icon
//               name="sliders"
//               size={15}
//               color="#555"
//               style={{marginRight: 5}}
//             />
//             <Text style={styles.filterText}>Filter</Text>
//           </TouchableOpacity>
//         </View> */}
//       </View>

//       {/* Product Grid / Loading / Error / No Products */}
//       {loadingProducts ? (
//         <ActivityIndicator
//           size="large"
//           color="#01088c"
//           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
//         />
//       ) : errorProducts ? (
//         <Text style={{color: 'red', textAlign: 'center', marginTop: 50}}>
//           {errorProducts}
//         </Text>
//       ) : products.length === 0 ? (
//         <Text
//           style={{
//             textAlign: 'center',
//             marginTop: 50,
//             fontSize: 16,
//             color: '#555',
//           }}>
//           No products found for this category.
//         </Text>
//       ) : (
//         <FlatList
//           data={products}
//           renderItem={({item}) => (
//             <ProductCard
//               item={item}
//               onPress={() => handleProductPress(item.slug)}
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
//     backgroundColor: '#f8f8f8', // Changed to light grey for consistency
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
//   backArrowIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   logo: {
//     width: 100, // Adjusted for better visibility
//     height: 30,
//     resizeMode: 'contain',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // right: 10,
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
//     shadowColor: '#000', // Added shadow for a lifted effect
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
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
//     shadowColor: '#000', // Added shadow
//     shadowOffset: {width: 0, height: 0.5},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
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
//     minHeight: 36, // Ensures two lines for shorter titles too
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
//   ratingText: {
//     fontSize: 12,
//     color: '#777',
//     marginRight: 5,
//   },
//   reviewCount: {
//     fontSize: 11,
//     color: '#999',
//   },
//   bottomPromoBanner: {
//     width: width - 30,
//     height: 150,
//     resizeMode: 'contain',
//     borderRadius: 10,
//     marginTop: 20,
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
// });

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
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

// Enhanced ProductCard component to include wishlist functionality
const ProductCard = ({item, onPress, isWishlisted, onToggleWishlist}) => {
  const imageUrl =
    item.variants &&
    item.variants.length > 0 &&
    item.variants[0].images &&
    item.variants[0].images.length > 0
      ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
      : 'https://placehold.co/120x120/cccccc/000000?text=No+Image';

  const displayPrice =
    item.variants && item.variants.length > 0
      ? `₹${parseFloat(
          item.variants[0].sellingprice || item.variants[0].price,
        ).toFixed(2)}`
      : 'N/A';

  const rating =
    item.averageRating !== null && item.averageRating !== undefined
      ? item.averageRating.toFixed(1)
      : 'N/A';

  const reviewCount =
    item._count &&
    item._count.ProductReview !== undefined &&
    item._count.ProductReview !== null
      ? item._count.ProductReview.toLocaleString()
      : '0';

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
          onPress={() => onToggleWishlist(item.id)}>
          <Heart
            name={isWishlisted ? 'heart' : 'heart-alt'}
            size={20}
            color={isWishlisted ? '#ffccd5' : '#888'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text
        style={styles.productDescription}
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.description}
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

export default function ProductAllData({navigation, route}) {
  const {categoryId} = route.params;

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set()); // Using a Set for efficient lookups

  // Function to fetch the user's wishlist
  const fetchWishlist = useCallback(async () => {
    try {
      // You need a backend API to fetch the user's wishlist.
      // Assuming an endpoint like /web/get-wishlist
      const response = await axiosInstance.get('/web/get-wishlist'); // <--- CONFIRM THIS API ENDPOINT

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        // Assuming the response.data.data is an array of wishlist items,
        // and each item has a productId. Adjust if your API returns different structure.
        const currentWishlistIds = new Set(
          response.data.data.map(item => item.productId),
        );
        setWishlistProductIds(currentWishlistIds);
      } else {
        console.warn(
          'Wishlist API response data structure unexpected:',
          response.data,
        );
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      // Optionally show a non-blocking error to the user
      // Alert.alert('Error', 'Could not load wishlist.');
    }
  }, []); // Empty dependency array means this function is created once

  /**
   * Fetches product data from the API based on the categoryId.
   */
  const fetchProductsData = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);

      const response = await axiosInstance.get(
        `/web/get-products-by-main-category/${categoryId}`,
      );

      console.log(`Products data for category ID ${categoryId}:`);
      // console.log('Products Whole data:', JSON.stringify(response.data, null, 2)); // Log only if needed for debugging, can be very verbose

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
        console.warn('API response data structure unexpected:', response.data);
        setErrorProducts('No products found or unexpected data format.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      let errorMessage = 'Failed to load products. Please try again.';
      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          'Network Error: No response from server. Check your internet connection.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      setErrorProducts(errorMessage);
    } finally {
      setLoadingProducts(false);
    }
  }, [categoryId]);

  // Combined effect to fetch both products and wishlist
  useEffect(() => {
    fetchProductsData();
    fetchWishlist(); // Fetch wishlist when component mounts or categoryId changes
  }, [categoryId, fetchProductsData, fetchWishlist]); // Add fetchProductsData and fetchWishlist to dependencies

  const handleProductPress = productSlug => {
    navigation.navigate('ProductDetails', {productSlug: productSlug});
  };

  // Function to add a product to the wishlist
  const addToWishlist = async productId => {
    try {
      const response = await axiosInstance.post('/web/add-to-wishlist', {
        productId: productId,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Product added to wishlist!');
        setWishlistProductIds(prev => new Set(prev).add(productId)); // Add to local state
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to add to wishlist.',
        );
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Alert.alert(
        'Error',
        'Could not add product to wishlist. Please try again.',
      );
    }
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = async productId => {
    try {
      const response = await axiosInstance.delete(
        `/web/remove-from-wishlist/${productId}`,
      );

      if (response.data.success) {
        Alert.alert('Success', 'Product removed from wishlist!');
        setWishlistProductIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId); // Remove from local state
          return newSet;
        });
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

  // Handler for toggling wishlist status
  const handleToggleWishlist = async productId => {
    if (wishlistProductIds.has(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
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
        <Image
          source={require('../../assets/namo-logo.png')}
          style={{...styles.logo, width: 80, height: 80, right: 20}}
        />
        <View style={styles.headerRight}></View>
      </View>

      {/* Filter and Count Bar Section */}
      <View style={styles.filterBar}>
        {loadingProducts ? (
          <Text style={styles.itemsCount}>Loading Items...</Text>
        ) : errorProducts ? (
          <Text style={styles.itemsCount}>Error Loading Items</Text>
        ) : (
          <Text style={styles.itemsCount}>{products.length} Items</Text>
        )}
      </View>

      {/* Product Grid / Loading / Error / No Products */}
      {loadingProducts ? (
        <ActivityIndicator
          size="large"
          color="#01088c"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : errorProducts ? (
        <Text style={{color: 'red', textAlign: 'center', marginTop: 50}}>
          {errorProducts}
        </Text>
      ) : products.length === 0 ? (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 50,
            fontSize: 16,
            color: '#555',
          }}>
          No products found for this category.
        </Text>
      ) : (
        <FlatList
          data={products}
          renderItem={({item}) => (
            <ProductCard
              item={item}
              onPress={() => handleProductPress(item.slug)}
              isWishlisted={wishlistProductIds.has(item.id)} // Pass if item is wishlisted
              onToggleWishlist={handleToggleWishlist} // Pass the toggle function
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
    position: 'relative', // Added for absolute positioning of wishlist button
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
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
    borderRadius: 15,
    padding: 5,
    zIndex: 1, // Ensure it's above the image
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
