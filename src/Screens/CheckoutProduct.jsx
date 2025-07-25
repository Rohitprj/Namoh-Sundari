// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   Platform,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import RazorpayCheckout from 'react-native-razorpay';

// import axiosInstance from '../utils/AxiosInstance';
// import {getUserData} from '../utils/tokenStorage';

// const CURRENT_USER_ID = 'your_actual_user_id_here';

// const {width} = Dimensions.get('window');

// const IMAGE_BASE_URL = 'http://103.119.171.213:3001';

// const CheckoutCartItem = ({item, onQuantityChange, isLoading}) => {
//   console.log('Item price', item);
//   const imageSource =
//     typeof item.image === 'number'
//       ? item.image
//       : {
//           uri:
//             item.images &&
//             item.images.length > 0 &&
//             item.images[0].trim() !== ''
//               ? `${IMAGE_BASE_URL}${item.images[0]}`
//               : 'https://placehold.co/80x80/E0E0E0/555555?text=No+Image',
//         };

//   const productName = item.productName || 'Unknown Product';
//   const brandName = item.brand || 'N/A';
//   const price = item.price ? parseFloat(item.price).toFixed(2) : '0.00';
//   // const price = item.sellingPrice
//   //   ? parseFloat(item.sellingPrice).toFixed(2)
//   //   : '0.00';
//   const quantity = item.quantity || 1;
//   const cartItemId = item.cartItemId;

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       onQuantityChange(cartItemId, quantity - 1);
//     } else {
//       Alert.alert(
//         'Remove Item',
//         'Do you want to remove this item from your cart?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Remove',
//             onPress: () => onQuantityChange(cartItemId, 0),
//             style: 'destructive',
//           },
//         ],
//       );
//     }
//   };

//   const handleIncrement = () => {
//     onQuantityChange(cartItemId, quantity + 1);
//   };

//   return (
//     <View style={styles.cartItemCard}>
//       <Image source={imageSource} style={styles.cartItemImage} />
//       <View style={styles.cartItemDetails}>
//         <Text style={styles.cartItemName}>{productName}</Text>
//         <Text style={styles.cartItemBrand}>{brandName}</Text>
//         <Text style={styles.cartItemPrice}>₹{price}</Text>
//         <View style={styles.quantityControls}>
//           <TouchableOpacity
//             style={styles.quantityButton}
//             onPress={handleDecrement}
//             disabled={isLoading}>
//             <Text style={styles.quantityButtonText}>-</Text>
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{quantity}</Text>
//           <TouchableOpacity
//             style={styles.quantityButton}
//             onPress={handleIncrement}
//             disabled={isLoading}>
//             <Text style={styles.quantityButtonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <TouchableOpacity
//         onPress={() => onQuantityChange(cartItemId, 0)}
//         disabled={isLoading}>
//         <Image
//           source={{
//             uri: 'https://placehold.co/24x24/999999/FFFFFF?text=X',
//           }}
//           style={styles.deleteIcon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const CheckoutPage = ({navigation}) => {
//   const [cartItemsToDisplay, setCartItemsToDisplay] = useState([]);
//   const [cartSummary, setCartSummary] = useState({
//     subtotal: 0,
//     platformFee: 0,
//     gst: 0,
//     deliveryFee: 0,
//     totalAmount: 0,
//   });
//   const [deliveryAddress, setDeliveryAddress] = useState(null);
//   const [loadingCart, setLoadingCart] = useState(true);
//   const [loadingAddress, setLoadingAddress] = useState(true);
//   const [isPaying, setIsPaying] = useState(false);
//   const [error, setError] = useState(null);
//   const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
//   const [selectedPaymentMode, setSelectedPaymentMode] = useState('razorpay');
//   console.log('deliveryAddress:', JSON.stringify(deliveryAddress), null, 2);
//   const [currencyConfig] = useState({
//     applicationData: {
//       currency: 'INR',
//       razorpayKeyId: 'rzp_live_ykAW0WN2mvhAjJ',
//     },
//   });

//   const fetchCartData = useCallback(async (showLoading = true) => {
//     const userId = await getUserData();
//     console.log(`User ID for order: ${JSON.stringify(userId.userId, null, 2)}`);

//     if (showLoading) {
//       setLoadingCart(true);
//     }
//     setError(null);
//     console.log('Fetching cart data...');
//     try {
//       const response = await axiosInstance.get('/web/get-cart');
//       console.log(
//         'API Response Data for /web/get-cart:',
//         JSON.stringify(response.data, null, 2),
//       );

//       if (response.data) {
//         const apiCartData = response.data;

//         // Update cart summary
//         setCartSummary({
//           subtotal: apiCartData.summary?.subtotal || 0,
//           platformFee: apiCartData.otherCharges?.plateformfee || 0,
//           gst: apiCartData.otherCharges?.gst || 0,
//           deliveryFee: apiCartData.otherCharges?.deliveryFee || 0,
//           totalAmount: apiCartData.totalAmountafterCharges || 0,
//         });

//         // Update cart items
//         if (apiCartData.items && apiCartData.items.length > 0) {
//           const mappedItems = apiCartData.items.map(item => ({
//             id: item.cartItemId.toString(),
//             cartItemId: item.cartItemId,
//             productId: item.productId, // Ensure productId is available from cart items
//             productName: item.productName,
//             price: item.price,
//             quantity: item.quantity,
//             images: item.images,
//           }));
//           console.log('mappedItems', mappedItems);
//           setCartItemsToDisplay(mappedItems);
//         } else {
//           setCartItemsToDisplay([]);
//         }
//       } else {
//         setError('Failed to fetch cart data: No data in response.');
//         setCartItemsToDisplay([]);
//       }
//     } catch (e) {
//       console.error('Error fetching cart data:', e);
//       let errorMessage =
//         'Could not load cart items. Please check your network or try again.';
//       if (e.response) {
//         errorMessage =
//           e.response.data?.message || `Server Error: ${e.response.status}`;
//       } else if (e.request) {
//         errorMessage =
//           'Network Error: No response from server. Check your internet connection.';
//       } else {
//         errorMessage = `Error: ${e.message}`;
//       }
//       setError(errorMessage);
//       setCartItemsToDisplay([]);
//     } finally {
//       if (showLoading) {
//         setLoadingCart(false);
//       }
//       console.log('Finished fetching cart data.');
//     }
//   }, []);

