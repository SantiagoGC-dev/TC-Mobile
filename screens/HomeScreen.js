import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { ImageBackground } from 'react-native';
import { Ionicons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { popularTours } from './ToursScreen';

const { width } = Dimensions.get('window');

const destinationData = {
  'Merida': {
    title: popularTours[0].title,
    image: popularTours[0].images[0],
    reviews: '⭐⭐⭐⭐⭐ 100 reviews',
    activities: [popularTours[0]]
  },
  'Cancun': {
    title: popularTours[1].title,
    image: popularTours[1].images[0],
    reviews: '⭐⭐⭐⭐⭐ 80 reviews',
    activities: [popularTours[1]]
  },
  'Cozumel': {
    title: popularTours[2].title,
    image: popularTours[2].images[0],
    reviews: '⭐⭐⭐⭐⭐ 90 reviews',
    activities: [popularTours[2]]
  },
  'Tulum': {
    title: popularTours[4].title,
    image: popularTours[4].images[0],
    reviews: '⭐⭐⭐⭐⭐ 90 reviews',
    activities: [popularTours[4]]
  },
  'Playa del Carmen': {
    title: popularTours[5].title,
    image: popularTours[5].images[0],
    reviews: '⭐⭐⭐⭐⭐ 70 reviews',
    activities: [popularTours[4]]
  }
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [selected, setSelected] = useState('Merida');
  const [searchText, setSearchText] = useState('');

  const destinations = Object.keys(destinationData);
  const filteredDestinations = destinations.filter(dest =>
    dest.toLowerCase().includes(searchText.toLowerCase())
  );

  const { title, image, reviews } = destinationData[selected];

  const isActive = (routeName) => {
    return route.name === routeName;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Hello, <Text style={styles.username}>Jesus</Text></Text>
            <Text style={styles.subwelcome}>Welcome to TourCraft</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Usuario')}>
            <Image source={require('../assets/yisus.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <Text style={styles.sectionTitle}>Select the city you want to visit!</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
          {filteredDestinations.map(dest => (
            <TouchableOpacity
              key={dest}
              onPress={() => setSelected(dest)}
              style={[styles.chip, selected === dest && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selected === dest && styles.chipTextSelected]}>
                {dest}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredDestinations.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#999', fontFamily: 'Inter', marginBottom: 20 }}>
            No destinations found, please try another search.
          </Text>
        )}

        <ImageBackground
          source={{ uri: image }}
          style={styles.card}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.cardCity}>{selected},</Text>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardStars}>{reviews}</Text>

            <TouchableOpacity
              style={styles.seeMore}
              onPress={() => navigation.navigate('Activities', {
                city: selected,
                activities: destinationData[selected].activities
              })}
            >
              <Text style={styles.seeMoreText}>See more</Text>
              <Feather name="arrow-right" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
          <Ionicons name="home" size={30} color={isActive('Home') ? '#5e8b92' : '#666'} />
          {isActive('Home') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Tours')} style={styles.navButton}>
          <FontAwesome5 name="route" size={30} color={isActive('Tours') ? '#5e8b92' : '#666'} />
          {isActive('Tours') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Guides')} style={styles.navButton}>
          <MaterialIcons name="people-alt" size={30} color={isActive('Guides') ? '#5e8b92' : '#666'} />
          {isActive('Guides') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Usuario')} style={styles.navButton}>
          <FontAwesome5 name="user-circle" size={30} color={isActive('Usuario') ? '#5e8b92' : '#666'} />
          {isActive('Usuario') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    padding: 20,
    paddingBottom: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  welcome: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  username: {
    fontWeight: 'bold',
    color: '#5e8b92'
  },
  subwelcome: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    fontFamily: 'PlayfairDisplay_700Bold'
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 8,
    color: '#000',
    fontFamily: 'Inter',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 15
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 35
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: '#5e8b92'
  },
  chipText: {
    color: '#333',
    fontFamily: 'Inter'
  },
  chipTextSelected: {
    color: '#fff'
  },
  card: {
    height: 490,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 20,
    marginHorizontal: 10,
    width: width - 60,
    alignSelf: 'center'
  },
  cardCity: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_700Bold'
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'PlayfairDisplay_700Bold'
  },
  cardStars: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5
  },
  seeMore: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  seeMoreText: {
    marginRight: 5,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
    borderRadius: 15
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navButton: {
    alignItems: 'center',
    padding: 5,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5e8b92',
  },
});
