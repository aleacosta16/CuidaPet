// src/pages/Citas.jsx
import React, { useState, useEffect } from "react";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import "../styles/cuida.css";
import Footer from "../components/Footer";
import { validarTexto, validarSeleccion } from "../utils/validaciones";

const Citas = () => {
  const [form, setForm] = useState({
    mascota: "",
    fecha: "",
    motivo: "",
    doctor: "",
    clinica: ""
  });
  const [mascotas, setMascotas] = useState([]);
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioCuidaPet");
    if (!storedUser) return;

    setUserId(storedUser);

    const todasMascotas = JSON.parse(localStorage.getItem("mascotasCuidaPet")) || [];
    const mascotasDelUsuario = todasMascotas.filter(m => m.userId === storedUser);
    setMascotas(mascotasDelUsuario);

    const todasCitas = JSON.parse(localStorage.getItem("citasCuidaPet")) || [];
    const citasDelUsuario = todasCitas.filter(c => c.userId === storedUser);
    setCitas(citasDelUsuario);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errores = [];
    errores.push(validarSeleccion(form.mascota, "una mascota"));
    errores.push(validarTexto(form.motivo, "El motivo"));
    errores.push(validarTexto(form.doctor, "El nombre del doctor"));
    errores.push(validarTexto(form.clinica, "La clínica"));

    const erroresFiltrados = errores.filter(Boolean);
    if (erroresFiltrados.length > 0) {
      setError(erroresFiltrados.join(" "));
      setRegistroExitoso(false);
      return;
    }

    const nuevaCita = {
      ...form,
      userId,
    };

    const todasCitas = JSON.parse(localStorage.getItem("citasCuidaPet")) || [];
    todasCitas.push(nuevaCita);
    localStorage.setItem("citasCuidaPet", JSON.stringify(todasCitas));

    setCitas(prev => [...prev, nuevaCita]);
    setForm({
      mascota: "",
      fecha: "",
      motivo: "",
      doctor: "",
      clinica: ""
    });
    setError("");
    setRegistroExitoso(true);

    setTimeout(() => setRegistroExitoso(false), 3000);
  };

  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <h2 className="text-center text-cuida mb-4">Agendar Cita Veterinaria</h2>
        <div className="card-cuida mb-4">
          <form onSubmit={handleSubmit}>
            {registroExitoso && (
              <div className="alert alert-success text-center mb-3">
                ¡Cita registrada con éxito!
              </div>
            )}

            <select
              name="mascota"
              className="form-control mb-3"
              value={form.mascota}
              onChange={handleChange}
            >
              <option value="">Selecciona tu mascota</option>
              {mascotas.map((m, i) => (
                <option key={i} value={m.nombre}>
                  {m.nombre} ({m.tipo})
                </option>
              ))}
            </select>

            <input
              type="date"
              name="fecha"
              className="form-control mb-3"
              value={form.fecha}
              onChange={handleChange}
            />

            <textarea
              name="motivo"
              className="form-control mb-3"
              placeholder="Motivo de la cita"
              value={form.motivo}
              onChange={handleChange}
            />

            <input
              type="text"
              name="doctor"
              className="form-control mb-3"
              placeholder="Nombre del doctor"
              value={form.doctor}
              onChange={handleChange}
            />

            <input
              type="text"
              name="clinica"
              className="form-control mb-3"
              placeholder="Nombre de la clínica"
              value={form.clinica}
              onChange={handleChange}
            />

            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-cuida w-100">Guardar Cita</button>
          </form>
        </div>

        <h4 className="text-cuida mb-3">Citas Agendadas</h4>
        {citas.length === 0 ? (
          <p>No hay citas registradas.</p>
        ) : (
          citas.map((cita, i) => (
            <div key={i} className="card-cuida mb-3">
              <p><strong>Mascota:</strong> {cita.mascota}</p>
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Motivo:</strong> {cita.motivo}</p>
              <p><strong>Doctor:</strong> {cita.doctor}</p>
              <p><strong>Clínica:</strong> {cita.clinica}</p>
            </div>
          ))
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-cuida"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Agendar otra cita
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Citas;