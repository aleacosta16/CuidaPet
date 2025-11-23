
import React from "react";
import { useNavigate } from "react-router-dom";

const CierreSesion = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    const confirmacion = window.confirm("¿Seguro que quieres cerrar sesión?");
    if (confirmacion) {
      localStorage.removeItem("usuarioCuidaPet");
      navigate("/login");
    }
  };

  return (
    <button className="btn-circular-rojo" onClick={cerrarSesion}>
      <i className="bi bi-box-arrow-right"></i>
    </button>
  );
};

export default CierreSesion;
