import { useEffect } from "react";
import "./Intro.css";
import LogoEmpren from "../../assets/Logo_Empren.png";


const Intro = () => {
  useEffect(() => {
    const logoSpan = document.querySelectorAll(".logo-parts");
    const intro = document.querySelector(".Intro");

    setTimeout(() => {
      logoSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("active");
        }, (index + 1) * 100);
      });

      setTimeout(() => {
        logoSpan.forEach((span, index) => {
          setTimeout(() => {
            span.classList.remove("active");
            span.classList.add("fade");
          }, (index + 1) * 50);
        });
      }, 2000);

      setTimeout(() => {
        if (intro) {
          intro.style.top = "-100vh";
        }
      }, 2300);

      setTimeout(() => {
        window.location.href = "http://localhost:5173/menu "; // redirige al index de tu app React
      }, 3000);
    });
  }, []);

  return (
    <div className="Intro">
      <img src={LogoEmpren} alt="Emprenddly logo" className="Introimg" />

      <h1 className="logo">
        <span className="logo-parts">E</span>
        <span className="logo-parts">M</span>
        <span className="logo-parts">P</span>
        <span className="logo-parts">R</span>
        <span className="logo-parts">E</span>
        <span className="logo-parts">N</span>
        <span className="logo-parts">D</span>
        <span className="logo-parts">D</span>
        <span className="logo-parts">L</span>
        <span className="logo-parts">Y</span>
      </h1>
      <p className="frase">Fácil, Completo y tuyo</p>
    </div>
  );
};

export default Intro;
