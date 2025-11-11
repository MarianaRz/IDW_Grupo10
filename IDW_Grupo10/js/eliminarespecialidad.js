const selectEspecialidad = document.getElementById("selectEspecialidad");
const form = document.getElementById("formEliminarEspecialidad");

// traer especialidades desde localStorage
let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

// llenar el select
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

cargarEspecialidades();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = selectEspecialidad.value;
  if (index === "") return alert("Selecciona una especialidad para eliminar");

  const confirmDelete = confirm(
    `¿Está seguro de eliminar la especialidad "${especialidades[index].nombre}"?`
  );
  if (!confirmDelete) return;

  especialidades.splice(index, 1);

  localStorage.setItem("especialidades", JSON.stringify(especialidades));

  cargarEspecialidades();

  alert("Especialidad eliminada correctamente!");
});