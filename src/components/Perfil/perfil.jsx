// src/components/Perfil.jsx
import React, { useState } from "react";
import "./perfil.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

const Perfil = () => {
  // 👉 Estado para abrir/cerrar el menú
  const [menuOpen, setMenuOpen] = useState(false); 

  const [formData, setFormData] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juanperez@mail.com",
    usuario: "juanp123",
    imagen: "https://via.placeholder.com/100?text=+",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFormData({
        ...formData,
        imagen: URL.createObjectURL(archivo),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Tus cambios han sido guardados ✅");
    window.location.href = "/perfil";
  };

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        {/* Botón hamburguesa: Usa el estado 'menuOpen' para mostrar/ocultar y animar */}
        <div className="Lineas" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`top_line common ${menuOpen ? "rotate-down" : ""}`}></span>
          <span className={`middle_line common ${menuOpen ? "hidden" : ""}`}></span>
          <span className={`bottom_line common ${menuOpen ? "rotate-up" : ""}`}></span>
        </div>

        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

      {/* Menú lateral: Usa el estado 'menuOpen' para aplicar la clase 'open' */}
      <div className={`Menu ${menuOpen ? "open" : ""}`}>
        <h1 className="menu_titulo">Menú</h1>
        <ul>
            <li><a href="http://localhost:5173/usuarios"><i className="fas fa-user"></i>Usuarios</a></li>
            <li><a href="http://localhost:5173/registroinventario"><i className="fas fa-clipboard-list"></i>Inventario</a></li>
            <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
            <li><a href="http://localhost:5173/reporteventas"><i className="fas fa-chart-line"></i>Reporte De Ventas</a></li>
            <li><a href="http://localhost:5173/registrogastos"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
            <li><a href="http://localhost:5173/reportegastos"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
            <li><a href="http://localhost:5173/menureporte"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
            <li><a href="http://localhost:5173/ajustes"><i className="fas fa-cogs"></i>Ajustes</a></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="contenedor">
        <h2>Mi Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <br /><br />

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          <br /><br />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <br /><br />

          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            value={formData.usuario}
            onChange={handleChange}
          />
          <br /><br />

          {/* Imagen */}
          <label htmlFor="imagenInput" className="image-label">
            <img id="previewImg" src={formData.imagen} alt="Imagen perfil" />
          </label>
          <input
            type="file"
            id="imagenInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br /><br />

          <button type="submit" className="btn-guardar">
            Guardar cambios
          </button>
        </form>

        <br />
        <a href="/ajustes" className="btn-volver">Volver a Ajustes</a>
      </div>
    </div>
  );
};

export default Perfil;