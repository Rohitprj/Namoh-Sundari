// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance'; // Your axios instance path
// import moment from 'moment'; // Ensure you have installed 'moment' library

// const {width} = Dimensions.get('window');

// const ShoppingBag = ({navigation}) => {
//   // Renamed from StaticShoppingBagPage
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axiosInstance.get('web/get-orders');
//        console.log('Response from get-orders:', response.data);
//       //  console.log('Response from get-orders:', response.data[0].orderItems);
//         // --- FIX IS HERE ---
//         // The API returns an array of orders. We want the first order.
//         if (
//           response.data &&
//           Array.isArray(response.data) &&
//           response.data.length > 0
//         ) {
//           setOrderData(response.data[0]); // Correctly set the first order object
//         } else {
//           setOrderData(null); // No orders found or unexpected format
//           setError('No order data found.'); // Simpler error message for this case
//         }
//       } catch (e) {
//         console.error('Error fetching order details:', e);
//         if (e.response) {
//           setError(
//             `Failed to load order details: Server responded with status ${e.response.status}.`,
//           );
//         } else if (e.request) {
//           setError(
//             'Failed to load order details: No response received from server. Check network connection.',
//           );
//         } else {
//           setError(
//             'Failed to load order details: An unexpected error occurred.',
//           );
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, []);

//   const renderProductItem = ({item}) => {
//     // Determine the image URL, using a placeholder if none is available
//     const imageUrl =
//       item.variant?.images && item.variant.images.length > 0
//         ? `https://shopinger.co.in${item.variant.images[0]}`
//         : 'https://via.placeholder.com/100/CCCCCC/000000?text=No+Image';

//     // Find size and color attributes (case-insensitive)
//     const sizeAttribute = item.attributes?.find(
//       attr => attr.key?.toLowerCase() === 'size',
//     );
//     const colorAttribute = item.attributes?.find(
//       attr => attr.key?.toLowerCase() === 'color',
//     );

//     // Calculate delivery date (simulated as current date + 7 days)
//     const deliveryDate = moment().add(7, 'days').format('DD MMM YYYY');

//     return (
//       <View style={styles.productCard}>
//         <Image source={{uri: imageUrl}} style={styles.productImage} />
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>
//             {item.variant?.product?.name || 'Product Name N/A'}
//           </Text>
//           <Text style={styles.productDescription}>
//             {item.variant?.product?.description
//               ? item.variant.product.description.length > 50
//                 ? `${item.variant.product.description.substring(0, 50)}...`
//                 : item.variant.product.description
//               : 'Description N/A'}
//           </Text>
//           <View style={styles.dropdownContainer}>
//             <View style={styles.dropdown}>
//               <Text style={styles.dropdownLabel}>Size</Text>
//               <Text style={styles.dropdownValue}>
//                 {sizeAttribute ? sizeAttribute.value : 'N/A'}
//               </Text>
//             </View>
//             <View style={styles.dropdown}>
//               <Text style={styles.dropdownLabel}>Qty</Text>
//               <Text style={styles.dropdownValue}>{item.quantity || 1}</Text>
//             </View>
//           </View>
//           <Text style={styles.deliveryText}>
//             Delivery by <Text style={styles.deliveryDate}>{deliveryDate}</Text>
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#ff6600" />
//           <Text>Loading your shopping bag...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Display "Shopping bag is empty" if no order data or no order items
//   if (
//     !orderData ||
//     !orderData.orderItems ||
//     orderData.orderItems.length === 0
//   ) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               // source={require('../../assets/back_arrow.png')}
//               style={styles.backArrowIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Shopping Bag</Text>
//           <View style={{width: 24}} />
//         </View>
//         <View style={styles.emptyBagContainer}>
//           <Text style={styles.emptyBagText}>Your shopping bag is empty.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Calculate dynamic values from the fetched orderData
//   const orderItemsTotal = orderData.orderItems.reduce(
//     (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 0),
//     0,
//   );
//   const gstAmount = parseFloat(orderData.gst || 0);
//   const discountAmount = parseFloat(orderData.discount || 0);
//   const totalAmountFromAPI = parseFloat(orderData.totalAmount || 0); // Use totalAmount directly from API

//   // Recalculate convenience fee based on provided data:
//   // If totalAmount is the final amount, and orderItemsTotal is the sum of items,
//   // then convenience fee is what makes up the difference, plus any GST, minus any discount.
//   // This might need adjustment based on your *exact* backend calculation logic.
//   // A common approach: Total = (Items Price - Discount) + Convenience + GST
//   // So, Convenience = Total - (Items Price - Discount) - GST
//   const convenienceFee = (
//     totalAmountFromAPI -
//     (orderItemsTotal - discountAmount) -
//     gstAmount
//   ).toFixed(2);

