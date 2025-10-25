import React, { useState } from "react";
import "../styles/cuida.css";

const recomendaciones = [
  {
    id: "PerrosGrandes",
    titulo: "🐶 Perros de raza grande",
    items: [
      "Ejercicio diario intenso (mínimo 1 hora).",
      "Alimentación rica en proteínas y condroprotectores.",
      "Entrenamiento temprano para evitar problemas de conducta.",
      "Chequeos frecuentes por riesgo de displasia de cadera."
    ]
  },
  {
    id: "GatosIndoor",
    titulo: "🐱 Gatos indoor",
    items: [
      "Rascadores, estanterías y juguetes interactivos.",
      "Control de peso con alimentación balanceada.",
      "Revisión dental anual y vacunación regular.",
      "Evitar el estrés por cambios bruscos en el entorno."
    ]
  },
  {
    id: "Conejos",
    titulo: "🐰 Conejos",
    items: [
      "Hábitat amplio y seguro, con espacio para explorar fuera de la jaula.",
      "Alimentación basada en heno fresco, verduras variadas y pellets específicos.",
      "Revisión frecuente de dientes y uñas para evitar problemas dentales.",
      "Socialización tranquila y respetuosa, ideal en ambientes silenciosos."
    ]
  },
  {
    id: "Peces",
    titulo: "🐟 Peces",
    items: [
      "Acuario adecuado con filtro, calentador y decoración segura.",
      "Control del pH y cambios parciales de agua semanalmente.",
      "Alimentación moderada y específica para cada especie.",
      "Evitar mezclar especies incompatibles en el mismo acuario."
    ]
  },
  {
    id: "Hamsters",
    titulo: "🐹 Hámsters",
    items: [
      "Jaula amplia con túneles, rueda y refugios para explorar.",
      "Alimentación variada con semillas, frutas y pellets (sin cítricos ni dulces).",
      "Ejercicio diario con juguetes y espacio para moverse.",
      "Limpieza semanal del sustrato y accesorios para evitar olores."
    ]
  }
];

const RecomendacionesAccordion = () => {
  const [activo, setActivo] = useState(null);

  const toggle = (id) => {
    setActivo(activo === id ? null : id);
  };

  return (
    <div className="accordion-cuida">
      {recomendaciones.map((rec) => (
        <div key={rec.id} className="accordion-item">
          <button className="accordion-header" onClick={() => toggle(rec.id)}>
            {rec.titulo}
            <span className={`flecha ${activo === rec.id ? "abierta" : ""}`}>▾</span>
          </button>
          {activo === rec.id && (
            <ul className="accordion-content">
              {rec.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecomendacionesAccordion;

