// src/components/MenuReporGanan.jsx
import { useState } from "react";
import "./menuReporGanan.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

const MenuReporGanan = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="reporte-ganancias-page">
      
      {/* Barra superior */}
      <header className="barra-superiormenu">
        <img src={LogoEmpren} alt="Logo Emprenddly" className="logo-emprenmenu" />
      </header>

      {/* Botón hamburguesa */}
      <div
        className={`MenuToggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="top_line common"></span>
        <span className="middle_line common"></span>
        <span className="bottom_line common"></span>
      </div>

      {/* Menú lateral */}
      <aside className={`SidebarMenu ${menuOpen ? "open" : ""}`}>
        <h1 className="menu-titulo">Navegación</h1>
        <ul>
          <li><a href="/usuarios"><i className="fas fa-user"></i><span>Usuarios</span></a></li>
          <li><a href="/registroinventario"><i className="fas fa-clipboard-list"></i><span>Inventario</span></a></li>
          <li><a href="#"><i className="fas fa-cart-plus"></i><span>Registro de Ventas</span></a></li>
          <li><a href="/reporteventas"><i className="fas fa-chart-line"></i><span>Reporte de Ventas</span></a></li>
          <li><a href="/registrogastos"><i className="fas fa-wallet"></i><span>Registro de Gastos</span></a></li>
          <li><a href="/reportegastos"><i className="fas fa-file-invoice-dollar"></i><span>Reporte de Gastos</span></a></li>
          <li className="current-page"><a href="/menureporte"><i className="fas fa-dollar-sign"></i><span>Reporte de Ganancias</span></a></li>
          <li><a href="/ajustes"><i className="fas fa-cogs"></i><span>Ajustes</span></a></li>
        </ul>
      </aside>

      {/* Contenido */}
      <main className="main-content">
        <h1 className="TituloRepor">Reporte de Ganancias</h1>
        <hr className="hr-content-divider" />

        <div className="ReportContainer">
          <p className="Explicacion">
            Selecciona un periodo de tiempo para visualizar los reportes de ganancias.
          </p>

          <div className="PeriodoCards">
            <a href="/reportediario"><i className="fas fa-calendar-day"></i><span>Diario</span></a>
            <a href="/reportesemanal"><i className="fas fa-calendar-week"></i><span>Semanal</span></a>
            <a href="/reportemensual"><i className="fas fa-calendar-alt"></i><span>Mensual</span></a>
            <a href="/reporteanual"><i className="fas fa-calendar-check"></i><span>Anual</span></a>
          </div>
        </div>
      </main>

    </div>
  );
};

export default MenuReporGanan;
