import { useEffect, useState } from "react";
import axios from "axios";
import "./RegistroVentas.css";
import Modal from "../Modal";



export default function RegistroVentas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [ventaEditando, setVentaEditando] = useState(null);



  const [form, setForm] = useState({
    productoSeleccionado: "", 
    nuevoProducto: "",        
    cantidad: "",
    Id_Metodo: 1,
    Id_Usuarios: 1,
    imagen: null,
    precioNuevoProducto: ""   
  });

  useEffect(() => {
    axios.get("http://localhost:4000/api/sales/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));

      cargarVentas();
  }, []);



  //componentes:

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setForm({ ...form, imagen: files[0] });
    } else {
      setForm({ ...form, [name]: name === "Id_Metodo" ? parseInt(value) : value });
    }
  };

  const abrirEditarProducto = (producto) => {
  setProductoEditando(producto);
 };


 const registrarVenta = async (e) => {
  e.preventDefault();

  try {
    let nombreProductoFinal = "";
    let precioFinal = null;

    if (form.productoSeleccionado) {
      // 👉 Producto existente
      const producto = productos.find(
        p => p.Id_Productos === parseInt(form.productoSeleccionado)
      );

      if (!producto) {
        alert("Producto no encontrado");
        return;
      }

      nombreProductoFinal = producto.Nombre;
    } else {
      // 👉 Producto nuevo
      if (!form.nuevoProducto || !form.precioNuevoProducto) {
        alert("Debes ingresar nombre y precio del producto nuevo");
        return;
      }

      nombreProductoFinal = form.nuevoProducto;
      precioFinal = form.precioNuevoProducto;
    }

    const formData = new FormData();
    formData.append("nombreProducto", nombreProductoFinal);
    formData.append("cantidad", form.cantidad);
    formData.append("Id_Metodo", form.Id_Metodo);
    formData.append("Id_Usuarios", form.Id_Usuarios);


    if (form.imagen) {
  formData.append("imagen", form.imagen);
}

    if (precioFinal !== null) {
      formData.append("precioNuevoProducto", precioFinal);
    }

    await axios.post("http://localhost:4000/api/sales", formData);

    await cargarVentas();

    setForm({
      productoSeleccionado: "",
      nuevoProducto: "",
      cantidad: "",
      Id_Metodo: 1,
      Id_Usuarios: 1,
      imagen: null,
      precioNuevoProducto: ""
    });

    setMostrarFormulario(false);

  } catch (error) {
    console.error(error);
    alert("Error al registrar la venta");
  }
};

  const cargarVentas = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/sales");
        setVentas(res.data);
      } catch (error) {
        console.error(error);
      }
  };
  const cargarProductos = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/sales/productos");
    setProductos(res.data);
  } catch (error) {
    console.error("Error al cargar productos", error);
  }
};


  const guardarProductoEditado = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `http://localhost:4000/api/sales/productos/${productoEditando.Id_Productos}`,
      {
        Nombre: productoEditando.Nombre,
        Precio: productoEditando.Precio
      }
    );

    // Recargar productos
    await cargarProductos();


    setProductoEditando(null);
  } catch (error) {
    console.error(error);
    alert("Error al editar producto");
  }
};


const abrirEditarVenta = (venta) => {
  setVentaEditando(venta);

  setForm({
    productoSeleccionado: "",
    nuevoProducto: venta.nombreProducto,
    cantidad: venta.cantidad,
    precioNuevoProducto: venta.precio,
    Id_Metodo: 1,
    Id_Usuarios: 1,
    imagen: null
  });

  setMostrarFormulario(true);
};



return (
  <div className="registro-container">
    <h2>Registro de Ventas</h2>

    {!mostrarFormulario && (
      <>
        <button onClick={() => setMostrarFormulario(true)}>
          + Agregar venta
        </button>
        <h3>Ventas registradas</h3>

        <ul className="ventas-lista">
  {ventas.map((v) => (
    <li key={v.Id_Venta}>
      {v.imagen && (
        <img
          src={`http://localhost:4000/${v.imagen}`}
          alt={v.nombreProducto}
          width="60"
        />
      )}

          <div>
            <strong>{v.nombreProducto}</strong><br />
            Cantidad: {v.cantidad}<br />
            Precio: ${v.precio}
          </div>

          <button className= "btn-primary" onClick={() => abrirEditarVenta(v)}>
            Editar
          </button>
        </li>
      ))}
    </ul>

      </>
    )}

    <Modal
      isOpen={mostrarFormulario}
      onClose={() => setMostrarFormulario(false)}
    >
      <h3>
        {ventaEditando ? "Editar Venta" : "Registrar Venta"}
      </h3>

      <form className="form-venta" onSubmit={registrarVenta}>
  {/* PRODUCTO EXISTENTE */}
  <select
  name="productoSeleccionado"
  value={form.productoSeleccionado}
  onChange={handleChange}
  disabled={form.nuevoProducto !== ""}
>
  <option value="">-- Selecciona un producto existente --</option>

  {productos.map(p => (
    <option key={p.Id_Productos} value={p.Id_Productos}>
      {p.Nombre}
    </option>
  ))}
</select>

<input
  type="text"
  name="nuevoProducto"
  placeholder="Nombre del producto (nuevo)"
  value={form.nuevoProducto}
  onChange={handleChange}
/>

{form.nuevoProducto && (
  <>
    <input
      type="number"
      name="precioNuevoProducto"
      placeholder="Precio del producto"
      value={form.precioNuevoProducto}
      onChange={handleChange}
    />

    {/* 👇 ESTE ES EL INPUT DE IMAGEN */}
    <input
      type="file"
      name="imagen"
      accept="image/*"
      onChange={handleChange}
    />
  </>
)}

<input
  type="number"
  name="cantidad"
  placeholder="Cantidad"
  value={form.cantidad}
  onChange={handleChange}
  required
/>

<button className ="btn-guardar" type="submit">Guardar</button>
<button className="btn-cancelar" type="button" onClick={() => setMostrarFormulario(false)}>
  Cancelar
</button>

</form>

    </Modal>

        <Modal className="modal-content"
      isOpen={!!productoEditando}
      onClose={() => setProductoEditando(null)}
    >
      <h3>Editar Producto</h3>

      {productoEditando && (
        <form onSubmit={guardarProductoEditado}>
          <input
            type="text"
            value={productoEditando.Nombre}
            onChange={(e) =>
              setProductoEditando({
                ...productoEditando,
                Nombre: e.target.value
              })
            }
          />

          <input
            type="number"
            value={productoEditando.Precio}
            onChange={(e) =>
              setProductoEditando({
                ...productoEditando,
                Precio: e.target.value
              })
            }
          />

          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={() => setProductoEditando(null)}>
            Cancelar
          </button>
        </form>
      )}
    </Modal>

  </div>
);
}