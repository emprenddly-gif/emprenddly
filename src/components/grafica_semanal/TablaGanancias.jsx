// src/components/TablaGanancias.jsx
import React from 'react';

// Función para formatear a moneda (COP)
const formatCurrency = (amount) => {
  // Aseguramos que el valor sea numérico, incluso si viene como string
  const numericAmount = parseFloat(amount) || 0;
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0, // Puedes cambiar a 2 si quieres decimales
  }).format(numericAmount);
};

function TablaGanancias({ ingresos, gastos, semana }) {
  const gananciaNeta = ingresos - gastos;
  const isPositive = gananciaNeta >= 0;

  return (
    <div className="ganancias-tabla-container">
      <h2 className="ganancias-titulo">Resumen Financiero - Semana {semana}</h2>
      <table className="ganancias-tabla">
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ingresos Totales (Ventas)</td>
            <td className="monto-ingresos">{formatCurrency(ingresos)}</td>
          </tr>
          <tr>
            <td>Gastos Totales</td>
            {/* Mostrar el gasto sin signo, pero visualmente como egreso */}
            <td className="monto-gastos">{formatCurrency(gastos)}</td> 
          </tr>
          <tr className={`total-row ${isPositive ? 'positivo' : 'negativo'}`}>
            <td>**GANANCIA NETA**</td>
            <td>
              **{formatCurrency(gananciaNeta)}**
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TablaGanancias;