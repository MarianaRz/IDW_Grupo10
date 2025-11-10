document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form_admin");
  if (!form) return;

  form.addEventListener("submit", async (e) => { 
    e.preventDefault();

    // Validar (si tenés una función aparte de validación)
    if (typeof validarFormulario === "function" && !validarFormulario()) {
      alert("Por favor, complete correctamente todos los campos requeridos.");
      return;
    }

    // Obtener obras sociales del localStorage
    let obrasSociales = JSON.parse(localStorage.getItem("obrasSociales") || "[]");

    // Leer imagen (si se seleccionó)
    const archivo = document.getElementById("foto")?.files[0];
    let imagenBase64 = "";
    if (archivo) {
      imagenBase64 = await convertirImagenABase64(archivo);
    }

    const nuevaObra = {
      id: Date.now(), // ID único generado automáticamente
      nombre: document.getElementById("nombre").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      email: document.getElementById("email").value.trim(),
      porcentaje: parseFloat(document.getElementById("porcentaje").value) || 0,
      url: document.getElementById("url").value.trim() || "#",
      img: imagenBase64 || ""
    };

    // Evitar duplicados por nombre
    if (obrasSociales.some((o) => o.nombre.toLowerCase() === nuevaObra.nombre.toLowerCase())) {
      alert("Ya existe una obra social con ese nombre.");
      return;
    }

    obrasSociales.push(nuevaObra);
    localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));

    alert("Obra social registrada correctamente ✅");
    form.reset();
  });
});

function validarFormulario() {
  const form = document.getElementById("form_admin");
  if (!form) return false;

  // Limpia validaciones previas
  form.querySelectorAll(".is-valid, .is-invalid, .text-danger").forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
    if (el.classList.contains("text-danger")) el.remove();
  });

  // Campos
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const email = document.getElementById("email");
  const porcentaje = document.getElementById("porcentaje");
  const url = document.getElementById("url");

  let valido = true;

  // Validaciones básicas
  if (!nombre.value.trim() || nombre.value.trim().length < 2) {
    marcarError(nombre, "Debe ingresar un nombre válido");
    valido = false;
  } else marcarOk(nombre);

  if (!descripcion.value.trim() || descripcion.value.trim().length < 5) {
    marcarError(descripcion, "Ingrese una descripción más completa");
    valido = false;
  } else marcarOk(descripcion);

  if (!email.value.trim()) {
    marcarError(email, "El email es obligatorio");
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    marcarError(email, "Correo electrónico inválido");
    valido = false;
  } else marcarOk(email);

  const valorPorcentaje = parseFloat(porcentaje.value);
  if (isNaN(valorPorcentaje) || valorPorcentaje < 0 || valorPorcentaje > 100) {
    marcarError(porcentaje, "El porcentaje debe estar entre 0 y 100");
    valido = false;
  } else marcarOk(porcentaje);

  const urlPattern = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  if (url.value.trim() && !urlPattern.test(url.value.trim())) {
    marcarError(url, "Ingrese una URL válida (ej: https://www.ejemplo.com)");
    valido = false;
  } else marcarOk(url);

  return valido;
}

// Helpers para errores y éxito visual
function marcarError(elemento, mensaje) {
  if (!elemento) return;
  elemento.classList.add("is-invalid");
  const error = document.createElement("p");
  error.className = "text-danger";
  error.textContent = mensaje;
  elemento.parentNode.appendChild(error);
}

function marcarOk(elemento) {
  if (!elemento) return;
  elemento.classList.add("is-valid");
  const previo = elemento.parentNode.querySelector(".text-danger");
  if (previo) previo.remove();
}


function mostrarObraSocialEnIndex() {
  const contenedor = document.getElementById("obras_sociales");
  if (!contenedor) return;

  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales") || "[]");

  contenedor.innerHTML = "";

  obrasSociales.forEach((os) => {
    const link = document.createElement("a");
    link.href = os.url || "#";
    link.target = "_blank"; 
    link.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.src = os.img && os.img.startsWith("data:image") ? os.img : os.img;
    img.alt = os.nombre;
    img.classList.add("logo");

    link.appendChild(img);
    contenedor.appendChild(link);
  });
}

function convertirImagenABase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = (error) => reject(error);
    lector.readAsDataURL(archivo);
  });
}

// Si se llama desde index.html
document.addEventListener("DOMContentLoaded", mostrarObraSocialEnIndex);
