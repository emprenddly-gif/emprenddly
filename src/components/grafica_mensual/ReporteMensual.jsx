
// src/pages/ReporteMensual.jsx
import React, { useState, useEffect } from "react";
import "./Mensual1.css";
import LogoEmpren from "../../assets/Logo_Empren.png";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";


import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  Legend,
  ChartDataLabels
);



function ReporteMensual() {
    
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [mesSeleccionado, setMesSeleccionado] = useState("");
const [datosChart, setDatosChart] = useState({ labels: [], datasets: [] });
const [mensaje, setMensaje] = useState("Selecciona un mes para generar el reporte"); // mensaje de error/no datos
const [totalesMes, setTotalesMes] = useState([]); // PARA EL RESUMEN MENSUAL


  const toggleCalendario = () => {
    setMostrarCalendario(!mostrarCalendario);
  };

  const actualizarDatos = async () => {
    if (!mesSeleccionado) return;
     setMensaje("Cargando datos..."); // Feedback de carga

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
        setMensaje("No hay registros de ventas para este mes.");
        setDatosChart({ labels: [], datasets: [] });
        setTotalesMes([]);
        return;
      }

      setMensaje("");

      // Sacamos todas las semanas que existen en el mes
      const semanasSet = new Set(ventas.map(d => d.semana));
      const semanas = Array.from(semanasSet).sort((a, b) => a - b);
      const labels = semanas.map(s => `Semana ${s}`);

      // Agrupar por método
      const metodos = ["QR", "EFECTIVO", "DATAFONO"];
      // Se ajustaron los colores para mejor contraste en el gráfico
      const colores = {
        QR: "#b29bcaff", // Verde
        EFECTIVO: "#95e299ff", // Naranja
        DATAFONO: "#fff16eff", // Azul
      };

      const datasets = metodos.map((metodo) => {
        const valores = semanas.map((semana) => {
          const item = ventas.find(
            d => d.semana === semana && d.metodo_pago === metodo
          );

          const montoStr = item ? item.monto_total : '0'; 
          
          return !isNaN(parseFloat(montoStr)) 
          ? parseFloat(montoStr) 
          : 0;
          
        });

        return {
          label: metodo,
          data: valores,
          backgroundColor: colores[metodo] || "#999999",
        };
      });


      // 1. Establecer los datos para el gráfico
      setDatosChart({ labels, datasets });
      console.log(" Datasets finales:", datasets);

      // 2. CÁLCULO DE TOTALES MENSUALES POR MÉTODO (Para el resumen)
      const totalesMensuales = datasets.map(dataset => {
          const total = dataset.data.reduce((sum, value) => sum + value, 0);
          return {
              label: dataset.label,
              total: total,
              backgroundColor: dataset.backgroundColor
          };
      });

      setTotalesMes(totalesMensuales);

      } catch (error) {
      console.error("Error al actualizar datos:", error);
      setMensaje("Error al cargar los datos del servidor");
      setDatosChart({ labels: [], datasets: [] });
      setTotalesMes([]); // Limpiamos totales en caso de error
    }
  };



  useEffect(() => {
    if (mesSeleccionado) {
      actualizarDatos();
    }
  }, [mesSeleccionado]);

  // Simplificamos la condición de renderizado
const getMonthName = (dateStr) => {
    if (!dateStr) return "Seleccionar Mes";
    try {
        // dateStr es 'YYYY-MM'
        const [yearStr, monthStr] = dateStr.split("-");
        const year = parseInt(yearStr, 10);
        // El mes en Date es 0-indexado (Enero=0, Diciembre=11), por eso -1
        const month = parseInt(monthStr, 10); 
        
        // Creamos la fecha usando la zona horaria local (más seguro)
        const date = new Date(year, month - 1, 1);
        
        // Usamos el formato local para el nombre completo del mes y el año
        return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long' });
    } catch (e) {
        console.error("Error al formatear fecha:", e);
        return dateStr;
    }
}

