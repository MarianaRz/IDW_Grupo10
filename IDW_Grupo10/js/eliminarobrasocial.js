const selectObraSocial = document.getElementById("selectObraSocial");
const form = document.getElementById("formEliminarObraSocial");

let obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

function cargarObrasSociales() {
  selectObraSocial.innerHTML =
    '<option value="">-- Seleccione una obra social --</option>';
  obrasSociales.forEach((obra, index) => {
    const option = document.createElement("option");
    option.value = index; 
    option.textContent = obra.nombre;
    selectObraSocial.appendChild(option);
  });
}

cargarObrasSociales();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = selectObraSocial.value;
  if (index === "") return alert("Selecciona una obra social para eliminar");

  const confirmDelete = confirm(
    `¿Está seguro de eliminar la obra social "${obrasSociales[index].nombre}"?`
  );
  if (!confirmDelete) return;

  obrasSociales.splice(index, 1);
  localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));
  cargarObrasSociales();

  alert("Obra social eliminada correctamente ✅");
});
