import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Sample Data for Reviews
const REVIEWS_DATA = [
  {
    id: '1',
    avatar: require('../../assets/images/user1.png'), // Replace with actual avatar
    name: 'Jenny Wilson',
    date: '13 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  {
    id: '2',
    avatar: require('../../assets/images/user2.png'), // Replace with actual avatar
    name: 'Ronald Richards',
    date: '13 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  {
    id: '3',
    avatar: require('../../assets/images/user1.png'), // Replace with actual avatar
    name: 'Guy Hawkins',
    date: '13 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  {
    id: '4',
    avatar: require('../../assets/images/user2.png'), // Replace with actual avatar
    name: 'Savannah Nguyen',
    date: '13 Sep, 2020',
    rating: '4.8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae ame.',
  },
  // Add more reviews as needed
];

const ReviewCard = ({ review }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image source={review.avatar} style={styles.reviewAvatar} />
      <View style={styles.reviewInfo}>
        <Text style={styles.reviewerName}>{review.name}</Text>
        <View style={styles.reviewDateContainer}>
          <Image
            // source={require('./assets/clock_icon.png')} // Clock icon (if you have one, or use a generic one)
            style={styles.clockIcon}
          />
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      </View>
      <View style={styles.reviewRatingContainer}>
        <Text style={styles.reviewRatingValue}>{review.rating}</Text>
        <Text style={styles.reviewRatingText}>rating</Text>
        <View style={styles.starRow}>
          {Array(5).fill().map((_, i) => (
            <Image
              key={i}
            //   source={i < Math.floor(parseFloat(review.rating)) ? require('./assets/star_icon_filled.png') : require('./assets/star_icon_outline.png')} // Filled vs. outline star
              style={styles.reviewStar}
            />
          ))}
        </View>
      </View>
    </View>
    <Text style={styles.reviewText}>{review.text}</Text>
  </View>
);

const ReviewsScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 24 }} /> {/* Spacer to balance header */}
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <View style={styles.overallReviewsHeader}>
          <Text style={styles.overallReviewsCount}>245 Reviews</Text>
          <View style={styles.overallRatingDisplay}>
            <Text style={styles.overallRatingValue}>4.8</Text>
            <View style={styles.overallStars}>
              {Array(5).fill().map((_, i) => (
                <Image
                  key={i}
                //   source={i < 4.8 ? require('./assets/star_icon_filled.png') : require('./assets/star_icon_outline.png')}
                  style={styles.overallStar}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.addReviewButton} onPress={() => navigation.navigate('AddReview')}>
            <Image
            //   source={require('./assets/add_review_icon.png')} // Plus icon for Add Review
              style={styles.addReviewIcon}
            />
            <Text style={styles.addReviewButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews FlatList */}
        <FlatList
          data={REVIEWS_DATA}
          renderItem={({ item }) => <ReviewCard review={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.reviewsListContainer}
        />
      </View>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  overallReviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  overallReviewsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  overallRatingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRatingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6600',
    marginRight: 5,
  },
  overallStars: {
    flexDirection: 'row',
  },
  overallStar: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#ffc107', // Gold color for stars
    marginHorizontal: 1,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    borderRadius: 20,
    // paddingHorizontal: 15,
    paddingVertical: 8,
  },
  addReviewIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginRight: 5,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    right:9
  },
  reviewsListContainer: {
    // No specific padding here as reviewCard has padding
    paddingBottom: 20, // Add space at the bottom before potential bottom tabs
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top (avatar, text, rating)
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewInfo: {
    flex: 1, // Takes up remaining space
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  reviewDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#777',
    marginRight: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#777',
  },
  reviewRatingContainer: {
    alignItems: 'flex-end', // Aligns rating and stars to the right
  },
  reviewRatingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRatingText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
  },
  starRow: {
    flexDirection: 'row',
  },
  reviewStar: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#ffc107', // Gold color for stars
    marginHorizontal: 1,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default ReviewsScreen;