import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Alert, CircularProgress } from "@mui/material";

const REQUEST_TYPES = [
  { value: "reporte_nuevo", label: "Solicitar reporte nuevo" },
  { value: "modificacion", label: "Pedir modificación de reporte" },
  { value: "otro", label: "Otro" },
];

// Pega aquí tu URL del webhook de Google Apps Script
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzwUAO-lEe8cL-Mb0oW6kXNS2MAiopmZEfmcBPXHPP9mNVaDNPgfC4ZP65FCQgSbJo/exec";

export default function SolicitaReporte() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tipo: "reporte_nuevo",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(WEBHOOK_URL, {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
      });
      const result = await res.json().catch(() => null);
      console.log("Respuesta del webhook:", result);
  
      if (res.ok && result && result.status === "ok") {
        setSuccess(true);
        setForm({ nombre: "", email: "", tipo: "reporte_nuevo", mensaje: "" });
      } else {
        setError(result?.message || "No se pudo enviar la solicitud. Intenta de nuevo.");
      }
    } catch (err) {
      setError("Error de red al enviar la solicitud.");
      console.error("Error en fetch:", err);
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 420,
        mx: "auto",
        bgcolor: "#fff",
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
        mt: 4,
      }}
    >
      <Typography variant="h5" mb={2} fontWeight={700}>
        Solicita un reporte o modificación
      </Typography>
      <TextField
        label="Tu nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email de contacto"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        required
        type="email"
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Tipo de solicitud"
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        {REQUEST_TYPES.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Describí tu solicitud"
        name="mensaje"
        value={form.mensaje}
        onChange={handleChange}
        fullWidth
        required
        multiline
        minRows={3}
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}
      {success && <Alert severity="success" sx={{ mb: 2 }}>¡Solicitud enviada con éxito!</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        Enviar solicitud
      </Button>
    </Box>
  );
}