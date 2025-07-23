import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback } from 'react'; // Removed useEffect
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import axiosInstance from '../utils/AxiosInstance'; 

export default function AllAddresses({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      // THIS IS THE REAL API CALL using your imported axiosInstance
      const response = await axiosInstance.get("/web/get-address"); 
      
      if (response.data.success) {
        setAddresses(response.data.addresses);
      } else {
        setError(response.data.message || 'Failed to fetch addresses: Unknown reason.');
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      if (err.response) {
        setError(`Failed to fetch addresses: ${err.response.status} - ${err.response.data.message || 'Server Error'}`);
      } else if (err.request) {
        setError('Failed to fetch addresses: No response from server. Check your internet connection.');
      } else {
        setError('An unexpected error occurred while fetching addresses.');
      }
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Use useFocusEffect to call fetchAddresses whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
      // Optional: Add a cleanup function if needed
      return () => {
        // Any cleanup when the screen loses focus
        // e.g., if you had subscriptions that need to be cleared
      };
    }, [fetchAddresses]) // Depend on fetchAddresses
  );

  const handleAddAddress = () => {
    // Navigate to your Add Address screen
    // Make sure 'Checkout' is the correct screen name in your navigator
    if (navigation && navigation.navigate) {
      navigation.navigate("Checkout"); 
    } else {
      Alert.alert("Navigation Error", "Navigation prop not found or 'Checkout' screen not defined.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loadingText}>Loading your addresses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAddresses}>
          <Text style={styles.retryButtonText}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Saved Addresses</Text>
      
      {addresses.length === 0 ? (
        <View style={styles.noAddressesContainer}>
          <Text style={styles.noAddressesText}>No addresses found. Add your first address!</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <Text style={styles.name}>
                {address.fristname || address.lastname ? 
                  `${address.fristname || ''} ${address.lastname || ''}`.trim() 
                  : 'N/A'
                }
              </Text>
              
              <Text>
                {address.houseNo ? `${address.houseNo}, ` : ''}{address.street}
              </Text>
              
              <Text>
                {address.city}{address.district ? `, ${address.district}` : ''}
              </Text>
              
              <Text>{address.pincode}</Text>
              <Text>{address.country}</Text>
              
              {address.landmark && address.landmark.trim() !== '' ? <Text style={styles.detailText}>Landmark: {address.landmark}</Text> : null}
              {address.mobile && address.mobile.trim() !== '' ? <Text style={styles.detailText}>Mobile: {address.mobile}</Text> : null}
              
              {address.isDefault && <Text style={styles.defaultBadge}>Default Address</Text>}
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff', 
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 5,
    color: '#333',
  },
  detailText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  defaultBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50', 
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20, 
    marginTop: 10,
    fontSize: 13,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#ffc107', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noAddressesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noAddressesText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    lineHeight: 25,
  },
});