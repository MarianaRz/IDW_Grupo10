// VERIFICAR SESIÓN AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  const usuario_logeado = sessionStorage.getItem("usuario_logeado");

  if (!usuario_logeado) {
    alert("Debes iniciar sesión para reservar o ver tus turnos.");
    window.location.href = "../login.html";
    return;
  }

  // mostrar usuario logeado en el header
  const login_item = document.getElementById("login_item");
  if (login_item) {
    login_item.innerHTML = `
      <div class="dropdown">
        <a 
          class="nav-link dropdown-toggle d-flex align-items-center" 
          href="#" 
          role="button" 
          id="userDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i class="fa-solid fa-user me-2"></i>${usuario_logeado}
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="#" id="cerrar_sesion">
            <i class="fa-solid fa-right-from-bracket me-2"></i>Cerrar sesión</a>
          </li>
        </ul>
      </div>
    `;

    const cerrar_sesion = document.getElementById("cerrar_sesion");
    cerrar_sesion.addEventListener("click", () => {
      sessionStorage.removeItem("usuario_logeado");
      window.location.href = "../index.html";
    });
  }
});

// ELEMENTOS
const medicoSelect = document.getElementById("medico");
const especialidadSelect = document.getElementById("especialidad");
const fechaInput = document.getElementById("fecha");
const horariosDiv = document.getElementById("horarios");
const form = document.getElementById("formTurno");
const resumenDatos = document.getElementById("resumenDatos");
const revisionTurno = document.getElementById("revisionTurno");
const btnFinalizar = document.getElementById("btnFinalizar");
const valorConsulta = document.getElementById("valorConsulta");
const listaMisTurnos = document.getElementById("listaMisTurnos");

// HORARIOS BASE
const horariosBase = ["08:00","09:00","10:00","11:00","16:00","17:00","18:00","19:00"];

// OBTENER MÉDICOS DESDE MEDICOS.JS
const medicos = obtenerMedicos();

// CARGAR MÉDICOS EN SELECT
medicos.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m.matricula;
  opt.textContent = `${m.nombre} ${m.apellido}`;
  opt.dataset.especialidades = JSON.stringify([m.especialidad]);
  opt.dataset.valorConsulta = m.valorConsulta;
  medicoSelect.appendChild(opt);
});

// ACTUALIZAR ESPECIALIDADES SEGÚN MÉDICO
medicoSelect.addEventListener("change", () => {
  especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad...</option>';
  const selected = medicoSelect.selectedOptions[0];
  if (!selected) return;
  const especialidades = JSON.parse(selected.dataset.especialidades || "[]");
  especialidades.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e;
    opt.textContent = e;
    especialidadSelect.appendChild(opt);
  });

  valorConsulta.textContent = `$${selected.dataset.valorConsulta}`;
  mostrarHorariosDisponibles();
});

// VALIDAR FINES DE SEMANA
fechaInput.addEventListener("change", () => {
  const fecha = new Date(fechaInput.value);
  const dia = fecha.getDay();
  if(dia === 0 || dia === 6){
    alert("No se pueden reservar turnos los fines de semana.");
    fechaInput.value = "";
    horariosDiv.innerHTML = "";
    return;
  }
  mostrarHorariosDisponibles();
});

especialidadSelect.addEventListener("change", mostrarHorariosDisponibles);

// MOSTRAR HORARIOS DISPONIBLES
function mostrarHorariosDisponibles(){
  horariosDiv.innerHTML = "";
  const fecha = fechaInput.value;
  const medico = medicoSelect.value;
  const especialidad = especialidadSelect.value;
  if(!fecha || !medico || !especialidad) return;

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const ocupados = turnos
    .filter(t => t.fecha === fecha && t.medico === medicoSelect.selectedOptions[0].text && t.especialidad === especialidad)
    .map(t => t.horario);

  horariosBase.forEach(hora => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = hora;
    btn.classList.add("btn","btn-outline-primary");
    if(ocupados.includes(hora)) btn.classList.add("disabled");
    else btn.addEventListener("click", () => {
      document.querySelectorAll("#horarios button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
    horariosDiv.appendChild(btn);
  });
}

// SUBMIT FORM
form.addEventListener("submit", e => {
  e.preventDefault();

  const campos = ["nombre","apellido","dni","telefono"];
  for(const id of campos){
    const input = document.getElementById(id);
    if(!input.value.trim()){ alert(`Complete el campo ${id}`); input.focus(); return; }
  }

  const horarioSeleccionado = document.querySelector("#horarios button.active");
  if(!horarioSeleccionado){ alert("Seleccione un horario"); return; }

  const usuario_logeado = sessionStorage.getItem("usuario_logeado");

  const turno = {
    usuario: usuario_logeado,
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    dni: document.getElementById("dni").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    medico: medicoSelect.selectedOptions[0].text,
    especialidad: especialidadSelect.value,
    fecha: fechaInput.value,
    horario: horarioSeleccionado.textContent,
    valorConsulta: valorConsulta.textContent
  };

  resumenDatos.innerHTML = "";
  for(const [key, value] of Object.entries(turno)){
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
    resumenDatos.appendChild(li);
  }

  revisionTurno.classList.remove("d-none");

  btnFinalizar.onclick = () => {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));

    alert("Turno reservado con éxito");
    form.reset();
    especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad...</option>';
    horariosDiv.innerHTML = "";
    revisionTurno.classList.add("d-none");
  };
});

// BOTONES NAV BAR
document.getElementById("btnNavReservar").addEventListener("click", () => {
  document.getElementById("form_turnos").classList.remove("d-none");
  document.getElementById("misTurnos").classList.add("d-none");
});

document.getElementById("btnNavVerTurnos").addEventListener("click", () => {
  document.getElementById("form_turnos").classList.add("d-none");
  document.getElementById("misTurnos").classList.remove("d-none");

  listaMisTurnos.innerHTML = "";
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const usuario_logeado = sessionStorage.getItem("usuario_logeado");
  const misTurnos = turnos.filter(t => t.usuario === usuario_logeado);

  if(misTurnos.length === 0){
    listaMisTurnos.innerHTML = `<p class="text-center">No tenés turnos reservados.</p>`;
    return;
  }

  misTurnos.forEach(t => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4 mb-3";
    card.innerHTML = `
      <div class="card p-4">
        <h5 class="card-title">${t.medico} (${t.especialidad})</h5>
        <p class="card-text">Fecha: ${t.fecha}</p>
        <p class="card-text">Horario: ${t.horario}</p>
        <p class="card-text">Valor: ${t.valorConsulta}</p>
        <button class="btn btn-danger btn-sm w-100 mt-2">Cancelar turno</button>
      </div>
    `;
    listaMisTurnos.appendChild(card);

    const btnCancelar = card.querySelector("button");
    btnCancelar.addEventListener("click", () => {
      if(confirm("¿Estás seguro que querés cancelar este turno?")){
        const turnosTotales = JSON.parse(localStorage.getItem("turnos")) || [];
        const turnoIndex = turnosTotales.findIndex(
          item =>
            item.usuario === t.usuario &&
            item.medico === t.medico &&
            item.especialidad === t.especialidad &&
            item.fecha === t.fecha &&
            item.horario === t.horario
        );
        if(turnoIndex > -1){
          turnosTotales.splice(turnoIndex, 1);
          localStorage.setItem("turnos", JSON.stringify(turnosTotales));
          btnCancelar.closest(".col-12").remove();
          alert("Turno cancelado con éxito");
        }
      }
    });
  });
});
