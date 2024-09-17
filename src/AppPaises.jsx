// Libraries (Librerias)
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Views (Vistas)
import Layout from "./views/Layout";
import IndexPage from "./views/IndexPage";
import FavoritesPage from "./views/FavoritesPage";
import ActivitiesPage from "./views/ActivitiesPage";


function AppPaises() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            {/* 1.- Ruta principal */}
            <Route path="/" element={<IndexPage />} index />

            {/* 2.- Ruta favoritos */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* 3.- Ruta actividades */}
            <Route path="/activities" element={<ActivitiesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppPaises;
