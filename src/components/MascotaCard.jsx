import React, { useState } from "react";
// Se asume que VacunaForm está en el mismo directorio (./) o en la ubicación correcta. 
// La ruta es correcta, el problema es que el archivo no estaba disponible en el entorno
import VacunaForm from "./VacunaForm.jsx"; 

const MascotaCard = ({ mascota, index, onEliminar, onVacuna }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Aseguramos que la foto se muestre (puede ser Base64 o una URL)
  const fotoSrc = mascota.foto || "https://placehold.co/220x220/E5E7EB/9CA3AF?text=Sin+Foto";

  return (
    // Agregamos w-100 para que ocupe todo el ancho de la columna d-flex
    <div className="card-cuida mb-4 p-3 shadow-lg w-100">
      <div className="text-center mb-3">
        <img 
            src={fotoSrc} 
            alt={`Foto de ${mascota.nombre}`} 
            className="img-fluid rounded-lg" 
            style={{ maxHeight: "220px", width: "100%", objectFit: "cover", borderRadius: "8px" }} 
        />
      </div>
      <h5 className="text-cuida text-center mb-3 border-bottom pb-2">
        {mascota.nombre}
        {/* Ícono según el sexo */}
        <i className={`ms-2 bi bi-${mascota.sexo === 'Macho' ? 'gender-male text-info' : 'gender-female text-danger'}`}></i>
      </h5>
      
      {/* Detalles de la Mascota */}
      <ul className="list-group list-group-flush mb-3">
        <li className="list-group-item"><strong>Especie:</strong> {mascota.tipo}</li>
        <li className="list-group-item"><strong>Raza:</strong> {mascota.raza || 'No especificada'}</li>
        <li className="list-group-item"><strong>Edad:</strong> {mascota.edad} años</li>
        <li className="list-group-item"><strong>Nacimiento:</strong> {mascota.fecha}</li>
      </ul>

      {/* Historial de Vacunas */}
      <div className="vacunas-section mb-3">
        <h6>Vacunas Registradas:</h6>
        {mascota.vacunas && mascota.vacunas.length > 0 ? (
            <ul className="list-unstyled small bg-light p-2 rounded">
                {mascota.vacunas.map((vacuna, i) => (
                    <li key={i}>
                        <i className="bi bi-check-circle-fill text-success me-1"></i>
                        {vacuna.nombre} ({vacuna.fecha})
                    </li>
                ))}
            </ul>
        ) : (
            <p className="small text-muted">No hay vacunas registradas.</p>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="text-center d-flex flex-column gap-2">
        <button 
            className="btn btn-cuida-outline btn-sm" 
            onClick={() => setMostrarFormulario(prev => !prev)}
        >
          <i className="bi bi-syringe"></i> {mostrarFormulario ? 'Ocultar Formulario' : 'Registrar Vacuna'}
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onEliminar(index)}>
          <i className="bi bi-trash"></i> Eliminar Mascota
        </button>
      </div>

      {/* Formulario de Vacunas */}
      {mostrarFormulario && (
        <VacunaForm 
          mascota={mascota} 
          onGuardar={onVacuna} 
          onCancelar={() => setMostrarFormulario(false)} 
        />
      )}
    </div>
  );
};

export default MascotaCard;