//   // Display values, ensuring two decimal places
//   const displayOrderAmount = (orderItemsTotal - discountAmount).toFixed(2);
//   const displayConvenienceFee = parseFloat(convenienceFee).toFixed(2); // Ensure it's formatted
//   const displayGstAmount = gstAmount.toFixed(2);
//   const displayDiscountAmount = discountAmount.toFixed(2);
//   const displayTotalAmount = totalAmountFromAPI.toFixed(2);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             // source={require('../../assets/back_arrow.png')}
//             style={styles.backArrowIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Shopping Bag</Text>
//         <View style={{width: 24}} /> {/* Spacer to balance header */}
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}>
//         {/* Product Items List */}
//         <FlatList
//           data={orderData.orderItems}
//           renderItem={renderProductItem}
//           keyExtractor={(item, index) =>
//             item.id ? item.id.toString() : index.toString()
//           }
//           scrollEnabled={false}
//         />

//         {/* Apply Coupons Section */}
//         <View style={styles.couponsSection}>
//           <Image
//             // source={require('./assets/coupon_icon.png')} // Uncomment and replace with your icon
//             style={styles.couponIcon}
//           />
//           <Text style={styles.couponsText}>Apply Coupons</Text>
//           <Text style={styles.selectCouponsText}>Select</Text>
//         </View>

//         {/* Order Payment Details */}
//         <View style={styles.orderPaymentDetails}>
//           <Text style={styles.sectionTitle}>Order Payment Details</Text>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Order Amounts</Text>
//             <Text style={styles.detailValue}>₹ {displayOrderAmount}</Text>
//           </View>
//           {/* Display convenience fee */}
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Convenience</Text>
//             <Text style={styles.knowMoreText}>Know More</Text>
//             <Text style={styles.applyCouponText}>
//               ₹ {displayConvenienceFee}
//             </Text>
//           </View>
//           {/* Display GST if applicable */}
//           {parseFloat(displayGstAmount) > 0 && ( // Use parsed value for comparison
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>GST</Text>
//               <Text style={styles.detailValue}>₹ {displayGstAmount}</Text>
//             </View>
//           )}
//           {/* Display Discount if applicable */}
//           {parseFloat(displayDiscountAmount) > 0 && ( // Use parsed value for comparison
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Discount</Text>
//               <Text style={[styles.detailValue, {color: 'green'}]}>
//                 - ₹ {displayDiscountAmount}
//               </Text>
//             </View>
//           )}
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Delivery Fee</Text>
//             <Text style={styles.deliveryFeeText}>Free</Text>
//           </View>
//         </View>

//         {/* Order Total */}
//         <View style={styles.orderTotalSection}>
//           <Text style={styles.orderTotalLabel}>Order Total</Text>
//           <Text style={styles.orderTotalValue}>₹ {displayTotalAmount}</Text>
//           <View style={styles.emiRow}>
//             <Text style={styles.emiAvailableText}>EMI Available</Text>
//             <Text style={styles.detailsText}>Details</Text>
//           </View>
//         </View>

//         {/* Extra space at the bottom to ensure content scrolls above potential bottom tabs */}
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
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyBagContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyBagText: {
//     fontSize: 18,
//     color: '#777',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
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
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//   },
//   productCard: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     resizeMode: 'cover',
//     marginRight: 15,
//   },
//   productDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   productDescription: {
//     fontSize: 13,
//     color: '#777',
//     marginBottom: 10,
//   },
//   dropdownContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   dropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 10,
//   },
//   dropdownLabel: {
//     fontSize: 13,
//     color: '#555',
//     marginRight: 5,
//   },
//   dropdownValue: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: 5,
//   },
//   dropdownArrow: {
//     width: 12,
//     height: 12,
//     resizeMode: 'contain',
//     tintColor: '#555',
//   },
//   deliveryText: {
//     fontSize: 13,
//     color: '#777',
//   },
//   deliveryDate: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   couponsSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   couponIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     tintColor: '#ff6600',
//     marginRight: 10,
//   },
//   couponsText: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   selectCouponsText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   orderPaymentDetails: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: '#555',
//   },
//   detailValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   knowMoreText: {
//     fontSize: 12,
//     color: '#ff6600',
//     marginRight: 10,
//   },
//   applyCouponText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   deliveryFeeText: {
//     fontSize: 14,
//     color: '#4CAF50', // Green for 'Free'
//     fontWeight: 'bold',
//   },
//   orderTotalSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   orderTotalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderTotalValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ff6600',
//     marginBottom: 10,
//   },
//   emiRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   emiAvailableText: {
//     fontSize: 14,
//     color: '#555',
//     marginRight: 5,
//   },
//   detailsText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
// });

// export default ShoppingBag;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axiosInstance from '../utils/AxiosInstance'; // Your axios instance path
// import moment from 'moment'; // Ensure you have installed 'moment' library

// const {width} = Dimensions.get('window');

// const ShoppingBag = ({navigation}) => {
//   const [orders, setOrders] = useState([]); // Changed from orderData to orders (array)
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axiosInstance.get('web/get-orders');
//         console.log('Response from get-orders:', response.data);

//         if (response.data && Array.isArray(response.data)) {
//           setOrders(response.data); // Set the entire array of orders
//         } else {
//           setOrders([]); // No orders found or unexpected format
//           setError('No order data found.');
//         }
//       } catch (e) {
//         console.error('Error fetching order details:', e);
//         if (e.response) {
//           setError(
//             `Failed to load order details: Server responded with status ${e.response.status}.`,
//           );
//         } else if (e.request) {
//           setError(
//             'Failed to load order details: No response received from server. Check network connection.',
//           );
//           // Add a common network error message or prompt to retry
//         } else {
//           setError(
//             'Failed to load order details: An unexpected error occurred.',
//           );
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, []);

