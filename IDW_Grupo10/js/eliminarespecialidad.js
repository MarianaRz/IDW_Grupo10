// Elementos del DOM
const selectEspecialidad = document.getElementById("selectEspecialidad");
const form = document.getElementById("formEliminarEspecialidad");

// Traer especialidades desde localStorage
let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

// Función para llenar el select
function cargarEspecialidades() {
  selectEspecialidad.innerHTML =
    '<option value="">-- Seleccione una especialidad --</option>';
  especialidades.forEach((esp, index) => {
    const option = document.createElement("option");
    option.value = index; // usamos el índice como valor
    option.textContent = esp.nombre;
    selectEspecialidad.appendChild(option);
  });
}

// Ejecutar al cargar la página
cargarEspecialidades();

// Evento submit para eliminar
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = selectEspecialidad.value;
  if (index === "") return alert("Selecciona una especialidad para eliminar");

  // Confirmación antes de eliminar
  const confirmDelete = confirm(
    `¿Está seguro de eliminar la especialidad "${especialidades[index].nombre}"?`
  );
  if (!confirmDelete) return;

  // Eliminar del array
  especialidades.splice(index, 1);

  // Guardar cambios en localStorage
  localStorage.setItem("especialidades", JSON.stringify(especialidades));

  // Recargar select
  cargarEspecialidades();

  alert("Especialidad eliminada correctamente!");
});