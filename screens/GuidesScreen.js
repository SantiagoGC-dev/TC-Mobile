import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Switch,
  Button,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

// Guías actualizados con idiomas, petFriendly y descripción
const guides = [
  {
    id: "1",
    name: "David Dominguez",
    city: "Cozumel",
    price: "$100/day",
    rating: 4.8,
    reviews: 10,
    image: require("../assets/user.webp"),
    languages: ["es"],
    petFriendly: true,
    includesTransport: true,
    certified: true,
    description: "Soy un guía local apasionado por mi isla con más de 10 años de experiencia. Puedo ofrecerte una experiencia única y personalizada.",
  },
  {
    id: "2",
    name: "Adriel Solano",
    city: "Merida",
    price: "$80/day",
    rating: 4.5,
    reviews: 8,
    image: require("../assets/user.webp"),
    languages: ["es"],
    petFriendly: true,
    includesTransport: false,
    certified: true,
    description: "Soy un guía local apasionado por la cultura y la gastronomía de Yucatán, puedo ofrecerte una experiencia única. Me encanta compartir la historia y tradiciones de mi ciudad y la comida jajaj.",
  },
  {
    id: "3",
    name: "Jesus Gallegos",
    city: "Tulum",
    price: "$120/day",
    rating: 4.9,
    reviews: 15,
    image: require("../assets/user.webp"),
    languages: ["en"],
    petFriendly: true,
    includesTransport: true,
    certified: true,
    description: "Soy un guía local con pasión por la naturaleza y la historia, especializado en Tulum y puedo ofrecerte una experiencia única.",
  },
  {
    id: "4",
    name: "Alexis Bustos",
    city: "Playa del Carmen",
    price: "$110/day",
    rating: 4.7,
    reviews: 12,
    image: require("../assets/user.webp"),
    languages: ["es", "en"],
    petFriendly: true,
    includesTransport: false,
    certified: true,
    description: "Me considero un guía local con pasión por la historia y la cultura de Playa del Carmen, puedo ofrecerte una experiencia única.",
  },
  {
    id: "5",
    name: "Santiago Calderon",
    city: "Cancun",
    price: "$90/day",
    rating: 5.0,
    reviews: 9,
    image: require("../assets/user.webp"),
    languages: ["en"],
    petFriendly: true,
    includesTransport: true,
    certified: true,
    description: "Tratare de compartirte mi pasión por la historia y la cultura de Cancun, puedo ofrecerte una experiencia única.",
  },
  {
    id: "6",
    name: "Vanessa Salinas",
    city: "Cancun",
    price: "$95/day",
    rating: 4.6,
    reviews: 11,
    image: require("../assets/user.webp"),
    languages: ["es", "en"],
    petFriendly: false,
    includesTransport: true,
    certified: true,
    description: "Soy una guía muy guapa y apasionada por la historia y la cultura de Cancun, puedo ofrecerte una experiencia única.",
  },
];

const destinations = [
  "Playa del Carmen",
  "Merida",
  "Cancun",
  "Cozumel",
  "Tulum",
];

