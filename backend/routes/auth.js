const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER - Funcional y simple
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Crear usuario (el pre-hook hasheará la password)
    const user = new User({ name, email, password });
    await user.save();
    
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN - Versión simplificada que FUNCIONA
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    // 2. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });
    
    // 3. Generar token
    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
    
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;