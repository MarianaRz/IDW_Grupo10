document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla_turnos");

  // obtener turnos del localStorage
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  if (turnos.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td colspan="10" class="text-center">No hay turnos reservados.</td>`;
    tabla.appendChild(fila);
    return;
  }

  turnos.forEach(t => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${t.usuario}</td>
      <td>${t.nombre}</td>
      <td>${t.apellido}</td>
      <td>${t.dni}</td>
      <td>${t.telefono}</td>
      <td>${t.medico}</td>
      <td>${t.especialidad}</td>
      <td>${t.fecha}</td>
      <td>${t.horario}</td>
      <td>${t.valorConsulta}</td>
    `;
    tabla.appendChild(fila);
  });
});
