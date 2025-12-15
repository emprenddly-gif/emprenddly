import React, { useEffect, useState } from "react";
import "./ajustes.css";

import { traducciones } from "../../services/traducciones";
import LogoEmpren from "../../assets/Logo_Empren.png";

export default function Ajustes() {
  const [idioma, setIdioma] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const idiomaGuardado = localStorage.getItem("idiomaSeleccionado") || "es";
    setIdioma(idiomaGuardado);
  }, []);

  useEffect(() => {
    localStorage.setItem("idiomaSeleccionado", idioma);
  }, [idioma]);

  const t = (key) => traducciones[idioma][key];

  const handleCerrarSesion = () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      alert("Sesión cerrada ✅");
      window.location.href = "login";
    }
  };

  // 👉 SOLO AGREGADO: función para ir al perfil
  const handleEditarPerfil = () => {
    window.location.href = "perfil"; // cambia a la ruta que uses, por ejemplo "/perfil"
  };

  return (
    <div className="ajustes-container">
      {/* Barra superior */}
      <header className="barra-superior">
        {/* Botón hamburguesa */}
        <div className="Lineas" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`top_line common ${menuOpen ? "rotate-down" : ""}`}></span>
          <span className={`middle_line common ${menuOpen ? "hidden" : ""}`}></span>
          <span className={`bottom_line common ${menuOpen ? "rotate-up" : ""}`}></span>
        </div>

        <img src={LogoEmpren} alt="Logo" className="logo" />
      </header>

    {/* Menú lateral */}
      <label>
        <input className="lineas-check" type="checkbox" />
        <div className="Lineas">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu">
          <h1 className="menu_titulo">Menú</h1>
          <ul> 
          <li><a href="http://localhost:5173/registroinventario">Inventario</a></li>
          <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
          <li><a href="http://localhost:5173/reporteventas">Reporte De Ventas</a></li>
          <li><a href="/registrogastos"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
          <li><a href="/reportegastos"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
          <li><a href="/menureporte"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
          <li><a href="http://localhost:5173/ajustes">Ajustes</a></li>
          </ul>
        </div>
      </label>


      {/* Título */}
      <div>
        <h1 className="Titulo">{t("ajustes")}</h1>
        <hr />
      </div>

      {/* 👉 SOLO AGREGADO: botón Editar perfil */}
      <div className="opcion">
        <span>
          <i className="fas fa-user"></i> {t("editarPerfil") || "Editar perfil"}
        </span>
        <button className="btn-editar" onClick={handleEditarPerfil}>
          {t("editarPerfil") || "Editar perfil"}
        </button>
      </div>

      {/* Notificaciones */}
      <div className="notificaciones">
        <span>
          <img src="https://img.icons8.com/ios-filled/30/000000/appointment-reminders.png" alt="notif" />
          <span>{t("notificaciones")}</span>
        </span>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider"></span>
        </label>
      </div>

      {/* Idioma */}
      <div className="opcion">
        <span>
          <img src="https://img.icons8.com/ios-filled/50/000000/language.png" alt="idioma" />
          <span>{t("idioma")}</span>
        </span>
        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Datos */}
      <div className="Datos">
        <span>
          <img src="https://img.icons8.com/ios-filled/30/000000/combo-chart.png" alt="datos" />
          <span>{t("datos")}</span>
        </span>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider"></span>
        </label>
      </div>

      {/* Actualizaciones */}
      <div className="actualizaciones">
        <span>
          <img src="https://img.icons8.com/ios-filled/30/000000/update-left-rotation.png" alt="update" />
          <span>{t("actualizaciones")}</span>
        </span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      {/* Cerrar sesión */}
      <button className="btn btn-cerrar" onClick={handleCerrarSesion}>
        {t("cerrarSesion")}
      </button>
    </div>
  );
}
