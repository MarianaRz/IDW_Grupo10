document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form_admin");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // validar
    if (typeof validarFormulario === "function" && !validarFormulario()) {
      alert("Por favor, complete correctamente todos los campos requeridos.");
      return;
    }

    // obtener médicos del localStorage
    let medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

    const nuevoMedico = {
      matricula: Number(document.getElementById("matricula").value),
      apellido: document.getElementById("apellido").value.trim(),
      nombre: document.getElementById("nombre").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      obraSocial: document.getElementById("obrasocial").value.trim(),
      valorConsulta: Number(document.getElementById("consulta").value || 0),
      descripcion: document.getElementById("descripcion").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
    };

    // evitar matrícula repetida
    if (medicos.some((m) => m.matricula === nuevoMedico.matricula)) {
      alert("Ya existe un médico con esa matrícula.");
      return;
    }

    medicos.push(nuevoMedico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    alert("Médico agregado correctamente ✅");
    form.reset();
  });
});