//   const renderProductItem = ({item}) => {
//     const imageUrl =
//       item.variant?.images && item.variant.images.length > 0
//         ? `https://shopinger.co.in${item.variant.images[0]}`
//         : 'https://via.placeholder.com/100/CCCCCC/000000?text=No+Image';

//     const sizeAttribute = item.attributes?.find(
//       attr => attr.key?.toLowerCase() === 'size',
//     );
//     const colorAttribute = item.attributes?.find(
//       attr => attr.key?.toLowerCase() === 'color',
//     );

//     const deliveryDate = moment().add(7, 'days').format('DD MMM YYYY');

//     return (
//       <View style={styles.productCard}>
//         <Image source={{uri: imageUrl}} style={styles.productImage} />
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>
//             {item.variant?.product?.name || 'Product Name N/A'}
//           </Text>
//           <Text style={styles.productDescription}>
//             {item.variant?.product?.description
//               ? item.variant.product.description.length > 50
//                 ? `${item.variant.product.description.substring(0, 50)}...`
//                 : item.variant.product.description
//               : 'Description N/A'}
//           </Text>
//           <View style={styles.dropdownContainer}>
//             <View style={styles.dropdown}>
//               <Text style={styles.dropdownLabel}>Size</Text>
//               <Text style={styles.dropdownValue}>
//                 {sizeAttribute ? sizeAttribute.value : 'N/A'}
//               </Text>
//             </View>
//             <View style={styles.dropdown}>
//               <Text style={styles.dropdownLabel}>Qty</Text>
//               <Text style={styles.dropdownValue}>{item.quantity || 1}</Text>
//             </View>
//           </View>
//           <Text style={styles.deliveryText}>
//             Delivery by <Text style={styles.deliveryDate}>{deliveryDate}</Text>
//           </Text>
//           {/* Add Review Button */}
//           <TouchableOpacity
//             style={styles.addReviewButton}
//             onPress={() =>
//               navigation.navigate('AddReview', {
//                 productId: item.productId,
//                 productName: item.variant?.product?.name,
//               })
//             }>
//             <Text style={styles.addReviewButtonText}>Add Review</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const renderOrderItem = ({item: order}) => {
//     // Calculate dynamic values for each order
//     const orderItemsTotal = order.orderItems.reduce(
//       (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 0),
//       0,
//     );
//     const gstAmount = parseFloat(order.gst || 0);
//     const discountAmount = parseFloat(order.discount || 0);
//     const totalAmountFromAPI = parseFloat(order.totalAmount || 0);

//     // Convenience = Total - (Items Price - Discount) - GST
//     const convenienceFee = (
//       totalAmountFromAPI -
//       (orderItemsTotal - discountAmount) -
//       gstAmount
//     ).toFixed(2);

//     const displayOrderAmount = (orderItemsTotal - discountAmount).toFixed(2);
//     const displayConvenienceFee = parseFloat(convenienceFee).toFixed(2);
//     const displayGstAmount = gstAmount.toFixed(2);
//     const displayDiscountAmount = discountAmount.toFixed(2);
//     const displayTotalAmount = totalAmountFromAPI.toFixed(2);

