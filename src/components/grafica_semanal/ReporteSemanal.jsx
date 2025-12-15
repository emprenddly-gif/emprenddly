// //src/pages/ReporteSemanal.jsx
// import React, { useState, useEffect } from "react";
// import { Chart, registerables } from "chart.js";
// import "./Semanal1.css";
// import LogoEmpren from "../../assets/Logo_Empren.png";

// Chart.register(...registerables);

// function ReporteSemanal() {
//   const [mostrarCalendario, setMostrarCalendario] = useState(false);
//   const [fechaSeleccionada, setFechaSeleccionada] = useState("");
//   const [chartInstance, setChartInstance] = useState(null);
//   const [mensaje, setMensaje] = useState("Selecciona una semana para ver los datos");

//   const toggleCalendario = () => setMostrarCalendario(!mostrarCalendario);

//   const actualizarDatos = async () => {
//     if (!fechaSeleccionada) return;

//     // Extraer año y semana
//     const [yearStr, weekStr] = fechaSeleccionada.split("-W");
//     const year = parseInt(yearStr, 10);
//     const week = parseInt(weekStr, 10);

//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/semana_especifica?year=${year}&week=${week}`
//       );
//       if (!response.ok) throw new Error("Error en la API");

//       const data = await response.json();
//       console.log("Datos recibidos:", data);

//       if (!data || data.length === 0) {
//         setMensaje("No hay registros para esta semana");
//         if (chartInstance) chartInstance.destroy();
//         return;
//       }
//       setMensaje("");




//       const colores = { 
//         QR: "#9C27B0",      // Morado
//         EFECTIVO: "#4CAF50", // Verde
//         DATAFONO: "#FF9800"  // Naranja
//       };

//       // 1. Obtener las etiquetas (nombres de los métodos)
//       const labels = data.map(d => d.metodo_pago);

//       // 2. Obtener los valores (montos totales) y convertirlos a número
//       const montos = data.map(d => parseFloat(d.monto_total || 0));
      
//       // 3. Crear el array de colores en el orden de los datos
//       const backgroundColors = data.map(d => colores[d.metodo_pago] || '#CCCCCC');
      
//       const datasets = [{
//         label: `Ventas Semana ${week}`,
//         data: montos,
//         backgroundColor: backgroundColors,
//         hoverOffset: 4
//       }];

//       const ctx = document.getElementById("chartSemanal").getContext("2d");
      
//       if (!ctx) {
//          console.error("Canvas element 'chartSemanal' not found.");
//          setMensaje("Error: Elemento de gráfico no encontrado.");
//          return;
//         }

//       if (chartInstance) chartInstance.destroy();

