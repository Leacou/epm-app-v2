const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../users.json');

router.post('/login', async (req, res) => {
  const {
    fb_id, fb_email, fb_name, fb_picture,
    ig_id, ig_username, ig_name, ig_picture,
    accessToken
  } = req.body;

  // Leer usuarios actuales
  let users = [];
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    // Si el archivo no existe o está vacío, empezamos con []
    users = [];
  }

  // Buscar usuario por fb_id
  let user = users.find(u => u.fb_id === fb_id);

  if (user) {
    // Actualizar datos
    Object.assign(user, {
      fb_email, fb_name, fb_picture,
      ig_id, ig_username, ig_name, ig_picture,
      accessToken,
      updatedAt: new Date().toISOString()
    });
  } else {
    // Crear nuevo usuario
    user = {
      fb_id, fb_email, fb_name, fb_picture,
      ig_id, ig_username, ig_name, ig_picture,
      accessToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(user);
  }

  // Guardar usuarios actualizados
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error escribiendo users.json' });
  }
});

module.exports = router;