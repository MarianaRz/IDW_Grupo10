document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaEspecialidades");
  const mensajeVacio = document.getElementById("mensajeVacio");

  if (!tabla) return;

  const especialidades =
    JSON.parse(localStorage.getItem("especialidades")) || [];

  if (especialidades.length === 0) {
    mensajeVacio.style.display = "block";
    return;
  }

  especialidades.forEach((esp, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${esp.nombre}</td>
      <td>${esp.descripcion}</td>
    `;
    tabla.appendChild(fila);
  });
});