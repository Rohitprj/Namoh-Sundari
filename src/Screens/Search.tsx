// import React, {useEffect, useState, useCallback} from 'react';
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
// import axiosInstance from '../utils/AxiosInstance'; // Adjust this path to your axiosInstance
// import Icon from 'react-native-vector-icons/Feather'; // For the search icon

// const {width} = Dimensions.get('window');

// // Base URL for images
// const IMAGE_BASE_URL = 'https://shopinger.co.in';

// // ProductCard component to render individual product items
// // Reused from previous interactions, adapted for search results
// const ProductCard = ({item}) => {
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

//   // Assuming mainCategory and subCategory are available in search results as well
//   const categoryText =
//     item.mainCategory && item.subCategory
//       ? `${item.mainCategory.name} • ${item.subCategory.name}`
//       : '';

//   const stockStatus =
//     item.variants && item.variants.length > 0 && item.variants[0].stock > 0
//       ? 'In Stock'
//       : 'Out of Stock';

//   // --- FIX START: Robust handling for rating and reviewCount ---
//   const rating =
//     item.averageRating !== null && item.averageRating !== undefined
//       ? parseFloat(item.averageRating).toFixed(1)
//       : 'N/A';

//   const reviewCount =
//     item._count && item._count.ProductReview !== undefined
//       ? item._count.ProductReview.toLocaleString()
//       : '0';
//   // --- FIX END ---

//   return (
//     <TouchableOpacity style={styles.productCard}>
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
//         {/* Wishlist Button - can be added here if search results also allow adding to wishlist */}
//         {/* <TouchableOpacity style={styles.wishlistButton}>
//           <Icon name="heart" size={20} color={item.isWishlisted ? 'red' : 'gray'} />
//         </TouchableOpacity> */}
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
//         <Text style={styles.ratingText}>{rating}</Text>
//         <Text style={styles.reviewCount}>({reviewCount})</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// // Main SearchScreen component
// export default function SearchScreen() {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Function to perform the search API call
//   const performSearch = useCallback(async query => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setError(null);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.get(`/web/search-product/${query}`);

//       console.log('Search Response Data:', response.data);
//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setSearchResults(response.data.data);
//       } else {
//         setSearchResults([]);
//         Alert.alert('No Results', 'No products found for your search query.');
//       }
//     } catch (err) {
//       console.error('Error fetching search results:', err);
//       let errorMessage = 'Failed to fetch search results. Please try again.';
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
//       Alert.alert('Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Debounce the search input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       performSearch(searchText);
//     }, 500); // 500ms debounce time

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [searchText, performSearch]); // Re-run effect when searchText or performSearch changes

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

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search any product..."
//           placeholderTextColor="#888"
//           value={searchText}
//           onChangeText={setSearchText} // Update searchText state on change
//           returnKeyType="search"
//           onSubmitEditing={() => performSearch(searchText)} // Trigger search on keyboard submit
//         />
//         <TouchableOpacity onPress={() => performSearch(searchText)}>
//           <Icon
//             name="search"
//             size={24}
//             color="#555"
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Display Search Results */}
//       {/* New View to ensure content area takes up remaining space and has a white background */}
//       <View style={styles.contentArea}>
//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color="#ff6600"
//             style={styles.loadingIndicator}
//           />
//         ) : error ? (
//           <Text style={styles.errorMessage}>{error}</Text>
//         ) : searchResults.length > 0 ? (
//           <FlatList
//             data={searchResults}
//             renderItem={({item}) => <ProductCard item={item} />}
//             keyExtractor={item => item.id.toString()}
//             numColumns={2}
//             columnWrapperStyle={styles.row}
//             contentContainerStyle={styles.flatListContent}
//             style={styles.resultsList}
//             showsVerticalScrollIndicator={false}
//           />
//         ) : (
//           <View style={styles.noResultsContainer}>
//             <Text style={styles.noResultsText}>
//               Start typing to search for products.
//             </Text>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#fff',
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
//   headerAvatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0', // Light gray background for search bar
//     borderRadius: 25, // Rounded corners
//     marginHorizontal: 15,
//     paddingHorizontal: 15,
//     height: 50, // Fixed height for the search bar
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   searchInput: {
//     flex: 1,
//     height: '100%', // Fill the height of the container
//     fontSize: 16,
//     color: '#333',
//     paddingRight: 10, // Space for the icon
//   },
//   searchIcon: {
//     marginLeft: 10,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorMessage: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//   },
//   noResultsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   noResultsText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
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
//     width: (width - 45) / 2, // Calculate width for 2 columns with spacing
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//     overflow: 'hidden', // Ensure content stays within bounds
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
//   productTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//     minHeight: 36, // Ensure consistent height for titles
//   },
//   productDescription: {
//     fontSize: 11,
//     color: '#777',
//     marginBottom: 8,
//     minHeight: 30, // Ensure consistent height for description
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#ff6600',
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
//     tintColor: '#FFD700', // Gold color for stars
//   },
//   reviewCount: {
//     fontSize: 11,
//     color: '#999',
//   },
//   // New styles added to resolve the black screen issue
//   contentArea: {
//     flex: 1,
//     backgroundColor: '#fff', // Ensure this area is white
//   },
//   resultsList: {
//     flex: 1, // Make FlatList take up all available space within contentArea
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
import axiosInstance from '../utils/AxiosInstance'; // Adjust this path to your axiosInstance
import Icon from 'react-native-vector-icons/Feather'; // For the search icon

const {width} = Dimensions.get('window');

// Base URL for images
const IMAGE_BASE_URL = 'https://shopinger.co.in';

// ProductCard component to render individual product items
const ProductCard = ({item, navigation}) => {
  // Add navigation prop here
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

  // Assuming mainCategory and subCategory are available in search results as well
  const categoryText =
    item.mainCategory && item.subCategory
      ? `${item.mainCategory.name} • ${item.subCategory.name}`
      : '';

  const stockStatus =
    item.variants && item.variants.length > 0 && item.variants[0].stock > 0
      ? 'In Stock'
      : 'Out of Stock';

  // --- FIX START: Robust handling for rating and reviewCount ---
  const rating =
    item.averageRating !== null && item.averageRating !== undefined
      ? parseFloat(item.averageRating).toFixed(1)
      : 'N/A';

  const reviewCount =
    item._count && item._count.ProductReview !== undefined
      ? item._count.ProductReview.toLocaleString()
      : '0';
  // --- FIX END ---

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
        {/* Wishlist Button - can be added here if search results also allow adding to wishlist */}
        {/* <TouchableOpacity style={styles.wishlistButton}>
          <Icon name="heart" size={20} color={item.isWishlisted ? 'red' : 'gray'} />
        </TouchableOpacity> */}
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
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.reviewCount}>({reviewCount})</Text>
      </View>
    </TouchableOpacity>
  );
};

