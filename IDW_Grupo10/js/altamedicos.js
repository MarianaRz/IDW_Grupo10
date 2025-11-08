document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form_admin");
  if (!form) return;

  form.addEventListener("submit", async (e) => { // usamos async para poder esperar la imagen
    e.preventDefault();

    // validar
    if (typeof validarFormulario === "function" && !validarFormulario()) {
      alert("Por favor, complete correctamente todos los campos requeridos.");
      return;
    }

    // obtener médicos del localStorage
    let medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

    // 🔹 leer imagen (si se seleccionó)
    const archivo = document.getElementById("foto")?.files[0];
    let imagenBase64 = "";
    if (archivo) {
      imagenBase64 = await convertirImagenABase64(archivo);
    }

    // Obtener las obras sociales
    const obra1 = document.getElementById("obrasocial").value.trim();
    const obra2 = document.getElementById("obrasocial2").value.trim();

    // Crear un array solo con las que tengan contenido
    const obrasSociales = [];
    if (obra1) obrasSociales.push(obra1);
    if (obra2) obrasSociales.push(obra2);

    const nuevoMedico = {
      matricula: Number(document.getElementById("matricula").value),
      apellido: document.getElementById("apellido").value.trim(),
      nombre: document.getElementById("nombre").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      obraSocial: obrasSociales,
      valorConsulta: Number(document.getElementById("consulta").value || 0),
      descripcion: document.getElementById("descripcion").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      img: imagenBase64 || "" 
    };

    // evitar matrícula repetida
    if (medicos.some((m) => m.matricula === nuevoMedico.matricula)) {
      alert("Ya existe un médico con esa matrícula.");
      return;
    }

    medicos.push(nuevoMedico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    alert("Médico agregado correctamente ✅");
    form.reset();
  });
});


// 🩺 Mostrar médicos guardados en el index.html
function mostrarMedicosEnIndex() {
  const contenedor = document.getElementById("contenedor_doctores");
  if (!contenedor) return; // si no está en esta página, no hace nada

  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

  contenedor.innerHTML = "";

  medicos.forEach((medico) => {
    const card = document.createElement("div");
    card.classList.add("tarjeta_doctor");

    const imgSrc = medico.img && medico.img.startsWith("data:image")
  ? medico.img
  : medico.img;

    card.innerHTML = `
      <img src="${imgSrc}" alt="Dr. ${medico.nombre} ${medico.apellido}" class="img-fluid">
      <div class="contenido">
        <h3>Dr. ${medico.nombre} ${medico.apellido}</h3>
        <p>Especialidad: ${medico.especialidad}</p>
        <p>Obra Social: ${Array.isArray(medico.obraSocial) ? medico.obraSocial.join(", ") : medico.obraSocial}</p>
        <a href="turnos/turnos.html">Ver turnos</a>
      </div>
    `;

    contenedor.appendChild(card);
  });
}


// 🆕 Función para convertir la imagen a Base64
function convertirImagenABase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = (error) => reject(error);
    lector.readAsDataURL(archivo);
  });
}


// Si se llama desde index.html
document.addEventListener("DOMContentLoaded", mostrarMedicosEnIndex);
