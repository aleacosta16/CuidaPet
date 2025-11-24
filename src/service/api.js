// URL correcta: protocolo + IP + puerto
const API_URL = "http://3.235.63.102:8080";

// 🔹 Registro
export const register = (nombre, correo, password) => {
  return fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nombre, email: correo, password, role: "USER" })
  }).then(res => {
    if (!res.ok) throw new Error("Error en registro");
    return res.json();
  });
};

// 🔹 Login
export const login = (correo, clave) => {
  return fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: correo, password: clave })
  }).then(res => {
    if (!res.ok) throw new Error("Error en login");
    return res.json();
  });
};

// 🔹 Obtener mascotas de un usuario
export const getUserPets = (userId) => {
  return fetch(`${API_URL}/pets/user/${userId}`).then(res => {
    if (!res.ok) throw new Error("Error al obtener mascotas");
    return res.json();
  });
};

// 🔹 Agregar mascota
export const addPet = (userId, nombre, tipo) => {
  return fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, nombre, tipo })
  }).then(res => {
    if (!res.ok) throw new Error("Error al agregar mascota");
    return res.json();
  });
};
