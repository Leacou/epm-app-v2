require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const allowedOrigins = [
  "https://epm-app-v2-frontend.onrender.com", // producción
  "http://localhost:5173" // desarrollo local
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Ruta de prueba
app.get('/api/hello', (req, res) => {
  res.json({ message: "¡Hola desde el backend!" });
});

const uri = process.env.MONGO_URI || "mongodb+srv://lcouretot:NB5U48yKfUUNKRRG@epm-app-mongo-2.wo1nssx.mongodb.net/?retryWrites=true&w=majority&appName=epm-app-mongo-2";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()
  .then(() => {
    const db = client.db('epm-app-mongo-2'); // Usa el nombre de TU base
    const usersCollection = db.collection('users');

    // Inyecta la colección en las rutas
    const authRouter = require('./routes/auth')(usersCollection);
    app.use('/api/auth', authRouter);

    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
      console.log('🟢 Conectado a MongoDB Atlas');
      console.log('Servidor backend escuchando en puerto', PORT);
    });
  })
  .catch(err => {
    console.error('🔴 Error conectando a MongoDB Atlas:', err);
    process.exit(1);
  });