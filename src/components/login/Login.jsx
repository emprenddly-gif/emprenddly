// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";
// import LogoEmpren from "../../assets/Logo_Empren.png";


// function Login() {
//   const [email, setEmail] = useState("");
//   const [contrasena, setContrasena] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => setShowPassword(!showPassword);
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     alert("Iniciando sesión...");

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/users/login",
//         { email, contrasena }
//       );
//       console.log("✅ Login exitoso:", response.data);
//       alert("Inicio de sesión exitoso");
//     } catch (error) {
//       console.error("❌ Error en login:", error.response?.data || error.message);
//       alert("Error al iniciar sesión");
//     }
//   };


//   return (
//     <>
//       <header className="barra-superior">
//         <img src={LogoEmpren} alt="Logo" className="logo" />
//       </header>

//       <div className="container">
//         <p className="p">Inicia Sesión</p>
//         <p className="inicio">
//           ¿Es tu primera vez?{" "}
//           <a href="http://localhost:5173/registro">Regístrate</a>
//         </p>
     

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Usuario (email)"
//           />

//           <div className="input-group">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={contrasena}
//               onChange={(e) => setContrasena(e.target.value)}
//               required
//               placeholder="Contraseña"
//             />
//             <i
//               className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}
//               onClick={togglePassword}
//             ></i>
//           </div>

//           <p className="recuperar">
//             <a href="#">¿Olvidaste tu contraseña?</a>
//           </p>

//           <button type="submit" id="loginBtn">
//             Iniciar Sesión
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Login;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Iniciando sesión...");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, contrasena }
      );
      console.log("✅ Login exitoso:", response.data);

      // Guardar token en localStorage
      localStorage.setItem("token", response.data.token);

      alert("Inicio de sesión exitoso");

      // Redirigir al dashboard
      navigate("/menu");
    } catch (error) {
      console.error("❌ Error en login:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Error al iniciar sesión. Verifica tus datos."
      );
    }
  };

  return (
    <>
      <header className="barra-superior">
        <img src={LogoEmpren} alt="Logo" className="logo" />
      </header>

      <div className="container">
        <p className="p">Inicia Sesión</p>
        <p className="inicio">
          ¿Es tu primera vez? <a href="http://localhost:5173/registro">Regístrate</a>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Usuario (email)"
          />

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              placeholder="Contraseña"
            />
            <i
              className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}
              onClick={togglePassword}
            ></i>
          </div>

          <p className="recuperar">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </p>

          <button type="submit" id="loginBtn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
