// src/components/NotificacionCita.jsx
import React, { useEffect, useState } from "react";

const NotificacionCita = ({ mensaje }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="notificacion-cita">
      {mensaje}
    </div>
  );
};

export default NotificacionCita;
