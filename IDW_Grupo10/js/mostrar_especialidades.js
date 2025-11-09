// Mostrar especialidades en la sección del index
const contenedorEspecialidades = document.getElementById(
  "contenedorEspecialidades"
);

// Recuperar del localStorage
let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

function renderizarEspecialidades() {
  contenedorEspecialidades.innerHTML = "";
  especialidades.forEach((esp) => {
    const div = document.createElement("div");
    div.classList.add("col-12", "col-md-4", "mb-4");

    div.innerHTML = `
            <div class="card p-3">
                <div class="icono"><i class="fa-solid fa-stethoscope"></i></div>
                <h3>${esp.nombre}</h3>
                <p>${esp.descripcion}</p>
            </div>
        `;
    contenedorEspecialidades.appendChild(div);
  });
}

// Inicializar render
renderizarEspecialidades();
