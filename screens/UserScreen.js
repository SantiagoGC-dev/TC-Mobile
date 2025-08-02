import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function UserScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  const handleLogout = () => {
    // Aquí puedes limpiar el token o datos de sesión
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => {
          // Ejemplo: navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          navigation.navigate('Index', {
            screen: 'Index',
          });
        },
      },
    ]);
  };

  const handleViewReservations = () => {
    // Navegar a la pantalla de reservas (puedes crear esta pantalla si no existe aún)
    navigation.navigate('Reservas');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>My account</Text>

        <TouchableOpacity style={styles.optionButton} onPress={handleViewReservations}>
          <Ionicons name="book-outline" size={24} color="#5e8b92" style={styles.optionIcon} />
          <Text style={styles.optionText}>View my reservations (no sirve)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#d9534f" style={styles.optionIcon} />
          <Text style={[styles.optionText, { color: '#d9534f' }]}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
          <Ionicons
            name="home"
            size={30}
            color={isActive('Home') ? '#5e8b92' : '#666'}
          />
          {isActive('Home') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Tours')} style={styles.navButton}>
          <FontAwesome5
            name="route"
            size={30}
            color={isActive('Tours') ? '#5e8b92' : '#666'}
          />
          {isActive('Tours') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Guides')} style={styles.navButton}>
          <MaterialIcons
            name="people-alt"
            size={30}
            color={isActive('Guides') ? '#5e8b92' : '#666'}
          />
          {isActive('Guides') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Usuario')} style={styles.navButton}>
          <FontAwesome5
            name="user-circle"
            size={30}
            color={isActive('Usuario') ? '#5e8b92' : '#666'}
          />
          {isActive('Usuario') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#5e8b92',
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 15,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter',
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
