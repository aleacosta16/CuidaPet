// src/pages/TuMascota.jsx
import React, { useState, useEffect } from "react";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import "../styles/cuida.css";
import Footer from "../components/Footer";

const TuMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const [formVacuna, setFormVacuna] = useState({ nombre: "", fecha: "" });
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [errorVacuna, setErrorVacuna] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioCuidaPet");
    if (!storedUser) return;

    const datos = JSON.parse(localStorage.getItem("mascotasCuidaPet")) || [];
    const filtradas = datos.filter(m => m.userId === storedUser);
    setMascotas(filtradas);
  }, []);

  const handleVacunaChange = (e) => {
    setFormVacuna({ ...formVacuna, [e.target.name]: e.target.value });
  };

  const handleAgregarVacuna = (nombreMascota) => {
    setMascotaSeleccionada(nombreMascota);
    setFormVacuna({ nombre: "", fecha: "" });
    setErrorVacuna("");
  };

  const handleGuardarVacuna = () => {
    if (!formVacuna.nombre || !formVacuna.fecha) {
      setErrorVacuna("Debes ingresar nombre y fecha de la vacuna.");
      return;
    }

    const actualizadas = mascotas.map(m => {
      if (m.nombre === mascotaSeleccionada) {
        const nuevasVacunas = [...(m.vacunas || []), { ...formVacuna }];
        return { ...m, vacunas: nuevasVacunas };
      }
      return m;
    });

    setMascotas(actualizadas);
    localStorage.setItem("mascotasCuidaPet", JSON.stringify(actualizadas));
    setMascotaSeleccionada(null);
    setFormVacuna({ nombre: "", fecha: "" });
    setErrorVacuna("");
  };

  const handleEliminarVacuna = (nombreMascota, indexVacuna) => {
    const actualizadas = mascotas.map(m => {
      if (m.nombre === nombreMascota) {
        const nuevasVacunas = [...(m.vacunas || [])];
        nuevasVacunas.splice(indexVacuna, 1);
        return { ...m, vacunas: nuevasVacunas };
      }
      return m;
    });

    setMascotas(actualizadas);
    localStorage.setItem("mascotasCuidaPet", JSON.stringify(actualizadas));
  };

  const handleEliminarMascota = (nombreMascota) => {
    const confirmacion = window.confirm(`¿Eliminar la mascota "${nombreMascota}"?`);
    if (!confirmacion) return;

    const actualizadas = mascotas.filter(m => m.nombre !== nombreMascota);
    setMascotas(actualizadas);
    localStorage.setItem("mascotasCuidaPet", JSON.stringify(actualizadas));
  };

  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <h2 className="text-center text-cuida mb-4">Mis Mascotas</h2>
        {mascotas.length === 0 ? (
          <p className="text-center">Aún no has registrado mascotas.</p>
        ) : (
          mascotas.map((m, i) => (
            <div key={i} className="card-cuida mb-4">
              <h5 className="text-cuida">{m.nombre}</h5>
              <p><strong>Tipo:</strong> {m.tipo}</p>
              <p><strong>Edad:</strong> {m.edad} años</p>
              <p><strong>Sexo:</strong> {m.sexo}</p>
              <p><strong>Fecha de nacimiento:</strong> {m.fecha}</p>
              {m.raza && <p><strong>Raza:</strong> {m.raza}</p>}
              {m.foto && (
                <div className="text-center mt-3">
                  <img
                    src={m.foto}
                    alt={`Foto de ${m.nombre}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              )}

              <h6 className="mt-3">💉 Vacunas</h6>
              {m.vacunas && m.vacunas.length > 0 ? (
                <ul className="list-group mb-2">
                  {m.vacunas.map((v, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      {v.nombre} — {v.fecha}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminarVacuna(m.nombre, idx)}
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay vacunas registradas.</p>
              )}

              {mascotaSeleccionada === m.nombre ? (
                <div className="mt-3">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control mb-2"
                    placeholder="Nombre de la vacuna"
                    value={formVacuna.nombre}
                    onChange={handleVacunaChange}
                  />
                  <input
                    type="date"
                    name="fecha"
                    className="form-control mb-2"
                    value={formVacuna.fecha}
                    onChange={handleVacunaChange}
                  />
                  {errorVacuna && <p className="text-danger">{errorVacuna}</p>}
                  <button className="btn btn-cuida me-2" onClick={handleGuardarVacuna}>
                    Guardar Vacuna
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => setMascotaSeleccionada(null)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-outline-cuida" onClick={() => handleAgregarVacuna(m.nombre)}>
                    ➕ Agregar Vacuna
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => handleEliminarMascota(m.nombre)}>
                    🗑️ Eliminar Mascota
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
};

export default TuMascota;