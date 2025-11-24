import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import Footer from "../components/Footer";
import "../styles/cuida.css";
import { register } from "../api"; // 🔹 usar api.js

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !correo || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const nuevoUsuario = await register(nombre, correo, password);

      localStorage.setItem("usuarioCuidaPet", JSON.stringify({
        id: nuevoUsuario.id,
        name: nuevoUsuario.name,
        email: nuevoUsuario.email
      }));

      alert(`¡Registro exitoso! Hola, ${nuevoUsuario.name}.`);
      navigate("/home");

    } catch (error) {
      console.error("Error al registrar:", error);
      alert(error.message || "Hubo un problema al registrar el usuario. Intenta nuevamente.");
    }
  };

  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <div className="card-cuida text-center">
          <h2 className="text-cuida mb-4">Registro 🐶</h2>
          <img
            src="/assets/mascota-banner.png"
            alt="Mascota feliz"
            className="img-fluid mb-4"
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-cuida mb-3 w-100">
              Registrar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Registro;


