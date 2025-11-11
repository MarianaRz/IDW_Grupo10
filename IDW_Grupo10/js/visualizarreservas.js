document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla_turnos");
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  if (turnos.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td colspan="11" class="text-center">No hay turnos reservados.</td>`;
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
      <td>${t.obraSocialNombre}</td>
      <td>${t.medicoNombre}</td>
      <td>${t.especialidadNombre}</td>
      <td>${t.fecha}</td>
      <td>${t.horario}</td>
      <td>${t.valorFinal}</td>
    `;
    tabla.appendChild(fila);
  });
});