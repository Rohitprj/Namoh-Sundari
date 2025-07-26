import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator, // Import ActivityIndicator for loading state
  Alert, // Import Alert for user feedback
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import axios from 'axios'; // Import axios (though you're using axiosInstance) - keeping this line commented as it was
import axiosInstance from '../utils/AxiosInstance'; // Your configured axios instance

const {width, height} = Dimensions.get('window');

// Helper function to calculate review statistics
const calculateReviewStats = reviews => {
  if (!reviews || reviews.length === 0) {
    return {
      averageRating: '0.0',
      totalReviews: 0,
      starDistribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0},
    };
  }

  let totalStarsSum = 0;
  const distribution = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};

  reviews.forEach(review => {
    totalStarsSum += review.stars;
    if (review.stars >= 1 && review.stars <= 5) {
      distribution[review.stars]++;
    }
  });

  const averageRating = (totalStarsSum / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  return {averageRating, totalReviews, starDistribution: distribution};
};

const ProductDetailsScreen = ({navigation, route}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // States for dynamic review data
  const [averageRating, setAverageRating] = useState('0.0');
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);
  const [starDistribution, setStarDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const {productSlug} = route.params;
  console.log('productSlug', productSlug);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `web/get-products/${productSlug}`,
      );
      console.log('API Response:', JSON.stringify(response.data, null, 2));

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.product
      ) {
        const fetchedProduct = response.data.data.product;
        setProductData(fetchedProduct);

        if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
          const defaultVariant = fetchedProduct.variants[0];
          setSelectedVariant(defaultVariant);

          const initialAttributes = {};
          defaultVariant.attributes.forEach(attr => {
            initialAttributes[attr.key] = attr.value;
          });
          setSelectedAttributes(initialAttributes);
        }
      } else {
        setError('Product data not found or API response indicates failure.');
      }
    } catch (e) {
      console.error('Failed to fetch product details:', e);
      if (e.response) {
        setError(
          `Server error: ${e.response.status} - ${
            e.response.data?.message || 'Unknown error'
          }`,
        );
      } else if (e.request) {
        setError(
          'No response from server. Please check your internet connection.',
        );
      } else {
        setError(`Error: ${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productSlug]);

  // Effect to calculate and set review statistics when productData changes
  useEffect(() => {
    if (productData && productData.ProductReview) {
      const {averageRating, totalReviews, starDistribution} =
        calculateReviewStats(productData.ProductReview);
      setAverageRating(averageRating);
      setTotalReviewsCount(totalReviews);
      setStarDistribution(starDistribution);
    } else {
      // Reset if no reviews or productData
      setAverageRating('0.0');
      setTotalReviewsCount(0);
      setStarDistribution({5: 0, 4: 0, 3: 0, 2: 0, 1: 0});
    }
  }, [productData]);

  const onScroll = event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setActiveImageIndex(index);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      Alert.alert('Error', 'Please select a product variant first.');
      return;
    }

    try {
      const payload = {
        variantId: selectedVariant.id,
        quantity: 1, // Quantity is always 1 as per your requirement
        attributes: selectedAttributes, // Use the selected attributes
      };

      console.log('Add to cart payload:', payload);

      const response = await axiosInstance.post('/web/add-to-cart', payload);

      console.log('add to cart response', response);
      if (response.data.success) {
        Alert.alert("",'Product added to cart!', [
          {
            text: 'OK',
            // onPress: () => navigation.navigate('CheckoutProduct'),
          },
        ]);
      } 
      else {
        Alert.alert('Success', 'Product added to cart!', [
          {
            text: 'OK',
            // onPress: () => navigation.navigate('CheckoutProduct'),
          },
        ]);
        navigation.navigate('CheckoutProduct');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      let errorMessage = 'Could not add product to cart. Please try again.';
      if (error.response) {
        errorMessage =
          error.response.data.message ||
          `Server Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network Error: No response from server.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  // Helper to render stars based on a number
  const renderStars = numStars => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={styles.starEmoji}>
          {i < numStars ? '⭐' : '☆'}
        </Text>,
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderReviewCard = ({item}) => {
    const reviewDate = new Date(item.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          {/* Using a static placeholder image for avatar, replace if you have dynamic URLs */}
          <Image
            source={require('../../assets/images/user1.png')}
            style={styles.reviewAvatar}
          />
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewerName}>
              {item.user.name || 'Anonymous'}
            </Text>
            <Text style={styles.reviewDate}>{reviewDate}</Text>
          </View>
          <View style={styles.reviewRatingContainer}>
            <Text style={styles.reviewRating}>{item.stars.toFixed(1)}</Text>
            <Image
              source={{
                uri: 'https://placehold.co/14x14/FFD700/000000?text=%E2%98%85',
              }} // Placeholder star icon
              style={styles.reviewStarIcon}
            />
          </View>
        </View>
        {/* Render stars dynamically based on item.stars */}
        {renderStars(item.stars)}
        <Text style={styles.reviewText}>{item.comment}</Text>
        {/* Add helpful/report as per image, currently static */}
        <View style={styles.reviewActions}>
          <TouchableOpacity style={styles.reviewActionButton}>
            <Text style={styles.reviewActionText}>👍 Helpful (0)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewActionButton}>
            <Text style={styles.reviewActionText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#01088c" />
          <Text style={{marginTop: 10}}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !productData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'No product data available.'}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchProductDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Determine available colors and sizes from ALL variants to allow selection
  const availableColors = {};
  const availableSizes = {};

  productData.variants.forEach(variant => {
    variant.attributes.forEach(attr => {
      if (attr.key.toLowerCase() === 'color') {
        availableColors[attr.value] = true;
      } else if (attr.key.toLowerCase() === 'size') {
        availableSizes[attr.value] = true;
      }
    });
  });

  const uniqueColors = Object.keys(availableColors);
  const uniqueSizes = Object.keys(availableSizes);

  const handleAttributeSelection = (key, value) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [key.toLowerCase()]: value,
    };
    setSelectedAttributes(newSelectedAttributes);

    const matchingVariant = productData.variants.find(variant => {
      let matches = true;
      for (const attrKey in newSelectedAttributes) {
        const variantHasAttr = variant.attributes.some(
          attr =>
            attr.key.toLowerCase() === attrKey &&
            attr.value === newSelectedAttributes[attrKey],
        );
        if (!variantHasAttr) {
          matches = false;
          break;
        }
      }
      return matches;
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    } else {
      setSelectedVariant(null);
      Alert.alert(
        'Selection Mismatch',
        'This combination of attributes is not available for this product.',
      );
    }
  };

  const productImages =
    selectedVariant &&
    selectedVariant.images &&
    selectedVariant.images.length > 0
      ? selectedVariant.images.map(imagePath => ({
          uri: `http://103.119.171.213:3001${imagePath}`,
        }))
      : [];

  const defaultProductImage = require('../../assets/products/sneaker.png');
  const imagesToDisplay =
    productImages.length > 0 ? productImages : [defaultProductImage];

  const price = selectedVariant ? selectedVariant.price : 'N/A';
  const sellingPrice = selectedVariant ? selectedVariant.sellingprice : 'N/A';

  let discountPercentage = '0% Off';
  if (
    price !== 'N/A' &&
    sellingPrice !== 'N/A' &&
    !isNaN(parseFloat(price)) &&
    !isNaN(parseFloat(sellingPrice))
  ) {
    const originalPriceNum = parseFloat(sellingPrice);
    const discountedPriceNum = parseFloat(price);
    if (originalPriceNum > 0) {
      discountPercentage = `${Math.round(
        ((originalPriceNum - discountedPriceNum) / originalPriceNum) * 100,
      )}% Off!`;
    }
  }

  const cleanDescription = productData.description
    ? productData.description.replace(/\\r\\n/g, '\n').trim()
    : 'No description available.';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Product Image Carousel */}
        <View style={styles.imageCarouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            {imagesToDisplay.map((img, index) => (
              <Image key={index} source={img} style={styles.carouselImage} />
            ))}
          </ScrollView>
          <View style={styles.paginationDots}>
            {imagesToDisplay.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeImageIndex && styles.activePaginationDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          {/* Color Selection */}
          {uniqueColors.length > 0 && (
            <View style={{marginBottom: 10}}>
              <Text style={styles.sectionHeading}>Colors</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sizeOptionsContainer}>
                {uniqueColors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorButton,
                      selectedAttributes.color === color &&
                        styles.selectedColorButton,
                    ]}
                    onPress={() => handleAttributeSelection('color', color)}>
                    <Text
                      style={[
                        styles.colorButtonText,
                        selectedAttributes.color === color &&
                          styles.selectedColorButtonText,
                      ]}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Size Selection */}
          {uniqueSizes.length > 0 && (
            <View>
              <Text style={styles.sectionHeading}>Sizes</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sizeOptionsContainer}>
                {uniqueSizes.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.sizeButton,
                      selectedAttributes.size === size &&
                        styles.selectedSizeButton,
                    ]}
                    onPress={() => handleAttributeSelection('size', size)}>
                    <Text
                      style={[
                        styles.sizeButtonText,
                        selectedAttributes.size === size &&
                          styles.selectedSizeButtonText,
                      ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <Text style={styles.productName}>{productData.name}</Text>
          <View style={styles.priceRatingRow}>
            <Text style={styles.originalPrice}>₹{price}</Text>
            {/* <Text style={styles.discountedPrice}>₹{sellingPrice}</Text> */}
            {/* <Text style={styles.discountPercentage}>{discountPercentage}</Text> */}
          </View>
          {/* <View style={styles.ratingRow}>
            <Image
              source={{
                uri: 'https://placehold.co/16x16/FFD700/000000?text=%E2%98%85',
              }} // Placeholder star icon
              style={styles.starIcon}
            />
            {/* Dynamic average rating */}
          {/* <Text style={styles.productRating}>{averageRating}</Text>
            {/* Dynamic total reviews */}
          {/* <Text style={styles.productReviewCount}>({totalReviewsCount})</Text>
          </View> */}

          <Text style={styles.sectionHeading}>Product details</Text>
          <Text style={styles.productDescriptionText}>{cleanDescription}</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                handleAddToCart();
                // navigation.navigate('CheckoutProduct'); // This navigation should happen inside handleAddToCart success
              }}
              disabled={!selectedVariant || selectedVariant.stock === 0}>
              <Image
                source={{
                  uri: 'https://placehold.co/20x20/FF6600/FFFFFF?text=Cart',
                }} // Placeholder cart icon
                style={styles.addToCartIcon}
              />
              <Text style={styles.addToCartText}>
                {selectedVariant && selectedVariant.stock === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={() => navigation.navigate('CheckoutProduct')}
              disabled={!selectedVariant || selectedVariant.stock === 0}>
              <Image
                source={{
                  uri: 'https://placehold.co/20x20/FFFFFF/FF6600?text=Buy',
                }} // Placeholder buy icon
                style={styles.buyNowIcon}
              />
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            
            <Text style={styles.reviewsTitle}>{totalReviewsCount} Reviews</Text>
            <View style={styles.reviewsOverallRating}>
              
              <Text style={styles.reviewsOverallRatingText}>
                {averageRating}
              </Text>
              <Image
                source={{
                  uri: 'https://placehold.co/14x14/FFD700/000000?text=%E2%98%85',
                }} // Placeholder star icon
                style={styles.reviewsOverallStarIcon}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
              <Text style={styles.viewAllReviewsText}>View all</Text>
              <Image
                source={{
                  uri: 'https://placehold.co/10x10/FF6600/FFFFFF?text=%3E',
                }} // Placeholder small arrow right icon
                style={styles.viewAllReviewsArrow}
              />
            </TouchableOpacity>
          </View>


          <View style={styles.starRatingBreakdown}>
            {[5, 4, 3, 2, 1].map(star => {
              const count = starDistribution[star] || 0;
              const percentage =
                totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
              return (
                <View key={star} style={styles.starRow}>
                  <Text style={styles.starRowLabel}>{star}</Text>
                  <Image
                    source={{
                      uri: 'https://placehold.co/14x14/FFD700/000000?text=%E2%98%85',
                    }}
                    style={styles.starRowIcon}
                  />
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {width: `${percentage}%`},
                      ]}
                    />
                  </View>
                  <Text style={styles.starRowCount}>{count}</Text>
                </View>
              );
            })}
          </View>

          {productData.ProductReview && productData.ProductReview.length > 0 ? (
            <FlatList
              data={productData.ProductReview} // Use actual review data
              renderItem={renderReviewCard}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Make reviews part of parent scroll
            />
          ) : (
            <Text style={styles.noReviewsText}>
              No reviews yet. Be the first to review!
            </Text>
          )}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  backArrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerIconsRight: {
    flexDirection: 'row',
  },
  headerRightIconContainer: {
    marginLeft: 15,
  },
  headerRightIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#333', // Adjust tint color if needed
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageCarouselContainer: {
    height: width * 0.9, // Adjust height based on aspect ratio of your images
    backgroundColor: '#fff',
    marginBottom: 10,
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: '100%',
    resizeMode: 'contain', // or 'cover' depending on your image aspect ratio
  },
  paginationDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activePaginationDot: {
    backgroundColor: '#01088c', // Active dot color
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  sizeOptionsContainer: {
    paddingVertical: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedSizeButton: {
    borderColor: '#161881',
    backgroundColor: '#fff', // Light orange background
  },
  sizeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  selectedSizeButtonText: {
    color: '#161881',
  },
  // New styles for color selection
  colorButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedColorButton: {
    borderColor: '#ff6600',
    backgroundColor: '#fff0e6',
  },
  colorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  selectedColorButtonText: {
    color: '#ff6600',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  productModel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    // textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6600',
    marginRight: 10,
  },
  discountPercentage: {
    fontSize: 14,
    color: '#ff6600',
    backgroundColor: '#fff0e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  starIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 5,
  },
  productRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  productReviewCount: {
    fontSize: 14,
    color: '#777',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  productDescriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  readMoreText: {
    color: '#ff6600',
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#161881',
    borderRadius: 10,
    paddingVertical: 15,
    marginRight: 10,
  },
  addToCartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#161881',
    marginRight: 10,
  },
  addToCartText: {
    color: '#161881',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161881',
    borderRadius: 10,
    paddingVertical: 15,
    marginLeft: 10,
  },
  buyNowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginRight: 10,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewsOverallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0e6',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reviewsOverallRatingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6600',
    marginRight: 5,
  },
  reviewsOverallStarIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#ff6600',
  },
  viewAllReviewsText: {
    fontSize: 14,
    color: '#ff6600',
    fontWeight: 'bold',
  },
  viewAllReviewsArrow: {
    position: 'absolute',
    right: -15, // Position outside the text
    top: '25%',
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: '#ff6600',
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0', // Placeholder background
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  reviewRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0e6',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6600',
    marginRight: 5,
  },
  reviewStarIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#ff6600',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 5,
  },
  starEmoji: {
    fontSize: 16,
    color: '#FFD700', // Gold color for filled stars
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewActions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  reviewActionButton: {
    marginRight: 20,
  },
  reviewActionText: {
    fontSize: 13,
    color: '#777',
  },
  similarProductsSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 20,
  },
  similarProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  similarProductsList: {
    paddingHorizontal: 15,
  },
  similarProductCard: {
    width: width * 0.4, // Adjust width for horizontal cards
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  similarProductImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  similarProductDescription: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
    minHeight: 25, // To keep card heights consistent
  },
  similarProductPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  similarProductPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff6600',
    marginRight: 5,
  },
  similarProductOldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  similarProductRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarProductStarIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 3,
  },
  similarProductRatingText: {
    fontSize: 12,
    color: '#777',
    marginRight: 5,
  },
  similarProductReviewCount: {
    fontSize: 11,
    color: '#999',
  },
  // Styles for the new star rating breakdown section
  starRatingBreakdown: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  starRowLabel: {
    fontSize: 14,
    color: '#333',
    width: 15, // Fixed width for star number
  },
  starRowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#ffc107', // Gold for stars
    marginHorizontal: 5,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden', // Ensures fill stays within bounds
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffc107', // Gold fill color
    borderRadius: 4,
  },
  starRowCount: {
    fontSize: 14,
    color: '#555',
    minWidth: 25, // Ensure space for number
    textAlign: 'right',
  },
  noReviewsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ProductDetailsScreen;