//     return (
//       <View style={styles.orderContainer}>
//         <Text style={styles.orderIdText}>Order ID: {order.id}</Text>
//         <Text style={styles.orderStatusText}>Status: {order.status}</Text>
//         <FlatList
//           data={order.orderItems}
//           renderItem={renderProductItem}
//           keyExtractor={(item, index) =>
//             item.id ? item.id.toString() : `product-${order.id}-${index}`
//           }
//           scrollEnabled={false} // Disable inner FlatList scrolling
//         />

//         {/* Apply Coupons Section - This would typically be per order, but keeping it as is from your original structure */}
//         <View style={styles.couponsSection}>
//           <Image
//             // source={require('./assets/coupon_icon.png')} // Uncomment and replace with your icon
//             style={styles.couponIcon}
//           />
//           <Text style={styles.couponsText}>Apply Coupons</Text>
//           <Text style={styles.selectCouponsText}>Select</Text>
//         </View>

//         {/* Order Payment Details */}
//         <View style={styles.orderPaymentDetails}>
//           <Text style={styles.sectionTitle}>Order Payment Details</Text>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Order Amounts</Text>
//             <Text style={styles.detailValue}>₹ {displayOrderAmount}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Convenience</Text>
//             <Text style={styles.knowMoreText}>Know More</Text>
//             <Text style={styles.applyCouponText}>
//               ₹ {displayConvenienceFee}
//             </Text>
//           </View>
//           {parseFloat(displayGstAmount) > 0 && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>GST</Text>
//               <Text style={styles.detailValue}>₹ {displayGstAmount}</Text>
//             </View>
//           )}
//           {parseFloat(displayDiscountAmount) > 0 && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Discount</Text>
//               <Text style={[styles.detailValue, {color: 'green'}]}>
//                 - ₹ {displayDiscountAmount}
//               </Text>
//             </View>
//           )}
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Delivery Fee</Text>
//             <Text style={styles.deliveryFeeText}>Free</Text>
//           </View>
//         </View>

//         {/* Order Total */}
//         <View style={styles.orderTotalSection}>
//           <Text style={styles.orderTotalLabel}>Order Total</Text>
//           <Text style={styles.orderTotalValue}>₹ {displayTotalAmount}</Text>
//           <View style={styles.emiRow}>
//             <Text style={styles.emiAvailableText}>EMI Available</Text>
//             <Text style={styles.detailsText}>Details</Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#ff6600" />
//           <Text>Loading your shopping bag...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               // source={require('../../assets/back_arrow.png')} // Uncomment and add your image asset
//               style={styles.backArrowIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Shopping Bag</Text>
//           <View style={{width: 24}} />
//         </View>
//         <View style={styles.emptyBagContainer}>
//           <Text style={styles.emptyBagText}>Your shopping bag is empty.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             // source={require('../../assets/back_arrow.png')} // Uncomment and add your image asset
//             style={styles.backArrowIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Shopping Bag</Text>
//         <View style={{width: 24}} />
//       </View>

//       <FlatList
//         data={orders}
//         renderItem={renderOrderItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyBagContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyBagText: {
//     fontSize: 18,
//     color: '#777',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
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
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//   },
//   orderContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   orderIdText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderStatusText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 15,
//   },
//   productCard: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     alignItems: 'center',
//     borderWidth: 1, // Added for visual separation within an order
//     borderColor: '#eee', // Added for visual separation within an order
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     resizeMode: 'cover',
//     marginRight: 15,
//   },
//   productDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   productDescription: {
//     fontSize: 13,
//     color: '#777',
//     marginBottom: 10,
//   },
//   dropdownContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   dropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 10,
//   },
//   dropdownLabel: {
//     fontSize: 13,
//     color: '#555',
//     marginRight: 5,
//   },
//   dropdownValue: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: 5,
//   },
//   dropdownArrow: {
//     width: 12,
//     height: 12,
//     resizeMode: 'contain',
//     tintColor: '#555',
//   },
//   deliveryText: {
//     fontSize: 13,
//     color: '#777',
//   },
//   deliveryDate: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   addReviewButton: {
//     backgroundColor: '#007bff', // A blue color for the button
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginTop: 10,
//     alignSelf: 'flex-start', // Align button to the start
//   },
//   addReviewButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   couponsSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   couponIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     tintColor: '#ff6600',
//     marginRight: 10,
//   },
//   couponsText: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   selectCouponsText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   orderPaymentDetails: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: '#555',
//   },
//   detailValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   knowMoreText: {
//     fontSize: 12,
//     color: '#ff6600',
//     marginRight: 10,
//   },
//   applyCouponText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   deliveryFeeText: {
//     fontSize: 14,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   orderTotalSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   orderTotalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderTotalValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ff6600',
//     marginBottom: 10,
//   },
//   emiRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   emiAvailableText: {
//     fontSize: 14,
//     color: '#555',
//     marginRight: 5,
//   },
//   detailsText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
// });