export default function GuidesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [selected, setSelected] = useState("Merida");
  const [filters, setFilters] = useState({
    language: null,
    petFriendly: false,
    minRating: 0,
  });
  const [filteredGuides, setFilteredGuides] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const cityFiltered = guides.filter(
      (g) =>
        g.city.toLowerCase().includes(selected.toLowerCase()) &&
        (!filters.language || g.languages?.includes(filters.language)) &&
        (!filters.petFriendly || g.petFriendly === true) &&
        g.rating >= filters.minRating
    );
    setFilteredGuides(cityFiltered);
  }, [selected, filters]);

  const isActive = (routeName) => route.name === routeName;

  const renderGuide = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("GuideDetail", { guide: item })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.cardRow}>
          <Ionicons name="location-sharp" size={14} color="black" />
          <Text style={styles.cardCity}>{item.city}</Text>
        </View>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <View style={styles.cardRating}>
          <Text style={styles.stars}>⭐️⭐️⭐️⭐️⭐️</Text>
          <Text style={styles.cardReview}>
            {" "}
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filteredGuides}
        renderItem={renderGuide}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Guides</Text>
            <Text style={styles.subtitle}>
              Find certified guides to the place{"\n"}where you want to go
            </Text>

            <View style={styles.filterRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.chipsContainer}
              >
                {destinations.map((dest) => (
                  <TouchableOpacity
                    key={dest}
                    onPress={() => setSelected(dest)}
                    style={[
                      styles.chip,
                      selected === dest && styles.chipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected === dest && styles.chipTextSelected,
                      ]}
                    >
                      {dest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => {
                  setTempFilters(filters);
                  setModalVisible(true);
                }}
              >
                <Ionicons name="options-outline" size={24} color="#356672" />
              </TouchableOpacity>
            </View>
          </>
        }
      />

      {/* Modal de filtros */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar guías</Text>

            <Text style={styles.modalLabel}>Idioma:</Text>
            <Picker
              selectedValue={tempFilters.language}
              onValueChange={(value) =>
                setTempFilters((prev) => ({ ...prev, language: value }))
              }
              style={styles.picker}
            >
              <Picker.Item label="Todos" value={null} />
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="Inglés" value="en" />
            </Picker>

            <View style={styles.switchRow}>
              <Text style={styles.modalLabel}>Acepta mascotas:</Text>
              <Switch
                value={tempFilters.petFriendly}
                onValueChange={(val) =>
                  setTempFilters((prev) => ({ ...prev, petFriendly: val }))
                }
              />
            </View>

            <Text style={styles.modalLabel}>Ranking mínimo:</Text>
            <View style={styles.rankingRow}>
              {[0, 3, 4, 4.5, 5].map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() =>
                    setTempFilters((prev) => ({ ...prev, minRating: r }))
                  }
                  style={[
                    styles.ratingOption,
                    tempFilters.minRating === r && styles.ratingSelected,
                  ]}
                >
                  <Text style={styles.ratingText}>{r} ⭐</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.applyButton]}
                onPress={() => {
                  setFilters(tempFilters);
                  setModalVisible(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Aplicar filtros</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={[styles.actionButtonText, { color: "#5e8b92" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.navButton}
        >
          <Ionicons
            name="home"
            size={30}
            color={isActive("Home") ? "#5e8b92" : "#666"}
          />
          {isActive("Home") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Tours")}
          style={styles.navButton}
        >
          <FontAwesome5
            name="route"
            size={30}
            color={isActive("Tours") ? "#5e8b92" : "#666"}
          />
          {isActive("Tours") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Guides")}
          style={styles.navButton}
        >
          <MaterialIcons
            name="people-alt"
            size={30}
            color={isActive("Guides") ? "#5e8b92" : "#666"}
          />
          {isActive("Guides") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Usuario")}
          style={styles.navButton}
        >
          <FontAwesome5
            name="user-circle"
            size={30}
            color={isActive("Usuario") ? "#5e8b92" : "#666"}
          />
          {isActive("Usuario") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 32,
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#5e8b92",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
    fontFamily: "PlayfairDisplay_700Bold",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 25,
  },
  chipsContainer: {
    flex: 1,
    marginRight: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: "#5e8b92",
  },
  chipText: {
    color: "#333",
    fontFamily: "Inter",
  },
  chipTextSelected: {
    color: "#fff",
    fontFamily: "Inter",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#5e8b92",
    borderRadius: 20,
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 36,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#333",
    marginBottom: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCity: {
    fontSize: 13,
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1ba098",
    marginTop: 4,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  stars: {
    fontSize: 12,
    color: "#ffc107",
  },
  cardReview: {
    fontSize: 12,
    color: "#333",
  },
  bottomNav: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navButton: {
    alignItems: "center",
    padding: 5,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#5e8b92",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Contenedor del modal blanco con borde redondeado y padding
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "85%",
    borderRadius: 12,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Elevación para Android
    elevation: 10,
  },
  // Título del modal con color principal y tamaño mediano-grande
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#356672",
    fontFamily: "PlayfairDisplay_700Bold",
    textAlign: "center",
  },
  // Etiquetas para secciones dentro del modal
  modalLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    color: "#000000ff",
  },
  // Estilo para el Picker (selector de idioma)
  picker: {
    width: "100%",
    backgroundColor: "#222222ff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#333",
  },
  // Fila para el switch con texto a la izquierda y switch a la derecha
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  // Fila para las opciones de ranking con flex wrap para que se ajusten
  rankingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  // Cada opción de rating tiene un fondo claro, padding y borde redondeado
  ratingOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 16,
    marginRight: 10,
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  // Cuando está seleccionado cambia a color principal y texto blanco
  ratingSelected: {
    backgroundColor: "#5e8b92",
  },
  // Texto dentro de cada opción de rating
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  ratingTextSelected: {
    color: "#fff",
  },
  // Contenedor para botones aplicar/cancelar con separación vertical
  clearButton: {
    backgroundColor: "#e0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  clearOption: {
    color: "#5e8b92",
    fontWeight: "600",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  applyButton: {
    backgroundColor: "#5e8b92",
  },

  cancelButton: {
    backgroundColor: "#d2e8e7",
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
