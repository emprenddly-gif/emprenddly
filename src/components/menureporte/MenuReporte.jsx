import { useState } from "react";
import "./menuReporGanan.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

const MenuReporGanan = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="reporte_ganancias">
      {/* Barra superior */}
      <header className="barra-superior">
        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

        {/* Botón de líneas (hamburger) */}
      <div
        className={`Lineas ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="top_line common"></span>
        <span className="middle_line common"></span>
        <span className="bottom_line common"></span>
      </div>

      {/* Menú lateral */}
      <label htmlFor="menu-toggle">
        <div className={`Menu ${menuOpen ? "open" : ""}`}>
          <h1 className="menu_titulo">Menu</h1>

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
      </label>

      {/* Contenido */}
      <div>
        <h1 className="TituloRepor">Reporte De Ganancias</h1>
        <hr className="hrreport" />
      </div>

      <div className="Container">
        <p className="Explicacion">
          Al dar clic en las opciones Diario, Mensual, Semanal o Anual, el usuario
          podrá acceder de forma rápida y sencilla a los reportes de ganancias
          correspondientes a cada periodo de tiempo.
        </p>
        <div className="Botones">
          <a href="http://localhost:5173/reportediario">Diario</a>
          <a href="http://localhost:5173/reportesemanal">Semanal</a>
          <a href="http://localhost:5173/reportemensual">Mensual</a>
          <a href="http://localhost:5173/reporteanual">Anual</a>
        </div>
      </div>
    </div>
  );
};

export default MenuReporGanan;
