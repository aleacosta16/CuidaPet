// src/context/UsuarioContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const UsuarioContext = createContext();

// Proveedor del contexto
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState({});
  const [mascotas, setMascotas] = useState([]);
  const [citas, setCitas] = useState([]);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioCuidaPet"));
    const perfilGuardado = JSON.parse(localStorage.getItem("perfilUsuario")) || {};
    const mascotasGuardadas = JSON.parse(localStorage.getItem("mascotasRegistradas")) || [];
    const citasGuardadas = JSON.parse(localStorage.getItem("citasVeterinarias")) || [];

    setUsuario(user);
    setPerfil(perfilGuardado);
    setMascotas(mascotasGuardadas);
    setCitas(citasGuardadas);
  }, []);

  // Funciones para actualizar datos
  const actualizarPerfil = (nuevoPerfil) => {
    setPerfil(nuevoPerfil);
    localStorage.setItem("perfilUsuario", JSON.stringify(nuevoPerfil));
  };

  const registrarMascota = (nuevaMascota) => {
    const actualizadas = [...mascotas, nuevaMascota];
    setMascotas(actualizadas);
    localStorage.setItem("mascotasRegistradas", JSON.stringify(actualizadas));
  };

  const eliminarMascota = (index) => {
    const actualizadas = mascotas.filter((_, i) => i !== index);
    setMascotas(actualizadas);
    localStorage.setItem("mascotasRegistradas", JSON.stringify(actualizadas));
  };

  const registrarCita = (nuevaCita) => {
    const actualizadas = [...citas, nuevaCita];
    setCitas(actualizadas);
    localStorage.setItem("citasVeterinarias", JSON.stringify(actualizadas));
  };

  const eliminarCita = (index) => {
    const actualizadas = citas.filter((_, i) => i !== index);
    setCitas(actualizadas);
    localStorage.setItem("citasVeterinarias", JSON.stringify(actualizadas));
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        perfil,
        mascotas,
        citas,
        actualizarPerfil,
        registrarMascota,
        eliminarMascota,
        registrarCita,
        eliminarCita,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
