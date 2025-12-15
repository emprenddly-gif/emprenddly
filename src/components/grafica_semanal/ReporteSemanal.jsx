// // src/pages/ReporteSemanal.jsx
// import React, { useState, useEffect } from "react";
// import { Chart, registerables } from "chart.js";
// import "./Reporte_Sema.css";
// import LogoEmpren from "../assets/Logo_Empren.png";

// Chart.register(...registerables);

// function ReporteSemanal() {
//   const [mostrarCalendario, setMostrarCalendario] = useState(false);
//   const [chartInstance, setChartInstance] = useState(null);
//   const [mensaje, setMensaje] = useState("");

//   const toggleCalendario = () => setMostrarCalendario(!mostrarCalendario);

//   const actualizarDatos = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/ganancias_semanales`);
//       if (!response.ok) throw new Error("Error en la API");

//       const data = await response.json();
//       console.log("📊 Datos recibidos:", data);

//       if (!data || data.length === 0) {
//         setMensaje("No hay registros para mostrar");
//         if (chartInstance) chartInstance.destroy();
//         return;
//       }

//       setMensaje("");

//       // Semanas disponibles
//       const semanas = Array.from(new Set(data.map(d => d.semana))).sort((a, b) => a - b);
//       const labels = semanas.map(s => `Semana ${s}`);

//       // Métodos de pago
//       const metodos = ["PSE", "QR", "EFECTIVO", "DATAFONO"];
//       const colores = { PSE: "#2f2540", QR: "#9ea0a8", EFECTIVO: "#efe0c7", DATAFONO: "#9C27B0" };

//       // Construir datasets
//       const datasets = metodos.map(metodo => ({
//         label: metodo,
//         data: semanas.map(semana => {
//           const item = data.find(d => d.semana === semana && d.metodo_pago === metodo);
//           return item ? parseFloat(item.total) : 0;
//         }),
//         backgroundColor: colores[metodo]
//       }));

//       // Crear/actualizar chart
//       const ctx = document.getElementById("chartSemanal").getContext("2d");
//       if (chartInstance) chartInstance.destroy();

//       const newChart = new Chart(ctx, {
//         type: "bar",
//         data: { labels, datasets },
//         options: {
//           responsive: true,
//           plugins: { legend: { display: true } },
//           scales: {
//             x: { stacked: true },
//             y: { stacked: true, beginAtZero: true }
//           }
//         }
//       });

//       setChartInstance(newChart);

//     } catch (err) {
//       console.error("Error al cargar datos:", err);
//       setMensaje("Error al cargar datos del servidor");
//     }
//   };

//   useEffect(() => {
//     actualizarDatos();
//   }, []);

//   return (
//     <div>
//       {/* Barra superior */}
//       <header className="barra-superior">
//         <img src={LogoEmpren} alt="Logo" className="logosem" />
//       </header>

//       {/* Menú lateral */}
//       <label>
//         <input className="lineas-check" type="checkbox" />
//         <div className="Lineas">
//           <span className="top_line common"></span>
//           <span className="middle_line common"></span>
//           <span className="bottom_line common"></span>
//         </div>

//         <div className="Menu">
//           <h1 className="menu_titulo">Menu</h1>
//           <ul>
//             <li><a href="#">Usuarios</a></li>
//             <li><a href="#">Registro De Inventario</a></li>
//             <li><a href="#">Reporte De Inventario</a></li>
//             <li><a href="#">Registro De Ventas</a></li>
//             <li><a href="#">Reporte De Ventas</a></li>
//             <li><a href="#">Registro De Gastos</a></li>
//             <li><a href="#">Reporte De Gastos</a></li>
//             <li><a href="#">Reporte De Ganancias</a></li>
//             <li><a href="#">Ajustes</a></li>
//           </ul>
//         </div>
//       </label>

//       {/* Título */}
//       <div>
//         <h1 className="Titulo">Reporte Semanal</h1>
//         <hr />
//       </div>

//       {/* Calendario */}
//       <div className="semana-container" onClick={toggleCalendario}>
//         <span className="semana-texto">Semana</span>
//         <i className="fa-solid fa-calendar-days"></i>
//       </div>

//       {mostrarCalendario && (
//         <div className="calendario-container">
//           <p>Función de semana disponible para futuras mejoras</p>
//         </div>
//       )}

//       {/* Mensaje */}
//       {mensaje && <p style={{ color: "red", fontWeight: "bold" }}>{mensaje}</p>}

//       {/* Gráfico */}
//       <div className="chart-card">
//         <canvas id="chartSemanal"></canvas>
//       </div>
//     </div>
//   );
// }

// export default ReporteSemanal;










// src/pages/ReporteSemanal.jsx
import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "./Semanal1.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

Chart.register(...registerables);

function ReporteSemanal() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [chartInstance, setChartInstance] = useState(null);
  const [mensaje, setMensaje] = useState("Selecciona una semana para ver los datos");

  const toggleCalendario = () => setMostrarCalendario(!mostrarCalendario);

  const actualizarDatos = async () => {
    if (!fechaSeleccionada) return;

    // Extraer año y semana
    const [yearStr, weekStr] = fechaSeleccionada.split("-W");
    const year = parseInt(yearStr, 10);
    const week = parseInt(weekStr, 10);

    try {
      const response = await fetch(
        `http://localhost:4000/api/semana_especifica?year=${year}&week=${week}`
      );
      if (!response.ok) throw new Error("Error en la API");

      const data = await response.json();
      console.log("📊 Datos recibidos:", data);

      if (!data || data.length === 0) {
        setMensaje("No hay registros para esta semana");
        if (chartInstance) chartInstance.destroy();
        return;
      }

      setMensaje("");

      // Solo una semana
      const labels = [`Semana ${week}`];

      // Métodos de pago
      const metodos = ["QR", "EFECTIVO", "DATAFONO"];
      const colores = { QR: "#9ea0a8", EFECTIVO: "#efe0c7", DATAFONO: "#9C27B0" };

      const datasets = metodos.map(metodo => ({
        label: metodo,
        data: [data.find(d => d.metodo_pago === metodo)?.total || 0],
        backgroundColor: colores[metodo]
      }));

      const ctx = document.getElementById("chartSemanal").getContext("2d");
      if (chartInstance) chartInstance.destroy();

      const newChart = new Chart(ctx, {
        type: "bar",
        data: { labels, datasets },
        options: {
          responsive: true,
          plugins: { legend: { display: true } },
          scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
        },
      });

      setChartInstance(newChart);

    } catch (err) {
      console.error("Error al cargar datos:", err);
      setMensaje("Error al cargar datos del servidor");
    }
  };

  return (
    <div>
      <header className="barra-superior">
        <img src={LogoEmpren} alt="Logo" className="logosem" />
      </header>

      <label>
        <input className="lineas-check" type="checkbox" />
        <div className="Lineas">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu">
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

      <h1 className="Titulo">Reporte Semanal</h1>
      <hr />

      <div className="semana-container" onClick={toggleCalendario}>
        <span className="semana-texto">Selecciona Semana</span>
        <i className="fa-solid fa-calendar-days"></i>
      </div>

      {mostrarCalendario && (
        <div className="calendario-container">
          <input
            type="week"
            value={fechaSeleccionada}
            onChange={e => setFechaSeleccionada(e.target.value)}
          />
          <button onClick={actualizarDatos}>Ver Datos</button>
        </div>
      )}

      {mensaje && <p style={{ color: "red", fontWeight: "bold" }}>{mensaje}</p>}

      <div className="chart-card">
        <canvas id="chartSemanal"></canvas>
      </div>
    </div>
  );
}

export default ReporteSemanal;
