// src/pages/RegistrarMascota.jsx
import React, { useState, useEffect } from "react";
import NavbarCuidaPet from "../components/NavbarCuidaPet.jsx";
import "../styles/cuida.css";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import {
  validarNombre,
  validarEdad,
  validarSeleccion
} from "../utils/validaciones";

const RegistrarMascota = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    edad: "",
    fecha: "",
    sexo: "",
    raza: "",
    foto: "",
    vacunas: [],
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioCuidaPet");
    if (storedUser) {
      setUserId(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setForm(prev => ({ ...prev, foto: "" }));
      return;
    }

    const MAX_SIZE = 1048576; // 1MB
    if (file.size > MAX_SIZE) {
      setError("La imagen es demasiado grande. Máximo permitido: 1MB.");
      setForm(prev => ({ ...prev, foto: "" }));
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (typeof base64 === "string" && base64.startsWith("data:image")) {
        setForm(prev => ({ ...prev, foto: base64 }));
        setError("");
      } else {
        setError("El archivo no es una imagen válida.");
        setForm(prev => ({ ...prev, foto: "" }));
      }
    };
    reader.onerror = () => {
      setError("Error al leer la imagen.");
      setForm(prev => ({ ...prev, foto: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      setError("Error: No se pudo obtener la identidad del usuario.");
      return;
    }

    const errores = [];
    errores.push(validarNombre(form.nombre));
    errores.push(validarSeleccion(form.tipo, "el tipo de mascota"));
    errores.push(validarEdad(form.edad));
    // 🔴 Validación de fecha eliminada
    errores.push(validarSeleccion(form.sexo, "el sexo"));

    const erroresFiltrados = errores.filter(Boolean);
    if (erroresFiltrados.length > 0) {
      setError(erroresFiltrados.join(" "));
      return;
    }

    const mascotaCompleta = {
      ...form,
      userId,
      vacunas: form.vacunas || [],
    };

    const mascotas = JSON.parse(localStorage.getItem("mascotasCuidaPet") || "[]");
    mascotas.push(mascotaCompleta);
    localStorage.setItem("mascotasCuidaPet", JSON.stringify(mascotas));

    setError("");
    setRegistroExitoso(true);
    setForm({
      nombre: "",
      tipo: "",
      edad: "",
      fecha: "",
      sexo: "",
      raza: "",
      foto: "",
      vacunas: [],
    });

    setTimeout(() => {
      navigate("/tu-mascota");
    }, 1500);
  };

  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <h2 className="text-center text-cuida mb-4">Registrar Mascota</h2>
        <div className="card-cuida">
          <form onSubmit={handleSubmit}>
            {registroExitoso && (
              <div className="alert alert-success text-center mb-3">
                ¡Mascota registrada con éxito! Redirigiendo...
              </div>
            )}

            <input
              type="text"
              name="nombre"
              className="form-control mb-3"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
            />

            <select
              name="tipo"
              className="form-control mb-3"
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="">Selecciona especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>

            <input
              type="number"
              name="edad"
              className="form-control mb-3"
              placeholder="Edad (años)"
              value={form.edad}
              onChange={handleChange}
            />

            <input
              type="date"
              name="fecha"
              className="form-control mb-3"
              value={form.fecha}
              onChange={handleChange}
            />

            <select
              name="sexo"
              className="form-control mb-3"
              value={form.sexo}
              onChange={handleChange}
            >
              <option value="">Selecciona sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>

            <input
              type="text"
              name="raza"
              className="form-control mb-3"
              placeholder="Raza (Opcional)"
              value={form.raza}
              onChange={handleChange}
            />

            <label className="form-label d-block text-muted ms-1 mt-2">
              Foto de la Mascota (Máx. 1MB)
            </label>
            <input
              type="file"
              name="foto"
              className="form-control mb-3"
              accept="image/*"
              onChange={handleFileChange}
            />

            {form.foto && typeof form.foto === "string" && form.foto.startsWith("data:image") && (
              <div className="mb-3 text-center">
                <img
                  src={form.foto}
                  alt="Previsualización de la mascota"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}

            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-cuida w-100" disabled={registroExitoso}>
              Guardar Mascota
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegistrarMascota;