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
//   FlatList, // Import FlatList
//   ActivityIndicator, // Import ActivityIndicator for loading state
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance'; // Ensure this path is correct
// import {getUserData} from '../utils/tokenStorage';
// import Feather from 'react-native-vector-icons/Feather';

// const {width} = Dimensions.get('window');

// const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

// const ProductCard = ({product, navigation}) => {
//   console.log(
//     'All data --------------',
//     JSON.stringify(product.subSubCategory.slug, null, 2),
//   );
//   const imageUrl =
//     product.variants &&
//     product.variants.length > 0 &&
//     product.variants[0].images &&
//     product.variants[0].images.length > 0
//       ? `${IMAGE_BASE_URL}${product.variants[0].images[0]}`
//       : 'https://placehold.co/120x120/E0E0E0/555555?text=No+Image';

//   // Get the selling price from the first variant, or default to 0
//   const price =
//     product.variants && product.variants.length > 0
//       ? parseFloat(product.variants[0].sellingprice || '0').toFixed(2)
//       : '0.00';

//   const brandName = 'N/A'; // Or try to parse from product.name if always included

//   return (
//     <TouchableOpacity
//       style={productCardStyles.productCard}
//       onPress={() => {
//         navigation.navigate('ProductAllData'),
//           {categorySlug: product.subSubCategory.slug};
//       }}>
//       <Image
//         source={{uri: imageUrl}}
//         style={productCardStyles.productImage}
//         onError={e =>
//           console.log(
//             'Product image loading error:',
//             e.nativeEvent.error,
//             'URL:',
//             imageUrl,
//           )
//         }
//       />
//       <Text style={productCardStyles.productTitle}>
//         {product.name || 'N/A'}
//       </Text>
//       <Text style={productCardStyles.productDescription} numberOfLines={2}>
//         {product.description || 'No description available.'}
//       </Text>
//       <View style={productCardStyles.priceRatingContainer}>
//         <Text style={productCardStyles.productPrice}>₹{price}</Text>
//         {/* If you have averageRating from API, display it here */}
//         {product.averageRating !== null &&
//         product.averageRating !== undefined ? (
//           <View style={productCardStyles.ratingContainer}>
//             {/* Ensure you have star_icon.png in assets or change to a placeholder URI */}
//             <Image
//               // source={require('../../assets/star_icon.png')}
//               style={productCardStyles.starIcon}
//             />
//             <Text style={productCardStyles.ratingText}>
//               {parseFloat(product.averageRating).toFixed(1)}
//             </Text>
//           </View>
//         ) : (
//           // You can put a default rating or nothing if no rating is available
//           <View style={productCardStyles.ratingContainer}>
//             {/* Placeholder star if no rating data */}
//             <Image
//               source={{
//                 uri: 'https://placehold.co/12x12/FFD700/FFFFFF?text=%E2%98%85',
//               }}
//               style={productCardStyles.starIcon}
//             />
//             <Text style={productCardStyles.ratingText}>N/A</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const productCardStyles = StyleSheet.create({
//   productCard: {
//     width: (width - 45) / 2, // 15 margin on each side, 15 in between
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 15,
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
//   },
//   priceRatingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#ff6600',
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
//   },
// });

// const App = ({navigation}) => {
//   const [categories, setCategories] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [errorCategories, setErrorCategories] = useState(null);

//   // New state variables for nested categories
//   const [currentDisplayLevel, setCurrentDisplayLevel] = useState('main'); // 'main', 'sub', 'sub-sub'
//   const [parentCategory, setParentCategory] = useState(null); // Stores the selected main category
//   const [parentSubCategory, setParentSubCategory] = useState(null); // Stores the selected sub-category

//   const fetchCategoriesData = async () => {
//     try {
//       setLoadingCategories(true);
//       setErrorCategories(null);
//       const response = await axiosInstance.get('/web/get-all-category');
//       console.log('Categories data:', response.data.categories);
//       const userData = await getUserData(); // Assuming this is correct
//       console.log('User data at product page', userData);
//       setCategories(response.data.categories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setErrorCategories('Failed to load categories. Please try again.');
//     } finally {
//       setLoadingCategories(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategoriesData();
//   }, []);

//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [errorProducts, setErrorProducts] = useState(null);

//   // New state for trending products
//   const [trendingProducts, setTrendingProducts] = useState([]);
//   const [loadingTrendingProducts, setLoadingTrendingProducts] = useState(true);
//   const [errorTrendingProducts, setErrorTrendingProducts] = useState(null);

//   const fetchProductsData = async () => {
//     try {
//       setLoadingProducts(true);
//       setErrorProducts(null);
//       const response = await axiosInstance.get(
//         '/web/get-products-by-sub-sub-category/t-shirts-1',
//       );
//       console.log('Products data all:', response.data);

