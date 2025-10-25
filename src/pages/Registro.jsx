import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import Footer from "../components/Footer";
import "../styles/cuida.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !correo || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    const usuariosJSON = localStorage.getItem("todosLosUsuarios");
    let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

    if (usuarios.find((u) => u.correo === correo)) {
      alert("El correo ya está registrado. Por favor, inicia sesión.");
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      correo,
      password,
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("todosLosUsuarios", JSON.stringify(usuarios));

    localStorage.setItem(
      "usuarioCuidaPet",
      JSON.stringify({
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
      })
    );

    alert(`¡Registro exitoso! Hola, ${nombre}.`);
    navigate("/home");
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
          <form onSubmit={handleSubmit} role="form" data-testid="form-registro">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-cuida mb-3 w-100"
              data-testid="boton-registro"
            >
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