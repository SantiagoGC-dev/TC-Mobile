import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function GuideDetailScreen({ route }) {
  const { guide } = route.params;
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Datos de reseñas del guía
  const guideReviews = useMemo(
    () => [
      {
        id: "1",
        userName: "María González",
        userLocation: "Ciudad de México, México",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "¡Excelente guía! Carlos conoce cada rincón de la ciudad y tiene historias fascinantes para contar. Muy profesional y puntual.",
        tourType: "City Tour",
        verified: true,
      },
      {
        id: "2",
        userName: "John Smith",
        userLocation: "New York, USA",
        rating: 5,
        date: "Hace 2 semanas",
        comment:
          "Amazing experience! Carlos made our trip unforgettable. His English is perfect and he's very knowledgeable about local culture.",
        tourType: "Cultural Tour",
        verified: true,
      },
      {
        id: "3",
        userName: "Ana Rodríguez",
        userLocation: "Barcelona, España",
        rating: 4,
        date: "Hace 3 semanas",
        comment:
          "Muy buen guía, aunque llegó 10 minutos tarde. El tour fue interesante y aprendimos mucho sobre la historia local.",
        tourType: "Historical Tour",
        verified: false,
      },
      {
        id: "4",
        userName: "Pierre Dubois",
        userLocation: "Paris, France",
        rating: 5,
        date: "Hace 1 mes",
        comment:
          "Guide fantastique! Carlos speaks multiple languages and really cares about showing the best of his city. Highly recommended!",
        tourType: "Food Tour",
        verified: true,
      },
      {
        id: "5",
        userName: "Sofia Martinez",
        userLocation: "Buenos Aires, Argentina",
        rating: 4,
        date: "Hace 1 mes",
        comment:
          "Buen servicio en general. Carlos es muy amable y conoce bien los lugares. Solo sugeriría que tenga más opciones vegetarianas en el food tour.",
        tourType: "Food Tour",
        verified: true,
      },
    ],
    []
  );

  // Calcular estadísticas de reseñas
  const reviewStats = useMemo(() => {
    const totalReviews = guideReviews.length;
    const totalRating = guideReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = (totalRating / totalReviews).toFixed(1);

    const ratingDistribution = {
      5: guideReviews.filter((r) => r.rating === 5).length,
      4: guideReviews.filter((r) => r.rating === 4).length,
      3: guideReviews.filter((r) => r.rating === 3).length,
      2: guideReviews.filter((r) => r.rating === 2).length,
      1: guideReviews.filter((r) => r.rating === 1).length,
    };

    return {
      totalReviews,
      averageRating,
      ratingDistribution,
    };
  }, [guideReviews]);

  // Validar que el guide existe
  if (!guide) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Guía no encontrado</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const markedDates = useMemo(() => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: "#5e8b92", // cambiado de #1ba098
        selectedTextColor: "#ffffff",
      },
    };
  }, [selectedDate]);

  const calendarTheme = useMemo(
    () => ({
      selectedDayBackgroundColor: "#5e8b92", // cambiado de #1ba098
      todayTextColor: "#5e8b92", // cambiado de #1ba098
      arrowColor: "#5e8b92", // cambiado de #1ba098
      dayTextColor: "#333",
      textDisabledColor: "#ccc",
      monthTextColor: "#333",
      textDayFontWeight: "500",
      textMonthFontWeight: "bold",
      textDayHeaderFontWeight: "600",
    }),
    []
  );

  const handleSelectGuide = useCallback(async () => {
    if (!selectedDate) {
      Alert.alert(
        "Selecciona una fecha",
        "Debes seleccionar una fecha para contratar al guía.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (selectedDate < today) {
      Alert.alert(
        "Fecha inválida",
        "No puedes seleccionar una fecha anterior a hoy.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        "¡Guía seleccionado!",
        `Has seleccionado a ${guide.name} para el ${formatDate(
          selectedDate
        )}. Te contactaremos pronto para confirmar los detalles.`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
            style: "default",
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, guide.name, navigation, today]);

  const handleDayPress = useCallback(
    (day) => {
      if (day.dateString >= today) {
        setSelectedDate(day.dateString);
      }
    },
    [today]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleReviews = useCallback(() => {
    setShowReviews((prev) => !prev);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={14}
        color={index < rating ? "#f5a623" : "#ddd"}
      />
    ));
  };

  const renderRatingBar = (stars, count, total) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
      <View style={styles.ratingBarContainer}>
        <Text style={styles.ratingBarLabel}>{stars}★</Text>
        <View style={styles.ratingBarTrack}>
          <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingBarCount}>({count})</Text>
      </View>
    );
  };

  const renderTag = (condition, iconName, iconLibrary, text) => {
    if (!condition) return null;

    const IconComponent =
      iconLibrary === "FontAwesome5" ? FontAwesome5 : Ionicons;

    return (
      <View key={text} style={styles.tag}>
        <IconComponent
          name={iconName}
          size={14}
          color="#333"
          style={styles.tagIcon}
        />
        <Text style={styles.tagText}>{text}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagen del guía */}
      <View style={styles.imageContainer}>
        <Image source={guide.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Información básica */}
      <View style={styles.header}>
        <Text style={styles.name}>{guide.name}</Text>
        <Text style={styles.city}>{guide.city}</Text>
      </View>

      <Text style={styles.price}>{guide.price}</Text>

      {/* Rating y reseñas mejorado */}
      <View style={styles.ratingContainer}>
        <View style={styles.ratingLeft}>
          <View style={styles.starsContainer}>
            {renderStars(Math.round(parseFloat(reviewStats.averageRating)))}
          </View>
          <Text style={styles.rating}>
            {reviewStats.averageRating} ({reviewStats.totalReviews} reseñas)
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleReviews}
          style={styles.reviewsButton}
          activeOpacity={0.7}
        >
          <Text style={styles.viewReviews}>
            {showReviews ? "Ocultar reseñas" : "Ver reseñas"}
          </Text>
          <Ionicons
            name={showReviews ? "chevron-up" : "chevron-down"}
            size={16}
            color="#1ba098"
          />
        </TouchableOpacity>
      </View>

      {/* Sección de reseñas expandible */}
      {showReviews && (
        <View style={styles.reviewsSection}>
          {/* Estadísticas de reseñas */}
          <View style={styles.reviewsStats}>
            <View style={styles.overallRating}>
              <Text style={styles.overallRatingNumber}>
                {reviewStats.averageRating}
              </Text>
              <View style={styles.overallStars}>
                {renderStars(Math.round(parseFloat(reviewStats.averageRating)))}
              </View>
              <Text style={styles.totalReviewsText}>
                Basado en {reviewStats.totalReviews} reseñas
              </Text>
            </View>

            <View style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map((star) => (
                <View key={star}>
                  {renderRatingBar(
                    star,
                    reviewStats.ratingDistribution[star],
                    reviewStats.totalReviews
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Lista de reseñas */}
          <View style={styles.reviewsList}>
            <Text style={styles.reviewsListTitle}>Reseñas de clientes</Text>

            {guideReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUserInfo}>
                    <View style={styles.reviewUserHeader}>
                      <Text style={styles.reviewUserName}>
                        {review.userName}
                      </Text>
                      {review.verified && (
                        <View style={styles.verifiedBadge}>
                          <Ionicons
                            name="checkmark-circle"
                            size={14}
                            color="#4CAF50"
                          />
                          <Text style={styles.verifiedText}>Verificado</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.reviewUserLocation}>
                      {review.userLocation}
                    </Text>
                    <Text style={styles.reviewTourType}>
                      Tour: {review.tourType}
                    </Text>
                  </View>

                  <View style={styles.reviewMeta}>
                    <View style={styles.reviewStars}>
                      {renderStars(review.rating)}
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>

                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Descripción */}
      <Text style={styles.description}>{guide.description}</Text>

      {/* Tags/Características */}
      <View style={styles.tagsContainer}>
        {renderTag(guide.petFriendly, "dog", "FontAwesome5", "Pet Friendly")}
        {renderTag(
          guide.includesTransport,
          "bus",
          "Ionicons",
          "Incluye transporte"
        )}
        {renderTag(
          guide.certified,
          "certificate",
          "FontAwesome5",
          "Certificado"
        )}
      </View>

      {/* Selector de fecha */}
      <View style={styles.calendarSection}>
        <Text style={styles.selectDateTitle}>Selecciona una fecha:</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={calendarTheme}
            minDate={today}
            firstDay={1}
            monthFormat={"MMMM yyyy"}
            hideExtraDays={true}
            disableMonthChange={false}
            enableSwipeMonths={true}
          />
        </View>
      </View>

      {/* Botón de selección */}
      <TouchableOpacity
        style={[
          styles.selectButton,
          (!selectedDate || isLoading) && styles.selectButtonDisabled,
        ]}
        onPress={handleSelectGuide}
        disabled={!selectedDate || isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.selectButtonText}>
            {selectedDate ? "Seleccionar Guía" : "Selecciona una fecha"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#5e8b92", // cambiado de #1ba098
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 220,
  },
  header: {
    marginBottom: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#333",
    marginBottom: 4,
  },
  city: {
    fontSize: 16,
    color: "#777",
    fontWeight: "500",
  },
  price: {
    fontSize: 20,
    color: "#5e8b92", // cambiado de #1ba098
    marginBottom: 12,
    fontWeight: "700",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ratingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  rating: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  reviewsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  viewReviews: {
    color: "#5e8b92", // cambiado de #1ba098
    fontSize: 14,
    fontWeight: "600",
  },
  reviewsSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  reviewsStats: {
    marginBottom: 20,
  },
  overallRating: {
    alignItems: "center",
    marginBottom: 16,
  },
  overallRatingNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#5e8b92", // cambiado de #1ba098
    marginBottom: 8,
  },
  overallStars: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 8,
  },
  totalReviewsText: {
    fontSize: 14,
    color: "#666",
  },
  ratingBars: {
    gap: 8,
  },
  ratingBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBarLabel: {
    fontSize: 12,
    color: "#666",
    minWidth: 24,
  },
  ratingBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: "#5e8b92", // cambiado de #1ba098
  },
  ratingBarCount: {
    fontSize: 12,
    color: "#666",
    minWidth: 24,
    textAlign: "right",
  },
  reviewsList: {
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    paddingTop: 16,
  },
  reviewsListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#333",
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#333",
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  verifiedText: {
    fontSize: 10,
    color: "#4CAF50",
    fontWeight: "600",
  },
  reviewUserLocation: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  reviewTourType: {
    fontSize: 12,
    color: "#5e8b92", // cambiado de #1ba098
    fontWeight: "500",
  },
  reviewMeta: {
    alignItems: "flex-end",
  },
  reviewStars: {
    flexDirection: "row",
    gap: 1,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 11,
    color: "#999",
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: "PlayfairDisplay_400Regular",
    color: "#555",
    lineHeight: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: "PlayfairDisplay_400Regular",
    color: "#444",
    marginVertical: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f7f7",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#c0f0f0",
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  calendarSection: {
    marginBottom: 24,
  },
  selectDateTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
    marginBottom: 16,
    color: "#333",
  },
  calendarContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectButton: {
    marginTop: 20,
    backgroundColor: "#5e8b92", // cambiado de #1ba098
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  selectButtonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0.1,
    elevation: 2,
  },
  selectButtonText: {
    color: "#fff",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 16,
    fontWeight: "700",
  },
});
