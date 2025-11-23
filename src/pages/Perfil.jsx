import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import Footer from "../components/Footer";
import "../styles/cuida.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState({});
  const [mascotas, setMascotas] = useState([]);
  const [imagenPerfil, setImagenPerfil] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioCuidaPet");
    if (!storedUser) return;

    const datosUsuario = JSON.parse(storedUser);
    setUsuario(datosUsuario);

   
    fetch(`http://44.197.213.147:8080/pets/user/${datosUsuario.id}`)
      .then(res => res.json())
      .then(data => setMascotas(data))
      .catch(err => {
        console.error("Error al obtener mascotas:", err);
        setMascotas([]);
      });

    // Mantener imagen y fecha en localStorage como antes
    const imagenGuardada = localStorage.getItem("imagenPerfilCuidaPet");
    const fechaGuardada = localStorage.getItem("fechaNacimientoCuidaPet");
    if (imagenGuardada) setImagenPerfil(imagenGuardada);
    if (fechaGuardada) setFechaNacimiento(fechaGuardada);
  }, []);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenPerfil(reader.result);
      localStorage.setItem("imagenPerfilCuidaPet", reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleFechaChange = (e) => {
    setFechaNacimiento(e.target.value);
    localStorage.setItem("fechaNacimientoCuidaPet", e.target.value);
  };

  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <div className="card-cuida text-center">
          <h2 className="text-cuida mb-3">👤 Perfil de Usuario</h2>
          {imagenPerfil && (
            <img
              src={imagenPerfil}
              alt="Perfil"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "120px" }}
            />
          )}
          <input type="file" onChange={handleImagenChange} className="form-control mb-3" />
          <p><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p><strong>Correo:</strong> {usuario?.correo}</p>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={handleFechaChange}
            className="form-control mb-3"
          />
          <h4 className="text-cuida mt-4">🐶 Mascotas Registradas</h4>
          {mascotas.length > 0 ? (
            mascotas.map((m, i) => (
              <div key={i} className="mb-2">
                <p><strong>{m.nombre}</strong> - {m.tipo}</p>
              </div>
            ))
          ) : (
            <p>No hay mascotas registradas aún.</p>
          )}
          <Link to="/registrar-mascota" className="btn btn-cuida mt-3">➕ Agregar Mascota</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Perfil;


