// src/pages/Recommendations.jsx
import React from "react";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import RecomendacionesAccordion from "../components/RecomendacionesAccordion";
import "../styles/cuida.css";
import Footer from "../components/Footer";


const Recommendations = () => {
  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <h2 className="text-center text-cuida mb-4">
          <i className="bi bi-lightbulb"></i> Recomendaciones por tipo de mascota
        </h2>
        <RecomendacionesAccordion />
      </main>
      <Footer />
    </>
  );
};

export default Recommendations;
