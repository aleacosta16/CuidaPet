import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "../src/pages/Registro";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// ✅ Mock parcial de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Componente Registro", () => {
  beforeEach(() => {
    vi.stubGlobal("alert", vi.fn()); // ✅ intercepta alert correctamente
    localStorage.clear();
  });

  it("renderiza los campos correctamente", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByTestId("boton-registro")).toBeInTheDocument();
  });

  it("muestra alerta si los campos están vacíos", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    const form = screen.getByRole("form");
      fireEvent.submit(form);
      expect(window.alert).toHaveBeenCalledWith("Por favor completa todos los campos");
  });

  it("registra usuario si los datos son válidos", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "Alejandro" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "alejandro@cuida.pet" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByTestId("boton-registro"));

    const usuarios = JSON.parse(localStorage.getItem("todosLosUsuarios"));
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].correo).toBe("alejandro@cuida.pet");
    expect(window.alert).toHaveBeenCalledWith("¡Registro exitoso! Hola, Alejandro.");
  });
});