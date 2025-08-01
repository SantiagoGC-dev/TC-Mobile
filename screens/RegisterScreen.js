import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.169:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Registro exitoso');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'No se pudo registrar');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error de conexión con el servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Hello user,{"\n"}do have a great journey.</Text>

      <TextInput placeholder="Name" value={form.name} onChangeText={(text) => handleChange('name', text)} style={styles.input} />
      <TextInput placeholder="Email" keyboardType="email-address" value={form.email} onChangeText={(text) => handleChange('email', text)} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={form.password} onChangeText={(text) => handleChange('password', text)} style={styles.input} />
      <TextInput placeholder="Confirm Password" secureTextEntry value={form.confirmPassword} onChangeText={(text) => handleChange('confirmPassword', text)} style={styles.input} />

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Sign up</Text>
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
