 

// // src/pages/ReporteMensual.jsx
// import React, { useState, useEffect } from "react";
// import "./ReporteMensual.css";
// import LogoEmpren from "../../assets/Logo_Empren.png";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";

// function ReporteMensual() {
//   const [mostrarCalendario, setMostrarCalendario] = useState(false);
//   const [mesSeleccionado, setMesSeleccionado] = useState("");
//   const [datosChart, setDatosChart] = useState({ labels: [], datasets: [] });
//   const [mensaje, setMensaje] = useState(""); // mensaje de error/no datos

//   const toggleCalendario = () => {
//     setMostrarCalendario(!mostrarCalendario);
//   };

//   const actualizarDatos = async () => {
//     if (!mesSeleccionado) return;

//     try {
//       const [yearStr, monthStr] = mesSeleccionado.split("-");
//       const year = parseInt(yearStr, 10);
//       const month = parseInt(monthStr, 10);

//       const response = await fetch(
//         `http://localhost:4000/api/ganancias_semanales?year=${year}&month=${month}`
//       );

//       if (!response.ok) {
//         throw new Error("Error en la respuesta del servidor");
//       }

//       const data = await response.json();
//       console.log("Datos recibidos del backend:", data);

//       if (!Array.isArray(data) || data.length === 0) {
//         setMensaje("No hay registros para este mes");
//         setDatosChart({ labels: [], datasets: [] });
//         return;
//       }

//       setMensaje("");

//       // Sacamos todas las semanas que existen en el mes
//       const semanasSet = new Set(data.map(d => d.semana));
//       const semanas = Array.from(semanasSet).sort((a, b) => a - b);
//       const labels = semanas.map(s => `Semana ${s}`);

//       // Agrupar por método
//       const metodos = ["PSE", "QR", "EFECTIVO", "DATAFONO"];
//       const colores = {
//         PSE: "#4CAF50",
//         QR: "#2196F3",
//         EFECTIVO: "#FFC107",
//         DATAFONO: "#9C27B0",
//       };

//     const datasets = metodos.map(metodo => {
//     const valores = semanas.map(semana => {
//     const item = data.find(d => d.semana === semana && d.metodo_pago === metodo);
//     return item && !isNaN(item.total) ? Number(item.total) : 0;
//   });

//   return {
//     label: metodo,
//     data: valores,
//     backgroundColor: colores[metodo] || "#999999",
//   };
// });

// setDatosChart({ labels, datasets });

// console.log("📊 Datasets finales:", datasets);

//       setDatosChart({ labels, datasets });
//       console.log("📊 Datos recibidos:", data);
//       data.forEach(d => console.log(d.semana, d.metodo_pago, d.total));

//     } catch (error) {
//       console.error("Error al actualizar datos:", error);
//       setMensaje("Error al cargar los datos");
//       setDatosChart({ labels: [], datasets: [] });
//     }
//   };

//   useEffect(() => {
//     if (mesSeleccionado) {
//       actualizarDatos();
//     }
//   }, [mesSeleccionado]);

//   const hayDatosReales =
//     datosChart?.labels?.length > 0 &&
//     datosChart?.datasets?.length > 0 &&
//     datosChart.datasets.some(ds => ds.data.some(v => v > 0));

//   return (
//     <div className="reporte_mensual">
//       {/* Barra superior */}
//       <header className="barra-superiormensual">
//         <img src={LogoEmpren} alt="Logo" className="logomensual" />
//       </header>

//       {/* Menú */}
//       <label>
//         <input className="lineas-check" type="checkbox" />
//         <div className="Lineas">
//           <span className="top_line common"></span>
//           <span className="middle_line common"></span>
//           <span className="bottom_line common"></span>
//         </div>

//         <div className="Menu">
//           <h1 className="menu_titulo"> Menu </h1>
//           <ul>
//             <li><a href="#"><i className="fas fa-user"></i>Usuarios</a></li>
//             <li><a href="#"><i className="fas fa-box"></i>Registro De Inventario</a></li>
//             <li><a href="#"><i className="fas fa-clipboard-list"></i>Reporte De Inventario</a></li>
//             <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
//             <li><a href="#"><i className="fas fa-chart-line"></i>Reporte De Ventas</a></li>
//             <li><a href="#"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
//             <li><a href="#"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
//             <li><a href="#"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
//             <li><a href="#"><i className="fas fa-cogs"></i>Ajustes</a></li>
//           </ul>
//         </div>
//       </label>

//       {/* Título */}
//       <div>
//         <h1 className="Titulo_Gana">Reporte de Ganancias</h1>
//         <hr className="gana" />
//       </div>

//       {/* Botón calendario */}
//       <div className="semana-container" id="btn-semana" onClick={toggleCalendario}>
//         <span className="mes-texto">Selecciona Mes</span>
//         <i className="fa-solid fa-calendar-days"></i>
//       </div>

//       {/* Calendario */}
//       {mostrarCalendario && (
//         <div className="calendario-container" id="calendario">
//           <input
//             type="month"
//             value={mesSeleccionado}
//             onChange={e => setMesSeleccionado(e.target.value)}
//           />
//         </div>
//       )}

