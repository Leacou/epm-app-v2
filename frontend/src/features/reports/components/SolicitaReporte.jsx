import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Alert, CircularProgress } from "@mui/material";

const REQUEST_TYPES = [
  { value: "reporte_nuevo", label: "Solicitar reporte nuevo" },
  { value: "modificacion", label: "Pedir modificación de reporte" },
  { value: "otro", label: "Otro" },
];

// URL del webhook de Google Apps Script
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyUIy1y6Kwane6V9D9Yl-kL33995le9glm97njpgTRCKMILIwRNS5Fxi7K569fS_Lo/exec";

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
      console.log("Enviando datos:", form);
      
      // Agregamos timestamp para evitar cache
      const dataToSend = {
        ...form,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(dataToSend),
        mode: "cors", // Explícitamente especificamos CORS
        cache: "no-cache" // Evitamos problemas de cache
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Intentamos parsear la respuesta como JSON
      let result;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        // Si no es JSON, obtenemos el texto
        const text = await response.text();
        console.log("Response text:", text);
        
        // Intentamos parsear el texto como JSON por si acaso
        try {
          result = JSON.parse(text);
        } catch {
          result = { status: "ok", message: "Respuesta recibida pero no es JSON válido" };
        }
      }

      console.log("Respuesta del webhook:", result);

      // Verificamos el estado de la respuesta
      if (result && (result.status === "ok" || result.status === "success")) {
        setSuccess(true);
        setForm({ nombre: "", email: "", tipo: "reporte_nuevo", mensaje: "" });
      } else {
        setError(result?.message || "Error desconocido al procesar la solicitud.");
      }

    } catch (err) {
      console.error("Error completo:", err);
      
      // Diferentes tipos de errores
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Error de conexión. Verifica tu conexión a internet y vuelve a intentar.");
      } else if (err.message.includes('CORS')) {
        setError("Error de configuración del servidor. Por favor contacta al administrador.");
      } else if (err.message.includes('NetworkError')) {
        setError("Error de red. Verifica tu conexión e intenta nuevamente.");
      } else {
        setError(`Error al enviar la solicitud: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
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
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
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
      
      {loading && (
        <Box display="flex" justifyContent="center" mb={2}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? "Enviando..." : "Enviar solicitud"}
      </Button>
    </Box>
  );
}