//   const fetchAddressData = useCallback(async () => {
//     setLoadingAddress(true);
//     setError(null);
//     console.log('Fetching address data...');
//     try {
//       const response = await axiosInstance.get('/web/get-address');
//       console.log(
//         'API Response Data for /web/get-address:',
//         JSON.stringify(response.data, null, 2),
//       );

//       if (
//         response.data &&
//         response.data.addresses &&
//         response.data.addresses.length > 0
//       ) {
//         setDeliveryAddress(response.data.addresses[0]);
//       } else {
//         setDeliveryAddress(null);
//       }
//     } catch (e) {
//       console.error('Error fetching address data:', e);
//       let errorMessage =
//         'Could not load delivery address. Please check your network or add an address.';
//       if (e.response) {
//         errorMessage =
//           e.response.data?.message || `Server Error: ${e.response.status}`;
//       } else if (e.request) {
//         errorMessage = 'Network Error: No response from server for address.';
//       } else {
//         errorMessage = `Error: ${e.message}`;
//       }
//       setError(errorMessage);
//       setDeliveryAddress(null);
//     } finally {
//       setLoadingAddress(false);
//       console.log('Finished fetching address data.');
//     }
//   }, []);

//   useEffect(() => {
//     fetchCartData();
//     fetchAddressData();
//   }, [fetchCartData, fetchAddressData]);

//   const handleQuantityUpdate = async (cartItemId, newQuantity) => {
//     setIsUpdatingQuantity(true);
//     setError(null);

//     if (newQuantity === 0) {
//       try {
//         console.log(`Removing item with cartItemId: ${cartItemId}`);
//         const response = await axiosInstance.delete(
//           `/web/remove-item/${cartItemId}`,
//         );
//         if (response.data && response.data.success) {
//           Alert.alert(
//             'Success',
//             response.data.message || 'Item removed from cart.',
//           );
//           await fetchCartData(false); // Refresh cart data
//         } else {
//           Alert.alert(
//             'Error',
//             response.data.message || 'Failed to remove item from cart.',
//           );
//         }
//       } catch (e) {
//         console.error('Error removing item:', e);
//         Alert.alert(
//           'Error',
//           'Failed to remove item from cart. Please try again.',
//         );
//       } finally {
//         setIsUpdatingQuantity(false);
//       }
//       return;
//     }

//     const currentItem = cartItemsToDisplay.find(
//       item => item.cartItemId === cartItemId,
//     );
//     if (!currentItem) {
//       Alert.alert('Error', 'Cart item not found.');
//       setIsUpdatingQuantity(false);
//       return;
//     }

//     let action;
//     if (newQuantity > currentItem.quantity) {
//       action = 'increment';
//     } else if (newQuantity < currentItem.quantity) {
//       action = 'decrement';
//     } else {
//       setIsUpdatingQuantity(false);
//       return; // No change in quantity
//     }

//     try {
//       console.log(
//         `Updating quantity for item ${cartItemId} with action: ${action}`,
//       );

//       const response = await axiosInstance.patch(
//         `/web/quantity-update/${cartItemId}`,
//         {action: action},
//       );

//       console.log('Quantity Update Response:', response.data);

//       if (response.data && response.data.success) {
//         console.log('Quantity update successful, refreshing cart data...');
//         await fetchCartData(false);
//       } else {
//         // Even if not success, refresh cart data to reflect server state in case of partial update or error details
//         await fetchCartData(false);
//       }
//     } catch (e) {
//       console.error('Error updating quantity:', e);
//       let errorMessage = 'Failed to update item quantity.';
//       if (e.response) {
//         errorMessage =
//           e.response.data?.message || `Server Error: ${e.response.status}`;
//       } else if (e.request) {
//         errorMessage =
//           'Network Error: No response from server for quantity update. Check your internet connection.';
//       } else {
//         errorMessage = `Error: ${e.message}`;
//       }
//       Alert.alert('Error', errorMessage);
//     } finally {
//       setIsUpdatingQuantity(false);
//     }
//   };

//   const handleRazorpayPayment = async amount => {
//     if (
//       !currencyConfig.applicationData.razorpayKeyId ||
//       currencyConfig.applicationData.razorpayKeyId.includes(
//         'YOUR_RAZORPAY_KEY_ID',
//       )
//     ) {
//       Alert.alert(
//         'Configuration Error',
//         'Please set your actual Razorpay Key ID. For testing, use a test key (rzp_test_...).',
//       );
//       return false;
//     }

//     try {
//       const firstProductId =
//         cartItemsToDisplay.length > 0 ? cartItemsToDisplay[0].productId : null;

//       if (!firstProductId) {
//         Alert.alert('Error', 'No product ID found in cart for Razorpay order.');
//         return false;
//       }

//       // Create Razorpay order on backend
//       const createOrderResponse = await axiosInstance.post(
//         '/web/create-razorpay-order',
//         {
//           amount: Math.round(Number(amount)),
//           currency: currencyConfig.applicationData.currency || 'INR',
//           addressId: deliveryAddress?._id,
//           productId: firstProductId,
//           userId: CURRENT_USER_ID,
//         },
//       );
//       const res = createOrderResponse.data;

//       const orderId = res?.orderId;
//       const amountInPaise = Math.round(Number(amount) * 100);

//       if (!orderId) {
//         Alert.alert(
//           'Payment Error',
//           'Failed to obtain Razorpay order ID from backend. Please try again.',
//         );
//         return false;
//       }

