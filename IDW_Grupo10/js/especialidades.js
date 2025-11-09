function obtenerEspecialidades() {
  return JSON.parse(localStorage.getItem("especialidades")) || [];
}

function guardarEspecialidades(lista) {
  localStorage.setItem("especialidades", JSON.stringify(lista));
}

// Exponer en window para usar desde scripts normales
window.obtenerEspecialidades = obtenerEspecialidades;
window.guardarEspecialidades = guardarEspecialidades;
