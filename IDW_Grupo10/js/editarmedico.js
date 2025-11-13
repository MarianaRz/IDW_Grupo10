document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn_buscar");
  const formEditar = document.getElementById("form_editar");

  let medicoActual = null;

  // Cargar especialidades y obras sociales en los selects
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  const especialidadSelect = document.getElementById("selectEspecialidad");
  const obra1Select = document.getElementById("selectObraSocial");
  const obra2Select = document.getElementById("selectObraSocial2");

  if (especialidadSelect) {
    especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad</option>';
    especialidades.forEach((esp) => {
      const option = document.createElement("option");
      option.value = esp.id;
      option.textContent = esp.nombre;
      especialidadSelect.appendChild(option);
    });
  }

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

  btnBuscar.addEventListener("click", () => {
    const matricula = Number(document.getElementById("buscar_matricula").value);
    const medicos = obtenerMedicos();

    medicoActual = medicos.find(m => m.matricula === matricula);

    if (!medicoActual) {
      alert("No se encontró un médico con esa matrícula.");
      return;
    }

    // Cargar datos en el formulario
    document.getElementById("nombre").value = medicoActual.nombre;
    document.getElementById("apellido").value = medicoActual.apellido;
    document.getElementById("email").value = medicoActual.email || "";
    document.getElementById("telefono").value = medicoActual.telefono || "";
    document.getElementById("matricula").value = medicoActual.matricula;
    document.getElementById("consulta").value = medicoActual.valorConsulta;
    document.getElementById("descripcion").value = medicoActual.descripcion;

    // Cargar especialidad (ID)
    if (especialidadSelect) {
      especialidadSelect.value = medicoActual.especialidad || "";
    }

    // Cargar obras sociales (array de IDs)
    if (Array.isArray(medicoActual.obraSocial)) {
      if (obra1Select && medicoActual.obraSocial[0]) {
        obra1Select.value = medicoActual.obraSocial[0];
      }
      if (obra2Select && medicoActual.obraSocial[1]) {
        obra2Select.value = medicoActual.obraSocial[1];
      }
    }
  });

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!medicoActual) {
      alert("Primero busque un médico para editar.");
      return;
    }

    // Validación antes de guardar
    const esValido = validarFormulario();
    if (!esValido) {
      alert("Por favor, complete correctamente todos los campos antes de guardar.");
      return;
    }

    let medicos = obtenerMedicos();
    const indice = medicos.findIndex(m => m.matricula === medicoActual.matricula);

    // Leer imagen si se subió una nueva
    const archivo = document.getElementById("foto")?.files[0];
    let imagenBase64 = medicoActual.img || "";
    if (archivo) {
      imagenBase64 = await convertirImagenABase64(archivo);
    }

    // Obtener obras sociales seleccionadas
    const obra1Id = obra1Select.value;
    const obra2Id = obra2Select.value;
    const obrasSeleccionadas = [];
    if (obra1Id !== "") obrasSeleccionadas.push(Number(obra1Id));
    if (obra2Id !== "" && obra2Id !== obra1Id) obrasSeleccionadas.push(Number(obra2Id));

    medicos[indice] = {
      ...medicoActual,
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      especialidad: especialidadSelect.value !== "" ? Number(especialidadSelect.value) : null,
      obraSocial: obrasSeleccionadas,
      valorConsulta: Number(document.getElementById("consulta").value),
      descripcion: document.getElementById("descripcion").value.trim(),
      img: imagenBase64
    };

    guardarMedicos(medicos);
    alert("Médico actualizado correctamente ✅");
    formEditar.reset();
  });
});

function convertirImagenABase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = (error) => reject(error);
    lector.readAsDataURL(archivo);
  });
}