import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {getUserData} from './src/utils/tokenStorage';

// Import all your screens
import Home from './src/Screens/Home';
import LoginScreen from './src/Screens/LoginScreen';
import CreateAccountScreen from './src/Screens/CreateAccountScreen';
import ForgotPassword from './src/Screens/ForgotPassword';
import GetStarted from './src/Screens/GetStarted';
import ProductsPage from './src/Screens/ProductsPage';
import Search from './src/Screens/Search';
import Settings from './src/Screens/Settings';
import Wishlist from './src/Screens/Wishlist';
import Cart from './src/Screens/Cart';
import ReviewsScreen from './src/Screens/Reviews';
import AddReviewScreen from './src/Screens/AddReview';
import CheckoutScreen from './src/Screens/Checkout';
import CheckoutProduct from './src/Screens/CheckoutProduct';
import StaticShoppingBagScreen from './src/Screens/ShoppingBag';
import Payment from './src/Screens/Payment';
import ProductAllData from './src/Screens/ProductAllData';
import ProductDetails from './src/Screens/ProductDetails';
import AllAddresses from './src/Screens/AllAddresses';
import SplashScreen from './src/utils/SplashScreen';
import Feather from 'react-native-vector-icons/Feather';
import otpVerify from './src/Screens/otpVerify';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Wishlist':
              iconName = 'heart';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Profile':
              iconName = 'user';
              break;
          }

          const iconColor = focused ? '#f24a97' : 'black';
          const iconSize = route.name === 'Cart' ? 24 : 22;

          return (
            <Feather
              name={iconName}
              size={iconSize}
              color={iconColor}
              // style={
              //   route.name === 'Cart'
              //     ? {
              //         backgroundColor: 'white',
              //         padding: 10,
              //         borderRadius: 50,
              //         elevation: 5,
              //         marginTop: -20,
              //         width: 45,
              //       }
              //     : {}
              // }
            />
          );
        },
        tabBarActiveTintColor: '#f24a97',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Home" component={ProductsPage} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Cart" component={CheckoutProduct} />
      {/* <Tab.Screen name="Search" component={Search} /> */}
      <Tab.Screen name="Profile" component={Settings} />
    </Tab.Navigator>
  );
};

// Define your Stack Navigator
const StackNavigator = ({initialRouteName}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <Stack.Screen name="otpVerify" component={otpVerify} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ProductAllData" component={ProductAllData} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="AllAddresses" component={AllAddresses} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
      <Stack.Screen name="AddReview" component={AddReviewScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="CheckoutProduct" component={CheckoutProduct} />
      <Stack.Screen name="ShoppingBag" component={StaticShoppingBagScreen} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [initialRoute, setInitialRoute] = useState('LoginScreen');
  const [showSplash, setShowSplash] = useState(true);
  const [appContentLoading, setAppContentLoading] = useState(true);

  useEffect(() => {
    const checkAndHideSplash = async () => {
      // --- Start of your original token check logic ---
      try {
        const userData = await getUserData();
        if (userData && userData.token) {
          console.log('Token found:', userData.token);
          setInitialRoute('GetStarted');
        } else {
          console.log('No token found, starting with Home.');
          setInitialRoute('LoginScreen');
        }
      } catch (e) {
        console.error('Failed to retrieve user data from AsyncStorage:', e);
        setInitialRoute('LoginScreen');
      } finally {
        setAppContentLoading(false);
      }

      const minSplashTimePromise = new Promise(resolve =>
        setTimeout(resolve, 2000),
      );

      // Wait for both the minimum splash time AND your app's initial loading
      await Promise.all([minSplashTimePromise]);

      setShowSplash(false); // Hide the JavaScript splash screen
    };

    checkAndHideSplash();
  }, []); // Run only once on component mount

  // Display the JavaScript splash screen if `showSplash` is true
  if (showSplash) {
    return <SplashScreen />;
  }

  if (appContentLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#01088c" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator initialRouteName={initialRoute} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
