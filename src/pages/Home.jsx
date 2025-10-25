import React from "react";
import NavbarCuidaPet from "../components/NavbarCuidaPet";
import Footer from "../components/Footer";
import cuidado1 from "../assets/cuidado1.png";
import cuidado2 from "../assets/cuidado2.png";
import cuidado3 from "../assets/cuidado3.png";
import cuidado4 from "../assets/cuidado4.png";
import "../styles/cuida.css";

const frases = [
  {
    imagen: cuidado1,
    texto: "“Los animales nos enseñan el lenguaje universal del amor.” Cuidar a una mascota es aprender a dar sin esperar.",
  },
  {
    imagen: cuidado2,
    texto: "“La compasión por los animales está íntimamente asociada con la bondad del carácter.” Alimentar y proteger es un acto ético.",
  },
  {
    imagen: cuidado3,
    texto: "“Sus gestos de afecto hablan directamente al corazón humano.” Mascotas felices significan hogares más sanos.",
  },
  {
    imagen: cuidado4,
    texto: "En CuidaPet creemos que cada mascota merece amor, atención médica y un hogar seguro.",
  },
];

const Home = () => {
  return (
    <>
      <NavbarCuidaPet />
      <main className="container mt-5">
        <h2 className="text-cuida text-center mb-4">Bienvenida a CuidaPet 🐾</h2>
        <div className="frases-grid">
          {frases.map((f, i) => (
            <div key={i} className="frase-bloque">
              <img src={f.imagen} alt={`Mascota ${i + 1}`} className="img-frase" />
              <p>{f.texto}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