//       var options = {
//         description: 'Shopinger Purchase',
//         image:
//           'https://media.istockphoto.com/id/486326115/photo/bull-and-bear.webp?b=1&s=170667a&w=0&k=20&c=HMb-bQbmU5-RVnU6NoPydkGjh0FEigULJcpwwA3z7g=',
//         currency: currencyConfig?.applicationData?.currency,
//         key: currencyConfig?.applicationData?.razorpayKeyId,
//         amount: amountInPaise,
//         name: 'Shopinger E-Commerce',
//         order_id: orderId,
//         prefill: {
//           // *** IMPORTANT: Replace these with actual user details ***
//           email: 'customer@example.com',
//           contact: '9876543210',
//           name: 'John Doe',
//         },
//         theme: {color: '#ff6600'},
//       };

//       const data = await RazorpayCheckout.open(options);
//       console.log('Razorpay Success Data:', data);

//       let rzpOrderId = data?.razorpay_order_id;
//       let paymentId = data?.razorpay_payment_id;
//       let signature = data?.razorpay_signature;

//       const verifyPaymentResponse = await axiosInstance.post(
//         '/web/verify-razorpay-payment',
//         {
//           razorpay_order_id: rzpOrderId,
//           razorpay_payment_id: paymentId,
//           razorpay_signature: signature,
//         },
//       );
//       const verificationResult = verifyPaymentResponse.data;

//       if (verificationResult.success) {
//         Alert.alert('Payment Successful!', verificationResult.message);
//         // Navigate to success screen, passing relevant details
//         navigation.navigate('OrderSuccessScreen', {
//           paymentId: paymentId,
//           paymentMode: 'Razorpay',
//           orderId: rzpOrderId, // Pass Razorpay order ID
//         });
//         return true; // Indicate success
//       } else {
//         Alert.alert(
//           'Payment Verification Failed',
//           verificationResult.message ||
//             'There was an issue verifying your payment. Please contact support.',
//         );
//         return false;
//       }
//     } catch (error) {
//       console.error(`Razorpay Error: ${error.code} - ${error.description}`);
//       Alert.alert('Payment Failed', `Error: ${error.description}`);
//       return false; // Indicate failure
//     }
//   };

//   const handlePlaceOrder = async () => {
//     const userId = await getUserData();
//     console.log(`User ID for order: ${JSON.stringify(userId.userId, null, 2)}`);
//     navigation.navigate('ShoppingBag');
//     if (cartItemsToDisplay.length === 0) {
//       Alert.alert(
//         'Cart Empty',
//         'Your cart is empty. Please add items before proceeding to checkout.',
//       );
//       return;
//     }
//     if (!deliveryAddress) {
//       Alert.alert(
//         'Address Required',
//         'Please set a delivery address before proceeding to checkout.',
//       );
//       return;
//     }

//     setIsPaying(true); // Set loading state for placing order

//     try {
//       if (selectedPaymentMode === 'cod') {
//         console.log('Attempting to place COD order...');

//         const firstProductId =
//           cartItemsToDisplay.length > 0
//             ? cartItemsToDisplay[0].productId
//             : null;

//         if (!firstProductId) {
//           Alert.alert(
//             'Error',
//             'No product ID found in cart. Cannot place COD order.',
//           );
//           setIsPaying(false);
//           return;
//         }

//         const codPayload = {
//           paymentMode: 'COD',
//           paymentOrderId: `COD-${Date.now()}`, // Generate a unique ID for COD orders
//           orderStatus: 'PENDING',
//           addressId: deliveryAddress.id, // Assuming your address object has an _id
//           totalAmount: cartSummary.totalAmount,
//           productId: firstProductId, // Using the first product ID from the cart
//           userId: userId.userId, // <--- MAKE SURE THIS IS YOUR ACTUAL USER ID
//           notes: 'Thank you for your order!',
//         };

//         console.log('COD Order Payload:', JSON.stringify(codPayload, null, 2));

//         const response = await axiosInstance.post(
//           '/web/create-order',
//           codPayload,
//         ); // Use the provided endpoint

//         if (response.data && response.data.success) {
//           Alert.alert(
//             'Order Placed',
//             response.data.message ||
//               'Your COD order has been placed successfully!',
//           );
//           // You might clear the cart locally or refetch cart data after successful order
//           fetchCartData(false); // Refresh cart to show it's empty or updated
//           navigation.navigate('OrderSuccessScreen', {
//             paymentMode: 'COD',
//             orderId: response.data.orderId,
//           }); // Pass backend order ID if returned
//         } else {
//           // Alert.alert('Order Failed', response.data.message || 'Failed to place COD order. Please try again.');
//         }
//         const cart = await axiosInstance.get('web/get-orders');
//         console.log('get cart data ', cart);
//       } else if (selectedPaymentMode === 'razorpay') {
//         console.log('Initiating Razorpay payment...');
//         const paymentSuccess = await handleRazorpayPayment(
//           cartSummary.totalAmount,
//         );
//         if (!paymentSuccess) {
//           console.log('Razorpay payment did not complete successfully.');
//         }
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//       let errorMessage = 'Could not place your order. Please try again.';
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
//       Alert.alert('Order Error', errorMessage);
//     } finally {
//       setIsPaying(false); // Reset loading state
//     }
//   };

//   if (loadingCart || loadingAddress) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#ff6600" />
//           <Text style={{marginTop: 10}}>Loading cart and address...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // If cart is empty after loading, display "No items" message and "Continue Shopping" button.
//   if (cartItemsToDisplay.length === 0 && !loadingCart) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={{
//                 uri: 'https://placehold.co/24x24/000000/FFFFFF?text=%3C',
//               }}
//               style={styles.backArrowIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Checkout</Text>
//           <View style={{width: 24}} />
//         </View>
//         <View style={styles.noItemsInCartContainer}>
//           <Text style={styles.noItemsInCartText}>Your cart is empty!</Text>
//           <TouchableOpacity
//             style={styles.browseButton}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.browseButtonText}>🛒 Shop Now</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={{
//               uri: 'https://placehold.co/24x24/000000/FFFFFF?text=%3C',
//             }}
//             style={styles.backArrowIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Checkout</Text>
//         <View style={{width: 24}} />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}>
//         {error && (
//           <View style={styles.errorBanner}>
//             <Text style={styles.errorBannerText}>{error}</Text>
//           </View>
//         )}

