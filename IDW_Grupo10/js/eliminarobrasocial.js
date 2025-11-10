// Elementos del DOM
const selectObraSocial = document.getElementById("selectObraSocial");
const form = document.getElementById("formEliminarObraSocial");

// Traer obras sociales desde localStorage
let obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

// Función para llenar el select
function cargarObrasSociales() {
  selectObraSocial.innerHTML =
    '<option value="">-- Seleccione una obra social --</option>';
  obrasSociales.forEach((obra, index) => {
    const option = document.createElement("option");
    option.value = index; // usamos el índice como valor
    option.textContent = obra.nombre;
    selectObraSocial.appendChild(option);
  });
}

// Ejecutar al cargar la página
cargarObrasSociales();

// Evento submit para eliminar
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = selectObraSocial.value;
  if (index === "") return alert("Selecciona una obra social para eliminar");

  // Confirmación antes de eliminar
  const confirmDelete = confirm(
    `¿Está seguro de eliminar la obra social "${obrasSociales[index].nombre}"?`
  );
  if (!confirmDelete) return;

  // Eliminar del array
  obrasSociales.splice(index, 1);

  // Guardar cambios en localStorage
  localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));

  // Recargar select
  cargarObrasSociales();

  alert("Obra social eliminada correctamente ✅");
});
