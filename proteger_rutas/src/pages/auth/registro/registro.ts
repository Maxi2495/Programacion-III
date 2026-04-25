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
  const valueRol = selectRol.value as Rol;

  if (!valueEmail || !valuePassword || !valueRol) {
      alert("Por favor, completá todos los campos");
      return;
  }

  //Para crear un user
 const nuevoUsuario: IUser = {
    email: valueEmail,
    pass: valuePassword, 
    role: valueRol, 
    loggedIn: false, //Empieza en false porque todavia no se logueó, solo se registró      
    nombre: valueEmail.split('@')[0] //Nombre por defecto sacado del mail
  };

  //Array para usuarios creados. Si no hay ninguno, creamos uno vacio
  const usuariosRegistrados: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  //Agregar nuevo usuario
  usuariosRegistrados.push(nuevoUsuario);
  //Guardado de lista actualizada
  localStorage.setItem("users", JSON.stringify(usuariosRegistrados));
  //Tambien se guarda como sesion activa
  localStorage.setItem("userData", JSON.stringify(nuevoUsuario));

  alert("Registro exitoso. Serás redirigido al Login.");

  window.location.href = "/src/pages/auth/login/login.html";
});