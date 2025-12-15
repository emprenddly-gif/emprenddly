// src/pages/RegistroInventario.jsx
import { useState, useEffect } from "react";
import "./RegistroInventario.css";
import LogoEmpren from "../../assets/Logo_Empren.png";
import AddImageIcon from "../../assets/Cargar_Imagen.png";


const RegistroInventario = () => {
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);


  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
    imagen: null,
  });

    // 🔹 Cargar inventario desde backend al iniciar
useEffect(() => {
  const cargarInventario = async () => {
    try {
      const res = await fetch("http://localhost:4000/inventario");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error cargando inventario:", err);
    }
  };
  cargarInventario();
}, []);


  
  const abrirModal = () => {
   setNuevoProducto({
     nombre: "",
     cantidad: "",
     precio: "",
     imagen: null, // siempre vuelve a la camarita
   });
   setModalOpen(true);
  };

  const cerrarModal = () => setModalOpen(false);

const abrirModalEditar = (producto) => {
  setProductoEdit({
    ID_INVENTARIO: producto.ID_INVENTARIO,
    NOMBRE: producto.NOMBRE,
    CANTIDAD: producto.CANTIDAD,
    VALOR_UNITARIO: producto.VALOR_UNITARIO
  });
  setModalEditOpen(true);
};



const cerrarModalEditar = () => {
  setModalEditOpen(false);
  setProductoEdit(null);
};


  const cargarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoProducto({ ...nuevoProducto, imagen: URL.createObjectURL(file) });
    }
  };

  // 🔹 Guardar producto en backend
  const guardarProducto = async () => {
    if (nuevoProducto.nombre && nuevoProducto.cantidad && nuevoProducto.precio) {
      try {
        const res = await fetch("http://localhost:4000/inventario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            NOMBRE: nuevoProducto.nombre,
            CANTIDAD: Number(nuevoProducto.cantidad ) || 0,
            VALOR_UNITARIO: Number(nuevoProducto.precio) || 0,
            Id_Productos: 1, // temporal, luego lo relacionamos con productos reales
          }),
        });

        const data = await res.json(); // objeto completo
   // Mapear siempre a la misma estructura que la tabla
      const nuevo = {
        ID_INVENTARIO: data.ID_INVENTARIO,
        NOMBRE: data.NOMBRE,
        CANTIDAD: data.CANTIDAD,
        VALOR_UNITARIO: data.VALOR_UNITARIO,
      };

      setProductos([...productos, nuevo]); // actualizar tabla
      cerrarModal();
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  } else {
    alert("Por favor completa todos los campos obligatorios");
  }
};

  // 🔹 Actualizar producto en backend
  const actualizarProducto = async () => {
    try {
       const res = await fetch(`http://localhost:4000/inventario/${productoEdit.ID_INVENTARIO}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
          NOMBRE: productoEdit.NOMBRE,
          CANTIDAD: productoEdit.CANTIDAD,
          VALOR_UNITARIO: productoEdit.VALOR_UNITARIO,
        }),
      });
      const actualizado = await res.json(); // <-- datos confirmados desde backend
      const listaActualizada = productos.map(p =>
        p.ID_INVENTARIO === actualizado.ID_INVENTARIO ? actualizado : p
      );
      setProductos(listaActualizada);
      cerrarModalEditar();
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  };

  // 🔹 Eliminar producto en backend
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await fetch(`http://localhost:4000/inventario/${id}`, {
          method: "DELETE",
        });
        setProductos(productos.filter(p => p.ID_INVENTARIO !== id));
      } catch (err) {
        console.error("Error al eliminar producto:", err);
      }
    }
  };

  return (
    <div className="pagina_inventario2">
      {/* Header */}
      <header className="barra-superior_2">
        <img src={LogoEmpren} alt="Logo" className="logo2" />
      </header>

      {/* Sidebar menu */}
      <label>
        <input className="lineas-check" type="checkbox" />
        <div className="Lineas2">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>
      
        <div className="MenuRegistro2">
          <h1 className="menu2">Menu</h1>
          <ul className="ul2">
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
      <h1 className="Titulo2">Registro De Inventario</h1>
      <hr className="hr2" />

      {/* Buscar */}
      <div className="Buscar">
        <input
          type="text"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          placeholder="Nombre del producto a Buscar..."
        />
      </div>

      {/* Tabla */}
      <div className="Container02">
        <table>
          <thead>
            <tr>
              <th>Nombre Del Producto</th>
              <th>Cantidad De Producto</th>
              <th>Precio Del Producto</th>
            </tr>
          </thead>
          <tbody>
            {productos
              .filter((p) =>
              p.NOMBRE.toLowerCase().includes(buscar.toLowerCase())
            )

            .map((p, index) => (
            <tr key={index}>
              <td>{p.NOMBRE}</td>
              <td>{p.CANTIDAD}</td>
              <td>{p.VALOR_UNITARIO}</td>
            <td>
                    <i
                      className="fas fa-edit edit-icon"
                      onClick={() => abrirModalEditar(p)}
                    ></i>
                    <i
                      className="fas fa-trash delete-icon"
                      onClick={() => eliminarProducto(p.ID_INVENTARIO)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Botón agregar */}
      <div className="btn-container">
        <button onClick={abrirModal}>Agregar producto</button>
      </div>

      {/* Modal Agregar */}
      {modalOpen && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <h3>Ingresa un nuevo producto</h3>
           
            <label htmlFor="imagenInput" className="image-label">
              <img
                id="previewImg"
                src={nuevoProducto.imagen || AddImageIcon} //muestra icono si no hay imagen
                alt="Imagen producto"
              />
            </label>
            <input
              id="imagenInput"
              type="file"
              accept="image/*"
              onChange={cargarImagen}
              style={{ display: "none" }} // ocultamos el input
            />

            <input
              type="text"
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={nuevoProducto.cantidad}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Precio"
              value={nuevoProducto.precio}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
              }
            />
            <button className="btn-primary" onClick={guardarProducto}>
              Agregar producto
            </button>
            <button className="btn-secondary" onClick={cerrarModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {modalEditOpen && productoEdit &&(
        <div id="modalEditar" className="modal">
          <div className="modal-content">
            <h3>Editar producto</h3>
            <input
              type="text"
               value={productoEdit.NOMBRE}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, NOMBRE: e.target.value })
              }
            />
            <input
              type="number"
              value={productoEdit.CANTIDAD}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, CANTIDAD: Number(e.target.value) })
              }
            />
            <input
              type="number"
              value={productoEdit.VALOR_UNITARIO}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, VALOR_UNITARIO: Number(e.target.value) })
              }
            />
            <button className="btn-primary" onClick={actualizarProducto}>
              Actualizar
            </button>
            <button className="btn-secondary" onClick={cerrarModalEditar}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroInventario;






