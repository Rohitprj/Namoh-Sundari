// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance'; // Make sure this path is correct

// const {width} = Dimensions.get('window');

// // ProductCard component to render individual product items
// const ProductCard = ({item, onPress}) => {
//   const imageUrl =
//     item.variants &&
//     item.variants.length > 0 &&
//     item.variants[0].images &&
//     item.variants[0].images.length > 0
//       ? `https://shopinger.co.in${item.variants[0].images[0]}`
//       : 'https://placehold.co/120x120/cccccc/000000?text=No+Image';

//   // Determine the price to display. Using sellingprice if available, otherwise price.
//   const displayPrice =
//     item.variants && item.variants.length > 0
//       ? `₹${parseFloat(
//           item.variants[0].sellingprice || item.variants[0].price,
//         ).toFixed(2)}` // Ensure price is formatted
//       : 'N/A';

//   // Determine rating and review count
//   const rating =
//     item.averageRating !== null ? item.averageRating.toFixed(1) : 'N/A';
//   const reviewCount =
//     item._count && item._count.ProductReview !== undefined
//       ? item._count.ProductReview.toLocaleString()
//       : '0';

//   return (
//     <TouchableOpacity style={styles.productCard} onPress={onPress}>
//       {/* Use onPress prop here */}
//       <Image
//         source={{uri: imageUrl}}
//         style={styles.productImage}
//         onError={e =>
//           console.log(
//             'Product image loading error:',
//             e.nativeEvent.error,
//             'URL:',
//             imageUrl,
//           )
//         }
//       />
//       <Text style={styles.productTitle} numberOfLines={2}>
//         {item.name}
//       </Text>
//       <Text style={styles.productDescription} numberOfLines={2}>
//         {item.description}
//       </Text>
//       <Text style={styles.productPrice}>{displayPrice}</Text>
//       <View style={styles.ratingContainer}>
//         {/* Placeholder for star icon - replace with actual asset if available */}
//         {rating !== 'N/A' && (
//           <Image
//             source={{
//               uri: 'https://placehold.co/12x12/FFD700/000000?text=%E2%98%85',
//             }} // Placeholder star icon
//             style={styles.starIcon}
//           />
//         )}
//         <Text style={styles.ratingText}>{rating}</Text>
//         <Text style={styles.reviewCount}>({reviewCount})</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// // Main ProductAllData component
// export default function ProductAllData({navigation, route}) {
//   const {categorySlug} = route.params; // Get the sub-category slug from route params
//   console.log('subCategorySlug from route params', categorySlug);
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [errorProducts, setErrorProducts] = useState(null);

//   const fetchProductsData = async () => {
//     try {
//       setLoadingProducts(true);
//       setErrorProducts(null);
//       // Fetching products by sub-sub-category 't-shirts-1'
//       const response = await axiosInstance.get(
//         `/web/get-products-by-sub-sub-category/${categorySlug}`,
//       );
//       console.log('Products data all:', JSON.stringify(response.data, null, 2)); // Log pretty JSON

//       // Assuming the API returns data in response.data.data (array of products)
//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setProducts(response.data.data);
//       } else {
//         setProducts([]); // Set to empty array if data is not as expected
//         console.warn('API response data structure unexpected:', response.data);
//         setErrorProducts('No products found or unexpected data format.');
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
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
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductsData();
//   }, []); // Run once on component mount

//   // Handler for navigating to ProductDetails
//   const handleProductPress = productSlug => {
//     // Navigate to the ProductDetails screen, passing the productSlug as a parameter
//     navigation.navigate('ProductDetails', {productSlug: productSlug});
//   };

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
//               source={require('../../assets/images/Profile.png')} // Replace with your profile image path
//               style={styles.logo} // Reusing logo style, consider a dedicated style for avatar
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Image
//           //   source={require('../../assets/search_icon.png')} // Replace with your search icon
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search any product..."
//           placeholderTextColor="#888"
//         />
//         <Image
//           //   source={require('../../assets/mic_icon.png')} // Replace with your mic icon
//           style={styles.micIcon}
//         />
//       </View>