//       {/* Gráfico */}
//       <div className="chart-card">
//         {mensaje ? (
//           <p style={{ color: "red", fontWeight: "bold" }}>{mensaje}</p>
//         ) : hayDatosReales ? (
//           <Bar
//             data={datosChart}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { position: "top" },
//                 title: {
//                   display: true,
//                   text: `Ganancias ${mesSeleccionado}`,
//                 },
//               },
//               interaction: {
//                 mode: "index",
//                 intersect: false,
//               },
//               scales: {
//                 x: { stacked: true },
//                 y: { stacked: true },
//               },
//             }}
//           />
//         ) : (
//           <p style={{ color: "gray" }}>Selecciona un mes para ver el gráfico</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ReporteMensual;












// src/pages/ReporteMensual.jsx
import React, { useState, useEffect } from "react";
import "./Mensual1.css";
import LogoEmpren from "../../assets/Logo_Empren.png";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function ReporteMensual() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [datosChart, setDatosChart] = useState({ labels: [], datasets: [] });
  const [mensaje, setMensaje] = useState(""); // mensaje de error/no datos

  const toggleCalendario = () => {
    setMostrarCalendario(!mostrarCalendario);
  };

  const actualizarDatos = async () => {
    if (!mesSeleccionado) return;

    try {
      const [yearStr, monthStr] = mesSeleccionado.split("-");
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);

      const response = await fetch(
        `http://localhost:4000/api/ventas_mensuales?year=${year}&month=${month}`
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      const ventas = data.ventas || [];
      console.log("Datos recibidos del backend:", data);

      if (!Array.isArray(ventas) || ventas.length === 0) {
        setMensaje("No hay registros para este mes");
        setDatosChart({ labels: [], datasets: [] });
        return;
      }

      setMensaje("");

      // Sacamos todas las semanas que existen en el mes
      const semanasSet = new Set(ventas.map(d => d.semana));
      const semanas = Array.from(semanasSet).sort((a, b) => a - b);
      const labels = semanas.map(s => `Semana ${s}`);

      // Agrupar por método
      const metodos = ["PSE", "QR", "EFECTIVO", "DATAFONO"];
      const colores = {
        PSE: "#4CAF50",
        QR: "#2196F3",
        EFECTIVO: "#FFC107",
        DATAFONO: "#9C27B0",
      };

      const datasets = metodos.map((metodo) => {
        const valores = semanas.map((semana) => {
          const item = ventas.find(
            d => d.semana === semana && d.metodo_pago === metodo
          );
          // Asegúrate de que el valor sea un número antes de retornarlo
          return item && !isNaN(parseFloat(item.total)) 
          ? parseFloat(item.total) 
          : 0;
        });

        return {
          label: metodo,
          data: valores,
          backgroundColor: colores[metodo] || "#999999",
        };
      });

      // Se usa la función de estado solo una vez con los datos finales
      setDatosChart({ labels, datasets });
      console.log(" Datasets finales:", datasets);
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      setMensaje("Error al cargar los datos");
      setDatosChart({ labels: [], datasets: [] });
    }
  };

  useEffect(() => {
    if (mesSeleccionado) {
      actualizarDatos();
    }
  }, [mesSeleccionado]);

  const hayDatosReales =
    datosChart?.labels?.length > 0 &&
    datosChart?.datasets?.length > 0 &&
    datosChart.datasets.some(ds => ds.data.some(v => v > 0));

  return (
    <div className="reporte_mensual">
      {/* Barra superior */}
      <header className="barra-superiormensual">
        <img src={LogoEmpren} alt="Logo" className="logomensual" />
      </header>

      {/* Menú */}
      <label>
        <input className="lineas-check" type="checkbox" />
        <div className="Lineas">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu">
          <h1 className="menu_titulo"> Menu </h1>
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

      {/* Título */}
      <div>
        <h1 className="Titulo_Gana">Reporte de Ganancias</h1>
        <hr className="gana" />
      </div>

      {/* Botón calendario */}
      <div className="semana-container" id="btn-semana" onClick={toggleCalendario}>
        <span className="mes-texto">Selecciona Mes</span>
        <i className="fa-solid fa-calendar-days"></i>
      </div>

      {/* Calendario */}
      {mostrarCalendario && (
        <div className="calendario-container" id="calendario">
          <input
            type="month"
            value={mesSeleccionado}
            onChange={e => setMesSeleccionado(e.target.value)}
          />
        </div>
      )}

      {/* Gráfico */}
      <div className="chart-card">
        {mensaje ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{mensaje}</p>
        ) : hayDatosReales &&
          datosChart?.labels?.length > 0 &&
          Array.isArray(datosChart.datasets) &&
          datosChart?.datasets?.length > 0 ? (
          <Bar
            key={mesSeleccionado} // fuerza re-render al cambiar de mes
            data={datosChart}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `Ganancias ${mesSeleccionado}`,
                },
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        ) : (
          <p style={{ color: "gray" }}>Selecciona un mes para ver el gráfico</p>
        )}
      </div>
    </div>
  );
}

export default ReporteMensual;




















