import { login } from "./auth.js";

const form_login = document.getElementById("form_login");
const usuario = document.getElementById("usuario");
const clave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");

function mostrar_mensaje(texto, tipo) {
  mensaje.innerHTML = `
    <div class="col-md-6 col-lg-4">
      <div class="alert alert-${tipo}">${texto}</div>
    </div>`;
}

if (form_login) {
  form_login.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario_input = usuario.value.trim();
    const clave_input = clave.value.trim();

    const is_usuario = await login(usuario_input, clave_input);

    if (is_usuario) {
      sessionStorage.setItem("usuario_logeado", is_usuario.username);
      sessionStorage.setItem("token", is_usuario.token); 

      if (is_usuario.username.toLowerCase() === "emilys") {
        window.location.href = "admin/altamedicos.html";
    } else {
        window.location.href = "index.html";
    }

    } else {
      mostrar_mensaje("Error en credenciales", "danger");
    }
  });
}

// Mostrar usuario en el header si hay sesión iniciada
document.addEventListener("DOMContentLoaded", function () {
  const login_item = document.getElementById("login_item");
  const usuario_logeado = sessionStorage.getItem("usuario_logeado");

  if (usuario_logeado && login_item) {
    login_item.innerHTML = `
      <div class="dropdown">
        <a 
          class="nav-link dropdown-toggle d-flex align-items-center" 
          href="#" 
          role="button" 
          id="userDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i class="fa-solid fa-user me-2"></i>${usuario_logeado}
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li>
            <a class="dropdown-item" href="#" id="cerrar_sesion">
              <i class="fa-solid fa-right-from-bracket me-2"></i>
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    `;

    const cerrar_sesion = document.getElementById("cerrar_sesion");
    cerrar_sesion.addEventListener("click", function () {
      sessionStorage.clear();
      window.location.href = "/index.html";
    });
  }
});
