const selectEspecialidad = document.getElementById("selectEspecialidad");
const nombreInput = document.getElementById("nombreEspecialidad");
const descripcionInput = document.getElementById("descripcionEspecialidad");
const form = document.getElementById("formEditarEspecialidad");

let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

function cargarEspecialidades() {
  selectEspecialidad.innerHTML =
    '<option value="">-- Seleccione una especialidad --</option>';
  especialidades.forEach((esp, index) => {
    const option = document.createElement("option");
    option.value = index; // usamos el índice
    option.textContent = esp.nombre;
    selectEspecialidad.appendChild(option);
  });
}

cargarEspecialidades();

// cuando se selecciona una especialidad mostrar datos
selectEspecialidad.addEventListener("change", (e) => {
  const index = e.target.value;
  if (index === "") {
    nombreInput.value = "";
    descripcionInput.value = "";
    return;
  }
  const esp = especialidades[index];
  nombreInput.value = esp.nombre;
  descripcionInput.value = esp.descripcion;
});

// guardar los cambios
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = selectEspecialidad.value;
  if (index === "") return alert("Selecciona una especialidad para editar");

  especialidades[index].nombre = nombreInput.value.trim();
  especialidades[index].descripcion = descripcionInput.value.trim();

  localStorage.setItem("especialidades", JSON.stringify(especialidades));
  alert("Especialidad actualizada correctamente!");
  cargarEspecialidades();
});