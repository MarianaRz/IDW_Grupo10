function marcarError(elemento, mensaje) {
  if (!elemento) return;
  elemento.classList.add("is-invalid");

  // Evitamos duplicar mensajes
  let previo = elemento.parentNode.querySelector(".text-danger");
  if (previo) previo.remove();

  const p = document.createElement("p");
  p.className = "text-danger";
  p.textContent = mensaje;
  elemento.parentNode.appendChild(p);
}

function marcarOk(elemento) {
  if (!elemento) return;
  elemento.classList.add("is-valid");

  // Eliminamos mensaje de error previo si existía
  let previo = elemento.parentNode.querySelector(".text-danger");
  if (previo) previo.remove();
}

function limpiarValidaciones() {
  const form = document.getElementById("form_admin");
  form.querySelectorAll(".text-danger, .text-success").forEach(el => el.remove());
  form.querySelectorAll(".is-invalid, .is-valid").forEach(el => el.classList.remove("is-invalid", "is-valid"));
}

function validarFormulario() {
  const form = document.getElementById("formObraSocial");
  if (!form) return false;

  limpiarValidaciones();

  let valido = true;
  const campos = {
    nombre: document.getElementById("nombre"),
    direccion: document.getElementById("direccion"),
    telefono: document.getElementById("telefono"),
    email: document.getElementById("email"),
    porcentaje: document.getElementById("porcentaje"),
    url: document.getElementById("url")
  };

  if (!campos.nombre.value.trim() || campos.nombre.value.trim().length < 2) {
    marcarError(campos.nombre, "Debe ingresar un nombre válido");
    valido = false;
  } else marcarOk(campos.nombre);

  if (!campos.direccion.value.trim() || campos.direccion.value.trim().length < 5) {
    marcarError(campos.direccion, "Ingrese una dirección válida");
    valido = false;
  } else marcarOk(campos.direccion);

  if (!/^[0-9]{7,}$/.test(campos.telefono.value.trim())) {
    marcarError(campos.telefono, "Teléfono inválido (mínimo 7 dígitos)");
    valido = false;
  } else marcarOk(campos.telefono);

  if (!campos.email.value.trim()) {
    marcarError(campos.email, "El email es obligatorio");
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value)) {
    marcarError(campos.email, "Correo electrónico inválido");
    valido = false;
  } else marcarOk(campos.email);

  const porcentajeValor = parseFloat(campos.porcentaje.value);
  if (isNaN(porcentajeValor) || porcentajeValor < 0 || porcentajeValor > 100) {
    marcarError(campos.porcentaje, "El porcentaje debe estar entre 0 y 100");
    valido = false;
  } else marcarOk(campos.porcentaje);

  const urlPattern = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  if (!urlPattern.test(campos.url.value.trim())) {
    marcarError(campos.url, "Ingrese una URL válida (ej: https://www.ejemplo.com)");
    valido = false;
  } else marcarOk(campos.url);

  return valido;
}