//       if (
//         response.data &&
//         response.data.success &&
//         Array.isArray(response.data.data)
//       ) {
//         setProducts(response.data.data);
//       } else {
//         setProducts([]);
//         console.warn('API response data structure unexpected:', response.data);
//         setErrorProducts('No products found or unexpected data format.');
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setErrorProducts('Failed to load products. Please try again.');
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   // New useEffect to fetch trending products (Facewash)
//   useEffect(() => {
//     const fetchTrendingProducts = async () => {
//       try {
//         setLoadingTrendingProducts(true);
//         setErrorTrendingProducts(null);
//         const response = await axiosInstance.get(
//           '/web/get-products-by-sub-sub-category/facewash',
//         );
//         console.log('Facewash Products data:', response.data);

//         if (
//           response.data &&
//           response.data.success &&
//           Array.isArray(response.data.data)
//         ) {
//           setTrendingProducts(response.data.data);
//         } else {
//           setTrendingProducts([]);
//           console.warn(
//             'API response data structure for trending products unexpected:',
//             response.data,
//           );
//           setErrorTrendingProducts(
//             'No trending products found or unexpected data format.',
//           );
//         }
//       } catch (error) {
//         console.error('Error fetching trending products:', error);
//         setErrorTrendingProducts(
//           'Failed to load trending products. Please try again.',
//         );
//       } finally {
//         setLoadingTrendingProducts(false);
//       }
//     };

//     fetchTrendingProducts();
//   }, []); // Run once on component mount

//   useEffect(() => {
//     fetchProductsData();
//   }, []); // Run once on component mount

//   // --- Category Navigation Logic ---
//   const handleCategoryPress = item => {
//     if (currentDisplayLevel === 'main') {
//       if (item.subCategories && item.subCategories.length > 0) {
//         setParentCategory(item);
//         setCurrentDisplayLevel('sub');
//       } else {
//         console.log(`Category "${item.name}" has no sub-categories.`);
//         setParentCategory(item); // Still set it as parent to show an empty list
//         setCurrentDisplayLevel('sub'); // Move to sub level, which will be empty
//       }
//     } else if (currentDisplayLevel === 'sub') {
//       if (item.subSubCategories && item.subSubCategories.length > 0) {
//         setParentSubCategory(item);
//         setCurrentDisplayLevel('sub-sub');
//       } else {
//         // If sub-category has no sub-subcategories, show empty.
//         console.log(`Sub-category "${item.name}" has no sub-sub-categories.`);
//         setParentSubCategory(item); // Still set it as parent to show an empty list
//         setCurrentDisplayLevel('sub-sub'); // Move to sub-sub level, which will be empty
//       }
//     } else if (currentDisplayLevel === 'sub-sub') {
//       // This is the deepest level, navigate with slug
//       console.log(`Navigating to products for sub-sub-category: ${item.slug}`);
//       navigation.navigate('ProductAllData', {categorySlug: item.slug});
//     }
//   };

//   const handleGoBack = () => {
//     if (currentDisplayLevel === 'sub-sub') {
//       setCurrentDisplayLevel('sub');
//       setParentSubCategory(null); // Clear sub-sub parent
//     } else if (currentDisplayLevel === 'sub') {
//       setCurrentDisplayLevel('main');
//       setParentCategory(null); // Clear main parent
//     }
//     // No action if already at 'main' level
//   };

//   const getCurrentCategoriesToDisplay = () => {
//     if (currentDisplayLevel === 'main') {
//       return categories;
//     } else if (currentDisplayLevel === 'sub' && parentCategory) {
//       return parentCategory.subCategories;
//     } else if (currentDisplayLevel === 'sub-sub' && parentSubCategory) {
//       return parentSubCategory.subSubCategories;
//     }
//     return []; // Fallback, should ideally not happen if state is managed correctly
//   };

//   const getCurrentTitle = () => {
//     if (currentDisplayLevel === 'main') {
//       return 'Categories';
//     } else if (currentDisplayLevel === 'sub' && parentCategory) {
//       return `${parentCategory.name}`;
//     } else if (currentDisplayLevel === 'sub-sub' && parentSubCategory) {
//       return `${parentSubCategory.name}`;
//     }
//     return 'Categories'; // Default title
//   };

//   const renderCategoryItem = ({item}) => {
//     // Determine if the item has children for the current level
//     const hasChildren =
//       (currentDisplayLevel === 'main' &&
//         item.subCategories &&
//         item.subCategories.length > 0) ||
//       (currentDisplayLevel === 'sub' &&
//         item.subSubCategories &&
//         item.subSubCategories.length > 0);

//     return (
//       <TouchableOpacity
//         style={styles.categoryItem}
//         onPress={() => handleCategoryPress(item)}
//         // Disable press if it's a leaf node with no slug for navigation, or if it has no children but isn't a leaf
//         disabled={
//           currentDisplayLevel === 'sub-sub' &&
//           !item.slug &&
//           (!item.subSubCategories || item.subSubCategories.length === 0)
//         }>
//         <Image
//           source={{
//             uri: item.imgUrl
//               ? `${IMAGE_BASE_URL}${item.imgUrl}`
//               : 'https://placehold.co/50x50/cccccc/000000?text=No+Image',
//           }}
//           style={styles.categoryIcon}
//           onError={e =>
//             console.log(
//               'Image loading error for category:',
//               e.nativeEvent.error,
//               'URL:',
//               item.imgUrl ? `${IMAGE_BASE_URL}${item.imgUrl}` : 'N/A',
//             )
//           }
//         />
//         <Text style={styles.categoryText}>{item.name}</Text>
//         {/* Optional: Add an indicator if it has children */}
//         {hasChildren && (
//           <Image
//             source={{
//               uri: 'https://placehold.co/10x10/000000/FFFFFF?text=%3E',
//             }} // Placeholder for a right arrow
//             style={styles.categoryArrowIcon}
//           />
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
//         {/* Header (No changes) */}
//         <View style={styles.header}>
//           <Image
//             source={require('../../assets/images/logo.png')}
//             style={styles.logo}
//           />

