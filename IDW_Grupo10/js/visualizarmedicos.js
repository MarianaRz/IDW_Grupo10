document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla_medicos");
  const medicos = obtenerMedicos();
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  medicos.forEach((m) => {
    const especialidad = especialidades.find(e => e.id === m.especialidad);
    const especialidadNombre = especialidad ? especialidad.nombre : "Sin especificar";

    const obrasNombres = Array.isArray(m.obraSocial) && m.obraSocial.length > 0
      ? m.obraSocial
          .map(id => {
            const os = obrasSociales.find(o => o.id === id);
            return os ? os.nombre : `#${id}`;
          })
          .join(", ")
      : "Ninguna";

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${m.matricula}</td>
      <td>${m.apellido}</td>
      <td>${m.nombre}</td>
      <td>${especialidadNombre}</td>
      <td>${obrasNombres}</td>
      <td>$${m.valorConsulta}</td>
      <td>${m.descripcion}</td>
    `;
    tabla.appendChild(fila);
  });
});