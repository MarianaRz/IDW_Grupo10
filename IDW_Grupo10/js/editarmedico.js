document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn_buscar");
  const formEditar = document.getElementById("form_editar");

  let medicoActual = null;

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
    document.getElementById("especialidad").value = medicoActual.especialidad;
    document.getElementById("obrasocial").value = medicoActual.obraSocial;
    document.getElementById("obrasocial2").value = medicoActual.obraSocial2 || "";
    document.getElementById("descripcion").value = medicoActual.descripcion;
  });

  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!medicoActual) {
      alert("Primero busque un médico para editar.");
      return;
    }

    let medicos = obtenerMedicos();
    const indice = medicos.findIndex(m => m.matricula === medicoActual.matricula);

    medicos[indice] = {
      ...medicoActual,
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      obraSocial: document.getElementById("obrasocial").value.trim(),
      valorConsulta: Number(document.getElementById("consulta").value),
      descripcion: document.getElementById("descripcion").value.trim()
    };

    guardarMedicos(medicos);
    alert("Médico actualizado correctamente ✅");
  });
});