// export default ShoppingBag;

// import React, {useState, useCallback} from 'react'; // Added useCallback
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
// import axiosInstance from '../utils/AxiosInstance'; // Your axios instance path
// import moment from 'moment'; // Ensure you have installed 'moment' library

// const {width} = Dimensions.get('window');

// const ShoppingBag = ({navigation}) => {
//   const [orders, setOrders] = useState([]); // Changed from orderData to orders (array)
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Replaced useEffect with useFocusEffect
//   useFocusEffect(
//     useCallback(() => {
//       const fetchOrderDetails = async () => {
//         try {
//           setLoading(true);
//           setError(null);
//           const response = await axiosInstance.get('web/get-orders');
//           console.log('Response from get-orders:', response.data);

//           if (response.data && Array.isArray(response.data)) {
//             setOrders(response.data); // Set the entire array of orders
//           } else {
//             setOrders([]); // No orders found or unexpected format
//             setError('No order data found.');
//           }
//         } catch (e) {
//           console.error('Error fetching order details:', e);
//           if (e.response) {
//             setError(
//               `Failed to load order details: Server responded with status ${e.response.status}.`,
//             );
//           } else if (e.request) {
//             setError(
//               'Failed to load order details: No response received from server. Check network connection.',
//             );
//             // Add a common network error message or prompt to retry
//           } else {
//             setError(
//               'Failed to load order details: An unexpected error occurred.',
//             );
//           }
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchOrderDetails();

//       // Return a cleanup function if needed (e.g., to cancel API calls)
//       // For this specific case, no explicit cleanup is necessary as API calls
//       // are typically fire-and-forget in this context.
//       return () => {
//         // Any cleanup logic when the screen loses focus or component unmounts
//       };
//     }, []), // Empty dependency array means this effect runs once when the component mounts
//   ); // and then every time the screen is focused.

//   const renderProductItem = ({item}) => {
//     const imageUrl =
//       item.variant?.images && item.variant.images.length > 0
//         ? `https://shopinger.co.in${item.variant.images[0]}`
//         : 'https://via.placeholder.com/100/CCCCCC/000000?text=No+Image';

//     const sizeAttribute = item.attributes?.find(
//       attr => attr.key?.toLowerCase() === 'size',
//     );
//     const colorAttribute = item.attributes?.find(
//       attr => attr.key?.toLowerCase() === 'color',
//     );

//     const deliveryDate = moment().add(7, 'days').format('DD MMM YYYY');

//     return (
//       <View style={styles.productCard}>
//         <Image source={{uri: imageUrl}} style={styles.productImage} />
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>
//             {item.variant?.product?.name || 'Product Name N/A'}
//           </Text>
//           <Text style={styles.productDescription}>
//             {item.variant?.product?.description
//               ? item.variant.product.description.length > 50
//                 ? `${item.variant.product.description.substring(0, 50)}...`
//                 : item.variant.product.description
//               : 'Description N/A'}
//           </Text>
//           <View style={styles.dropdownContainer}>
//             <View style={styles.dropdown}>
//               <Text style={styles.dropdownLabel}>Size</Text>
//               <Text style={styles.dropdownValue}>
//                 {sizeAttribute ? sizeAttribute.value : 'N/A'}
//               </Text>
//             </View>
//             <View style={styles.dropdown}>
//               <Text style={styles.dropdownLabel}>Qty</Text>
//               <Text style={styles.dropdownValue}>{item.quantity || 1}</Text>
//             </View>
//           </View>
//           <Text style={styles.deliveryText}>
//             Delivery by <Text style={styles.deliveryDate}>{deliveryDate}</Text>
//           </Text>
//           {/* Add Review Button */}
//           <TouchableOpacity
//             style={styles.addReviewButton}
//             onPress={() =>
//               navigation.navigate('AddReview', {
//                 productId: item.productId,
//                 productName: item.variant?.product?.name,
//               })
//             }>
//             <Text style={styles.addReviewButtonText}>Add Review</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const renderOrderItem = ({item: order}) => {
//     // Calculate dynamic values for each order
//     const orderItemsTotal = order.orderItems.reduce(
//       (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 0),
//       0,
//     );
//     const gstAmount = parseFloat(order.gst || 0);
//     const discountAmount = parseFloat(order.discount || 0);
//     const totalAmountFromAPI = parseFloat(order.totalAmount || 0);

//     // Convenience = Total - (Items Price - Discount) - GST
//     const convenienceFee = (
//       totalAmountFromAPI -
//       (orderItemsTotal - discountAmount) -
//       gstAmount
//     ).toFixed(2);

