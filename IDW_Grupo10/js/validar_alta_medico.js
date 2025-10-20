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
  const form = document.getElementById("form_admin");
  if (!form) return false;

  limpiarValidaciones();

  let valido = true;
  const campos = {
    nombre: document.getElementById("nombre"),
    apellido: document.getElementById("apellido"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    matricula: document.getElementById("matricula"),
    especialidad: document.getElementById("especialidad"),
    obrasocial: document.getElementById("obrasocial"),
    descripcion: document.getElementById("descripcion"),
  };

  if (!campos.nombre.value.trim() || campos.nombre.value.trim().length < 2) {
    marcarError(campos.nombre, "Debe ingresar un nombre válido");
    valido = false;
  } else marcarOk(campos.nombre);

  if (!campos.apellido.value.trim() || campos.apellido.value.trim().length < 2) {
    marcarError(campos.apellido, "Debe ingresar un apellido válido");
    valido = false;
  } else marcarOk(campos.apellido);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value)) {
    marcarError(campos.email, "Correo inválido");
    valido = false;
  } else marcarOk(campos.email);

  if (!/^\d{7,}$/.test(campos.telefono.value)) {
    marcarError(campos.telefono, "Teléfono inválido (mínimo 7 dígitos)");
    valido = false;
  } else marcarOk(campos.telefono);

  if (!campos.matricula.value.trim() || campos.matricula.value <= 0) {
    marcarError(campos.matricula, "Ingrese una matrícula válida");
    valido = false;
  } else marcarOk(campos.matricula);

  if (!campos.especialidad.value.trim()) {
    marcarError(campos.especialidad, "Debe ingresar la especialidad");
    valido = false;
  } else marcarOk(campos.especialidad);

  if (!campos.obrasocial.value.trim()) {
    marcarError(campos.obrasocial, "Debe ingresar la obra social");
    valido = false;
  } else marcarOk(campos.obrasocial);

  if (!campos.descripcion.value.trim() || campos.descripcion.value.trim().length < 10) {
    marcarError(campos.descripcion, "La descripción debe tener al menos 10 caracteres");
    valido = false;
  } else marcarOk(campos.descripcion);

  return valido;
}