//       const newChart = new Chart(ctx, {
//        type: "pie", // Gráfico de pastel para distribución por método de pago
//         data: { labels, datasets },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false, // Permite que el contenedor controle el tamaño
//           plugins: { 
//             legend: { 
//                display: true,
//                position: 'right', // Mover la leyenda a la derecha
//             },
//             title: {
//                 display: true,
//                 text: `Distribución de Ventas por Método (Semana ${week})`,
//                 font: { size: 10 }
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function(context) {
//                         let label = context.label || '';
//                         if (label) {
//                             label += ': ';
//                         }
//                         if (context.parsed !== null) {
//                             label += new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(context.parsed);
//                         }
//                         return label;
//                     }
//                 }
//             }
//           },
//           scales: {} 
//         },
//       });

//       setChartInstance(newChart);

//     } catch (err) {
//       console.error("Error al cargar datos:", err);
//       setMensaje("Error al cargar datos del servidor");
//     }
//   };
//     useEffect(() => {
//     // Limpieza al desmontar el componente
//     return () => {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }
//     };
//   }, [chartInstance]);

//   return (
//     <div className="Semana_Body">
//       <header className="barra-superior_sema">
//         <img src={LogoEmpren} alt="Logo" className="logosem" />
//       </header>

//       <label>
//         <input className="lineas-check_sema" type="checkbox" />
//         <div className="Lineas_sema">
//           <span className="top_line common"></span>
//           <span className="middle_line common"></span>
//           <span className="bottom_line common"></span>
//         </div>

//         <div className="Menu_semana">
//           <h1 className="menu_titulo_sema">Menu</h1>
//           <ul className="ulsema">
//             <li><a href="http://localhost:5173/usuarios"><i className="fas fa-user"></i>Usuarios</a></li>
//             <li><a href="http://localhost:5173/registroinventario"><i className="fas fa-clipboard-list"></i>Inventario</a></li>
//             <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
//             <li><a href="http://localhost:5173/reporteventas"><i className="fas fa-chart-line"></i>Reporte De Ventas</a></li>
//             <li><a href="http://localhost:5173/registrogastos"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
//             <li><a href="http://localhost:5173/reportegastos"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
//             <li><a href="http://localhost:5173/menureporte"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
//             <li><a href="http://localhost:5173/ajustes"><i className="fas fa-cogs"></i>Ajustes</a></li>
//           </ul>
//         </div>
//       </label>

//       <h1 className="Titulo_sema">Reporte Semanal  </h1>
//       <hr className="hrsema" />

//       <div className="semana-container" onClick={toggleCalendario}>
//         <span className="semana-texto">Selecciona Semana</span>
//         <i className="fa-solid fa-calendar-days" ></i>
//       </div>

//       {mostrarCalendario && (
//         <div className="calendario-container_sema">
//           <input
//             type="week"
//             value={fechaSeleccionada}
//             onChange={e => setFechaSeleccionada(e.target.value)}
//           />
//           <button className="botonsema" onClick={actualizarDatos}>Ver Datos</button>
//         </div>
//       )}

      
// <p className="psema">Selecciona un mes para ver el gráfico</p>
//       <div className="chart-card">
//         <canvas id="chartSemanal"></canvas>
        
//       </div>
//     </div>
//   );
// }

// export default ReporteSemanal;























//src/pages/ReporteSemanal.jsx
import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "./Semanal1.css";
import LogoEmpren from "../../assets/Logo_Empren.png";
import TablaGanancias from "./TablaGanancias.jsx";

Chart.register(...registerables);

function ReporteSemanal() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [chartInstance, setChartInstance] = useState(null);
  const [mensaje, setMensaje] = useState("Selecciona una semana para ver los datos");


 // NUEVOS ESTADOS PARA GANANCIAS NETAS
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [gastosTotales, setGastosTotales] = useState(0);
  const [mostrarGanancias, setMostrarGanancias] = useState(false);
  const [cargandoGanancias, setCargandoGanancias] = useState(false);
  const [semanaActual, setSemanaActual] = useState(null);


  const toggleCalendario = () => setMostrarCalendario(!mostrarCalendario);

  //FUNCIÓN PARA OBTENER Y CALCULAR LAS GANANCIAS
  const obtenerGananciasNetas = async () => {
    if (!fechaSeleccionada) return;

    // Si la tabla ya se está mostrando, la ocultamos y terminamos
    if (mostrarGanancias) {
      setMostrarGanancias(false);
      // También limpiamos la semana actual al ocultar
      setSemanaActual(null); 
      return;
    }

    setMostrarGanancias(true);
    setCargandoGanancias(true);
    setIngresosTotales(0);
    setGastosTotales(0);
    setSemanaActual(null); // Limpiar antes de la nueva carga

    const [yearStr, weekStr] = fechaSeleccionada.split("-W");
    const year = parseInt(yearStr, 10);
    const week = parseInt(weekStr, 10);
    
    // 🟢 CORRECCIÓN: Almacenar la semana en el estado antes de la llamada a la API
    setSemanaActual(weekStr);

    try {
      // 1. OBTENER INGRESOS TOTALES (Ventas)
      const resVentas = await fetch(
        `http://localhost:4000/api/semana_especifica?year=${year}&week=${week}`
      );
      if (!resVentas.ok) throw new Error("Error cargando ventas");
      
      const dataVentas = await resVentas.json();
      const totalIngresos = dataVentas.reduce(
        (acc, item) => acc + parseFloat(item.monto_total || 0),
        0
      );
      setIngresosTotales(totalIngresos);
      
      // 2. OBTENER GASTOS TOTALES (Usando la nueva API)
      const resGastos = await fetch(
        `http://localhost:4000/reportegastos/semana_especifica?year=${year}&week=${week}` 
      );
      
      // ⚠️ IMPORTANTE: Si la respuesta de gastos no es OK, aún mostramos la tabla de ingresos con gastos = 0.
      if (!resGastos.ok) {
        console.warn("⚠️ Advertencia: Error al cargar gastos. Asumiendo Gastos Totales = 0.");
        setGastosTotales(0);
      } else {
          const dataGastos = await resGastos.json();
          // ⚠️ Asumiendo que el backend devuelve { totalGastos: X.XX }
          const totalGastos = parseFloat(dataGastos.totalGastos || 0); 
          setGastosTotales(totalGastos);
      }


    } catch (err) {
      console.error("Error al calcular ganancias:", err);
      alert("Error al cargar datos de ingresos/gastos del servidor. Revisa tu consola para más detalles.");
      setMostrarGanancias(false); // Ocultar tabla si hay un error crítico
      setSemanaActual(null); // Limpiar semana
    } finally {
      setCargandoGanancias(false);
    }
  };
  // FIN FUNCIÓN GANANCIAS NETA


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
      console.log("Datos recibidos:", data);

      if (!data || data.length === 0) {
        setMensaje("No hay registros para esta semana");
        if (chartInstance) chartInstance.destroy();
        return;
      }
      setMensaje("");

      const colores = { 
        QR: "#cfa775ff",      // Morado
        EFECTIVO: "#568ca5ff", // Verde
        DATAFONO: "#74c078ff"  // Naranja
      };

      // 1. Obtener las etiquetas (nombres de los métodos)
      const labels = data.map(d => d.metodo_pago);

      // 2. Obtener los valores (montos totales) y convertirlos a número
      const montos = data.map(d => parseFloat(d.monto_total || 0));
      
      // 3. Crear el array de colores en el orden de los datos
      const backgroundColors = data.map(d => colores[d.metodo_pago] || '#CCCCCC');
      
      const datasets = [{
        label: `Ventas Semana ${week}`,
        data: montos,
        backgroundColor: backgroundColors,
        hoverOffset: 4
      }];

      const ctx = document.getElementById("chartSemanal").getContext("2d");
      
      if (!ctx) {
         console.error("Canvas element 'chartSemanal' not found.");
         setMensaje("Error: Elemento de gráfico no encontrado.");
         return;
        }

      if (chartInstance) chartInstance.destroy();

      const newChart = new Chart(ctx, {
  type: "bar",
  data: { 
    labels, 
    datasets: [{
      label: "Monto total",
      data: montos,
      backgroundColor: backgroundColors,
      borderRadius: 8, // barras modernas
      barThickness: 35 // se ve perfecto en celular
    }]
  },
  options: {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      title: {
        display: true,
        text: `Ventas por Método (Semana ${week})`,
        font: { size: 14 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP'
            }).format(context.parsed.x);
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { font: { size: 12 } }
      },
      y: {
        ticks: { font: { size: 14 } }
      }
    }
  }
});





      setChartInstance(newChart);

    } catch (err) {
      console.error("Error al cargar datos:", err);
      setMensaje("Error al cargar datos del servidor");
    }
  };
    useEffect(() => {
    // Limpieza al desmontar el componente
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  return (
    <div className="Semana_Body">
      <header className="barra-superior_sema">
        <img src={LogoEmpren} alt="Logo" className="logosem" />
      </header>

      <label>
        <input className="lineas-check_sema" type="checkbox" />
        <div className="Lineas_sema">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu_semana">
          <h1 className="menu_titulo_sema">Menu</h1>
          <ul className="ulsema">
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


    
      <h1 className="Titulo_sema">Reporte Semanal  </h1>
      <hr className="hrsema" />

      <div className="semana-container" onClick={toggleCalendario}>
        <span className="semana-texto">Selecciona Semana</span>
        <i className="fa-solid fa-calendar-days" ></i>
      </div>

      {mostrarCalendario && (
        <div className="calendario-container_sema">
          <input
            type="week"
            value={fechaSeleccionada}
            onChange={e => {
              setFechaSeleccionada(e.target.value);
              setMostrarGanancias(false); // Esconder la tabla al cambiar de semana
            }}
          />
          <button className="botonsema" onClick={actualizarDatos}>Ver Datos</button>
        </div>
      )}

      {/*  BOTÓN DE GANANCIAS NETAS */}
      <div className="contenedor-boton-ganancias">
        <button 
          className="boton-ganancias-netas" 
          onClick={obtenerGananciasNetas}
          disabled={!fechaSeleccionada || cargandoGanancias}
          style={{ 
            backgroundColor: mostrarGanancias ? '#CC6666' : '#568ca5ff', // Cambia color si está activo
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          {cargandoGanancias 
            ? 'Cargando...' 
            : (mostrarGanancias ? 'Ocultar Ganancias Netas' : 'Mostrar Ganancias Netas')}
        </button>
      </div>

      {/*  TABLA DE GANANCIAS */}
      {mostrarGanancias && !cargandoGanancias && fechaSeleccionada && (
        <TablaGanancias 
          ingresos={ingresosTotales} 
          gastos={gastosTotales}
          semana={semanaActual}
        />
      )}
      {mostrarGanancias && cargandoGanancias && <p style={{textAlign: 'center', marginTop: '10px'}}>Calculando...</p>}

      <p className="psema">Selecciona un mes para ver el gráfico</p>
      <div className="chart-card">
        <canvas id="chartSemanal"></canvas>
      </div>
    </div>
  );
}

export default ReporteSemanal;




































