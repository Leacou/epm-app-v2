const express = require('express');

// Exporta una función que recibe la colección de usuarios
module.exports = function(usersCollection) {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const {
      fb_id, fb_email, fb_name, fb_picture,
      accessToken,
      ig_accounts
    } = req.body;

    console.log('---- POST /login ----');
    console.log('Datos recibidos:', req.body);

    if (!fb_id) {
      console.log('Falta fb_id, envío 400');
      return res.status(400).json({ ok: false, error: 'fb_id requerido' });
    }

    try {
      let user = await usersCollection.findOne({ fb_id });
      console.log('Usuario encontrado:', user);

      if (user) {
        // Actualiza usuario
        const updateResult = await usersCollection.updateOne(
          { fb_id },
          { $set: {
              fb_email, fb_name, fb_picture,
              accessToken,
              ig_accounts: Array.isArray(ig_accounts) ? ig_accounts : [],
              updatedAt: new Date().toISOString()
            }
          }
        );
        console.log('Resultado updateOne:', updateResult);
        user = await usersCollection.findOne({ fb_id });
        console.log('Usuario después de update:', user);
      } else {
        // Crea nuevo usuario
        user = {
          fb_id, fb_email, fb_name, fb_picture,
          accessToken,
          ig_accounts: Array.isArray(ig_accounts) ? ig_accounts : [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const insertResult = await usersCollection.insertOne(user);
        console.log('Resultado insertOne:', insertResult);
        console.log('Usuario insertado:', user);
      }

      // Conteo final para ver si realmente hay documentos
      const total = await usersCollection.countDocuments();
      console.log('Total de usuarios en la colección:', total);

      res.json({ ok: true, user });
    } catch (err) {
      console.error('Error en /login:', err);
      res.status(500).json({ ok: false, error: 'Error accediendo a MongoDB', details: err.message });
    }
  });

  // Endpoint opcional para debug (elíminalo en producción)
  router.get('/all', async (req, res) => {
    try {
      const users = await usersCollection.find().toArray();
      console.log('GET /all - cantidad de usuarios:', users.length);
      res.json(users);
    } catch (err) {
      console.error('Error en /all:', err);
      res.status(500).json({ ok: false, error: 'Error accediendo a la base', details: err.message });
    }
  });

  return router;
}