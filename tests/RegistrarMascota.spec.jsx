import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrarMascota from "../src/pages/RegistrarMascota";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// ✅ Mock de useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Componente RegistrarMascota", () => {
  beforeEach(() => {
    vi.stubGlobal("alert", vi.fn());
    localStorage.clear();
    localStorage.setItem("usuarioCuidaPet", JSON.stringify("usuario123")); // Simula sesión activa
  });

  it("renderiza los campos correctamente", () => {
    render(
      <BrowserRouter>
        <RegistrarMascota />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Edad (años)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Raza (Opcional)")).toBeInTheDocument();
    expect(screen.getByText("Guardar Mascota")).toBeInTheDocument();
  });

  it("muestra error si los campos obligatorios están vacíos", async () => {
    render(
      <BrowserRouter>
        <RegistrarMascota />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Guardar Mascota"));

    const errorElement = await screen.findByText((content, element) =>
      element.tagName.toLowerCase() === "p" &&
      element.classList.contains("text-danger")
    );

    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent.length).toBeGreaterThan(0);
  });

  it("registra mascota si los datos son válidos", () => {
    render(
      <BrowserRouter>
        <RegistrarMascota />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Luna" },
    });
    fireEvent.change(screen.getByPlaceholderText("Edad (años)"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByPlaceholderText("Raza (Opcional)"), {
      target: { value: "Labrador" },
    });
    fireEvent.change(screen.getByDisplayValue("Selecciona especie"), {
      target: { value: "Perro" },
    });
    fireEvent.change(screen.getByDisplayValue("Selecciona sexo"), {
      target: { value: "Hembra" },
    });

    fireEvent.click(screen.getByText("Guardar Mascota"));

    expect(
      screen.getByText(/¡Mascota registrada con éxito!/i)
    ).toBeInTheDocument();

    const mascotas = JSON.parse(localStorage.getItem("mascotasCuidaPet"));
    expect(mascotas).toHaveLength(1);
    expect(mascotas[0].nombre).toBe("Luna");
  });

  it("muestra error si no hay archivo seleccionado", () => {
    render(<BrowserRouter><RegistrarMascota /></BrowserRouter>);
    const input = screen.getByLabelText(/Foto de la Mascota/i);
    fireEvent.change(input, { target: { files: [] } });

    expect(screen.queryByText(/imagen/i)).not.toBeInTheDocument();
  });

  it("muestra error si el archivo supera el tamaño permitido", () => {
    const file = new File(["a".repeat(1048577)], "mascota.png", { type: "image/png" });
    render(<BrowserRouter><RegistrarMascota /></BrowserRouter>);
    const input = screen.getByLabelText(/Foto de la Mascota/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText(/La imagen es demasiado grande/i)).toBeInTheDocument();
  });

  it("muestra error si el archivo no es una imagen válida", async () => {
    const file = new File(["texto"], "archivo.txt", { type: "text/plain" });
    Object.defineProperty(global, "FileReader", {
      writable: true,
      value: class {
        readAsDataURL() {
          this.onloadend();
        }
        onloadend = () => {};
        result = "data:text/plain;base64,abc";
      },
    });

    render(<BrowserRouter><RegistrarMascota /></BrowserRouter>);
    const input = screen.getByLabelText(/Foto de la Mascota/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText(/no es una imagen válida/i)).toBeInTheDocument();
  });

  it("muestra error si no hay usuario autenticado", () => {
    localStorage.removeItem("usuarioCuidaPet");
    render(<BrowserRouter><RegistrarMascota /></BrowserRouter>);
    fireEvent.click(screen.getByText("Guardar Mascota"));

    expect(screen.getByText(/No se pudo obtener la identidad del usuario/i)).toBeInTheDocument();
  });
});