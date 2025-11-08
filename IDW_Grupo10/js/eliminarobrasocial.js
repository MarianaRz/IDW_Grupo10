document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn_buscar");
  const btnEliminar = document.getElementById("btn_eliminar");
  const inputNombre = document.getElementById("buscar_nombre");

  let obraActual = null;

  btnBuscar.addEventListener("click", () => {
    const nombreBuscado = inputNombre.value.trim().toLowerCase();
    if (!nombreBuscado) {
      alert("Ingrese un nombre válido.");
      return;
    }

    const obras = obtenerObrasSociales();
    obraActual = obras.find(o => o.nombre.toLowerCase() === nombreBuscado);

    if (!obraActual) {
      alert("No se encontró una obra social con ese nombre.");
      limpiarCampos();
      return;
    }

    document.getElementById("nombre").value = obraActual.nombre;
    document.getElementById("telefono").value = obraActual.telefono || "";
    document.getElementById("email").value = obraActual.email || "";
    document.getElementById("porcentaje").value = obraActual.porcentaje + "%";
    document.getElementById("datos_obra").style.display = "block";
  });

  btnEliminar.addEventListener("click", () => {
    if (!obraActual) {
      alert("Primero debe buscar una obra social antes de eliminarla.");
      return;
    }

    if (!confirm(`¿Desea eliminar la obra social "${obraActual.nombre}"?`)) return;

    let obras = obtenerObrasSociales();
    obras = obras.filter(o => o.id !== obraActual.id);
    guardarObrasSociales(obras);

    alert("Obra social eliminada correctamente ✅");
    limpiarCampos();
    obraActual = null;
  });

  function limpiarCampos() {
    inputNombre.value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("porcentaje").value = "";
    document.getElementById("datos_obra").style.display = "none";
  }

  function obtenerObrasSociales() {
    return JSON.parse(localStorage.getItem("obrasSociales")) || [];
  }

  function guardarObrasSociales(obras) {
    localStorage.setItem("obrasSociales", JSON.stringify(obras));
  }
});
