document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn_buscar");
  const btnEliminar = document.getElementById("btn_eliminar");
  const inputMatricula = document.getElementById("buscar_matricula");

  let medicoActual = null;

  btnBuscar.addEventListener("click", () => {
    const matricula = Number(inputMatricula.value.trim());
    if (!matricula) {
      alert("Ingrese una matrícula válida.");
      return;
    }

    const medicos = obtenerMedicos();
    medicoActual = medicos.find(m => m.matricula === matricula);

    if (!medicoActual) {
      alert("No se encontró un médico con esa matrícula.");
      limpiarCampos();
      return;
    }

    document.getElementById("nombre").value = medicoActual.nombre;
    document.getElementById("apellido").value = medicoActual.apellido;
    document.getElementById("especialidad").value = medicoActual.especialidad;
  });

  btnEliminar.addEventListener("click", () => {
    if (!medicoActual) {
      alert("Primero debe buscar un médico antes de eliminarlo.");
      return;
    }

    if (!confirm(`¿Desea eliminar al Dr. ${medicoActual.apellido}?`)) return;

    let medicos = obtenerMedicos();
    medicos = medicos.filter(m => m.matricula !== medicoActual.matricula);
    guardarMedicos(medicos);

    alert("Médico eliminado correctamente ✅");
    limpiarCampos();
    medicoActual = null;
  });

  function limpiarCampos() {
    inputMatricula.value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("especialidad").value = "";
  }
});