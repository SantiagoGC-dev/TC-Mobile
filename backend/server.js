const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Base de datos simulada
const users = [];

// Registro
app.post('/api/users/register', (req, res) => {
  const { username, email, password } = req.body;
  const userExists = users.find(u => u.email === email || u.username === username);

  if (userExists) {
    return res.status(400).json({ error: 'Usuario ya registrado' });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'Usuario registrado', ...newUser });
});

// Login
app.post('/api/users/login', (req, res) => {
  const { emailOrUsername, password } = req.body;
  const user = users.find(u =>
    (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  res.json({ message: 'Login exitoso', username: user.username, email: user.email });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
