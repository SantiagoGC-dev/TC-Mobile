import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    console.log("Datos a enviar:", form);
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.0.169:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo registrar');
      }

      Alert.alert('Éxito', 'Registro exitoso', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Hello user,{"\n"}do have a great journey.</Text>

      <TextInput 
        placeholder="Name" 
        value={form.name} 
        onChangeText={(text) => handleChange('name', text)} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Email" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email} 
        onChangeText={(text) => handleChange('email', text)} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry 
        value={form.password} 
        onChangeText={(text) => handleChange('password', text)} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Confirm Password" 
        secureTextEntry 
        value={form.confirmPassword} 
        onChangeText={(text) => handleChange('confirmPassword', text)} 
        style={styles.input} 
      />

      <TouchableOpacity 
        style={styles.registerBtn} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.registerText}>
          {isLoading ? 'Creating account...' : 'Sign up'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5e8b92',
    marginBottom: 5,
    fontFamily: 'PlayfairDisplay_700Bold'
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
  registerBtn: {
    backgroundColor: '#5e8b92',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay_700Bold'
  }
});