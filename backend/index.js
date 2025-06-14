const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/hello', (req, res) => {
  res.json({ message: "¡Hola desde el backend!" });
});

// Rutas de auth
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Servidor backend escuchando en puerto', PORT);
});