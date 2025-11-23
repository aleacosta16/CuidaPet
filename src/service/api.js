const API_URL = "http:44.197.251.119s//:8080";


export const register = (nombre, correo, password) => {
  return fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nombre, email: correo, password, role: "USER" })
  }).then(res => res.json());
};

export const login = (correo, clave) => {
  return fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: correo, password: clave })
  }).then(res => res.json());
};

export const getUserPets = (userId) => {
  return fetch(`${API_URL}/pets/user/${userId}`).then(res => res.json());
};

export const addPet = (userId, nombre, tipo) => {
  return fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, nombre, tipo })
  }).then(res => res.json());
};
