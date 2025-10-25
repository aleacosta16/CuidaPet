import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavbarCuidaPet from "../src/components/NavbarCuidaPet";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// ✅ Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NavbarCuidaPet", () => {
  beforeEach(() => {
    vi.stubGlobal("confirm", vi.fn());
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it("renderiza todos los botones de navegación", () => {
    render(
      <BrowserRouter>
        <NavbarCuidaPet />
      </BrowserRouter>
    );

    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Mis Mascotas/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrar Mascota/i)).toBeInTheDocument();
    expect(screen.getByText(/Citas/i)).toBeInTheDocument();
    expect(screen.getByText(/Recomendaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
  });

  it("navega correctamente al hacer clic en cada botón", () => {
    render(
      <BrowserRouter>
        <NavbarCuidaPet />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Inicio/i));
    fireEvent.click(screen.getByText(/Mis Mascotas/i));
    fireEvent.click(screen.getByText(/Registrar Mascota/i));
    fireEvent.click(screen.getByText(/Citas/i));
    fireEvent.click(screen.getByText(/Recomendaciones/i));
    fireEvent.click(screen.getByText(/Perfil/i));

    expect(mockNavigate).toHaveBeenCalledWith("/home");
    expect(mockNavigate).toHaveBeenCalledWith("/tu-mascota");
    expect(mockNavigate).toHaveBeenCalledWith("/registrar-mascota");
    expect(mockNavigate).toHaveBeenCalledWith("/citas");
    expect(mockNavigate).toHaveBeenCalledWith("/recomendaciones");
    expect(mockNavigate).toHaveBeenCalledWith("/perfil");
  });

  it("no cierra sesión si el usuario cancela la confirmación", () => {
    confirm.mockReturnValue(false);
    render(
      <BrowserRouter>
        <NavbarCuidaPet />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "" })); // Botón circular
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(localStorage.getItem("usuarioCuidaPet")).toBeNull();
  });

  it("cierra sesión si el usuario confirma", () => {
    confirm.mockReturnValue(true);
    localStorage.setItem("usuarioCuidaPet", "usuario123");

    render(
      <BrowserRouter>
        <NavbarCuidaPet />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(localStorage.getItem("usuarioCuidaPet")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});