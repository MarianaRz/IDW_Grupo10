document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla_obras");

  // Obtener obras sociales del localStorage
  const obrasSociales = obtenerObrasSociales();

  // Si no hay obras, mostrar mensaje
  if (obrasSociales.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td colspan="6" class="text-center text-muted">
        No hay obras sociales registradas.
      </td>
    `;
    tabla.appendChild(fila);
    return;
  }

  // Generar filas dinámicamente
  obrasSociales.forEach((obra, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${obra.nombre}</td>
      <td>${obra.direccion || "-"}</td>
      <td>${obra.telefono || "-"}</td>
      <td>${obra.email || "-"}</td>
      <td>${obra.porcentaje ? obra.porcentaje + "%" : "-"}</td>
    `;
    tabla.appendChild(fila);
  });
});
