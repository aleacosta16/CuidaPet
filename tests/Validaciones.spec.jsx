import {
  validarCorreo,
  validarClave,
  validarNombre,
  validarEdad,
  validarFecha,
  validarSeleccion,
  validarTexto,
} from "../src/utils/validaciones";

describe("validaciones.js", () => {
  // validarCorreo
  it("retorna error si el correo está vacío", () => {
    expect(validarCorreo("")).toBe("El correo es obligatorio.");
  });

  it("retorna error si el correo tiene formato inválido", () => {
    expect(validarCorreo("correo@invalido")).toBe("El correo no tiene formato válido.");
  });

  it("retorna null si el correo es válido", () => {
    expect(validarCorreo("usuario@cuida.pet")).toBeNull();
  });

  // validarClave
  it("retorna error si la clave está vacía", () => {
    expect(validarClave("")).toBe("La contraseña es obligatoria.");
  });

  it("retorna error si la clave es muy corta", () => {
    expect(validarClave("abc")).toBe("La contraseña debe tener al menos 6 caracteres.");
  });

  it("retorna null si la clave es válida", () => {
    expect(validarClave("abc123")).toBeNull();
  });

  // validarNombre
  it("retorna error si el nombre está vacío", () => {
    expect(validarNombre("")).toBe("El nombre es obligatorio.");
  });

  it("retorna null si el nombre es válido", () => {
    expect(validarNombre("Luna")).toBeNull();
  });

  // validarEdad
  it("retorna error si la edad es nula o cero", () => {
    expect(validarEdad(null)).toBe("La edad debe ser mayor a 0.");
    expect(validarEdad(0)).toBe("La edad debe ser mayor a 0.");
  });

  it("retorna null si la edad es válida", () => {
    expect(validarEdad(5)).toBeNull();
  });

  // validarFecha
  it("retorna error si la fecha está vacía", () => {
    expect(validarFecha("")).toBe("La fecha es obligatoria.");
  });

  it("retorna error si la fecha es futura", () => {
    const futura = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    expect(validarFecha(futura)).toBe("La fecha no puede ser futura.");
  });

  it("retorna null si la fecha es válida", () => {
    const hoy = new Date().toISOString().split("T")[0];
    expect(validarFecha(hoy)).toBeNull();
  });

  // validarSeleccion
  it("retorna error si no se selecciona valor", () => {
    expect(validarSeleccion("", "el tipo de mascota")).toBe("Debes seleccionar el tipo de mascota.");
  });

  it("retorna null si se selecciona valor", () => {
    expect(validarSeleccion("Perro", "el tipo de mascota")).toBeNull();
  });

  // validarTexto
  it("retorna error si el texto está vacío", () => {
    expect(validarTexto("", "Raza")).toBe("Raza es obligatorio.");
  });

  it("retorna null si el texto es válido", () => {
    expect(validarTexto("Labrador", "Raza")).toBeNull();
  });
});