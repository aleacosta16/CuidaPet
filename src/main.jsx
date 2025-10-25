// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UsuarioProvider } from "./context/UsuarioContext";
import "./styles/cuida.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <UsuarioProvider>
    <App />
  </UsuarioProvider>
);