// Main SearchScreen component
export default function SearchScreen({navigation}) {
  // Add navigation prop here
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to perform the search API call
  const performSearch = useCallback(async query => {
    if (!query.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/web/search-product/${query}`);

      console.log('Search Response Data:', response.data);
      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setSearchResults(response.data.data);
      } else {
        setSearchResults([]);
        Alert.alert('No Results', 'No products found for your search query.');
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      let errorMessage = 'Failed to fetch search results. Please try again.';
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
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchText);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, performSearch]); // Re-run effect when searchText or performSearch changes

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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search any product..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText} // Update searchText state on change
          returnKeyType="search"
          onSubmitEditing={() => performSearch(searchText)} // Trigger search on keyboard submit
        />
        <TouchableOpacity onPress={() => performSearch(searchText)}>
          <Icon
            name="search"
            size={24}
            color="#555"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Display Search Results */}
      {/* New View to ensure content area takes up remaining space and has a white background */}
      <View style={styles.contentArea}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ff6600"
            style={styles.loadingIndicator}
          />
        ) : error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={({item}) => (
              // Pass navigation prop to ProductCard
              <ProductCard item={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.flatListContent}
            style={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              Start typing to search for products.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
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
  headerAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background for search bar
    borderRadius: 25, // Rounded corners
    marginHorizontal: 15,
    paddingHorizontal: 15,
    height: 50, // Fixed height for the search bar
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: '100%', // Fill the height of the container
    fontSize: 16,
    color: '#333',
    paddingRight: 10, // Space for the icon
  },
  searchIcon: {
    marginLeft: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
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
    width: (width - 45) / 2, // Calculate width for 2 columns with spacing
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden', // Ensure content stays within bounds
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
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    minHeight: 36, // Ensure consistent height for titles
  },
  productDescription: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
    minHeight: 30, // Ensure consistent height for description
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff6600',
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
    tintColor: '#FFD700', // Gold color for stars
  },
  reviewCount: {
    fontSize: 11,
    color: '#999',
  },
  // New styles added to resolve the black screen issue
  contentArea: {
    flex: 1,
    backgroundColor: '#fff', // Ensure this area is white
  },
  resultsList: {
    flex: 1, // Make FlatList take up all available space within contentArea
  },
});
