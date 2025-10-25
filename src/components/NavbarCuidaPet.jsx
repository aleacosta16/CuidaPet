// src/components/NavbarCuidaPet.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavbarCuidaPet.css";

const NavbarCuidaPet = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (!confirmar) return;

    localStorage.removeItem("usuarioCuidaPet");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <span className="navbar-brand text-white">🐾 CuidaPet</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => navigate("/home")}>
                <i className="bi bi-house"></i> Inicio
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => navigate("/tu-mascota")}>
                <i className="bi bi-paw"></i> Mis Mascotas
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => navigate("/registrar-mascota")}>
                <i className="bi bi-plus-circle"></i> Registrar Mascota
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => navigate("/citas")}>
                <i className="bi bi-calendar-check"></i> Citas
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => navigate("/recomendaciones")}>
                <i className="bi bi-lightbulb"></i> Recomendaciones
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => navigate("/perfil")}>
                <i className="bi bi-person-circle"></i> Perfil
              </button>
            </li>
          </ul>
          <button className="btn-circular-rojo" onClick={cerrarSesion}>
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCuidaPet;
