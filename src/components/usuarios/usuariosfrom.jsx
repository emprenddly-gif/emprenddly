import React, { useState, useRef, useEffect } from "react";
import "./usuarios.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

// Definir la URL base de tu API
const API_URL = "http://localhost:3001";

export default function UsuarioForm() {
  // ✅ Estado para controlar el menú lateral
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    usuario: "",
    imagen: "https://via.placeholder.com/100?text=+",
    imagenFile: null,
  });

  const prevObjectUrl = useRef(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "imagenInput") {
      if (files && files[0]) {
        const objectUrl = URL.createObjectURL(files[0]);
        if (prevObjectUrl.current) {
          URL.revokeObjectURL(prevObjectUrl.current);
        }
        prevObjectUrl.current = objectUrl;

        setFormData((prev) => ({
          ...prev,
          imagen: objectUrl,
          imagenFile: files[0],
        }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    return () => {
      if (prevObjectUrl.current) {
        URL.revokeObjectURL(prevObjectUrl.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imagenFile) {
        const fd = new FormData();
        fd.append("usuario", formData.usuario);
        fd.append("nombre", formData.nombre);
        fd.append("apellido", formData.apellido);
        fd.append("correo", formData.correo);
        fd.append("imagen", formData.imagenFile);

        const res = await fetch(`${API_URL}/usuarios/editar`, {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        alert(data.message || "Perfil actualizado");
      } else {
        const res = await fetch(`${API_URL}/usuarios/editar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: formData.usuario,
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
          }),
        });
        const data = await res.json();
        alert(data.message || "Perfil actualizado");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar. Mira la consola.");
    }
  };

  // 🔹 Botón eliminar (con consola + redirección)
  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar la cuenta?")) return;
    try {
      const res = await fetch(`${API_URL}/usuarios/eliminar`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: formData.usuario }),
      });
      await res.json();

      console.log("Cuenta eliminada"); // 👈 Mensaje en consola
      window.location.href = "/registro"; // 👈 Redirige a registro
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la cuenta.");
    }
  };

  const handleCerrarSesion = () => {
    window.location.href = "/login"; // redirige al login
  };

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        {/*
          ✅ Botón hamburguesa (Lineas)
          Al hacer clic, invierte el valor de menuOpen.
        */}
        <div className="Lineas" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`top_line common ${menuOpen ? "rotate-down" : ""}`}></span>
          <span className={`middle_line common ${menuOpen ? "hidden" : ""}`}></span>
          <span className={`bottom_line common ${menuOpen ? "rotate-up" : ""}`}></span>
        </div>

        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

      {/*
        ✅ Menú lateral
        Aplica la clase 'open' si menuOpen es true, lo que lo hace visible.
      */}
      <nav className={`Menu ${menuOpen ? "open" : ""}`}>
        <h1 className="menu_titulo">Menú</h1>
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
      </nav>

      {/* Formulario */}
      <div className="contenedor">
        <h2>Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />
          <br /><br />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} required />
          <br /><br />

          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" value={formData.correo} onChange={handleChange} required />
          <br /><br />

          <label htmlFor="usuario">Usuario:</label>
          <input type="text" id="usuario" value={formData.usuario} onChange={handleChange} required />
          <br /><br />

          <label htmlFor="imagenInput" className="image-label">
            <img src={formData.imagen} alt="foto perfil" width="100" />
          </label>
          <input type="file" id="imagenInput" accept="image/*" onChange={handleChange} />
          <br /><br />

          <button type="submit" className="btn-guardar">Guardar cambios</button>
          <button type="button" onClick={handleEliminar} className="btn-Eliminar">Eliminar cuenta</button>
          <button type="button" onClick={handleCerrarSesion} className="btn-cerrar">Cerrar sesión</button>
        </form>
      </div>
    </div>
  );
}