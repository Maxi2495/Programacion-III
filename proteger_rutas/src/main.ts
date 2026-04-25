// src/main.ts
export const verificarSesion = () => {
    const sesion = localStorage.getItem("userData");
    const path = window.location.pathname;

    // prueba de rutas. Sino redirecciona infinitamente
    if (path === "/" || path === "/index.html") {
        window.location.href = "/src/pages/auth/registro/registro.html";
        return;
    }

    if (path.includes("login.html") || path.includes("registro.html")) {
        return; 
    }

    if (!sesion) {
        // Ruta ABSOLUTA
        window.location.href = "/src/pages/auth/login/login.html";
        return;
    }

    const usuario = JSON.parse(sesion);
    if (usuario.role === "client" && path.includes("/admin/")) {
        // Ruta ABSOLUTA
        window.location.href = "/src/pages/store/home/home.html";
    }
};

// Autoejecutar en todas las páginas donde esté importado el main.ts
verificarSesion();