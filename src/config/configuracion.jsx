// Configuracion.jsx
import React, { useState } from "react";

const Configuracion = () => {
  const [idioma, setIdioma] = useState("es"); // idioma por defecto

  // Cambio de idioma
  const handleChangeIdioma = (e) => {
    const nuevoIdioma = e.target.value;
    setIdioma(nuevoIdioma);
    alert("Idioma cambiado a: " + nuevoIdioma);
  };

  // Confirmar cierre de sesión
  const handleCerrarSesion = () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      alert("Sesión cerrada ✅");
      // Aquí podrías agregar lógica real de cierre (ej: redirigir o limpiar datos)
    }
  };

  return (
    <div className="contenedor">
      <h1>Configuración</h1>

      {/* Selector de idioma */}
      <div className="opcion">
        <span>🌍 Seleccionar idioma:</span>
        <select value={idioma} onChange={handleChangeIdioma}>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
        </select>
      </div>

      {/* Botón cerrar sesión */}
      <button className="btn-cerrar" onClick={handleCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Configuracion;
