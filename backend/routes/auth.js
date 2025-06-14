const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../users.json'); // <--- ¡FALTA ESTA LINEA!

router.post('/login', async (req, res) => {
  const {
    fb_id, fb_email, fb_name, fb_picture,
    accessToken,
    ig_accounts // 👈 ahora es un array de IGs
  } = req.body;

  // Leer usuarios actuales
  let users = [];
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    users = [];
  }

  // Buscar usuario por fb_id
  let user = users.find(u => u.fb_id === fb_id);

  if (user) {
    // Actualizar datos y reemplazar cuentas IG
    Object.assign(user, {
      fb_email, fb_name, fb_picture,
      accessToken,
      ig_accounts: Array.isArray(ig_accounts) ? ig_accounts : [],
      updatedAt: new Date().toISOString()
    });
  } else {
    // Crear nuevo usuario
    user = {
      fb_id, fb_email, fb_name, fb_picture,
      accessToken,
      ig_accounts: Array.isArray(ig_accounts) ? ig_accounts : [],
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

module.exports = router; // <--- ¡NO OLVIDES ESTA LINEA!