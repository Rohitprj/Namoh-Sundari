import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Sample data for product images (carousel)
const PRODUCT_IMAGES = [
  require('../../assets/products/sneaker.png'), // Main product image
  require('../../assets/products/sneaker.png'), // Assuming more images for carousel
  require('../../assets/products/sneaker.png'),
];

// Sample data for reviews
const REVIEWS_DATA = [
  {
    id: '1',
    avatar: require('../../assets/images/user1.png'), // Replace with actual avatar
    name: 'Jenny Wilson',
    date: '10 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  {
    id: '2',
    avatar: require('../../assets/images/user2.png'), // Replace with actual avatar
    name: 'Ronald Richards',
    date: '10 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  {
    id: '3',
    avatar: require('../../assets/images/user1.png'), // Replace with actual avatar
    name: 'Guy Hawkins',
    date: '10 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  {
    id: '4',
    avatar: require('../../assets/images/user2.png'), // Replace with actual avatar
    name: 'Savannah Nguyen',
    date: '10 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
];

// Sample data for "Similar to" products
const SIMILAR_PRODUCTS_DATA = [
  {
    id: 's1',
    image: require('../../assets/products/black.png'), // Replace with image
    title: 'Nike Sneakers',
    description: 'Black Air Force 1 Low',
    price: '₹2,000',
    oldPrice: '₹1,500',
    rating: '4.8',
    reviews: '48,090',
  },
  {
    id: 's2',
    image: require('../../assets/products/sneaker.png'), // Replace with image
    title: 'Nike Sneakers',
    description: 'White Black Print S-',
    price: '₹1,900',
    oldPrice: '₹1,200',
    rating: '4.7',
    reviews: '230,000',
  },
  {
    id: 's3',
    image: require('../../assets/products/black.png'), // Replace with image
    title: 'Nike Sneakers',
    description: 'Dark Grey Air Max',
    price: '₹2,200',
    oldPrice: '₹1,800',
    rating: '4.9',
    reviews: '120,000',
  },
  {
    id: 's4',
    image: require('../../assets/products/sneaker.png'), // Replace with image
    title: 'Nike Sneakers',
    description: 'Red Air Jordan 1',
    price: '₹2,500',
    oldPrice: '₹2,000',
    rating: '4.6',
    reviews: '95,000',
  },
];

const ProductDetailsScreen = ({ navigation }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setActiveImageIndex(index);
  };

  const renderReviewCard = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={item.avatar} style={styles.reviewAvatar} />
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewerName}>{item.name}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        <View style={styles.reviewRatingContainer}>
          <Text style={styles.reviewRating}>{item.rating}</Text>
          <Image
            // source={require('./assets/star_icon.png')} // Star icon for rating
            style={styles.reviewStarIcon}
          />
        </View>
      </View>
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );

  const renderSimilarProductCard = ({ item }) => (
    <TouchableOpacity style={styles.similarProductCard}>
      <Image source={item.image} style={styles.similarProductImage} />
      <Text style={styles.similarProductTitle}>{item.title}</Text>
      <Text style={styles.similarProductDescription}>{item.description}</Text>
      <View style={styles.similarProductPriceContainer}>
        <Text style={styles.similarProductPrice}>{item.price}</Text>
        <Text style={styles.similarProductOldPrice}>{item.oldPrice}</Text>
      </View>
      <View style={styles.similarProductRatingContainer}>
        <Image
          // source={require('./assets/star_icon.png')}
          style={styles.similarProductStarIcon}
        />
        <Text style={styles.similarProductRatingText}>{item.rating}</Text>
        <Text style={styles.similarProductReviewCount}>({item.reviews})</Text>
      </View>
    </TouchableOpacity>
  );

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
            scrollEventThrottle={16} // Invoked at most once every 16ms
          >
            {PRODUCT_IMAGES.map((img, index) => (
              <Image key={index} source={img} style={styles.carouselImage} />
            ))}
          </ScrollView>
          <View style={styles.paginationDots}>
            {PRODUCT_IMAGES.map((_, index) => (
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
          {/* Size Selection */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizeOptionsContainer}>
            {['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'].map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeButton,
                  size === '7 UK' && styles.selectedSizeButton, // Assuming 7 UK is selected by default
                ]}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    size === '7 UK' && styles.selectedSizeButtonText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.productName}>Nike Sneakers</Text>
          <Text style={styles.productModel}>Nike Air Max 270 (All Colours)</Text>
          <View style={styles.priceRatingRow}>
            <Text style={styles.originalPrice}>₹2,000</Text>
            <Text style={styles.discountedPrice}>₹1,500</Text>
            <Text style={styles.discountPercentage}>23% Off!</Text>
          </View>
          <View style={styles.ratingRow}>
            <Image
              // source={require('./assets/star_icon.png')}
              style={styles.starIcon}
            />
            <Text style={styles.productRating}>4.8</Text>
            <Text style={styles.productReviewCount}>(60,290)</Text>
          </View>

          <Text style={styles.sectionHeading}>Product details</Text>
          <Text style={styles.productDescriptionText}>
            Perhaps the most iconic sneaker of all-time, this original Air Jordan 1 from the
            mid-1980s was at the forefront of the basketball sneaker revolution. The shoe
            has stood the test of time, becoming the most popular sneaker of the
            generation, I love this, I always saw the
            <Text style={styles.readMoreText}>... More</Text>
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.addToCartButton}>
              <Image
                // source={require('./assets/add_to_cart_icon.png')} // Add to cart icon
                style={styles.addToCartIcon}
              />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton} onPress={() => navigation.navigate('Checkout')}>
              <Image
                // source={require('./assets/buy_now_icon.png')} // Buy now icon
                style={styles.buyNowIcon}
              />
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>245 Reviews</Text>
            <View style={styles.reviewsOverallRating}>
              <Text style={styles.reviewsOverallRatingText}>4.8</Text>
              <Image
                // source={require('./assets/star_icon.png')}
                style={styles.reviewsOverallStarIcon}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
              <Text style={styles.viewAllReviewsText}>View all</Text>
              <Image
                // source={require('./assets/arrow_right_small.png')} // Small arrow right icon
                style={styles.viewAllReviewsArrow}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={REVIEWS_DATA}
            renderItem={renderReviewCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Make reviews part of parent scroll, not independently scrollable
          />
        </View>

        {/* Similar Products Section */}
        <View style={styles.similarProductsSection}>
          <Text style={styles.similarProductsTitle}>Similar to 182+ Items</Text>
          <FlatList
            horizontal
            data={SIMILAR_PRODUCTS_DATA}
            renderItem={renderSimilarProductCard}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarProductsList}
          />
        </View>

        {/* Extra space at the bottom for content to scroll above bottom tabs */}
        {/* <View style={{ height: 80 }} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#ff6600', // Active dot color
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
    borderColor: '#ff6600',
    backgroundColor: '#fff0e6', // Light orange background
  },
  sizeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  selectedSizeButtonText: {
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
    textDecorationLine: 'line-through',
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
    borderColor: '#ff6600',
    borderRadius: 10,
    paddingVertical: 15,
    marginRight: 10,
  },
  addToCartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#ff6600',
    marginRight: 10,
  },
  addToCartText: {
    color: '#ff6600',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6600',
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
    shadowOffset: { width: 0, height: 1 },
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
});

export default ProductDetailsScreen;