document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEspecialidad");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreEspecialidad").value.trim();
    const descripcion = document
      .getElementById("descripcionEspecialidad")
      .value.trim();

    if (!nombre || !descripcion) {
      mostrarMensaje("Por favor, complete todos los campos.", "danger");
      return;
    }

    const especialidades =
      JSON.parse(localStorage.getItem("especialidades")) || [];

    // Verificar nombre duplicado
    const existe = especialidades.some(
      (esp) => esp.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (existe) {
      mostrarMensaje("Ya existe una especialidad con ese nombre.", "warning");
      return;
    }

    // Calcular ID secuencial
    let nuevoId = 1;
    if (especialidades.length > 0) {
      const idsValidos = especialidades
        .map((esp) => Number(esp.id))
        .filter((id) => !isNaN(id));
      if (idsValidos.length > 0) {
        nuevoId = Math.max(...idsValidos) + 1;
      }
    }

    const nuevaEspecialidad = { id: nuevoId, nombre, descripcion };

    especialidades.push(nuevaEspecialidad);
    localStorage.setItem("especialidades", JSON.stringify(especialidades));

    form.reset();
    mostrarMensaje("Especialidad registrada con éxito.", "success");
  });
});

function mostrarMensaje(texto, tipo) {
  const alertaExistente = document.querySelector(".alert");
  if (alertaExistente) alertaExistente.remove();

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} mt-3 text-center`;
  alerta.textContent = texto;

  const form = document.getElementById("formEspecialidad");
  form.appendChild(alerta);

  setTimeout(() => alerta.remove(), 3000);
}
