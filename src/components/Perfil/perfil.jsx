// src/components/Perfil.jsx
import React, { useState, useEffect } from "react";
import "./perfil.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

const API_URL = "http://localhost:4000/api/perfil";

const Perfil = ({ usuarioId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    usuario: "",
    imagen: "https://via.placeholder.com/100?text=+",
    imagenFile: null,
  });

  useEffect(() => {
    if (!usuarioId) return;

    fetch(`${API_URL}/${usuarioId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          nombre: data.Nombre || "",
          apellido: data.Apellido || "",
          correo: data.Correo || "",
          usuario: data.Usuario || "",
          imagen: data.Imagen || "https://via.placeholder.com/100?text=+",
          imagenFile: null,
        });
      })
      .catch((err) => console.log("Error cargando perfil:", err));
  }, [usuarioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (formData.imagenFile) {
        const fd = new FormData();
        fd.append("nombre", formData.nombre);
        fd.append("apellido", formData.apellido);
        fd.append("correo", formData.correo);
        fd.append("imagen", formData.imagenFile);

        res = await fetch(`${API_URL}/${formData.usuario}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch(`${API_URL}/${formData.usuario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
          }),
        });
      }

      const data = await res.json();
      alert(data.message || "Datos guardado ");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar.");
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar la cuenta?")) return;

    try {
      const res = await fetch(`${API_URL}/${formData.usuario}`, {
        method: "DELETE",
      });

      await res.json();
      alert("Cuenta eliminada");
      window.location.href = "/registro";
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la cuenta.");
    }
  };

  const handleCerrarSesion = () => {
    window.location.href = "/login";
  };

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        <div className="Lineas" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`top_line common ${menuOpen ? "rotate-down" : ""}`}></span>
          <span className={`middle_line common ${menuOpen ? "hidden" : ""}`}></span>
          <span className={`bottom_line common ${menuOpen ? "rotate-up" : ""}`}></span>
        </div>
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

      {/* Contenido principal */}
      <div className="contenedor perfil-main">
        <h2>Mi Perfil</h2>

        <form onSubmit={handleSubmit}>
          
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" value={formData.apellido} onChange={e => setFormData({ ...formData, apellido: e.target.value })} required />

          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" value={formData.correo} onChange={e => setFormData({ ...formData, correo: e.target.value })} required />

          <label htmlFor="usuario">Usuario:</label>
          <input type="text" id="usuario" value={formData.usuario} onChange={e => setFormData({ ...formData, usuario: e.target.value })} required />

          {/* Área de la foto centrada */}
          <div className="perfil-foto-area">
            <label htmlFor="imagenInput" className="image-label">
              <img src={formData.imagen} alt="foto perfil" width="100" />
            </label>
            <input type="file" id="imagenInput" accept="image/*" onChange={e => {
              const archivo = e.target.files[0];
              if (archivo) setFormData({ ...formData, imagen: URL.createObjectURL(archivo), imagenFile: archivo });
            }} />
          </div>
          
          <button type="submit" className="btn-accion btn-primario">Guardar Datos</button>
          <button type="button" onClick={handleCerrarSesion} className="btn-accion btn-secundario">Cerrar sesión</button>
          <button type="button" onClick={handleEliminar} className="btn-accion btn-peligro">Eliminar cuenta</button>

          <a href="/ajustes" className="btn-accion btn-volver">Volver a Ajustes</a>
        </form>
      </div>
    </div>
  );
};

export default Perfil;