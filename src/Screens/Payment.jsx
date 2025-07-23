// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Payment() {
//   return (
//     <View>
//       <Text>Payment</Text>
//     </View>
//   )
// }

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Modal, // Import Modal for the pop-up
  TouchableOpacity, // Import for button press functionality
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CheckoutPaymentWithModalPage = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleContinuePress = () => {
    setModalVisible(true);
    // In a real app, you might navigate after a delay or on modal close
    // setTimeout(() => {
    //   setModalVisible(false);
    //   navigation.navigate('SomeNextScreen');
    // }, 2000);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    // Optionally navigate after closing the modal
    // navigation.navigate('OrderSuccessScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            // source={require('./assets/back_arrow.png')} // Replace with your back arrow icon
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} /> {/* Spacer to balance header */}
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.orderSummarySection}>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Order</Text>
            <Text style={styles.orderSummaryValue}>₹ 7,000</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Shipping</Text>
            <Text style={styles.orderSummaryValue}>₹ 30</Text>
          </View>
          <View style={[styles.orderSummaryRow, styles.totalRow]}>
            <Text style={styles.orderSummaryLabel}>Total</Text>
            <Text style={styles.orderSummaryTotalValue}>₹ 7,030</Text>
          </View>
        </View>

        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Payment</Text>

          {/* VISA Card */}
          <View style={[styles.paymentMethodCard, styles.selectedPaymentMethod]}>
            <Image
            //   source={require('./assets/visa_logo.png')} // Replace with Visa logo
              style={styles.paymentMethodLogo}
            />
            <Text style={styles.paymentMethodText}>***********2109</Text>
          </View>

          {/* PayPal */}
          <View style={styles.paymentMethodCard}>
            <Image
            //   source={require('./assets/paypal_logo.png')} // Replace with PayPal logo
              style={styles.paymentMethodLogo}
            />
            <Text style={styles.paymentMethodText}>***********2109</Text>
          </View>

          {/* Generic Payment Method 1 */}
          <View style={styles.paymentMethodCard}>
            <Image
            //   source={require('./assets/generic_payment_logo_1.png')} // Replace with another payment logo
              style={styles.paymentMethodLogo}
            />
            <Text style={styles.paymentMethodText}>***********2109</Text>
          </View>

          {/* Generic Payment Method 2 (Apple Pay-like) */}
          <View style={styles.paymentMethodCard}>
            <Image
            //   source={require('./assets/apple_pay_logo.png')} // Replace with Apple Pay or similar logo
              style={styles.paymentMethodLogo}
            />
            <Text style={styles.paymentMethodText}>***********2109</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Extra space at the bottom to ensure content scrolls above potential bottom tabs */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Payment Success Modal */}
      <Modal
        animationType="fade" // Or "slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose} // Android back button support
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1} // Prevents opacity change on touch
          onPressOut={handleModalClose} // Close modal when touching outside
        >
          <View style={styles.modalContent}>
            <Image
            //   source={require('./assets/payment_success_check.png')} // Replace with your checkmark icon (image_241a3f.png)
              style={styles.modalIcon}
            />
            <Text style={styles.modalText}>Payment done successfully.</Text>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  orderSummarySection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderSummaryLabel: {
    fontSize: 15,
    color: '#555',
  },
  orderSummaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  orderSummaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  paymentSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedPaymentMethod: {
    borderColor: '#ff6600',
  },
  paymentMethodLogo: {
    width: 35,
    height: 25,
    resizeMode: 'contain',
    marginRight: 15,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#ff6600',
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: '80%', // Adjust width as needed
    maxWidth: 300, // Max width for larger screens
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalIcon: {
    width: 80, 
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: '#ff6600', 
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default CheckoutPaymentWithModalPage;