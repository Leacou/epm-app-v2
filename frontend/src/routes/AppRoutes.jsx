import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage";
import AccountSelector from "../features/accounts/AccountSelector";
import NotFound from "../components/NotFound";
import UserHome from "../features/user_home/UserHome";

// Agrega aquí más rutas cuando las crees

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accounts" element={<AccountSelector />} />
        <Route path="/user-home" element={<UserHome />} /> {/* NUEVA RUTA */}
        {/* Más rutas a futuro */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}