//           <View style={styles.headerRight}>
//             <TouchableOpacity
//               style={styles.headerAvatarContainer}
//               onPress={() => navigation.navigate('ShoppingBag')}>
//               <Image
//                 source={require('../../assets/images/Profile.png')}
//                 style={styles.logo}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Search Bar (No changes) */}
//         <View style={styles.searchContainer}>
//           <Feather
//             size={20}
//             name="search"
//             color="lightgrey"
//             style={{right: 4, bottom: 1}}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search any product..."
//             placeholderTextColor="#888"
//           />
//           {/* <TouchableOpacity style={styles.filterButton}>
//             <Image
//               // source={require('./assets/filter_icon.png')}
//               style={styles.filterIcon}
//             />
//             <Text style={styles.filterText}>Filter</Text>
//           </TouchableOpacity> */}
//         </View>

//         {/* Dynamic Categories Section */}
//         <View style={styles.dynamicCategoriesSection}>
//           <View style={styles.dynamicCategoriesHeader}>
//             <Text style={styles.sectionTitleDynamic}>{getCurrentTitle()}</Text>
//             {currentDisplayLevel !== 'main' && (
//               <TouchableOpacity
//                 onPress={handleGoBack}
//                 style={styles.backButton}>
//                 {/* Replace with your back arrow icon */}
//                 <Image
//                   source={{
//                     uri: 'https://placehold.co/20x20/000000/FFFFFF?text=%3C',
//                   }}
//                   style={styles.backIcon}
//                 />
//                 <Text style={styles.backButtonText}>Back</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {loadingCategories ? (
//             <ActivityIndicator
//               size="large"
//               color="#ff6600"
//               style={{marginTop: 20}}
//             />
//           ) : errorCategories ? (
//             <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
//               {errorCategories}
//             </Text>
//           ) : getCurrentCategoriesToDisplay().length > 0 ? (
//             <FlatList
//               data={getCurrentCategoriesToDisplay()}
//               keyExtractor={(item, index) =>
//                 item.id ? item.id.toString() : index.toString()
//               }
//               renderItem={renderCategoryItem}
//               horizontal={false} // Change to vertical for nested display
//               numColumns={3} // Adjust as needed, e.g., 2 or 3 items per row
//               showsHorizontalScrollIndicator={false}
//               showsVerticalScrollIndicator={false}
//               scrollEnabled={false}
//               contentContainerStyle={styles.categoriesGridContainer}
//             />
//           ) : (
//             <Text style={styles.noCategoriesText}>No items found here</Text>
//           )}
//         </View>

//         {/* Rest of your existing content (banners, deals, products) */}
//         {/* 50-40% Off Banner */}
//         <Image
//           source={require('../../assets/products/carousel.png')}
//           style={{alignSelf: 'center'}}
//         />

//         {/* Deal of the Day */}
//         <View style={styles.dealOfTheDayContainer}>
//           <View style={styles.dealTimerContainer}>
//             <Text style={styles.dealOfTheDayTitle}>Deal of the Day</Text>
//             <Image
//               // source={require('./assets/timer_icon.png')} // Replace with your timer icon
//               style={styles.dealTimerIcon}
//             />
//             <Text style={styles.dealTimerText}>19h: 23m: 54s Remaining</Text>
//           </View>
//           <TouchableOpacity
//             style={{alignItems: 'flex-end', justifyContent: 'center', flex: 1}}>
//             <Text style={styles.viewAllText}>View All</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Product Grid 1 (Dynamic Products from API) */}
//         {loadingProducts ? (
//           <ActivityIndicator
//             size="large"
//             color="#ff6600"
//             style={{marginTop: 20}}
//           />
//         ) : errorProducts ? (
//           <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
//             {errorProducts}
//           </Text>
//         ) : (
//           <View style={styles.productGrid}>
//             {products.map(product => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 navigation={navigation}
//               />
//             ))}
//           </View>
//         )}

//         {/* Special Offers */}
//         <View style={styles.specialOffersContainer}>
//           <Image
//             // source={require('./assets/gift_icon.png')} // Replace with your gift icon
//             style={styles.specialOfferIcon}
//           />
//           <View>
//             <Text style={styles.specialOfferTitle}>Special Offers</Text>
//             <Text style={styles.specialOfferText}>
//               We'll make sure you get the best offers{'\n'}you'll ever find.
//             </Text>
//           </View>
//         </View>