// ⭐️ RE-DEFINICIÓN DE LA VARIABLE QUE FALTABA
  const hayDatosReales =
    datosChart?.labels?.length > 0 &&
    datosChart?.datasets?.length > 0;
    
    // Usamos la función auxiliar definida arriba
    const tituloGrafico = `Ventas por Método - ${getMonthName(mesSeleccionado)}`;

  return (
    <div className="fondomes">
      {/* Barra superior */}
      <header className="barra-superiormensual">
        <img src={LogoEmpren} alt="Logo" className="logomensual" />
      </header>

      {/* Menú (sin cambios) */}
      <label>
        <input className="lineas-check_mes" type="checkbox" />
        <div className="Lineas_mes">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu_mes">
          <h1 className="menu_titulo_mes"> Menu </h1>
          <ul className="ul.mes">
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
        <h1 className="Titulo_mes">Reporte de Ganancias Mensual</h1>
        <hr className="mes_linea" />
      </div>

      {/* Contenedor de selección de Mes */}
      <div className="selector-wrapper">
          <div className="mes-container" onClick={toggleCalendario}>
            <span className="mes-texto">
                {mesSeleccionado ? getMonthName(mesSeleccionado) : 'Seleccionar Mes'}
            </span>
            <i className="fa-solid fa-calendar-days"></i>
          </div>
          
          {mostrarCalendario && (
              <div className="calendario-container_mes">
                  <input
                      type="month"
                      value={mesSeleccionado}
                      onChange={e => { setMesSeleccionado(e.target.value); setMostrarCalendario(false);}} // Cierra al seleccionar
                  />
              </div>
          )}
      </div>

      {/* Gráfico */}
      <div className="chart-card">
        {mensaje ? (
          <p className="mensaje-card">{mensaje}</p>
        ) : hayDatosReales ? (
          <Bar
            key={mesSeleccionado} 
            data={datosChart}
            options={{
              responsive: true,
              maintainAspectRatio: false, 
              plugins: {
                legend:{
                position: "top" ,
                labels: {
                  font: { size: 12 }, 
                }
              },

                tooltip: { 
                    enabled: true, // Habilitar Tooltip para mejor UX
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }, 
                title: {
                  display: true,
                  text: tituloGrafico,
                  font: { size: 16, weight: 'bold' } 
                },


                // ⭐️ CONFIGURACIÓN PARA MOSTRAR LOS VALORES EN LAS BARRAS
                datalabels: {
                  color: '#333', // Color del texto
                  anchor: 'end', 
                  align: 'top',
                  offset: 2, 
                  font: {
                    weight: 'bold',
                    size: 8 
                  },
                  formatter: function(value, context) {
                    // Muestra el valor abreviado si es positivo
                    return value > 0 ? `$${(value / 1000).toFixed(0)}k` : ''; 
                  }
                },
                
                // FIN DATALABELS
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: { stacked: true },
                y: { 
                  stacked: true,
                  afterDataLimits: (axis) => {
                    axis.max = axis.max * 1.15; 
                  },
                   ticks: {
                       callback: function(value) {
                           return `$${(value / 1000).toFixed(0)}k`; // Formato del eje Y en K
                       }
                   }
                },
              },
            }}
          />
        ) : (
          <p className="mensaje-card">Selecciona un mes para ver el gráfico</p>
        )}
      </div>

      {/* RESUMEN DE TOTALES MENSUALES */}
      {hayDatosReales && totalesMes.length > 0 && (
          <div className="totales-mensuales-container card-shadow">
               <h3 className="resumen-titulo">Resumen por Método de Pago</h3>
              <table className="ganancias-table">
                  <thead>
                    <tr>
                        <th className="table-header">Método</th>
                        <th className="table-header total-col">Total Mensual</th>
                    </tr>
              </thead>
<tbody>
                {totalesMes.map((item, index) => (
                    <tr key={index} className="table-row">
                        <td className="table-data metodo-cell">
                            <span 
                                className="color-indicator"
                                style={{ backgroundColor: item.backgroundColor }}
                            ></span>
                            {item.label}
                        </td>
                        <td className="table-data total-col">
                            **${item.total.toLocaleString('es-CO', { minimumFractionDigits: 0 })}**
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Calculamos el total general para mostrarlo al final */}
        {(() => {
            const totalGeneral = totalesMes.reduce((sum, item) => sum + item.total, 0);
            return (
                <div className="total-general">
                    <span>TOTAL DE GANANCIAS DEL MES:</span>
                    <span className="total-monto">
                        **${totalGeneral.toLocaleString('es-CO', { minimumFractionDigits: 0 })}**
                    </span>
                </div>
            );
        })()}
    </div>
)}
{/* FIN RESUMEN EN TABLA */}


    </div>
  );
}

export default ReporteMensual;