//     const displayOrderAmount = (orderItemsTotal - discountAmount).toFixed(2);
//     const displayConvenienceFee = parseFloat(convenienceFee).toFixed(2);
//     const displayGstAmount = gstAmount.toFixed(2);
//     const displayDiscountAmount = discountAmount.toFixed(2);
//     const displayTotalAmount = totalAmountFromAPI.toFixed(2);

//     return (
//       <View style={styles.orderContainer}>
//         <Text style={styles.orderIdText}>Order ID: {order.id}</Text>
//         <Text style={styles.orderStatusText}>Status: {order.status}</Text>
//         <FlatList
//           data={order.orderItems}
//           renderItem={renderProductItem}
//           keyExtractor={(item, index) =>
//             item.id ? item.id.toString() : `product-${order.id}-${index}`
//           }
//           scrollEnabled={false} // Disable inner FlatList scrolling
//         />

//         {/* Apply Coupons Section - This would typically be per order, but keeping it as is from your original structure */}
//         <View style={styles.couponsSection}>
//           <Image
//             // source={require('./assets/coupon_icon.png')} // Uncomment and replace with your icon
//             style={styles.couponIcon}
//           />
//           <Text style={styles.couponsText}>Apply Coupons</Text>
//           <Text style={styles.selectCouponsText}>Select</Text>
//         </View>

//         {/* Order Payment Details */}
//         <View style={styles.orderPaymentDetails}>
//           <Text style={styles.sectionTitle}>Order Payment Details</Text>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Order Amounts</Text>
//             <Text style={styles.detailValue}>₹ {displayOrderAmount}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Convenience</Text>
//             <Text style={styles.knowMoreText}>Know More</Text>
//             <Text style={styles.applyCouponText}>
//               ₹ {displayConvenienceFee}
//             </Text>
//           </View>
//           {parseFloat(displayGstAmount) > 0 && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>GST</Text>
//               <Text style={styles.detailValue}>₹ {displayGstAmount}</Text>
//             </View>
//           )}
//           {parseFloat(displayDiscountAmount) > 0 && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Discount</Text>
//               <Text style={[styles.detailValue, {color: 'green'}]}>
//                 - ₹ {displayDiscountAmount}
//               </Text>
//             </View>
//           )}
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Delivery Fee</Text>
//             <Text style={styles.deliveryFeeText}>Free</Text>
//           </View>
//         </View>

//         {/* Order Total */}
//         <View style={styles.orderTotalSection}>
//           <Text style={styles.orderTotalLabel}>Order Total</Text>
//           <Text style={styles.orderTotalValue}>₹ {displayTotalAmount}</Text>
//           <View style={styles.emiRow}>
//             <Text style={styles.emiAvailableText}>EMI Available</Text>
//             <Text style={styles.detailsText}>Details</Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#ff6600" />
//           <Text>Loading your shopping bag...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               // source={require('../../assets/back_arrow.png')} // Uncomment and add your image asset
//               style={styles.backArrowIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Shopping Bag</Text>
//           <View style={{width: 24}} />
//         </View>
//         <View style={styles.emptyBagContainer}>
//           <Text style={styles.emptyBagText}>Your shopping bag is empty.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             // source={require('../../assets/back_arrow.png')} // Uncomment and add your image asset
//             style={styles.backArrowIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Shopping Bag</Text>
//         <View style={{width: 24}} />
//       </View>

//       <FlatList
//         data={orders}
//         renderItem={renderOrderItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyBagContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyBagText: {
//     fontSize: 18,
//     color: '#777',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
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
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//   },
//   orderContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   orderIdText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderStatusText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 15,
//   },
//   productCard: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     alignItems: 'center',
//     borderWidth: 1, // Added for visual separation within an order
//     borderColor: '#eee', // Added for visual separation within an order
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     resizeMode: 'cover',
//     marginRight: 15,
//   },
//   productDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   productDescription: {
//     fontSize: 13,
//     color: '#777',
//     marginBottom: 10,
//   },
//   dropdownContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   dropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 10,
//   },
//   dropdownLabel: {
//     fontSize: 13,
//     color: '#555',
//     marginRight: 5,
//   },
//   dropdownValue: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: 5,
//   },
//   dropdownArrow: {
//     width: 12,
//     height: 12,
//     resizeMode: 'contain',
//     tintColor: '#555',
//   },
//   deliveryText: {
//     fontSize: 13,
//     color: '#777',
//   },
//   deliveryDate: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   addReviewButton: {
//     backgroundColor: '#007bff', // A blue color for the button
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginTop: 10,
//     alignSelf: 'flex-start', // Align button to the start
//   },
//   addReviewButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   couponsSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   couponIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     tintColor: '#ff6600',
//     marginRight: 10,
//   },
//   couponsText: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   selectCouponsText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   orderPaymentDetails: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: '#555',
//   },
//   detailValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   knowMoreText: {
//     fontSize: 12,
//     color: '#ff6600',
//     marginRight: 10,
//   },
//   applyCouponText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
//   deliveryFeeText: {
//     fontSize: 14,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   orderTotalSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   orderTotalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderTotalValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ff6600',
//     marginBottom: 10,
//   },
//   emiRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   emiAvailableText: {
//     fontSize: 14,
//     color: '#555',
//     marginRight: 5,
//   },
//   detailsText: {
//     fontSize: 14,
//     color: '#ff6600',
//     fontWeight: 'bold',
//   },
// });

