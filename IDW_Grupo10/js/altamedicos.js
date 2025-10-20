document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form_admin");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (typeof validarFormulario === "function") {
      const esValido = validarFormulario();
      if (!esValido) {
        if (!window.alertMostrado) {
          window.alertMostrado = true;
          alert("Por favor, complete correctamente todos los campos requeridos.");
          setTimeout(() => (window.alertMostrado = false), 500);
        }
        return;
      }
    }

    let medicos = obtenerMedicos();

    const nuevoMedico = {
      matricula: Number(document.getElementById("matricula").value),
      apellido: document.getElementById("apellido").value.trim(),
      nombre: document.getElementById("nombre").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      obraSocial: document.getElementById("obrasocial").value.trim(),
      valorConsulta: Number(document.getElementById("consulta").value),
      descripcion: document.getElementById("descripcion").value.trim(),
    };

    if (medicos.some(m => m.matricula === nuevoMedico.matricula)) {
      alert("Ya existe un médico con esa matrícula.");
      return;
    }

    medicos.push(nuevoMedico);
    guardarMedicos(medicos);

    alert("Médico agregado correctamente ✅");
    form.reset();
  });
});
