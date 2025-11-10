document.addEventListener("DOMContentLoaded", () => {
  const contenedorEspecialidades = document.getElementById("contenedorEspecialidades");
  if (!contenedorEspecialidades) return;

  const especialidades = obtenerEspecialidades();

  contenedorEspecialidades.innerHTML = "";

  especialidades.forEach((esp) => {
    const div = document.createElement("div");
    div.classList.add("col-12", "col-md-4", "mb-4");

    div.innerHTML = `
      <div class="card p-3 text-center">
        <div class="icono mb-2">
          <i class="fa-solid ${esp.icono || "fa-stethoscope"} fa-lg"></i>
        </div>
        <h3>${esp.nombre}</h3>
        <p>${esp.descripcion}</p>
      </div>
    `;

    contenedorEspecialidades.appendChild(div);
  });
});
