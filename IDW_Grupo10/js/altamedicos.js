// altamedicos.js - CORREGIDO
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#cuerpo form");
  if (!form) return;

  // Traer especialidades y obras sociales desde localStorage
  let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  let obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  // ✅ Cargar selects usando ID (no índice)
  const especialidadSelect = document.getElementById("selectEspecialidad");
  if (especialidadSelect) {
    especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad</option>';
    especialidades.forEach((esp) => {
      const option = document.createElement("option");
      option.value = esp.id;
      option.textContent = esp.nombre;
      especialidadSelect.appendChild(option);
    });
  }

  const obra1Select = document.getElementById("selectObraSocial");
  const obra2Select = document.getElementById("selectObraSocial2");
  if (obra1Select) {
    obra1Select.innerHTML = '<option value="">Seleccione una obra social</option>';
    obrasSociales.forEach((os) => {
      const option = document.createElement("option");
      option.value = os.id;
      option.textContent = os.nombre;
      obra1Select.appendChild(option);
    });
  }
  if (obra2Select) {
    obra2Select.innerHTML = '<option value="">Seleccione una obra social</option>';
    obrasSociales.forEach((os) => {
      const option = document.createElement("option");
      option.value = os.id;
      option.textContent = os.nombre;
      obra2Select.appendChild(option);
    });
  }

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (typeof validarFormulario === "function" && !validarFormulario()) {
      alert("Por favor, complete correctamente todos los campos requeridos.");
      return;
    }

    let medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

    // Leer imagen
    const archivo = document.getElementById("foto")?.files[0];
    let imagenBase64 = "";
    if (archivo) imagenBase64 = await convertirImagenABase64(archivo);

    // Obtener valores (ahora son IDs, no índices)
    const especialidadId = document.getElementById("selectEspecialidad").value;
    const obra1Id = document.getElementById("selectObraSocial").value;
    const obra2Id = document.getElementById("selectObraSocial2").value;

    const obrasSeleccionadas = [];
    if (obra1Id !== "") obrasSeleccionadas.push(Number(obra1Id));
    if (obra2Id !== "" && obra2Id !== obra1Id) obrasSeleccionadas.push(Number(obra2Id));

    const nuevoMedico = {
      id: medicos.length + 1,
      matricula: Number(document.getElementById("matricula").value),
      apellido: document.getElementById("apellido").value.trim(),
      nombre: document.getElementById("nombre").value.trim(),
      especialidad: especialidadId !== "" ? Number(especialidadId) : null,
      descripcion: document.getElementById("descripcion").value.trim(),
      obraSocial: obrasSeleccionadas,
      valorConsulta: Number(document.getElementById("consulta").value || 0),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      img: imagenBase64 || ""
    };

    // Evitar matrícula repetida
    if (medicos.some((m) => m.matricula === nuevoMedico.matricula)) {
      alert("Ya existe un médico con esa matrícula.");
      return;
    }

    medicos.push(nuevoMedico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    alert("Médico agregado correctamente ✅");
    form.reset();
  });
}); // fin DOMContentLoaded


// ✅ Mostrar médicos en index - buscar por ID
function mostrarMedicosEnIndex() {
  const contenedor = document.getElementById("contenedor_doctores");
  if (!contenedor) return;

  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  contenedor.innerHTML = "";

  medicos.forEach((medico) => {
    // Buscar especialidad por ID usando .find()
    const especialidad = especialidades.find(e => e.id === medico.especialidad);
    const espNombre = especialidad ? especialidad.nombre : "Sin especificar";

    // Buscar obras sociales por ID
    const obrasNombres = Array.isArray(medico.obraSocial) && medico.obraSocial.length > 0
      ? medico.obraSocial
          .map(id => {
            const os = obrasSociales.find(o => o.id === id);
            return os ? os.nombre : `#${id}`;
          })
          .join(", ")
      : "Ninguna";

    const card = document.createElement("div");
    card.classList.add("tarjeta_doctor");

    const imgSrc = medico.img && medico.img.startsWith("data:image") ? medico.img : medico.img;

    card.innerHTML = `
      <img src="${imgSrc}" alt="Dr. ${medico.nombre} ${medico.apellido}" class="img-fluid">
      <div class="contenido">
        <h3>Dr. ${medico.nombre} ${medico.apellido}</h3>
        <p>Especialidad: ${espNombre}</p>
        <p>Obra Social: ${obrasNombres}</p>
        <a href="reservadeturnos/reservadeturnos.html">Ver turnos</a>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// convertir imagen a base64
function convertirImagenABase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = (error) => reject(error);
    lector.readAsDataURL(archivo);
  });
}

// Llamada para mostrar en index
document.addEventListener("DOMContentLoaded", mostrarMedicosEnIndex);