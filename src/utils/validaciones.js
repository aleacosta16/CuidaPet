// src/utils/validaciones.js

export const validarCorreo = (correo) => {
  if (!correo.trim()) return "El correo es obligatorio.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(correo)) return "El correo no tiene formato válido.";
  return null;
};

export const validarClave = (clave) => {
  if (!clave.trim()) return "La contraseña es obligatoria.";
  if (clave.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  return null;
};

export const validarNombre = (nombre) => {
  if (!nombre.trim()) return "El nombre es obligatorio.";
  return null;
};

export const validarEdad = (edad) => {
  if (!edad || edad <= 0) return "La edad debe ser mayor a 0.";
  return null;
};

export const validarFecha = (fecha) => {
  if (!fecha) return "La fecha es obligatoria.";
  const hoy = new Date().toISOString().split("T")[0];
  if (fecha > hoy) return "La fecha no puede ser futura.";
  return null;
};

export const validarSeleccion = (valor, campo) => {
  if (!valor) return `Debes seleccionar ${campo}.`;
  return null;
};

export const validarTexto = (texto, campo) => {
  if (!texto.trim()) return `${campo} es obligatorio.`;
  return null;
};
