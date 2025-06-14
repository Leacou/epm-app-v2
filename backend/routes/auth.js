const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// 💡 Usa tu string de conexión aquí
const uri = "mongodb+srv://epm-app-mongo:dnrvUY6MQj4CACpA@epm-app-mongo.xgka1gn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let usersCollection;

// Solo conectamos una vez al iniciar
client.connect()
  .then(() => {
    const db = client.db('epm-app-mongo'); // Usa el nombre de tu base de datos
    usersCollection = db.collection('users');
    console.log('🟢 Conectado a MongoDB Atlas');
  })
  .catch(err => {
    console.error('🔴 Error conectando a MongoDB Atlas', err);
  });

router.post('/login', async (req, res) => {
  const {
    fb_id, fb_email, fb_name, fb_picture,
    accessToken,
    ig_accounts
  } = req.body;

  if (!fb_id) return res.status(400).json({ ok: false, error: 'fb_id requerido' });

  try {
    // Buscar usuario existente
    let user = await usersCollection.findOne({ fb_id });

    if (user) {
      // Actualiza usuario
      await usersCollection.updateOne(
        { fb_id },
        { $set: {
            fb_email, fb_name, fb_picture,
            accessToken,
            ig_accounts: Array.isArray(ig_accounts) ? ig_accounts : [],
            updatedAt: new Date().toISOString()
          }
        }
      );
      user = await usersCollection.findOne({ fb_id });
    } else {
      // Crea nuevo usuario
      user = {
        fb_id, fb_email, fb_name, fb_picture,
        accessToken,
        ig_accounts: Array.isArray(ig_accounts) ? ig_accounts : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await usersCollection.insertOne(user);
    }

    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error accediendo a MongoDB', details: err.message });
  }
});

router.get('/all', async (req, res) => {
    try {
      const users = await usersCollection.find().toArray();
      res.json(users);
    } catch (err) {
      res.status(500).json({ ok: false, error: 'Error accediendo a la base', details: err.message });
    }
  });

module.exports = router;