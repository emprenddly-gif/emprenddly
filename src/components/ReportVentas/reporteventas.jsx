import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Modal } from "react-bootstrap"; 
import "./reporteventas.css";

// imágenes
import LogoEmpren from "../../assets/Logo_Empren.png";
import Borrador from "../../assets/Borrador.png";
import Cartulina from "../../assets/Cartulina.png";
import Cintas from "../../assets/Cintas.png";
import Colores from "../../assets/Colores.png";
import Compas from "../../assets/Compas.png";
import Correctores from "../../assets/Correctores.png";
import Cuaderno from "../../assets/Cuaderno.png";
import Esferos from "../../assets/Esferos.png";
import Fomi from "../../assets/Fomi.png";
import Grapas from "../../assets/Grapas.png";
import Lapiceros from "../../assets/lapiceros.png"; // ✅ minúscula
import Libro from "../../assets/Libro.png";
import Marcador from "../../assets/Marcador.png";
import Pegantes from "../../assets/Pegantes.png";
import Pinceles from "../../assets/Pinceles.png";
import Reglas from "../../assets/Reglas.png";
import Resaltadores from "../../assets/Resaltadores.png";
import Temperas from "../../assets/Temperas.png";
import Tijeras from "../../assets/Tijeras.png";
import Libretas from "../../assets/Libretas.png";

// 🔹 MAPA DE IMÁGENES (CLAVE = NOMBRE EN BD)
const imagenesPorProducto = {
  Borrador,
  Cartulina,
  Cintas,
  Colores,
  Compas,
  Correctores,
  Cuaderno,
  Esferos,
  Fomi,
  Grapas,
  Lapiceros,
  Libro,
  Libretas,
  Marcador,
  Pegantes,
  Pinceles,
  Reglas,
  Resaltadores,
  Temperas,
  Tijeras
};

function ReporteVentas() {
  const [modalData, setModalData] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/reporteventas")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const abrirModal = (producto) => setModalData(producto);
  const cerrarModal = () => setModalData(null);

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        <img src={LogoEmpren} alt="Logo" className="logoem" />
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
      <h1 className="Titulo">Reporte Ventas</h1>
      <hr />

      {/* Productos en carrusel */}
      <h1 className="Titulo">Productos:</h1>
      {productos.length > 0 ? (
        <Carousel interval={null} controls indicators={false} className="products-carousel">
          {productos.map((prod, index) => {
            const nombre = prod.Producto || prod.Nombre;

            return (
              <Carousel.Item key={index}>
                <img
                  src={imagenesPorProducto[nombre] || Cuaderno}
                  alt={nombre}
                  className="d-block w-100 img-producto"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    abrirModal({
                      producto: nombre,
                      precio: prod.Precio,
                      cantidad: prod.Cantidad ?? "N/A",
                      fecha: prod.Fecha_Venta ?? "Sin fecha",
                      imagen: imagenesPorProducto[nombre] || Cuaderno,
                      metodoPago: prod.Metodo_Pago ?? "No especificado"
                    })
                  }
                />
                <Carousel.Caption>
                  <h5>{nombre}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <p>Cargando productos...</p>
      )}

      {/* Modal */}
      <Modal show={!!modalData} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.producto}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Precio:</strong> {modalData?.precio}</p>
          <p><strong>Cantidad comprada:</strong> {modalData?.cantidad}</p>
          <p><strong>Fecha:</strong> {modalData?.fecha}</p>
          <p><strong>Método de pago:</strong> {modalData?.metodoPago}</p>
          <img
            src={modalData?.imagen}
            alt={modalData?.producto}
            className="img-modal"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReporteVentas;
