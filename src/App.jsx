import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes principales
import Menu from "./components/menu/Menu.jsx";
import Intro from "./components/intro/Intro.jsx";
import MenuReporte from "./components/menureporte/MenuReporte.jsx";

// Inventario
import RegistroInventario from "./components/inventario/RegistroInventario.jsx";

// Reportes
import ReporteMensual from "./components/grafica_mensual/ReporteMensual.jsx";
import ReporteSemanal from "./components/grafica_semanal/ReporteSemanal.jsx";
import ReporteAnual from "./components/grafica_Anual/ReporteAnual.jsx";
import ReporteDiario from "./components/grafica_diaria/ReporteDiario.jsx";
import ReporteGastos from "./components/ReportGastos/ReporteGastos.jsx";
import ReporteVentas from "./components/ReportVentas/reporteventas.jsx";
import TablaGanancias from "./components/grafica_semanal/TablaGanancias.jsx";

// Registros
import RegistroGasto from "./components/RegistrGastos/RegistroGastos.jsx";
import RegistroVentas from "./components/registro_ventas/RegistroVentas.jsx";

// Autenticación
import Login from "./components/login/Login.jsx";
import Registro from "./components/registro/Registro.jsx";

// Usuario
import Perfil from "./components/Perfil/Perfil.jsx";
import Ajustes from "./components/Ajustes/Ajustes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Inicio */}
        <Route path="/" element={<Intro />} />
        <Route path="/intro" element={<Intro />} />

        {/* Menú principal */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/menureporte" element={<MenuReporte />} />

        {/* Inventario */}
        <Route path="/registroinventario" element={<RegistroInventario />} />

        {/* Reportes */}
        <Route path="/reportemensual" element={<ReporteMensual />} />
        <Route path="/reportesemanal" element={<ReporteSemanal />} />
        <Route path="/reporteanual" element={<ReporteAnual />} />
        <Route path="/reportediario" element={<ReporteDiario />} />
        <Route path="/reportegastos" element={<ReporteGastos />} />
        <Route path="/reporteventas" element={<ReporteVentas />} />
        <Route path="/tablaganancias" element={<TablaGanancias />} />

        {/* Registros */}
        <Route path="/registrogastos" element={<RegistroGasto />} />
        <Route path="/registroventas" element={<RegistroVentas />} />

        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Usuario */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ajustes" element={<Ajustes />} />
      </Routes>
    </Router>
  );
}

export default App;