//         {cartItemsToDisplay.map(item => (
//           <CheckoutCartItem
//             key={item.id}
//             item={item}
//             onQuantityChange={handleQuantityUpdate}
//             isLoading={isUpdatingQuantity}
//           />
//         ))}

//         <View style={styles.infoBlock}>
//           <TouchableOpacity
//             style={styles.infoBlockHeader}
//             onPress={() => navigation.navigate('AllAddresses')}>
//             <Text style={styles.infoBlockTitle}>Delivery Address</Text>
//             <Text style={styles.infoBlockTitleEdit}>Edit</Text>
//           </TouchableOpacity>
//           <View style={styles.infoBlockContent}>
//             <Image
//               source={{
//                 uri: 'https://placehold.co/24x24/ff6600/FFFFFF?text=L', // Placeholder for location icon
//               }}
//               style={styles.infoBlockIcon}
//             />
//             {deliveryAddress ? (
//               <Text style={styles.infoBlockText}>
//                 {deliveryAddress.houseNo}, {deliveryAddress.street},{'\n'}
//                 {deliveryAddress.city}, {deliveryAddress.district},{' '}
//                 {deliveryAddress.pincode},{'\n'}
//                 {deliveryAddress.country}
//                 {deliveryAddress.landmark
//                   ? `\nLandmark: ${deliveryAddress.landmark}`
//                   : ''}
//                 {deliveryAddress.mobile
//                   ? `\nMobile: ${deliveryAddress.mobile}`
//                   : ''}
//               </Text>
//             ) : (
//               <Text style={styles.infoBlockText}>
//                 No delivery address found. Please add one.
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* Payment Options Section */}
//         <View style={styles.paymentOptionsContainer}>
//           <Text style={styles.paymentOptionsTitle}>Select Payment Method</Text>

//           {/* Razorpay Option */}
//           <TouchableOpacity
//             style={[
//               styles.paymentOptionCard,
//               selectedPaymentMode === 'razorpay' && styles.selectedOptionCard,
//             ]}
//             onPress={() => setSelectedPaymentMode('razorpay')}>
//             <View style={styles.paymentOptionLeft}>
//               <View
//                 style={[
//                   styles.radioButton,
//                   selectedPaymentMode === 'razorpay' &&
//                     styles.radioButtonSelected,
//                 ]}
//               />
//               <Image
//                 source={{
//                   uri: 'https://img.icons8.com/color/48/000000/razorpay.png',
//                 }} // Placeholder for Razorpay icon
//                 style={styles.paymentIcon}
//               />
//               <View>
//                 <Text style={styles.paymentOptionText}>Razorpay</Text>
//                 <Text style={styles.paymentOptionDescription}>
//                   Secure gateway payments
//                 </Text>
//               </View>
//             </View>
//             {selectedPaymentMode === 'razorpay' && (
//               <Text style={styles.mostPopularTag}>Most Popular</Text>
//             )}
//           </TouchableOpacity>

//           {/* Cash on Delivery Option */}
//           <TouchableOpacity
//             style={[
//               styles.paymentOptionCard,
//               selectedPaymentMode === 'cod' && styles.selectedOptionCard,
//               styles.codOptionCard,
//             ]}
//             onPress={() => setSelectedPaymentMode('cod')}>
//             <View style={styles.paymentOptionLeft}>
//               <View
//                 style={[
//                   styles.radioButton,
//                   selectedPaymentMode === 'cod' && styles.radioButtonSelected,
//                 ]}
//               />
//               <Image
//                 source={{
//                   uri: 'https://img.icons8.com/fluent/48/000000/cash-in-hand.png',
//                 }} // Placeholder for COD icon
//                 style={styles.paymentIcon}
//               />
//               <View>
//                 <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
//                 <Text style={styles.paymentOptionDescription}>
//                   Pay when you receive
//                 </Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.orderInfoContainer}>
//           <Text style={styles.orderInfoTitle}>Order Info</Text>
//           <View style={styles.orderInfoRow}>
//             <Text style={styles.orderInfoLabel}>Subtotal</Text>
//             <Text style={styles.orderInfoValue}>
//               ₹{cartSummary.subtotal.toFixed(2)}
//             </Text>
//           </View>
//           <View style={styles.orderInfoRow}>
//             <Text style={styles.orderInfoLabel}>Platform Fee</Text>
//             <Text style={styles.orderInfoValue}>
//               ₹{cartSummary.platformFee.toFixed(2)}
//             </Text>
//           </View>
//           <View style={styles.orderInfoRow}>
//             <Text style={styles.orderInfoLabel}>GST</Text>
//             <Text style={styles.orderInfoValue}>
//               ₹{cartSummary.gst.toFixed(2)}
//             </Text>
//           </View>
//           <View style={styles.orderInfoRow}>
//             <Text style={styles.orderInfoLabel}>Delivery Fee</Text>
//             <Text style={styles.orderInfoValue}>
//               ₹{cartSummary.deliveryFee.toFixed(2)}
//             </Text>
//           </View>
//           <View style={styles.totalRow}>
//             <Text style={styles.totalLabel}>Total Amount</Text>
//             <Text style={styles.totalValue}>
//               ₹{cartSummary.totalAmount.toFixed(2)}
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.proceedButton}
//           onPress={handlePlaceOrder} // Call the main order placement function
//           disabled={
//             isPaying ||
//             isUpdatingQuantity ||
//             loadingCart ||
//             loadingAddress ||
//             cartItemsToDisplay.length === 0 ||
//             !deliveryAddress
//           }>
//           {isPaying ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.proceedButtonText}>Place Order</Text>
//           )}
//         </TouchableOpacity>

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
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     backgroundColor: '#fff',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 1.5,
//   },
//   backArrowIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   container: {
//     padding: 16,
//     paddingBottom: 20, // Add some padding at the bottom
//   },
//   errorBanner: {
//     backgroundColor: '#ffebee',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ef9a9a',
//   },
//   errorBannerText: {
//     color: '#d32f2f',
//     fontSize: 14,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   noItemsInCartContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 50,
//   },
//   noItemsInCartText: {
//     fontSize: 18,
//     color: '#555',
//     marginBottom: 20,
//     fontWeight: '600',
//   },
//   browseButton: {
//     backgroundColor: '#ff6600',
//     paddingHorizontal: 25,
//     paddingVertical: 12,
//     borderRadius: 25,
//     elevation: 3,
//     shadowColor: '#ff6600',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   browseButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cartItemCard: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.08,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   cartItemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 12,
//     resizeMode: 'cover',
//   },
//   cartItemDetails: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   cartItemName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   cartItemBrand: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 4,
//   },
//   cartItemPrice: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#ff6600',
//     marginBottom: 8,
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     paddingVertical: 4,
//     paddingHorizontal: 6,
//     alignSelf: 'flex-start',
//   },
//   quantityButton: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginHorizontal: 5,
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     minWidth: 20,
//     textAlign: 'center',
//   },
//   deleteIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     tintColor: '#999',
//     marginLeft: 10,
//   },
//   infoBlock: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.08,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   infoBlockHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 10,
//   },
//   infoBlockTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//   },
//   infoBlockTitleEdit: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#ff6600',
//   },
//   infoBlockContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   infoBlockIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#ff6600',
//     marginRight: 10,
//     marginTop: 2, // Align icon with text
//     resizeMode: 'contain',
//   },
//   infoBlockText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 20,
//   },
//   paymentOptionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.08,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   paymentOptionsTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 15,
//   },
//   paymentOptionCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#fdfdfd',
//   },
//   selectedOptionCard: {
//     borderColor: '#ff6600',
//     backgroundColor: '#fff7ed',
//     borderWidth: 2,
//   },
//   paymentOptionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   radioButton: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButtonSelected: {
//     borderColor: '#ff6600',
//     backgroundColor: '#fff',
//   },
//   paymentIcon: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//     resizeMode: 'contain',
//   },
//   paymentOptionText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   paymentOptionDescription: {
//     fontSize: 13,
//     color: '#666',
//   },
//   mostPopularTag: {
//     backgroundColor: '#ff6600',
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 15,
//     alignSelf: 'flex-start',
//     marginLeft: 10,
//   },
//   codOptionCard: {
//     // Add any specific styles for COD if needed
//   },
//   orderInfoContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.08,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   orderInfoTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 15,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   orderInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   orderInfoLabel: {
//     fontSize: 15,
//     color: '#555',
//   },
//   orderInfoValue: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#333',
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   totalLabel: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#ff6600',
//   },
//   proceedButton: {
//     backgroundColor: '#ff6600',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 5,
//     shadowColor: '#ff6600',
//     shadowOffset: {width: 0, height: 5},
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
//   proceedButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default CheckoutPage;

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RazorpayCheckout from 'react-native-razorpay';

