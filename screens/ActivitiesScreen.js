import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { popularTours } from './ToursScreen'; // Importamos los datos de ToursScreen

const { width } = Dimensions.get('window');

const ActivitiesScreen = ({ navigation, route }) => {
  const { city } = route.params;
  
  // Filtramos los tours por ciudad
  const tours = popularTours.filter(tour => 
    tour.location.toLowerCase().includes(city.toLowerCase())
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <Image 
        source={item.image} // Ya usa el formato {uri} consistente
        style={styles.activityImage}
      />
    <View style={styles.activityContent}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>{item.title || 'Tour'}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.8</Text>
        </View>
      </View>
      
      <Text style={styles.activityDescription}>
        {item.description ? `${item.description.substring(0, 100)}...` : 'No description available'}
      </Text>
      
      <View style={styles.activityFooter}>
        <View>
          <Text style={styles.activityDuration}>{item.details?.duration || 'Duration not specified'}</Text>
          <Text style={styles.activityPrice}>{item.price || 'Price not available'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('TourDetail', { tourData: item })}
        >
          <Text style={styles.bookButtonText}>Show More</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Top activities in {city}</Text>
        </View>

        {tours.length > 0 ? (
          <>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDivider} />
            </View>
            
            <FlatList
              data={tours}
              renderItem={renderActivity}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.activitiesList}
            />
          </>
        ) : (
          <View style={styles.noActivities}>
            <Text style={styles.noActivitiesText}>No activities found for {city}</Text>
            <Text style={styles.noActivitiesSubtext}>Check back later or try another city</Text>
          </View>
        )}
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15,
  },
  backButton: {
    marginRight: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: '#eee',
    marginBottom: 15,
  },
  activitiesList: {
    paddingBottom: 10,
  },
  activityCard: {
    marginBottom: 25,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  activityContent: {
    padding: 15,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
    marginRight: 5,
    fontFamily: 'Inter_600SemiBold',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter',
    marginBottom: 15,
    lineHeight: 20,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDuration: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter',
    marginBottom: 3,
  },
  activityPrice: {
    fontSize: 16,
    fontFamily: 'Inter_bold',
    color: '#5e8b92',
  },
  bookButton: {
    backgroundColor: '#5e8b92',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 14,
  },
  localPlacesSection: {
    marginTop: 30,
    marginBottom: 50,
  },
  localPlacesTitle: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 15,
  },
  localPlaceCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  localPlaceTitle: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 5,
  },
  localPlaceDescription: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  webButton: {
    backgroundColor: '#5e8b92',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  webButtonText: {
    color: '#fff',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 14,
  },
  noActivities: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noActivitiesText: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 10,
  },
  noActivitiesSubtext: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter',
  },
  noPlacesSection: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
});

export default ActivitiesScreen;