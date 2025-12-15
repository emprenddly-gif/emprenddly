document.addEventListener("DOMContentLoaded", () => {
    // 1. Traducciones
    const traducciones = {
        es: {
            menu: "Menú",
            usuarios: "Usuarios",
            inventario: "Inventario",
            ventas: "Registro de Ventas",
            reporteVentas: "Reporte de Ventas",
            gastos: "Registro de Gastos",
            reporteGastos: "Reporte de Gastos",
            ajustes: "Ajustes",
            editarPerfil: "Editar perfil",
            notificaciones: "Notificaciones",
            idioma: "Idioma",
            datos: "Administración de Datos",
            actualizaciones: "Actualizaciones",
            cerrarSesion: "Cerrar sesión"
        },
        en: {
            menu: "Menu",
            usuarios: "Users",
            inventario: "Inventory",
            ventas: "Sales Record",
            reporteVentas: "Sales Report",
            gastos: "Expense Record",
            reporteGastos: "Expense Report",
            ajustes: "Settings",
            editarPerfil: "Edit Profile",
            notificaciones: "Notifications",
            idioma: "Language",
            datos: "Data Management",
            actualizaciones: "Updates",
            cerrarSesion: "Log out"
        }
    };

    const selector = document.getElementById("selectorIdioma");

    // Función para aplicar idioma
    function aplicarTraduccion(idioma) {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            el.textContent = traducciones[idioma][key];
        });
        localStorage.setItem("idiomaSeleccionado", idioma);
    }

    // Inicializar idioma
    const idiomaGuardado = localStorage.getItem("idiomaSeleccionado") || "es";
    if (selector) {
        selector.value = idiomaGuardado;
        aplicarTraduccion(idiomaGuardado);
        
        // 2. Evento para cambiar idioma
        selector.addEventListener("change", () => {
            aplicarTraduccion(selector.value);
        });
    }

    // 3. Lógica para el botón de Cerrar Sesión
    const btnCerrarSesion = document.querySelector(".btn-cerrar");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            // Usamos la clave de traducción actual
            const mensaje = traducciones[selector.value]["cerrarSesion"] === "Log out" ? 
                            "Are you sure you want to log out?" : 
                            "¿Seguro que quieres cerrar sesión?";
            
            if (window.confirm(mensaje)) {
                alert(traducciones[selector.value]["cerrarSesion"] + " ✅");
                // Lógica de redirección
            }
        });
    }
});