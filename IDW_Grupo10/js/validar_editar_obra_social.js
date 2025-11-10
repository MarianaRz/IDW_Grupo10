function marcarError(elemento, mensaje) {
  if (!elemento) return;
  elemento.classList.add("is-invalid");
  let previo = elemento.parentNode.querySelector(".text-danger");
  if (previo) previo.remove();

  const p = document.createElement("p");
  p.className = "text-danger";
  p.textContent = mensaje;
  elemento.parentNode.appendChild(p);
}

function marcarOk(elemento) {
  if (!elemento) return;
  elemento.classList.remove("is-invalid");
  elemento.classList.add("is-valid");
  let previo = elemento.parentNode.querySelector(".text-danger");
  if (previo) previo.remove();
}

function limpiarValidaciones() {
  const form = document.getElementById("form_editar");
  form.querySelectorAll(".text-danger").forEach(el => el.remove());
  form.querySelectorAll(".is-invalid, .is-valid")
      .forEach(el => el.classList.remove("is-invalid", "is-valid"));
}

function validarFormulario() {
  const form = document.getElementById("form_editar");
  limpiarValidaciones();

  let valido = true;
  const campos = {
    nombre: document.getElementById("nombre"),
    descripcion: document.getElementById("descripcion"),
    email: document.getElementById("email"),
    porcentaje: document.getElementById("porcentaje"),
    url: document.getElementById("url")
  };

  // Verificación general
  for (const key in campos) {
    if (!campos[key].value.trim()) {
      marcarError(campos[key], "Campo obligatorio");
      valido = false;
    }
  }

  // Validaciones específicas
  if (campos.nombre.value.trim().length < 2) {
    marcarError(campos.nombre, "Debe ingresar un nombre válido");
    valido = false;
  } else marcarOk(campos.nombre);


  if (!campos.email.value.trim()) {
    marcarError(campos.email, "El email es obligatorio");
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value)) {
    marcarError(campos.email, "Correo electrónico inválido");
    valido = false;
  } else {
    marcarOk(campos.email);
  }

  const porcentaje = parseFloat(campos.porcentaje.value);
  if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
    marcarError(campos.porcentaje, "Porcentaje inválido (0-100)");
    valido = false;
  } else marcarOk(campos.porcentaje);

  const urlPattern = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  if (!urlPattern.test(campos.url.value.trim())) {
    marcarError(campos.url, "Ingrese una URL válida (ej: https://www.ejemplo.com)");
    valido = false;
  } else marcarOk(campos.url);

  return valido;
}