import axiosInstance from '../utils/AxiosInstance';
import {getUserData} from '../utils/tokenStorage';
import {useIsFocused} from '@react-navigation/native';

const CURRENT_USER_ID = 'your_actual_user_id_here';

const {width} = Dimensions.get('window');

const IMAGE_BASE_URL = 'http://103.119.171.213:3001';
const STATIC_CART_ITEMS_DATA = [
  {
    id: '1',
    image: require('../../assets/wishlist/shirt.png'),
    productName: "Men's Tie-Dye T-Shirt (Static)",
    brand: 'Nike Sportswear (Static)',
    sellingPrice: '45.00',
    quantity: 1,
  },
  {
    id: '2',
    image: require('../../assets/wishlist/jacket.png'),
    productName: "Men's Jacket (Static)",
    brand: 'Adidas Originals (Static)',
    sellingPrice: '60.00',
    quantity: 1,
  },
];

const CheckoutCartItem = ({item, onQuantityChange, isLoading}) => {
  const imageSource =
    typeof item.image === 'number'
      ? item.image
      : {
          uri:
            item.images &&
            item.images.length > 0 &&
            item.images[0].trim() !== ''
              ? `${IMAGE_BASE_URL}${item.images[0]}`
              : 'https://placehold.co/80x80/E0E0E0/555555?text=No+Image',
        };

  const productName = item.productName || 'Unknown Product';
  const brandName = item.brand || 'N/A';
  const price = item.sellingPrice
    ? parseFloat(item.sellingPrice).toFixed(2)
    : '0.00';
  const quantity = item.quantity || 1;
  const cartItemId = item.cartItemId;

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(cartItemId, quantity - 1);
    } else {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from your cart?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Remove',
            onPress: () => onQuantityChange(cartItemId, 0),
            style: 'destructive',
          },
        ],
      );
    }
  };

  const handleIncrement = () => {
    onQuantityChange(cartItemId, quantity + 1);
  };

  return (
    <View style={styles.cartItemCard}>
      <Image source={imageSource} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{productName}</Text>
        <Text style={styles.cartItemBrand}>{brandName}</Text>
        <Text style={styles.cartItemPrice}>₹{price}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrement}
            disabled={isLoading}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrement}
            disabled={isLoading}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onQuantityChange(cartItemId, 0)}
        disabled={isLoading}>
        <Image
          source={{
            uri: 'https://placehold.co/24x24/999999/FFFFFF?text=X',
          }}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const CheckoutPage = ({navigation}) => {
  const isFocused = useIsFocused();
  const [cartItemsToDisplay, setCartItemsToDisplay] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    platformFee: 0,
    gst: 0,
    deliveryFee: 0,
    totalAmount: 0,
  });
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('razorpay');
  console.log('deliveryAddress:', JSON.stringify(deliveryAddress), null, 2);
  const [currencyConfig] = useState({
    applicationData: {
      currency: 'INR',
      razorpayKeyId: 'rzp_live_ykAW0WN2mvhAjJ',
    },
  });

  const fetchCartData = useCallback(async (showLoading = true) => {
    const userId = await getUserData();
    console.log(`User ID for order: ${JSON.stringify(userId.userId, null, 2)}`);

    if (showLoading) {
      setLoadingCart(true);
    }
    setError(null);
    console.log('Fetching cart data...');
    try {
      const response = await axiosInstance.get('/web/get-cart');
      console.log(
        'API Response Data for /web/get-cart:',
        JSON.stringify(response.data, null, 2),
      );

      if (response.data) {
        const apiCartData = response.data;

        console.log('Cart Summery:::', apiCartData);
        // Update cart summary
        setCartSummary({
          subtotal: apiCartData.summary?.subtotal || 0,
          platformFee: apiCartData.otherCharges?.plateformfee || 0,
          gst: apiCartData.otherCharges?.gst || 0,
          deliveryFee: apiCartData.otherCharges?.deliveryFee || 0,
          totalAmount: apiCartData.totalAmountafterCharges || 0,
        });

        // Update cart items
        if (apiCartData.items && apiCartData.items.length > 0) {
          const mappedItems = apiCartData.items.map(item => ({
            id: item.cartItemId.toString(),
            cartItemId: item.cartItemId,
            productId: item.productId, // Ensure productId is available from cart items
            productName: item.productName,
            sellingPrice: item.price,
            quantity: item.quantity,
            images: item.images,
          }));
          console.log('Map item Data:::', mappedItems);
          setCartItemsToDisplay(mappedItems);
        } else {
          setCartItemsToDisplay([]);
        }
      } else {
        setError('Failed to fetch cart data: No data in response.');
        setCartItemsToDisplay([]);
      }
    } catch (e) {
      console.error('Error fetching cart data:', e);
      let errorMessage =
        'Could not load cart items. Please check your network or try again.';
      if (e.response) {
        errorMessage =
          e.response.data?.message || `Server Error: ${e.response.status}`;
      } else if (e.request) {
        errorMessage =
          'Network Error: No response from server. Check your internet connection.';
      } else {
        errorMessage = `Error: ${e.message}`;
      }
      setError(errorMessage);
      setCartItemsToDisplay([]);
    } finally {
      if (showLoading) {
        setLoadingCart(false);
      }
      console.log('Finished fetching cart data.');
    }
  }, []);

  const fetchAddressData = useCallback(async () => {
    setLoadingAddress(true);
    setError(null);
    console.log('Fetching address data...');
    try {
      const response = await axiosInstance.get('/web/get-address');
      console.log(
        'API Response Data for /web/get-address:',
        JSON.stringify(response.data, null, 2),
      );

      if (
        response.data &&
        response.data.addresses &&
        response.data.addresses.length > 0
      ) {
        setDeliveryAddress(response.data.addresses[0]);
      } else {
        setDeliveryAddress(null);
      }
    } catch (e) {
      console.error('Error fetching address data:', e);
      let errorMessage =
        'Could not load delivery address. Please check your network or add an address.';
      if (e.response) {
        errorMessage =
          e.response.data?.message || `Server Error: ${e.response.status}`;
      } else if (e.request) {
        errorMessage = 'Network Error: No response from server for address.';
      } else {
        errorMessage = `Error: ${e.message}`;
      }
      setError(errorMessage);
      setDeliveryAddress(null);
    } finally {
      setLoadingAddress(false);
      console.log('Finished fetching address data.');
    }
  }, []);

  useEffect(() => {
    fetchCartData();
    fetchAddressData();
  }, [isFocused, fetchCartData, fetchAddressData]);

  const handleQuantityUpdate = async (cartItemId, newQuantity) => {
    setIsUpdatingQuantity(true);
    setError(null);

    const currentItem = cartItemsToDisplay.find(
      item => item.cartItemId === cartItemId,
    );
    if (!currentItem) {
      Alert.alert('Error', 'Cart item not found.');
      setIsUpdatingQuantity(false);
      return;
    }

    let action;
    if (newQuantity > currentItem.quantity) {
      action = 'increment';
    } else if (newQuantity < currentItem.quantity) {
      action = 'decrement';
    } else {
      setIsUpdatingQuantity(false);
      return; // No change in quantity
    }

    try {
      console.log(
        `Updating quantity for item ${cartItemId} with action: ${action}`,
      );

      const response = await axiosInstance.patch(
        `/web/quantity-update/${cartItemId}`,
        {action: action},
      );

      console.log('Quantity Update Response:', response.data);

      if (response.data && response.data.success) {
        console.log('Quantity update successful, refreshing cart data...');
        await fetchCartData(false);
      } else {
        // Even if not success, refresh cart data to reflect server state in case of partial update or error details
        await fetchCartData(false);
      }
    } catch (e) {
      console.error('Error updating quantity:', e);
      let errorMessage = 'Failed to update item quantity.';
      if (e.response) {
        errorMessage =
          e.response.data?.message || `Server Error: ${e.response.status}`;
      } else if (e.request) {
        errorMessage =
          'Network Error: No response from server for quantity update. Check your internet connection.';
      } else {
        errorMessage = `Error: ${e.message}`;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsUpdatingQuantity(false);
    }
  };

  const handleRazorpayPayment = async amount => {
    if (
      !currencyConfig.applicationData.razorpayKeyId ||
      currencyConfig.applicationData.razorpayKeyId.includes(
        'YOUR_RAZORPAY_KEY_ID',
      )
    ) {
      Alert.alert(
        'Configuration Error',
        'Please set your actual Razorpay Key ID. For testing, use a test key (rzp_test_...).',
      );
      return false; // Indicate failure
    }

    try {
      // Ensure productId is available for the Razorpay order creation
      const firstProductId =
        cartItemsToDisplay.length > 0 ? cartItemsToDisplay[0].productId : null;

      if (!firstProductId) {
        Alert.alert('Error', 'No product ID found in cart for Razorpay order.');
        return false;
      }

      // Create Razorpay order on backend
      const createOrderResponse = await axiosInstance.post(
        '/web/create-razorpay-order',
        {
          amount: Math.round(Number(amount)),
          currency: currencyConfig.applicationData.currency || 'INR',
          addressId: deliveryAddress?._id,
          productId: firstProductId,
          userId: CURRENT_USER_ID,
        },
      );
      const res = createOrderResponse.data;

      //  console.log("Responce Order id:::",res)
      const orderId = res?.order?.id;

      const amountInPaise = Math.round(Number(amount) * 100);

      if (!orderId) {
        Alert.alert(
          'Payment Error',
          'Failed to obtain Razorpay order ID from backend. Please try again.',
        );
        return false;
      }

      var options = {
        description: 'Namoh sundari Purchase',
        image:
          'https://media.istockphoto.com/id/486326115/photo/bull-and-bear.webp?b=1&s=170667a&w=0&k=20&c=HMb-bQbmU5-RVnU6NoPydkGjh0FEigULJcpwwA3z7g=',
        currency: 'INR',
        key: 'rzp_test_rA0MAFpr4GmwXK',
        amount: amountInPaise,
        name: 'Namoh sundari E-Commerce',
        order_id: orderId,
        prefill: {
          // *** IMPORTANT: Replace these with actual user details ***
          email: 'customer@example.com',
          contact: '9876543210',
          name: 'John Doe',
        },
        theme: {color: '#ff6600'},
      };

      const data = await RazorpayCheckout.open(options);
      console.log('Razorpay Success Data:', data);

      let rzpOrderId = data?.razorpay_order_id;
      let paymentId = data?.razorpay_payment_id;
      let signature = data?.razorpay_signature;

      const verifyPaymentResponse = await axiosInstance.post(
        '/web/verify-payment',
        {
          razorpay_order_id: data?.razorpay_order_id,
          razorpay_payment_id: data?.razorpay_payment_id,
          razorpay_signature: data?.razorpay_signature,
          amount: amount,
          currency: 'INR',
          product_id: cartItemsToDisplay[0].productId,
        },
      );
      const verificationResult = verifyPaymentResponse.data;
      // console.log("Order Address::",verificationResult)

      const CreateOrder = await axiosInstance.post('/web/create-order', {
        paymentMode: selectedPaymentMode,
        paymentOrderId: paymentId,
        orderStatus: 'SUCCESS',
        addressId: deliveryAddress?.id,
        gst: cartSummary?.gst,
        discount: 0,
        couponCode: '',
        totalAmount: amount,
        notes: 'Ring the bell on arrival',
      });
      const CreateOrderSuccess = CreateOrder.data;
      console.log('Create order::::', CreateOrderSuccess);

      if (CreateOrderSuccess.message === 'Payment verified successfully') {
        Alert.alert('Payment Successful!', verificationResult.message);

        // Navigate to success screen, passing relevant details
        // navigation.navigate('OrderSuccessScreen', {
        //   paymentId: paymentId,
        //   paymentMode: 'Razorpay',
        //   orderId: rzpOrderId, // Pass Razorpay order ID
        // });

        return true; // Indicate success
      } else {
        Alert.alert(
          verificationResult.message ||
            'There was an issue verifying your payment. Please contact support.',
        );
        return false;
      }
    } catch (error) {
      console.error(`Razorpay Error: ${error.code} - ${error.description}`);
      Alert.alert('Payment Failed', `Error: ${error.description}`);
      return false; // Indicate failure
    }
  };

  const handlePlaceOrder = async productId => {
    // console.log("Hello")
    const userId = await getUserData();
    // console.log(`User ID for order: ${JSON.stringify(userId.userId, null, 2)}`);
    navigation.navigate('ShoppingBag');
    if (cartItemsToDisplay.length === 0) {
      Alert.alert(
        'Cart Empty',
        'Your cart is empty. Please add items before proceeding to checkout.',
      );
      return;
    }
    if (!deliveryAddress) {
      Alert.alert(
        'Address Required',
        'Please set a delivery address before proceeding to checkout.',
      );
      return;
    }

    setIsPaying(true); // Set loading state for placing order

    try {
      if (selectedPaymentMode === 'cod') {
        console.log('Attempting to place COD order...');

        const firstProductId =
          cartItemsToDisplay.length > 0
            ? cartItemsToDisplay[0].productId
            : null;

        if (!firstProductId) {
          Alert.alert(
            'Error',
            'No product ID found in cart. Cannot place COD order.',
          );
          setIsPaying(false);
          return;
        }

        const codPayload = {
          paymentMode: 'COD',
          paymentOrderId: `COD-${Date.now()}`, // Generate a unique ID for COD orders
          orderStatus: 'SUCCESS',
          addressId: deliveryAddress.id, // Assuming your address object has an _id
          totalAmount: cartSummary.totalAmount,
          productId: firstProductId, // Using the first product ID from the cart
          userId: userId.userId, // <--- MAKE SURE THIS IS YOUR ACTUAL USER ID
          notes: 'Thank you for your order!',
        };

        // console.log('COD Order Payload:', JSON.stringify(codPayload, null, 2));

        const response = await axiosInstance.post(
          '/web/create-order',
          codPayload,
        ); // Use the provided endpoint
        console.log('Cash on delevery responce:::', response);

        if (response.data.message === 'Order created') {
          Alert.alert(
            'Order Placed',
            response.data.message ||
              'Your COD order has been placed successfully!',
          );
          // You might clear the cart locally or refetch cart data after successful order
          fetchCartData(false); // Refresh cart to show it's empty or updated
          navigation.navigate('ShoppingBag', {
            paymentMode: 'COD',
            orderId: response.data.orderId,
          }); // Pass backend order ID if returned
        } else {
          // Alert.alert('Order Failed', response.data.message || 'Failed to place COD order. Please try again.');
        }
        const cart = await axiosInstance.get('web/get-orders');
        console.log('get cart data ', cart);
      } else if (selectedPaymentMode === 'razorpay') {
        console.log('Initiating Razorpay payment...');
        const paymentSuccess = await handleRazorpayPayment(
          cartSummary.totalAmount,
        );
        if (!paymentSuccess) {
          console.log('Razorpay payment did not complete successfully.');
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      let errorMessage = 'Could not place your order. Please try again.';
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
      Alert.alert('Order Error', errorMessage);
    } finally {
      setIsPaying(false); // Reset loading state
    }
  };

  if (loadingCart || loadingAddress) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6600" />
          <Text style={{marginTop: 10}}>Loading cart and address...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // If cart is empty after loading, display "No items" message and "Continue Shopping" button.
  if (cartItemsToDisplay.length === 0 && !loadingCart) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: 'https://placehold.co/24x24/000000/FFFFFF?text=%3C',
              }}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{width: 24}} />
        </View>
        <View style={styles.noItemsInCartContainer}>
          <Text style={styles.noItemsInCartText}>Your cart is empty!</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.browseButtonText}>🛒 Shop Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://placehold.co/24x24/000000/FFFFFF?text=%3C',
            }}
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}

        {cartItemsToDisplay.map(item => (
          <CheckoutCartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityUpdate}
            isLoading={isUpdatingQuantity}
          />
        ))}

        <View style={styles.infoBlock}>
          <TouchableOpacity
            style={styles.infoBlockHeader}
            onPress={() => navigation.navigate('AllAddresses')}>
            <Text style={styles.infoBlockTitle}>Delivery Address</Text>
            <Text style={styles.infoBlockTitleEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.infoBlockContent}>
            <Image
              source={{
                uri: 'https://placehold.co/24x24/ff6600/FFFFFF?text=L', // Placeholder for location icon
              }}
              style={styles.infoBlockIcon}
            />
            {deliveryAddress ? (
              <Text style={styles.infoBlockText}>
                {deliveryAddress.houseNo}, {deliveryAddress.street},{'\n'}
                {deliveryAddress.city}, {deliveryAddress.district},{' '}
                {deliveryAddress.pincode},{'\n'}
                {deliveryAddress.country}
                {deliveryAddress.landmark
                  ? `\nLandmark: ${deliveryAddress.landmark}`
                  : ''}
                {deliveryAddress.mobile
                  ? `\nMobile: ${deliveryAddress.mobile}`
                  : ''}
              </Text>
            ) : (
              <Text style={styles.infoBlockText}>
                No delivery address found. Please add one.
              </Text>
            )}
          </View>
        </View>

        {/* Payment Options Section */}
        <View style={styles.paymentOptionsContainer}>
          <Text style={styles.paymentOptionsTitle}>Select Payment Method</Text>

          {/* Razorpay Option */}
          <TouchableOpacity
            style={[
              styles.paymentOptionCard,
              selectedPaymentMode === 'razorpay' && styles.selectedOptionCard,
            ]}
            onPress={() => setSelectedPaymentMode('razorpay')}>
            <View style={styles.paymentOptionLeft}>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMode === 'razorpay' &&
                    styles.radioButtonSelected,
                ]}
              />
              <Image
                source={{
                  uri: 'https://img.icons8.com/color/48/000000/razorpay.png',
                }} // Placeholder for Razorpay icon
                style={styles.paymentIcon}
              />
              <View>
                <Text style={styles.paymentOptionText}>Razorpay</Text>
                <Text style={styles.paymentOptionDescription}>
                  Secure gateway payments
                </Text>
              </View>
            </View>
            {selectedPaymentMode === 'razorpay' && (
              <Text style={styles.mostPopularTag}>Most Popular</Text>
            )}
          </TouchableOpacity>

          {/* Cash on Delivery Option */}
          <TouchableOpacity
            style={[
              styles.paymentOptionCard,
              selectedPaymentMode === 'cod' && styles.selectedOptionCard,
              styles.codOptionCard,
            ]}
            onPress={() => setSelectedPaymentMode('cod')}>
            <View style={styles.paymentOptionLeft}>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMode === 'cod' && styles.radioButtonSelected,
                ]}
              />
              <Image
                source={{
                  uri: 'https://img.icons8.com/fluent/48/000000/cash-in-hand.png',
                }} // Placeholder for COD icon
                style={styles.paymentIcon}
              />
              <View>
                <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
                <Text style={styles.paymentOptionDescription}>
                  Pay when you receive
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderInfoTitle}>Order Info</Text>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Subtotal</Text>
            <Text style={styles.orderInfoValue}>
              ₹{cartSummary.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Platform Fee</Text>
            <Text style={styles.orderInfoValue}>
              ₹{cartSummary.platformFee.toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>GST</Text>
            <Text style={styles.orderInfoValue}>
              ₹{cartSummary.gst.toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Delivery Fee</Text>
            <Text style={styles.orderInfoValue}>
              ₹{cartSummary.deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{cartSummary.totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => handlePlaceOrder()} // Call the main order placement function
          disabled={
            isPaying ||
            isUpdatingQuantity ||
            loadingCart ||
            loadingAddress ||
            cartItemsToDisplay.length === 0 ||
            !deliveryAddress
          }>
          {isPaying ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.proceedButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>

        <View style={{height: 40}} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  backArrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  container: {
    padding: 16,
    paddingBottom: 20, // Add some padding at the bottom
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ef9a9a',
  },
  errorBannerText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  noItemsInCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noItemsInCartText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    fontWeight: '600',
  },
  browseButton: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#ff6600',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemBrand: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff6600',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  deleteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#999',
    marginLeft: 10,
  },
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  infoBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  infoBlockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  infoBlockTitleEdit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6600',
  },
  infoBlockContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoBlockIcon: {
    width: 20,
    height: 20,
    tintColor: '#ff6600',
    marginRight: 10,
    marginTop: 2, // Align icon with text
    resizeMode: 'contain',
  },
  infoBlockText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  paymentOptionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  paymentOptionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  paymentOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fdfdfd',
  },
  selectedOptionCard: {
    borderColor: '#ff6600',
    backgroundColor: '#fff7ed',
    borderWidth: 2,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#ff6600',
    backgroundColor: '#fff',
  },
  paymentIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentOptionDescription: {
    fontSize: 13,
    color: '#666',
  },
  mostPopularTag: {
    backgroundColor: '#ff6600',
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  codOptionCard: {
    // Add any specific styles for COD if needed
  },
  orderInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  orderInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderInfoLabel: {
    fontSize: 15,
    color: '#555',
  },
  orderInfoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff6600',
  },
  proceedButton: {
    backgroundColor: '#ff6600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#ff6600',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutPage;