// export default ShoppingBag;
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl, // Import RefreshControl
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import axiosInstance from '../utils/AxiosInstance'; // Your axios instance path
import moment from 'moment';

const {width} = Dimensions.get('window');

const ShoppingBag = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // New state for pull-to-refresh

  // Extracted data fetching logic into a separate function
  const fetchOrderDetails = useCallback(async () => {
    try {
      setLoading(true); // Set loading true initially
      setError(null);
      const response = await axiosInstance.get('web/get-orders');
      console.log('Response from get-orders:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
        setError('No order data found.');
      }
    } catch (e) {
      console.error('Error fetching order details:', e);
      if (e.response) {
        setError(
          `Failed to load order details: Server responded with status ${e.response.status}.`,
        );
      } else if (e.request) {
        setError(
          'Failed to load order details: No response received from server. Check network connection.',
        );
      } else {
        setError('Failed to load order details: An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Set loading false after fetch attempt
      setRefreshing(false); // Set refreshing false after fetch attempt (for pull-to-refresh)
    }
  }, []); // Dependencies for useCallback. Empty means this function is stable.

  // useFocusEffect to fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchOrderDetails(); // Call the shared fetch function
      return () => {
        // Cleanup if needed (e.g., cancel ongoing requests)
      };
    }, [fetchOrderDetails]), // Dependency on fetchOrderDetails to ensure it's up-to-date
  );

  // Function to handle pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true); // Set refreshing true to show the loader
    fetchOrderDetails(); // Call the shared fetch function
  }, [fetchOrderDetails]);

  const renderProductItem = ({item}) => {
    const imageUrl =
      item.variant?.images && item.variant.images.length > 0
        ? `https://shopinger.co.in${item.variant.images[0]}`
        : 'https://via.placeholder.com/100/CCCCCC/000000?text=No+Image';

    const sizeAttribute = item.attributes?.find(
      attr => attr.key?.toLowerCase() === 'size',
    );
    const colorAttribute = item.attributes?.find(
      attr => attr.key?.toLowerCase() === 'color',
    );

    const deliveryDate = moment().add(7, 'days').format('DD MMM YYYY');

    return (
      <View style={styles.productCard}>
        <Image source={{uri: imageUrl}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>
            {item.variant?.product?.name || 'Product Name N/A'}
          </Text>
          <Text style={styles.productDescription}>
            {item.variant?.product?.description
              ? item.variant.product.description.length > 50
                ? `${item.variant.product.description.substring(0, 50)}...`
                : item.variant.product.description
              : 'Description N/A'}
          </Text>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Size</Text>
              <Text style={styles.dropdownValue}>
                {sizeAttribute ? sizeAttribute.value : 'N/A'}
              </Text>
            </View>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Qty</Text>
              <Text style={styles.dropdownValue}>{item.quantity || 1}</Text>
            </View>
          </View>
          <Text style={styles.deliveryText}>
            Delivery by <Text style={styles.deliveryDate}>{deliveryDate}</Text>
          </Text>
          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={() =>
              navigation.navigate('AddReview', {
                productId: item.productId,
                productName: item.variant?.product?.name,
              })
            }>
            <Text style={styles.addReviewButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderOrderItem = ({item: order}) => {
    const orderItemsTotal = order.orderItems.reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 0),
      0,
    );
    const gstAmount = parseFloat(order.gst || 0);
    const discountAmount = parseFloat(order.discount || 0);
    const totalAmountFromAPI = parseFloat(order.totalAmount || 0);

    const convenienceFee = (
      totalAmountFromAPI -
      (orderItemsTotal - discountAmount) -
      gstAmount
    ).toFixed(2);

    const displayOrderAmount = (orderItemsTotal - discountAmount).toFixed(2);
    const displayConvenienceFee = parseFloat(convenienceFee).toFixed(2);
    const displayGstAmount = gstAmount.toFixed(2);
    const displayDiscountAmount = discountAmount.toFixed(2);
    const displayTotalAmount = totalAmountFromAPI.toFixed(2);

    return (
      <View style={styles.orderContainer}>
        <Text style={styles.orderIdText}>Order ID: {order.id}</Text>
        <Text style={styles.orderStatusText}>Status: {order.status}</Text>
        <FlatList
          data={order.orderItems}
          renderItem={renderProductItem}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `product-${order.id}-${index}`
          }
          scrollEnabled={false}
        />

        <View style={styles.couponsSection}>
          <Image
            // source={require('./assets/coupon_icon.png')}
            style={styles.couponIcon}
          />
          <Text style={styles.couponsText}>Apply Coupons</Text>
          <Text style={styles.selectCouponsText}>Select</Text>
        </View>

        <View style={styles.orderPaymentDetails}>
          <Text style={styles.sectionTitle}>Order Payment Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Amounts</Text>
            <Text style={styles.detailValue}>₹ {displayOrderAmount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Convenience</Text>
            <Text style={styles.knowMoreText}>Know More</Text>
            <Text style={styles.applyCouponText}>
              ₹ {displayConvenienceFee}
            </Text>
          </View>
          {parseFloat(displayGstAmount) > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>GST</Text>
              <Text style={styles.detailValue}>₹ {displayGstAmount}</Text>
            </View>
          )}
          {parseFloat(displayDiscountAmount) > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Discount</Text>
              <Text style={[styles.detailValue, {color: 'green'}]}>
                - ₹ {displayDiscountAmount}
              </Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Fee</Text>
            <Text style={styles.deliveryFeeText}>Free</Text>
          </View>
        </View>

        <View style={styles.orderTotalSection}>
          <Text style={styles.orderTotalLabel}>Order Total</Text>
          <Text style={styles.orderTotalValue}>₹ {displayTotalAmount}</Text>
          <View style={styles.emiRow}>
            <Text style={styles.emiAvailableText}>EMI Available</Text>
            <Text style={styles.detailsText}>Details</Text>
          </View>
        </View>
      </View>
    );
  };

  // If loading is true (initial load or focus), show ActivityIndicator
  if (loading && !refreshing) {
    // Only show full-screen loader on initial load/focus
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6600" />
          <Text>Loading your shopping bag...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {/* Option to retry */}
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchOrderDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              // source={require('../../assets/back_arrow.png')}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Bag</Text>
          <View style={{width: 24}} />
        </View>
        <FlatList // Keep FlatList even for empty state to allow pull-to-refresh
          data={[]} // Empty data
          renderItem={() => null} // No items to render
          ListEmptyComponent={
            <View style={styles.emptyBagContainer}>
              <Text style={styles.emptyBagText}>
                Your shopping bag is empty.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchOrderDetails}>
                <Text style={styles.retryButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          }
          refreshControl={
            // Add RefreshControl
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#ff6600']} // Android
              tintColor={'#ff6600'} // iOS
            />
          }
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            // source={require('../../assets/back_arrow.png')}
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <View style={{width: 24}} />
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          // Add RefreshControl
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#ff6600']} // Android
            tintColor={'#ff6600'} // iOS
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBagContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Ensure it takes full height when FlatList is empty
    minHeight: Dimensions.get('window').height - 100, // Adjust as needed based on header height
  },
  emptyBagText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    flexGrow: 1, // Important for FlatList content to grow and allow pull-to-refresh
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderStatusText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 13,
    color: '#777',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  dropdownLabel: {
    fontSize: 13,
    color: '#555',
    marginRight: 5,
  },
  dropdownValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  dropdownArrow: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  deliveryText: {
    fontSize: 13,
    color: '#777',
  },
  deliveryDate: {
    fontWeight: 'bold',
    color: '#333',
  },
  addReviewButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  couponsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  couponIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#ff6600',
    marginRight: 10,
  },
  couponsText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectCouponsText: {
    fontSize: 14,
    color: '#ff6600',
    fontWeight: 'bold',
  },
  orderPaymentDetails: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  knowMoreText: {
    fontSize: 12,
    color: '#ff6600',
    marginRight: 10,
  },
  applyCouponText: {
    fontSize: 14,
    color: '#ff6600',
    fontWeight: 'bold',
  },
  deliveryFeeText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  orderTotalSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6600',
    marginBottom: 10,
  },
  emiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emiAvailableText: {
    fontSize: 14,
    color: '#555',
    marginRight: 5,
  },
  detailsText: {
    fontSize: 14,
    color: '#ff6600',
    fontWeight: 'bold',
  },
});

export default ShoppingBag;
