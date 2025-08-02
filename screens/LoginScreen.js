import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleLogin = async () => {
    if (!credentials.user.trim() || !credentials.password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa usuario y contraseña');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://192.168.0.169:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUsername: credentials.user,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales inválidas');
      }

      Alert.alert('Login exitoso', `Bienvenido, ${data.user.name || data.user.email}`);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'No se pudo iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Welcome Back ,{"\n"}Please enter your details.</Text>

      <TextInput
        placeholder="Email, phone & username"
        value={credentials.user}
        onChangeText={(text) => handleChange('user', text)}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(text) => handleChange('password', text)}
        style={styles.input}
      />

      <TouchableOpacity 
        style={styles.loginBtn} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginText}>
          {isLoading ? 'Processing...' : 'Sign in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5e8b92',
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'PlayfairDisplay_700Bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  loginBtn: {
    backgroundColor: '#5e8b92',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  loginText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#fff',
  }
});