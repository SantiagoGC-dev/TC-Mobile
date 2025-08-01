import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TourDetailScreen = ({ navigation, route }) => {
  // Error handling para params
  if (!route?.params?.tourData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Tour no encontrado</Text>
          <TouchableOpacity 
            style={styles.errorButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.errorButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { tourData } = route.params;
  
  // Estados
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [mainImageLoading, setMainImageLoading] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Datos de reseñas
  const reviews = [
    {
      id: '1',
      quote: "¡Una experiencia increíble! Nuestro guía conocía cada detalle de la historia maya. Las pirámides son aún más impresionantes en persona.",
      author: "Vanessa Pliego",
      location: "Mexico City, Mexico",
      rating: 5,
      date: "Hace 2 semanas"
    },
    {
      id: '2',
      quote: "El tour superó todas mis expectativas. La organización fue perfecta y el almuerzo en el cenote fue mágico. ¡Totalmente recomendado!",
      author: "Cristiano Ronaldo",
      location: "Lisbon, Portugal",
      rating: 5,
      date: "Hace 1 mes"
    },
    {
      id: '3',
      quote: "Experiencia interesante pero el transporte podría mejorar. El guía era muy conocedor pero esperaba más comodidades por el precio.",
      author: "Ignacio Calderon",
      location: "Beijing, China",
      rating: 4,
      date: "Hace 3 semanas"
    },
    {
      id: '4',
      quote: "Como amante de la historia, este tour fue un sueño hecho realidad. El transporte fue cómodo y puntual. Volvería a hacerlo sin dudarlo.",
      author: "David Fraga",
      location: "Tepic, Mexico",
      rating: 4,
      date: "Hace 1 semana"
    },
    {
      id: '5',
      quote: "El tour fue bueno, pero el clima no ayudó. Aún así, nuestro guía hizo un gran trabajo y aprendí mucho sobre la cultura maya.",
      author: "Mayra Pliego",
      location: "Mexico City, Mexico",
      rating: 4,
      date: "Hace 2 semanas"
    },
    {
      id: '6',
      quote: "Una experiencia inolvidable. La historia y la cultura que aprendí aquí son invaluables. ¡Gracias por un tour tan bien organizado!",
      author: "Luis Miguel",
      location: "San Juan, Puerto Rico",
      rating: 5,
      date: "Hace 1 semana"
    },
    {
      id: '7',
      quote: "El tour fue excelente, pero me hubiera gustado más tiempo en cada sitio. Aún así, aprendí mucho y disfruté cada momento.",
      author: "John Mayer",
      location: "Los Angeles, USA",
      rating: 4,
      date: "Hace 3 semanas"
    }
  ];

  // Funciones
  const toggleSection = useCallback((section) => {
    if (section === 'itinerary') {
      setShowItinerary(prev => !prev);
      setShowDetails(false);
    } else {
      setShowDetails(prev => !prev);
      setShowItinerary(false);
    }
  }, []);

  const handleImageChange = useCallback((index) => {
    if (index !== mainImageIndex) {
      setMainImageLoading(true);
      setMainImageIndex(index);
    }
  }, [mainImageIndex]);

  const handleImageLoad = useCallback(() => {
    setMainImageLoading(false);
  }, []);

  const handleBookTour = useCallback(async () => {
    setBookingLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        "¡Reserva exitosa!",
        `Tu reserva para "${tourData.title}" ha sido confirmada. Te contactaremos pronto con los detalles.`,
        [
          { 
            text: "OK", 
            onPress: () => navigation.goBack(),
            style: "default" 
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error en la reserva",
        "Hubo un problema al procesar tu reserva. Inténtalo de nuevo.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setBookingLoading(false);
    }
  }, [tourData.title, navigation]);

  const renderStars = (rating) => {
    return '⭐️'.repeat(rating);
  };

  const averageRating = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  // Validar imágenes
  const validImages = tourData.images || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButtonContainer}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
        </View>

        {/* Sección de imágenes */}
        {validImages.length > 0 && (
          <View style={styles.imageSection}>
            <View style={styles.mainImageContainer}>
              <Image 
                source={{ uri: validImages[mainImageIndex] }} 
                style={styles.mainImage}
                onLoad={handleImageLoad}
                resizeMode="cover"
              />
              {mainImageLoading && (
                <View style={styles.imageLoader}>
                  <ActivityIndicator size="large" color="#5e8b92" />
                </View>
              )}
              
              <View style={styles.imageIndicator}>
                <Text style={styles.imageIndicatorText}>
                  {mainImageIndex + 1} / {validImages.length}
                </Text>
              </View>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.thumbnailContainer}
              contentContainerStyle={styles.thumbnailContent}
            >
              {validImages.map((image, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleImageChange(index)}
                >
                  <Image 
                    source={{ uri: image }} 
                    style={[
                      styles.thumbnail,
                      index === mainImageIndex && styles.activeThumbnail
                    ]} 
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Información principal */}
        <View style={styles.tourHeader}>
          <Text style={styles.tourTitle}>{tourData.title}</Text>
          
          <View style={styles.priceRatingContainer}>
            <Text style={styles.tourPrice}>{tourData.price}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                ⭐️ {averageRating} ({reviews.length} reseñas)
              </Text>
            </View>
          </View>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.tourLocation}>{tourData.location}</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.wantToGoButton,
              bookingLoading && styles.wantToGoButtonDisabled
            ]}
            onPress={handleBookTour}
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.wantToGoText}>¡Reservar ahora!</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Características */}
        {tourData.features && (
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Características del tour</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureColumn}>
                {tourData.features.left?.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#5e8b92" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.featureColumn}>
                {tourData.features.right?.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#5e8b92" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Botones de sección */}
        <View style={styles.sectionButtons}>
          <TouchableOpacity 
            style={[styles.sectionButton, showDetails && styles.activeSectionButton]}
            onPress={() => toggleSection('details')}
          >
            <Text style={[styles.sectionButtonText, showDetails && styles.activeSectionButtonText]}>
              Detalles
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sectionButton, showItinerary && styles.activeSectionButton]}
            onPress={() => toggleSection('itinerary')}
          >
            <Text style={[styles.sectionButtonText, showItinerary && styles.activeSectionButtonText]}>
              Itinerario
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido de Details */}
        {showDetails && (
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>{tourData.description}</Text>
            
            {tourData.details && (
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="people-outline" size={20} color="#5e8b92" />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Tamaño del grupo:</Text>
                    <Text style={styles.detailValue}>{tourData.details.groupSize}</Text>
                  </View>
                </View>
                
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="time-outline" size={20} color="#5e8b92" />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Duración:</Text>
                    <Text style={styles.detailValue}>{tourData.details.duration}</Text>
                  </View>
                </View>
                
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="card-outline" size={20} color="#5e8b92" />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Entradas:</Text>
                    <Text style={styles.detailValue}>{tourData.details.entryFees}</Text>
                  </View>
                </View>
                
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="bus-outline" size={20} color="#5e8b92" />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Transporte:</Text>
                    <Text style={styles.detailValue}>{tourData.details.transportation}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Contenido de Itinerary */}
        {showItinerary && tourData.itinerary && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionSubtitle}>Experiencia (Itinerario)</Text>
            
            {tourData.itinerary.map((item, index) => (
              <View key={index} style={styles.itineraryItemContainer}>
                <View style={styles.itineraryHeader}>
                  <View style={styles.itineraryNumber}>
                    <Text style={styles.itineraryNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.itineraryItem}>{item.title}</Text>
                </View>
                {item.description && (
                  <Text style={styles.itinerarySubItem}>{item.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Sección de reseñas */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>
              Lo que dicen los viajeros sobre {tourData.title}
            </Text>
            <View style={styles.overallRating}>
              <Text style={styles.overallRatingText}>{averageRating}</Text>
              <Text style={styles.overallStars}>{renderStars(Math.round(parseFloat(averageRating)))}</Text>
              <Text style={styles.totalReviews}>({reviews.length} reseñas)</Text>
            </View>
          </View>
          
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAuthorInfo}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <Text style={styles.reviewLocation}>{review.location}</Text>
                </View>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewRating}>{renderStars(review.rating)}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>"{review.quote}"</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: '#5e8b92',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10,
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageSection: {
    marginBottom: 20,
  },
  mainImageContainer: {
    position: 'relative',
    marginHorizontal: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  mainImage: {
    width: '100%',
    height: 280,
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  imageIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  imageIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  thumbnailContainer: {
    marginTop: 10,
  },
  thumbnailContent: {
    paddingHorizontal: 15,
  },
  thumbnail: {
    width: 80,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#eee',
  },
  activeThumbnail: {
    borderColor: '#5e8b92',
    borderWidth: 3,
  },
  tourHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tourTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 34,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tourPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e8b92',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tourLocation: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  wantToGoButton: {
    backgroundColor: '#5e8b92',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#5e8b92',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  wantToGoButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  wantToGoText: {
    color: '#fff',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureColumn: {
    flex: 1,
    paddingRight: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  sectionButtons: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeSectionButton: {
    borderBottomColor: '#5e8b92',
  },
  sectionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeSectionButtonText: {
    color: '#5e8b92',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay_700Bold',  
    color: '#333',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
  },
  detailsGrid: {
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#5e8b92',
  },
  detailIconContainer: {
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  itineraryItemContainer: {
    marginBottom: 20,
  },
  itineraryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itineraryNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5e8b92',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itineraryNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itineraryItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  itinerarySubItem: {
    fontSize: 14,
    color: '#666',
    marginLeft: 44,
    lineHeight: 22,
  },
  reviewsSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
  },
  reviewsHeader: {
    marginBottom: 25,
  },
  reviewsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  overallRating: {
    alignItems: 'center',
  },
  overallRatingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5e8b92',
    marginBottom: 5,
  },
  overallStars: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#5e8b92',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewAuthorInfo: {
    flex: 1,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  reviewLocation: {
    fontSize: 13,
    color: '#666',
  },
  reviewMeta: {
    alignItems: 'flex-end',
  },
  reviewRating: {
    fontSize: 12,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});