import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const selectRol = document.getElementById("rol") as HTMLSelectElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  const valueRol = selectRol.value; 

  // 1. Buscamos en la lista de usuarios registrados
  const usuariosRegistrados: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  
  const usuarioEncontrado = usuariosRegistrados.find(u => u.email === valueEmail && u.pass === valuePassword && u.role == valueRol);

  if (usuarioEncontrado) {
    // 2. Si existe, actualizamos su estado y guardamos sesión
    usuarioEncontrado.loggedIn = true;
    localStorage.setItem("userData", JSON.stringify(usuarioEncontrado));

    // 3. Navegamos según su rol guardado
    if (usuarioEncontrado.role === "admin") {
      window.location.href = "/src/pages/admin/home/home.html";
    } else {
      window.location.href = "/src/pages/store/home/home.html";
    }
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});