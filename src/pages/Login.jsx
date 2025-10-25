// src/pages/Login.jsx
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

  const handleSubmit = (e) => {
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

    // --- 2. Lógica de Autenticación con localStorage ---

    // Obtener la lista de todos los usuarios registrados
    const usuariosJSON = localStorage.getItem("todosLosUsuarios");
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

    // Buscar si existe un usuario con el correo y la clave proporcionados
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.password === clave // Asumiendo que guardaste la clave como 'password' en el Registro
    );

    if (usuarioEncontrado) {
      // Éxito: El usuario existe y las credenciales son correctas

      // Reiniciar el error
      setError("");
      
      // Establecer la sesión activa (solo los datos de sesión, no la clave)
      localStorage.setItem(
        "usuarioCuidaPet",
        JSON.stringify({
          id: usuarioEncontrado.id, 
          nombre: usuarioEncontrado.nombre, 
          correo: usuarioEncontrado.correo
        })
      );
      
      // Redireccionar al home
      navigate("/home");
      
    } else {
      // Fallo: El usuario no existe o la clave es incorrecta
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