//         {/* Flat and Heels Banner */}
//         <Image
//           source={require('../../assets/products/heels.png')}
//           style={styles.flatHeelsBannerImage}
//         />
//         {/* Time remaining banner */}
//         <View
//           style={{...styles.dealOfTheDayContainer, backgroundColor: 'pink'}}>
//           <View style={styles.dealTimerContainer}>
//             <Text style={styles.dealOfTheDayTitle}>Trending Products</Text>
//             <Image
//               // source={require('./assets/timer_icon.png')} // Replace with your timer icon
//               style={styles.dealTimerIcon}
//             />
//             <Text style={styles.dealTimerText}>19h: 23m: 54s Remaining</Text>
//           </View>
//           <TouchableOpacity
//             style={{alignItems: 'flex-end', justifyContent: 'center', flex: 1}}>
//             <Text style={styles.viewAllText}>View All</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Trending Products Section - Now uses FlatList with API data */}
//         {loadingTrendingProducts ? (
//           <ActivityIndicator
//             size="large"
//             color="#ff6600"
//             style={{marginTop: 20}}
//           />
//         ) : errorTrendingProducts ? (
//           <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
//             {errorTrendingProducts}
//           </Text>
//         ) : trendingProducts.length > 0 ? (
//           <FlatList
//             data={trendingProducts}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 style={styles.trendingProductCard}
//                 onPress={() =>
//                   navigation.navigate('ProductAllData', {
//                     categorySlug: item.subSubCategory.slug,
//                   })
//                 }>
//                 <Image
//                   source={{
//                     uri:
//                       item.variants &&
//                       item.variants.length > 0 &&
//                       item.variants[0].images &&
//                       item.variants[0].images.length > 0
//                         ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
//                         : 'https://placehold.co/120x120/E0E0E0/555555?text=No+Image',
//                   }}
//                   style={styles.trendingProductImage}
//                   onError={e =>
//                     console.log(
//                       'Trending product image loading error:',
//                       e.nativeEvent.error,
//                       'URL:',
//                       item.variants &&
//                         item.variants.length > 0 &&
//                         item.variants[0].images &&
//                         item.variants[0].images.length > 0
//                         ? `${IMAGE_BASE_URL}${item.variants[0].images[0]}`
//                         : 'N/A',
//                     )
//                   }
//                 />
//                 {/* Assuming product.mainCategory.name can serve as brand or parse from product.name */}
//                 <Text style={styles.trendingProductBrand}>
//                   {item.mainCategory?.name || 'N/A'}
//                 </Text>
//                 <Text style={styles.trendingProductTitle} numberOfLines={2}>
//                   {item.name || 'N/A'}
//                 </Text>
//                 <View style={styles.trendingProductPriceRating}>
//                   <Text style={styles.trendingProductPrice}>
//                     ₹
//                     {item.variants && item.variants.length > 0
//                       ? parseFloat(
//                           item.variants[0].sellingprice || '0',
//                         ).toFixed(2)
//                       : '0.00'}
//                   </Text>
//                   {item.averageRating !== null &&
//                   item.averageRating !== undefined ? (
//                     <View style={styles.ratingContainer}>
//                       <Image
//                         source={{
//                           uri: 'https://placehold.co/12x12/FFD700/FFFFFF?text=%E2%98%85',
//                         }}
//                         style={styles.starIcon}
//                       />
//                       <Text style={styles.ratingText}>
//                         {parseFloat(item.averageRating).toFixed(1)}
//                       </Text>
//                     </View>
//                   ) : (
//                     <View style={styles.ratingContainer}>
//                       <Image
//                         source={{
//                           uri: 'https://placehold.co/12x12/FFD700/FFFFFF?text=%E2%98%85',
//                         }}
//                         // style={styles.starIcon}
//                       />
//                       <Text style={styles.ratingText}>N/A</Text>
//                     </View>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             )}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.trendingProductsContainer}
//           />
//         ) : (
//           <Text style={{textAlign: 'center', marginTop: 20, color: '#777'}}>
//             No trending products found.
//           </Text>
//         )}

//         {/* Hot Summer Sale Banner */}
//         <View
//           style={{
//             backgroundColor: 'white',
//             width: '90%',
//             alignSelf: 'center',
//             borderRadius: 10,
//           }}>
//           <Image
//             source={require('../../assets/products/hotSummerSale.png')} // Replace with your hot summer sale banner
//             style={styles.hotSummerSaleBanner}
//           />

