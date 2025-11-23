// src/components/Footer.jsx
import React from "react";
import "../styles/cuida.css";

const Footer = () => {
  return (
    <footer className="footer-cuida text-center mt-5">
      <div className="container py-4">
        <p className="mb-2">🐾 CuidaPet © 2025 - Todos los derechos reservados</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
          <a href="mailto:contacto@cuidapet.com">✉️</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
