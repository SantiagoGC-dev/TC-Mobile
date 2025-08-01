import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function IndexScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 250, height: 250, marginBottom: 100 },
  loginBtn: { backgroundColor: '#538392', padding: 15, borderRadius: 10, width: '70%', marginBottom: 10 },
  signUpBtn: { backgroundColor: '#E2F0ED', padding: 15, borderRadius: 10, width: '70%' },
  loginText: { textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'PlayfairDisplay_700Bold' },
  signUpText: { textAlign: 'center', color: '#000000ff', fontWeight: 'bold', fontFamily: 'PlayfairDisplay_700Bold' },
});
