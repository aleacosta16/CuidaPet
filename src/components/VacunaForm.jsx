// src/components/VacunaForm.jsx
import React, { useState } from "react";

const VacunaForm = ({ mascota, onGuardar, onCancelar }) => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const guardar = () => {
    if (!nombre.trim() || !fecha.trim()) {
        setError("Debe ingresar el nombre y la fecha de la vacuna.");
        return;
    }
    setError("");
    // Llama a la función proporcionada por TuMascota.jsx
    onGuardar(mascota.nombre, { nombre: nombre.trim(), fecha });
    setNombre("");
    setFecha("");
    onCancelar();
  };

  return (
    <div className="formulario-vacuna mt-3 p-3 bg-light rounded shadow-sm">
      <h6 className="text-cuida mb-3">Nueva Vacuna para {mascota.nombre}</h6>
      <input 
        type="text" 
        className="form-control mb-2" 
        placeholder="Nombre de la vacuna (Ej: Rabia, Parvovirus)" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <input 
        type="date" 
        className="form-control mb-2" 
        value={fecha} 
        onChange={(e) => setFecha(e.target.value)} 
      />
      
      {error && <p className="text-danger small">{error}</p>}

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-success btn-sm" onClick={guardar}>
            <i className="bi bi-check-circle"></i> Guardar
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onCancelar}>
            <i className="bi bi-x-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
};

export default VacunaForm;
