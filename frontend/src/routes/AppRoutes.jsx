import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage";
import AccountSelector from "../features/accounts/AccountSelector";
// Agrega aquí más rutas cuando las crees

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accounts" element={<AccountSelector />} />
        {/* Más rutas a futuro */}
      </Routes>
    </BrowserRouter>
  );
}