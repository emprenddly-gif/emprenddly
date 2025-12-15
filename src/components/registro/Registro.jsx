import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./registro.css"; // importacion de  estilos del registro


export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contrasena:"",
    rol: "",
  });
 
 
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:4000/api/users/register", {
      nombre: form.nombre,
      email: form.email,        // 👈 ahora sí coincide
      contrasena: form.contrasena, // 👈 ahora sí coincide
      rol: form.rol,
      estado: "Activo", 
    });

    console.log("Usuario registrado:", response.data);
    alert("✅ Usuario registrado con éxito");
  } catch (error) {
    console.error("Error en el registro:", error.response?.data || error.message);
    alert("❌ Error al registrar usuario");
  }
};


  return (
    <>
      <header className="barra-superior">
        <img src="/assets/Logo_Empren.png" alt="Logo" className="logo" />
      </header>

      <div className="container">
        <p className="p">Registro</p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder=" Usuario"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder=" Correo"
            required
          />

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder=" Contraseña"
              required
            />
            <i
              className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}
              onClick={togglePassword}
              style={{ cursor: "pointer" }}
            />
          </div>

          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
          >
            <option value=""> Selecciona tu rol </option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>

          <button type="submit" className="loginBtn">
            Bienvenido
          </button>
        </form>

        <p className="registro">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </>
  );
}
