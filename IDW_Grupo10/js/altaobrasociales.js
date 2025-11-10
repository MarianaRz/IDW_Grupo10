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

    
    //  leer imagen (si se seleccionó)
    const archivo = document.getElementById("foto")?.files[0];
    let imagenBase64 = "";
    if (archivo) {
      imagenBase64 = await convertirImagenABase64(archivo);
    }

    const nuevaObra = {
      id: Date.now(), // ID único generado automáticamente
      nombre: document.getElementById("nombre").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
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
    img.style.maxWidth = "120px";
    img.style.height = "60px";

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
