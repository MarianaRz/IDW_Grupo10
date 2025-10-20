document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla_medicos");
  const medicos = obtenerMedicos();

  medicos.forEach((m) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${m.matricula}</td>
      <td>${m.apellido}</td>
      <td>${m.nombre}</td>
      <td>${m.especialidad}</td>
      <td>${m.obraSocial}</td>
      <td>$${m.valorConsulta}</td>
      <td>${m.descripcion}</td>
    `;
    tabla.appendChild(fila);
  });
});