//       {/* Items Count and Filters */}
//       <View style={styles.filterBar}>
//         {loadingProducts ? (
//           <Text style={styles.itemsCount}>Loading Items...</Text>
//         ) : errorProducts ? (
//           <Text style={styles.itemsCount}>Error Loading Items</Text>
//         ) : (
//           <Text style={styles.itemsCount}>{products.length}+ Items</Text>
//         )}
//         <View style={styles.filterActions}>
//           <TouchableOpacity style={styles.filterButton}>
//             <Image
//               //   source={require('../../assets/sort_icon.png')} // Replace with your sort icon
//               style={styles.filterIcon}
//             />
//             <Text style={styles.filterText}>Sort ↑↓</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.filterButton}>
//             <Image
//               //   source={require('../../assets/filter_icon.png')} // Replace with your filter icon
//               style={styles.filterIcon}
//             />
//             <Text style={styles.filterText}>Filter</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Product Grid using FlatList */}
//       {loadingProducts ? (
//         <ActivityIndicator
//           size="large"
//           color="#ff6600"
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
//               // Pass the slug to the onPress handler
//               onPress={() => handleProductPress(item.slug)}
//             />
//           )}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2} // Display 2 columns
//           columnWrapperStyle={styles.row} // Style for rows
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
//     backgroundColor: '#fff',
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
//     paddingHorizontal: 15, // Padding for the FlatList content
//     paddingBottom: 20, // Add some bottom padding to make space for the banner and potentially bottom tabs
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 15, // Margin between rows
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
//   },
//   productImage: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'contain',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   productTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   productDescription: {
//     fontSize: 11,
//     color: '#777',
//     marginBottom: 8,
//     minHeight: 30, // To ensure consistent height for description and prevent layout shifts
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
//     width: width - 30, // Match the width of the FlatList content area
//     height: 150, // Adjust height as per your image
//     resizeMode: 'contain',
//     borderRadius: 10,
//     marginTop: 20, // Space above the banner
//     marginBottom: 20, // Space below the banner before the end of the scroll view
//     alignSelf: 'center', // Center the banner
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert, // Import Alert for showing messages to the user
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../utils/AxiosInstance'; // Make sure this path is correct
import Icon from 'react-native-vector-icons/Feather'; // Import the Feather icon

const {width} = Dimensions.get('window');

