import React from 'react';
import { useFonts, PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import IndexScreen from './screens/IndexScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import GuidesScreen from './screens/GuidesScreen';
import ToursScreen from './screens/ToursScreen';
import UserScreen from './screens/UserScreen';
import TourDetailScreen from './screens/TourDetailScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import GuideDetailScreen from './screens/GuideDetailScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          animation: 'none',         // 👈 elimina animación
          //gestureEnabled: false      // 👈 desactiva swipe-back
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tours" component={ToursScreen} />
        <Stack.Screen name="Guides" component={GuidesScreen} />
        <Stack.Screen name="Usuario" component={UserScreen} />
        <Stack.Screen name="TourDetail" component={TourDetailScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} options={{ title: 'Detalle del guía' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
