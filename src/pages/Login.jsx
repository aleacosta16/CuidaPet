import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import Footer from "../components/Footer";
import "../styles/cuida.css";
import { validarCorreo, validarClave } from "../utils/validaciones";

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = [];

    // --- 1. Validaciones de formato ---
    const errCorreo = validarCorreo(correo);
    const errClave = validarClave(clave);

    if (errCorreo) errores.push(errCorreo);
    if (errClave) errores.push(errClave);

    if (errores.length > 0) {
      setError(errores.join(" "));
      return;
    }

    // --- 2. Lógica de Autenticación con backend ---
    try {
      const response = await fetch("http://44.197.213.147:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: correo,
          password: clave
        })
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const usuario = await response.json();

      // Guardar sesión localmente
      localStorage.setItem("usuarioCuidaPet", JSON.stringify({
        id: usuario.id,
        nombre: usuario.name,
        correo: usuario.email
      }));

      setError("");
      navigate("/home");

    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales incorrectas. Verifica tu correo y contraseña, o regístrate.");
    }
  };

  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <div className="card-cuida">
          <h2 className="text-center text-cuida mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
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
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-cuida w-100">Ingresar</button>
          </form>
          <p className="mt-3 text-center">
            ¿No tienes cuenta? <Link to="/registro" className="text-cuida">Regístrate aquí</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;