// ProductCard component to render individual product items
const ProductCard = ({item, onPress, onToggleWishlist}) => {
  // Add onToggleWishlist prop
  const imageUrl =
    item.variants &&
    item.variants.length > 0 &&
    item.variants[0].images &&
    item.variants[0].images.length > 0
      ? `https://shopinger.co.in${item.variants[0].images[0]}`
      : 'https://placehold.co/120x120/cccccc/000000?text=No+Image';

  // Determine the price to display. Using sellingprice if available, otherwise price.
  const displayPrice =
    item.variants && item.variants.length > 0
      ? `₹${parseFloat(
          item.variants[0].sellingprice || item.variants[0].price,
        ).toFixed(2)}` // Ensure price is formatted
      : 'N/A';

  // Determine rating and review count
  const rating =
    item.averageRating !== null ? item.averageRating.toFixed(1) : 'N/A';
  const reviewCount =
    item._count && item._count.ProductReview !== undefined
      ? item._count.ProductReview.toLocaleString()
      : '0';

  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        {/* Added for positioning the heart icon */}
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
        {/* Wishlist Button */}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => onToggleWishlist(item.variants[0].productId)} // Pass productId to handler
        >
          <Icon
            name="heart"
            size={20}
            color={item.isWishlisted ? 'red' : 'gray'} // Change color based on wishlist status
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
            }} // Placeholder star icon
            style={styles.starIcon}
          />
        )}
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.reviewCount}>({reviewCount})</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ProductAllData({navigation, route}) {
  const {categorySlug} = route.params;
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const fetchProductsData = async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);
      const response = await axiosInstance.get(
        `/web/get-products-by-sub-sub-category/${categorySlug}`,
      );
      console.log('Products data all:', JSON.stringify(response.data, null, 2));

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        // Initialize isWishlisted to false if it's not present
        const productsWithWishlistStatus = response.data.data.map(product => ({
          ...product,
          isWishlisted: product.isWishlisted || false, // Assuming 'isWishlisted' comes from API, default to false
        }));
        setProducts(productsWithWishlistStatus);
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
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const handleProductPress = productSlug => {
    navigation.navigate('ProductDetails', {productSlug: productSlug});
  };

  // New function to handle adding/removing from wishlist
  const handleToggleWishlist = async productId => {
    try {
      // Find the product in the current state to check its wishlist status
      const productIndex = products.findIndex(p => p.id === productId);
      if (productIndex === -1) return; // Product not found

      const currentProduct = products[productIndex];
      const isCurrentlyWishlisted = currentProduct.isWishlisted;

      // Optimistically update the UI
      setProducts(prevProducts => {
        const newProducts = [...prevProducts];
        newProducts[productIndex] = {
          ...newProducts[productIndex],
          isWishlisted: !isCurrentlyWishlisted,
        };
        return newProducts;
      });

      const response = await axiosInstance.post('/web/add-to-wishlist', {
        productId: productId,
      });

      if (response.data.success) {
        // The API either adds or removes, so we just confirm success
        Alert.alert(
          'Success',
          `Product ${
            isCurrentlyWishlisted ? 'removed from' : 'added to'
          } wishlist!`,
        );
        // If your API explicitly returns the new `isWishlisted` status, you might want to update the state again here
        // For now, assuming the optimistic update is sufficient.
      } else {
        // Revert UI if API call fails
        setProducts(prevProducts => {
          const newProducts = [...prevProducts];
          newProducts[productIndex] = {
            ...newProducts[productIndex],
            isWishlisted: isCurrentlyWishlisted, // Revert to original state
          };
          return newProducts;
        });
        Alert.alert(
          'Error',
          response.data.message || 'Failed to update wishlist.',
        );
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      // Revert UI if API call fails
      const productIndex = products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        setProducts(prevProducts => {
          const newProducts = [...prevProducts];
          newProducts[productIndex] = {
            ...newProducts[productIndex],
            isWishlisted: !products[productIndex].isWishlisted, // Revert back
          };
          return newProducts;
        });
      }
      Alert.alert('Error', 'Could not update wishlist. Please try again.');
    }
  };

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
        <Image
          //   source={require('../../assets/search_icon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search any product..."
          placeholderTextColor="#888"
        />
        <Image
          //   source={require('../../assets/mic_icon.png')}
          style={styles.micIcon}
        />
      </View>

      {/* Items Count and Filters */}
      <View style={styles.filterBar}>
        {loadingProducts ? (
          <Text style={styles.itemsCount}>Loading Items...</Text>
        ) : errorProducts ? (
          <Text style={styles.itemsCount}>Error Loading Items</Text>
        ) : (
          <Text style={styles.itemsCount}>{products.length}+ Items</Text>
        )}
        <View style={styles.filterActions}>
          <TouchableOpacity style={styles.filterButton}>
            <Image
              //   source={require('../../assets/sort_icon.png')}
              style={styles.filterIcon}
            />
            <Text style={styles.filterText}>Sort ↑↓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Image
              //   source={require('../../assets/filter_icon.png')}
              style={styles.filterIcon}
            />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid using FlatList */}
      {loadingProducts ? (
        <ActivityIndicator
          size="large"
          color="#ff6600"
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
              onToggleWishlist={handleToggleWishlist} // Pass the wishlist handler
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
  // ... existing styles ...
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
    paddingHorizontal: 15, // Padding for the FlatList content
    paddingBottom: 20, // Add some bottom padding to make space for the banner and potentially bottom tabs
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15, // Margin between rows
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
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
    minHeight: 30, // To ensure consistent height for description and prevent layout shifts
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
  ratingText: {
    fontSize: 12,
    color: '#777',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 11,
    color: '#999',
  },
  bottomPromoBanner: {
    width: width - 30, // Match the width of the FlatList content area
    height: 150, // Adjust height as per your image
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 20, // Space above the banner
    marginBottom: 20, // Space below the banner before the end of the scroll view
    alignSelf: 'center', // Center the banner
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
    position: 'relative', // Added for positioning heart icon
  },
  imageContainer: {
    position: 'relative', // Needed to position the heart icon inside it
    width: '100%',
    height: 120, // Maintain image height
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden', // Ensures image and heart icon stay within bounds
  },
  productImage: {
    width: '100%',
    height: '100%', // Make image fill the container
    resizeMode: 'contain',
    borderRadius: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
    borderRadius: 15, // Make it circular
    padding: 5,
    zIndex: 1, // Ensure it's above the image
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    minHeight: 36, // Ensures two lines for shorter titles too
    // These two lines are for shortening to two lines
    // If you've already added them, no need to add again
    // numberOfLines={2},
    // ellipsizeMode='tail',
  },
  productDescription: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
    minHeight: 30,
    // These two lines are for shortening to two lines
    // If you've already added them, no need to add again
    // numberOfLines={2},
    // ellipsizeMode='tail',
  },
  // ... rest of your styles ...
});