//           {/* New Arrivals */}
//           <View style={styles.newArrivalsContainer}>
//             <View>
//               <Text style={styles.sectionTitle}>New Arrivals</Text>
//               <Text style={styles.newArrivalsSubtitle}>
//                 Summer New Collections
//               </Text>
//             </View>
//             <TouchableOpacity style={styles.viewAllButtonOrange}>
//               <Text style={styles.viewAllButtonOrangeText}>View All</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Sponsored Ad */}
//         <Text style={styles.sponsoredText}>Sponsored</Text>
//         <Image
//           source={require('../../assets/products/off.png')} // Replace with your sponsored ad image
//           style={styles.sponsoredAdImage}
//         />
//         <Text style={styles.sponsoredAdSubtitleText}>Up to 50% off</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
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
//   filterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   filterIcon: {
//     width: 15,
//     height: 15,
//     resizeMode: 'contain',
//     marginRight: 5,
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginHorizontal: 15,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   // New styles for dynamic category section
//   dynamicCategoriesSection: {
//     backgroundColor: '#fff',
//     marginHorizontal: 15,
//     borderRadius: 10,
//     paddingVertical: 10,
//     marginVertical: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   dynamicCategoriesHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     marginBottom: 10,
//   },
//   sectionTitleDynamic: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: 5, // Adjust for back button
//     flex: 1, // Take remaining space
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//     paddingRight: 10,
//   },
//   backIcon: {
//     width: 16,
//     height: 16,
//     marginRight: 5,
//     tintColor: '#ff6600',
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#ff6600',
//   },
//   categoriesGridContainer: {
//     paddingHorizontal: 15,
//     // No paddingBottom here to allow the scroll view to handle it
//     justifyContent: 'flex-start', // Align items to the start
//   },
//   categoryItem: {
//     alignItems: 'center',
//     justifyContent: 'center', // Center content vertically
//     width: (width - 30 - 30) / 3, // (Total width - horizontal margins - spacing between items) / numColumns
//     marginHorizontal: 5, // Spacing between items
//     marginBottom: 15,
//     // Add these for better visual if needed
//     // backgroundColor: '#f9f9f9',
//     // borderRadius: 8,
//     // paddingVertical: 10,
//   },
//   categoryIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//     resizeMode: 'contain',
//   },
//   categoryText: {
//     fontSize: 12,
//     color: '#555',
//     textAlign: 'center',
//     width: 80,
//   },
//   categoryArrowIcon: {
//     width: 10,
//     height: 10,
//     resizeMode: 'contain',
//     tintColor: '#999',
//     marginTop: 5, // Space between text and arrow
//   },
//   noCategoriesText: {
//     textAlign: 'center',
//     color: '#777',
//     marginTop: 20,
//     fontSize: 14,
//     paddingHorizontal: 15,
//     paddingBottom: 10,
//   },
//   // End new styles
//   bannerContainer: {
//     marginHorizontal: 15,
//     marginTop: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//     position: 'relative',
//     backgroundColor: 'pink',
//   },
//   bannerImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   bannerTextOverlay: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//   },
//   bannerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   bannerSubtitle: {
//     fontSize: 16,
//     color: '#fff',
//     marginTop: 5,
//   },
//   shopNowButton: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginTop: 15,
//   },
//   shopNowButtonText: {
//     color: '#ff6600',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   dealOfTheDayContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 15,
//     marginTop: 20,
//     backgroundColor: '#4392F9',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//   },
//   dealOfTheDayTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   dealTimerContainer: {
//     // flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: '#ffe0b2', // Light orange background
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   dealTimerIcon: {
//     width: 15,
//     height: 15,
//     resizeMode: 'contain',
//     marginRight: 5,
//   },
//   dealTimerText: {
//     fontSize: 12,
//     color: '#fff', // Darker orange text
//   },
//   viewAllText: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//     borderWidth: 1,
//     borderColor: '#fff',
//     padding: 5,
//     borderRadius: 5,
//   },
//   productGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     marginHorizontal: 15,
//     marginTop: 15,
//   },
//   // productCard related styles are now in productCardStyles object
//   specialOffersContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fffbe6', // Light yellow background
//     borderRadius: 10,
//     padding: 15,
//     marginHorizontal: 15,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: '#ffecb3', // Lighter yellow border
//   },
//   specialOfferIcon: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//     marginRight: 15,
//   },
//   specialOfferTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   specialOfferText: {
//     fontSize: 12,
//     color: '#555',
//     flexShrink: 1, // Allows text to wrap
//   },
//   flatHeelsBannerContainer: {
//     marginHorizontal: 15,
//     marginTop: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//     position: 'relative',
//     height: 200, // Fixed height for the banner
//   },
//   flatHeelsBannerImage: {
//     width: '92%',
//     height: 150,
//     borderRadius: 10,
//     marginHorizontal: 15,
//     marginTop: 10,
//   },
//   flatHeelsBannerContent: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//   },
//   flatHeelsBannerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333', // Adjust color based on image background
//     marginBottom: 5,
//   },
//   flatHeelsBannerSubtitle: {
//     fontSize: 14,
//     color: '#555', // Adjust color based on image background
//     marginBottom: 15,
//   },
//   viewNowButton: {
//     backgroundColor: '#ff6600',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 25,
//   },
//   viewNowButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   trendingProductsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 15,
//     marginTop: 20,
//     backgroundColor: 'pink',
//   },
//   viewAllButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   viewAllButtonText: {
//     color: '#ff6600',
//     fontSize: 14,
//     marginRight: 5,
//   },
//   arrowRightIcon: {
//     width: 12,
//     height: 12,
//     resizeMode: 'contain',
//     tintColor: '#ff6600',
//   },
//   trendingProductsContainer: {
//     paddingHorizontal: 15,
//     paddingBottom: 20,
//     marginTop: 10,
//   },
//   trendingProductCard: {
//     width: width * 0.45, // Roughly 2 items per row with spacing
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   trendingProductImage: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'contain',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   trendingProductBrand: {
//     fontSize: 12,
//     color: '#999',
//     marginBottom: 2,
//   },
//   trendingProductTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   trendingProductPriceRating: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   trendingProductPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#ff6600',
//   },
//   hotSummerSaleBanner: {
//     width: '100%',
//     height: 150,
//     alignSelf: 'center',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   newArrivalsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end', // Align the "View All" button with the bottom of the text
//     // marginHorizontal: 15,
//     // marginTop: 20,
//     marginBottom: 10,
//   },
//   newArrivalsSubtitle: {
//     fontSize: 14,
//     color: '#777',
//     marginTop: 5,
//     marginHorizontal: 15,
//   },
//   viewAllButtonOrange: {
//     backgroundColor: '#ff6600',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     right: 15, // Align to the right side
//   },
//   viewAllButtonOrangeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   sponsoredText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 15,
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   sponsoredAdImage: {
//     width: width - 30,
//     height: 200,
//     resizeMode: 'cover',
//     marginHorizontal: 15,
//     borderRadius: 10,
//     position: 'relative',
//   },
//   sponsoredAdOverlay: {
//     position: 'absolute',
//     top: width * 0.7 + 10, // Adjust this based on where your image starts and where the text should overlay
//     left: 40,
//     zIndex: 1,
//   },
//   sponsoredAdTitle: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   sponsoredAdDiscount: {
//     fontSize: 40,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   sponsoredAdSubtitleText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginHorizontal: 15,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   bottomTabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     paddingVertical: 10,
//     paddingBottom: 5, // For better visual on devices with safe area insets
//   },
//   tabItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   tabIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     tintColor: '#999',
//     marginBottom: 3,
//   },
//   activeTabIcon: {
//     tintColor: '#ff6600',
//   },
//   tabText: {
//     fontSize: 10,
//     color: '#999',
//   },
//   activeTabText: {
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
// });

// export default App;

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
//   FlatList, // Import FlatList
//   ActivityIndicator, // Import ActivityIndicator for loading state
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance'; // Ensure this path is correct
// import {getUserData} from '../utils/tokenStorage'; // Keep if used for header, otherwise remove
// import Feather from 'react-native-vector-icons/Feather';

// const {width} = Dimensions.get('window');

// const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

// const App = ({navigation}) => {
//   const [categories, setCategories] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [errorCategories, setErrorCategories] = useState(null);

//   // New state variables for nested categories
//   const [currentDisplayLevel, setCurrentDisplayLevel] = useState('main'); // 'main', 'sub', 'sub-sub'
//   const [parentCategory, setParentCategory] = useState(null); // Stores the selected main category
//   const [parentSubCategory, setParentSubCategory] = useState(null); // Stores the selected sub-category

//   const fetchCategoriesData = async () => {
//     try {
//       setLoadingCategories(true);
//       setErrorCategories(null);
//       const response = await axiosInstance.get('/web/get-all-category');
//       console.log('Categories data:', response.data.categories);
//       const userData = await getUserData(); // Assuming this is correct
//       console.log('User data at product page', userData);
//       setCategories(response.data.categories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setErrorCategories('Failed to load categories. Please try again.');
//     } finally {
//       setLoadingCategories(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategoriesData();
//   }, []);

//   // --- Category Navigation Logic ---
//   const handleCategoryPress = item => {
//     if (currentDisplayLevel === 'main') {
//       if (item.subCategories && item.subCategories.length > 0) {
//         setParentCategory(item);
//         setCurrentDisplayLevel('sub');
//       } else {
//         console.log(`Category "${item.name}" has no sub-categories.`);
//         setParentCategory(item); // Still set it as parent to show an empty list
//         setCurrentDisplayLevel('sub'); // Move to sub level, which will be empty
//       }
//     } else if (currentDisplayLevel === 'sub') {
//       if (item.subSubCategories && item.subSubCategories.length > 0) {
//         setParentSubCategory(item);
//         setCurrentDisplayLevel('sub-sub');
//       } else {
//         // If sub-category has no sub-subcategories, show empty.
//         console.log(`Sub-category "${item.name}" has no sub-sub-categories.`);
//         setParentSubCategory(item); // Still set it as parent to show an empty list
//         setCurrentDisplayLevel('sub-sub'); // Move to sub-sub level, which will be empty
//       }
//     } else if (currentDisplayLevel === 'sub-sub') {
//       // This is the deepest level, navigate with slug
//       console.log(`Navigating to products for sub-sub-category: ${item.slug}`);
//       // Assuming 'ProductAllData' route handles displaying products based on slug
//       navigation.navigate('ProductAllData', {categorySlug: item.slug});
//     }
//   };

//   const handleGoBack = () => {
//     if (currentDisplayLevel === 'sub-sub') {
//       setCurrentDisplayLevel('sub');
//       setParentSubCategory(null); // Clear sub-sub parent
//     } else if (currentDisplayLevel === 'sub') {
//       setCurrentDisplayLevel('main');
//       setParentCategory(null); // Clear main parent
//     }
//     // No action if already at 'main' level
//   };

//   const getCurrentCategoriesToDisplay = () => {
//     if (currentDisplayLevel === 'main') {
//       return categories;
//     } else if (currentDisplayLevel === 'sub' && parentCategory) {
//       return parentCategory.subCategories;
//     } else if (currentDisplayLevel === 'sub-sub' && parentSubCategory) {
//       return parentSubCategory.subSubCategories;
//     }
//     return []; // Fallback, should ideally not happen if state is managed correctly
//   };

//   const getCurrentTitle = () => {
//     if (currentDisplayLevel === 'main') {
//       return 'Categories';
//     } else if (currentDisplayLevel === 'sub' && parentCategory) {
//       return `${parentCategory.name}`;
//     } else if (currentDisplayLevel === 'sub-sub' && parentSubCategory) {
//       return `${parentSubCategory.name}`;
//     }
//     return 'Categories'; // Default title
//   };

//   const renderCategoryItem = ({item}) => {
//     // Determine if the item has children for the current level
//     const hasChildren =
//       (currentDisplayLevel === 'main' &&
//         item.subCategories &&
//         item.subCategories.length > 0) ||
//       (currentDisplayLevel === 'sub' &&
//         item.subSubCategories &&
//         item.subSubCategories.length > 0);

//     return (
//       <TouchableOpacity
//         style={styles.categoryItem}
//         onPress={() => handleCategoryPress(item)}
//         // Disable press if it's a leaf node with no slug for navigation, or if it has no children but isn't a leaf
//         disabled={
//           currentDisplayLevel === 'sub-sub' &&
//           !item.slug &&
//           (!item.subSubCategories || item.subSubCategories.length === 0)
//         }>
//         <Image
//           source={{
//             uri: item.imgUrl
//               ? `${IMAGE_BASE_URL}${item.imgUrl}`
//               : 'https://placehold.co/50x50/cccccc/000000?text=No+Image',
//           }}
//           style={styles.categoryIcon}
//           onError={e =>
//             console.log(
//               'Image loading error for category:',
//               e.nativeEvent.error,
//               'URL:',
//               item.imgUrl ? `${IMAGE_BASE_URL}${item.imgUrl}` : 'N/A',
//             )
//           }
//         />
//         <Text style={styles.categoryText}>{item.name}</Text>
//         {/* Optional: Add an indicator if it has children */}
//         {hasChildren && (
//           <Image
//             source={{
//               uri: 'https://placehold.co/10x10/000000/FFFFFF?text=%3E',
//             }} // Placeholder for a right arrow
//             style={styles.categoryArrowIcon}
//           />
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Image
//             source={require('../../assets/images/logo.png')}
//             style={styles.logo}
//           />

//           <View style={styles.headerRight}>
//             <TouchableOpacity
//               style={styles.headerAvatarContainer}
//               onPress={() => navigation.navigate('ShoppingBag')}>
//               <Image
//                 source={require('../../assets/images/Profile.png')}
//                 style={styles.logo}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <Feather
//             size={20}
//             name="search"
//             color="lightgrey"
//             style={{right: 4, bottom: 1}}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search any product..."
//             placeholderTextColor="#888"
//           />
//         </View>

//         {/* Dynamic Categories Section */}
//         <View style={styles.dynamicCategoriesSection}>
//           <View style={styles.dynamicCategoriesHeader}>
//             <Text style={styles.sectionTitleDynamic}>{getCurrentTitle()}</Text>
//             {currentDisplayLevel !== 'main' && (
//               <TouchableOpacity
//                 onPress={handleGoBack}
//                 style={styles.backButton}>
//                 {/* Replace with your back arrow icon */}
//                 <Image
//                   source={{
//                     uri: 'https://placehold.co/20x20/000000/FFFFFF?text=%3C',
//                   }}
//                   style={styles.backIcon}
//                 />
//                 <Text style={styles.backButtonText}>Back</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {loadingCategories ? (
//             <ActivityIndicator
//               size="large"
//               color="#ff6600"
//               style={{marginTop: 20}}
//             />
//           ) : errorCategories ? (
//             <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
//               {errorCategories}
//             </Text>
//           ) : getCurrentCategoriesToDisplay().length > 0 ? (
//             <FlatList
//               data={getCurrentCategoriesToDisplay()}
//               keyExtractor={(item, index) =>
//                 item.id ? item.id.toString() : index.toString()
//               }
//               renderItem={renderCategoryItem}
//               horizontal={false} // Change to vertical for nested display
//               numColumns={3} // Adjust as needed, e.g., 2 or 3 items per row
//               showsHorizontalScrollIndicator={false}
//               showsVerticalScrollIndicator={false}
//               scrollEnabled={false} // Disable FlatList's own scrolling to allow parent ScrollView to handle it
//               contentContainerStyle={styles.categoriesGridContainer}
//             />
//           ) : (
//             <Text style={styles.noCategoriesText}>No items found here</Text>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//     backgroundColor: '#f8f8f8', // Light background for the whole screen
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     marginHorizontal: -15, // counteract paddingHorizontal of container
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   logo: {
//     width: 30, // Adjust size as needed
//     height: 30, // Adjust size as needed
//     resizeMode: 'contain',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerAvatarContainer: {
//     marginLeft: 15,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginVertical: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   searchInput: {
//     flex: 1,
//     height: 45,
//     fontSize: 16,
//     color: '#333',
//     paddingLeft: 10,
//   },
//   dynamicCategoriesSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   dynamicCategoriesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitleDynamic: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//   },
//   backIcon: {
//     width: 15,
//     height: 15,
//     resizeMode: 'contain',
//     marginRight: 5,
//   },
//   backButtonText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   categoriesGridContainer: {
//     justifyContent: 'space-between',
//     // alignContent: 'flex-start', // Helps distribute items evenly if not full row
//   },
//   categoryItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     paddingVertical: 15,
//     margin: 5, // Small margin around each item
//     maxWidth: (width - 30 - 30) / 3, // (screen_width - container_padding_x2 - item_margin_x4) / num_columns
//     minWidth: (width - 30 - 30) / 3,
//     aspectRatio: 1, // Makes the card square
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 0.5},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   categoryIcon: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   categoryText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#555',
//     textAlign: 'center',
//   },
//   categoryArrowIcon: {
//     width: 10,
//     height: 10,
//     resizeMode: 'contain',
//     marginLeft: 5,
//     position: 'absolute', // Position it absolutely
//     right: 5, // To the right of the item
//     top: '50%', // Vertically center
//     transform: [{translateY: -5}], // Adjust for half its height
//   },
//   noCategoriesText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#777',
//   },
//   // Add productCardStyles directly into main styles if needed, or remove them entirely if not used.
//   // The productCardStyles are removed as the ProductCard component is gone.
// });

// export default App;

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
  FlatList, // Import FlatList
  ActivityIndicator, // Import ActivityIndicator for loading state
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../utils/AxiosInstance'; // Ensure this path is correct
import {getUserData} from '../utils/tokenStorage'; // Keep if used for header, otherwise remove
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

const App = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  const fetchCategoriesData = async () => {
    try {
      setLoadingCategories(true);
      setErrorCategories(null);
      const response = await axiosInstance.get('/web/get-all-category');
      console.log('Categories data:', response.data.categories);
      const userData = await getUserData(); // Assuming this is correct
      console.log('User data at product page', userData);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorCategories('Failed to load categories. Please try again.');
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // Simplified handleCategoryPress to directly navigate with category ID
  const handleCategoryPress = item => {
    console.log(`Navigating to products for category ID: ${item.id}`);
    // Navigate to 'ProductAllData' and pass the category 'id'
    navigation.navigate('ProductAllData', {categoryId: item.id});
  };

  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item)}>
        <Image
          source={{
            uri: item.imgUrl
              ? `${IMAGE_BASE_URL}${item.imgUrl}`
              : 'https://placehold.co/50x50/cccccc/000000?text=No+Image',
          }}
          style={styles.categoryIcon}
          onError={e =>
            console.log(
              'Image loading error for category:',
              e.nativeEvent.error,
              'URL:',
              item.imgUrl ? `${IMAGE_BASE_URL}${item.imgUrl}` : 'N/A',
            )
          }
        />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/namo-logo.png')}
            style={{...styles.logo, width: 60, height: 60}}
          />

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerAvatarContainer}
              onPress={() => navigation.navigate('ShoppingBag')}>
              <Image
                source={require('../../assets/images/Profile.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather
            size={20}
            name="search"
            color="lightgrey"
            style={{right: 4, bottom: 1}}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any product..."
            placeholderTextColor="#888"
          />
        </View>

        {/* Dynamic Categories Section */}
        <View style={styles.dynamicCategoriesSection}>
          <View style={styles.dynamicCategoriesHeader}>
            <Text style={styles.sectionTitleDynamic}>Categories</Text>
            {/* Back button removed as there's no nesting */}
          </View>

          {loadingCategories ? (
            <ActivityIndicator
              size="large"
              color="#ff6600"
              style={{marginTop: 20}}
            />
          ) : errorCategories ? (
            <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
              {errorCategories}
            </Text>
          ) : categories.length > 0 ? (
            <FlatList
              data={categories}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={renderCategoryItem}
              horizontal={false}
              numColumns={3} // Display in a grid
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Allow parent ScrollView to handle scrolling
              contentContainerStyle={styles.categoriesGridContainer}
            />
          ) : (
            <Text style={styles.noCategoriesText}>No categories found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8', // Light background for the whole screen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginHorizontal: -15, // counteract paddingHorizontal of container
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatarContainer: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
  },
  dynamicCategoriesSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dynamicCategoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleDynamic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesGridContainer: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 10,
    margin: 3, // Small margin around each item
    maxWidth: (width - 30 - 30) / 3, // (screen_width - container_padding_x2 - item_margin_x4) / num_columns
    minWidth: (width - 30 - 30) / 3,
    aspectRatio: 1, // Makes the card square
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  noCategoriesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default App;
