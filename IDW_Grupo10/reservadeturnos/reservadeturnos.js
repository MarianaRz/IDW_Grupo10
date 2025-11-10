// VERIFICAR SESIÓN AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  const usuario_logeado = sessionStorage.getItem("usuario_logeado");

  if (!usuario_logeado) {
    alert("Debes iniciar sesión para reservar o ver tus turnos.");
    window.location.href = "../login.html";
    return;
  }

  // Mostrar usuario logeado en el header
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

  inicializarSistemaTurnos();
});

// ELEMENTOS
const obraSocialSelect = document.getElementById("obraSocial");
const especialidadSelect = document.getElementById("especialidad");
const medicoSelect = document.getElementById("medico");
const fechaInput = document.getElementById("fecha");
const horariosDiv = document.getElementById("horarios");
const form = document.getElementById("formTurno");
const resumenDatos = document.getElementById("resumenDatos");
const revisionTurno = document.getElementById("revisionTurno");
const btnFinalizar = document.getElementById("btnFinalizar");
const valorConsultaOriginal = document.getElementById("valorConsultaOriginal");
const descuentoTexto = document.getElementById("descuentoTexto");
const valorConsultaFinal = document.getElementById("valorConsultaFinal");
const listaMisTurnos = document.getElementById("listaMisTurnos");

// HORARIOS BASE (para turnos automáticos)
const horariosBase = ["08:00", "09:00", "10:00", "11:00", "16:00", "17:00", "18:00"];

// DATOS
let medicos = [];
let especialidades = [];
let obrasSociales = [];
let medicosFiltrados = [];
let obraSocialSeleccionada = null;

function inicializarSistemaTurnos() {
  // Cargar datos desde localStorage
  medicos = obtenerMedicos();
  especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  // Cargar obras sociales en el select
  cargarObrasSociales();

  // Event listeners
  obraSocialSelect.addEventListener("change", alSeleccionarObraSocial);
  especialidadSelect.addEventListener("change", alSeleccionarEspecialidad);
  medicoSelect.addEventListener("change", alSeleccionarMedico);
  fechaInput.addEventListener("change", validarFechaYMostrarHorarios);

  // Botones de navegación
  document.getElementById("btnNavReservar").addEventListener("click", mostrarFormularioReserva);
  document.getElementById("btnNavVerTurnos").addEventListener("click", mostrarMisTurnos);

  // Submit del formulario
  form.addEventListener("submit", confirmarTurno);
}

//  CARGAR OBRAS SOCIALES
function cargarObrasSociales() {
  obraSocialSelect.innerHTML = '<option value="">Seleccione una obra social...</option>';
  obrasSociales.forEach(os => {
    const opt = document.createElement("option");
    opt.value = os.id;
    opt.textContent = os.nombre;
    opt.dataset.porcentaje = os.porcentaje;
    obraSocialSelect.appendChild(opt);
  });
}

// AL SELECCIONAR OBRA SOCIAL → Filtrar especialidades disponibles
function alSeleccionarObraSocial() {
  limpiarSelects(['especialidad', 'medico']);
  limpiarValoresConsulta();
  horariosDiv.innerHTML = "";

  const obraSocialId = Number(obraSocialSelect.value);
  if (!obraSocialId) return;

  // Guardar obra social seleccionada
  obraSocialSeleccionada = obrasSociales.find(os => os.id === obraSocialId);

  // Filtrar médicos que aceptan esta obra social
  medicosFiltrados = medicos.filter(m => 
    Array.isArray(m.obraSocial) && m.obraSocial.includes(obraSocialId)
  );

  if (medicosFiltrados.length === 0) {
    alert("No hay médicos disponibles para esta obra social.");
    return;
  }

  // Obtener especialidades únicas de estos médicos
  const especialidadesIds = [...new Set(medicosFiltrados.map(m => m.especialidad))];
  const especialidadesDisponibles = especialidades.filter(e => 
    especialidadesIds.includes(e.id)
  );

  // Cargar especialidades en el select
  especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad...</option>';
  especialidadesDisponibles.forEach(esp => {
    const opt = document.createElement("option");
    opt.value = esp.id;
    opt.textContent = esp.nombre;
    especialidadSelect.appendChild(opt);
  });
}

// AL SELECCIONAR ESPECIALIDAD → Filtrar médicos
function alSeleccionarEspecialidad() {
  limpiarSelects(['medico']);
  limpiarValoresConsulta();
  horariosDiv.innerHTML = "";

  const especialidadId = Number(especialidadSelect.value);
  if (!especialidadId) return;

  // Filtrar médicos por especialidad (ya están filtrados por obra social)
  const medicosConEspecialidad = medicosFiltrados.filter(m => 
    m.especialidad === especialidadId
  );

  if (medicosConEspecialidad.length === 0) {
    alert("No hay médicos disponibles para esta combinación.");
    return;
  }

  // Cargar médicos en el select
  medicoSelect.innerHTML = '<option value="">Seleccione un médico...</option>';
  medicosConEspecialidad.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.matricula;
    opt.textContent = `Dr. ${m.nombre} ${m.apellido}`;
    opt.dataset.valorConsulta = m.valorConsulta;
    medicoSelect.appendChild(opt);
  });
}

// AL SELECCIONAR MÉDICO → Mostrar valores
function alSeleccionarMedico() {
  limpiarValoresConsulta();
  horariosDiv.innerHTML = "";

  const medicoMatricula = Number(medicoSelect.value);
  if (!medicoMatricula) return;

  const medicoSeleccionado = medicos.find(m => m.matricula === medicoMatricula);
  if (!medicoSeleccionado) return;

  const valorOriginal = medicoSeleccionado.valorConsulta;
  const porcentajeDescuento = obraSocialSeleccionada ? obraSocialSeleccionada.porcentaje : 0;
  const descuento = (valorOriginal * porcentajeDescuento) / 100;
  const valorFinal = valorOriginal - descuento;

  // Mostrar valores
  valorConsultaOriginal.textContent = `$${valorOriginal.toFixed(2)}`;
  descuentoTexto.textContent = `${porcentajeDescuento}% de descuento (-$${descuento.toFixed(2)})`;
  valorConsultaFinal.textContent = `$${valorFinal.toFixed(2)}`;

  // Mostrar horarios si hay fecha seleccionada
  if (fechaInput.value) {
    mostrarHorariosDisponibles();
  }
}

// VALIDAR FECHA Y MOSTRAR HORARIOS
function validarFechaYMostrarHorarios() {
  const fecha = new Date(fechaInput.value + "T00:00:00");
  const dia = fecha.getDay();
  
  if (dia === 0 || dia === 6) {
    alert("No se pueden reservar turnos los fines de semana.");
    fechaInput.value = "";
    horariosDiv.innerHTML = "";
    return;
  }

  mostrarHorariosDisponibles();
}

// MOSTRAR HORARIOS DISPONIBLES (Combinando horarios base + turnos admin)
function mostrarHorariosDisponibles() {
  horariosDiv.innerHTML = "";
  
  const fecha = fechaInput.value;
  const medicoMatricula = Number(medicoSelect.value);
  const especialidadId = Number(especialidadSelect.value);

  if (!fecha || !medicoMatricula || !especialidadId) return;

  const medicoSeleccionado = medicos.find(m => m.matricula === medicoMatricula);
  const especialidadObj = especialidades.find(e => e.id === especialidadId);

  if (!medicoSeleccionado || !especialidadObj) return;

  // ✅ OBTENER TURNOS DEL ADMIN para este médico y fecha
  const turnosAdmin = obtenerTurnosAdmin();
  const turnosDelMedico = turnosAdmin.filter(t => {
    if (t.medicoMatricula !== medicoMatricula) return false;
    
    // Incluir turnos permanentes (siempre disponibles salvo que estén reservados)
    if (t.permanente === true) return true;
    
    // Incluir turnos con fecha específica que estén disponibles
    if (t.fecha === fecha && t.disponible === true) return true;
    
    return false;
  });

  // ✅ OBTENER HORARIOS DE TURNOS ADMIN
  const horariosAdmin = turnosDelMedico.map(t => t.horario);

  // ✅ COMBINAR: horarios base + horarios admin (sin duplicados)
  const todosLosHorarios = [...new Set([...horariosBase, ...horariosAdmin])].sort();

  // Obtener turnos RESERVADOS (ocupados) - esto verifica las reservas reales
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const ocupados = turnos
    .filter(t => 
      t.fecha === fecha && 
      t.medicoMatricula === medicoMatricula && 
      t.especialidadId === especialidadId
    )
    .map(t => t.horario);

  // Crear botones de horarios
  todosLosHorarios.forEach(hora => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = hora;
    btn.classList.add("btn", "btn-outline-primary", "m-1");
    
    // ✅ Marcar como ocupado si ya está reservado para ESTA fecha específica
    if (ocupados.includes(hora)) {
      btn.classList.add("disabled");
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#horarios button").forEach(b => 
          b.classList.remove("active")
        );
        btn.classList.add("active");
      });
    }
    
    horariosDiv.appendChild(btn);
  });
}

//  CONFIRMAR TURNO
function confirmarTurno(e) {
  e.preventDefault();

  // Validar campos personales
  const campos = ["nombre", "apellido", "dni", "telefono"];
  for (const id of campos) {
    const input = document.getElementById(id);
    if (!input.value.trim()) {
      alert(`Complete el campo ${id}`);
      input.focus();
      return;
    }
  }

  // Validar selecciones
  if (!obraSocialSelect.value) {
    alert("Seleccione una obra social");
    return;
  }

  const horarioSeleccionado = document.querySelector("#horarios button.active");
  if (!horarioSeleccionado) {
    alert("Seleccione un horario");
    return;
  }

  const usuario_logeado = sessionStorage.getItem("usuario_logeado");
  const medicoSeleccionado = medicos.find(m => m.matricula === Number(medicoSelect.value));
  const especialidadObj = especialidades.find(e => e.id === Number(especialidadSelect.value));

  const valorOriginal = medicoSeleccionado.valorConsulta;
  const porcentajeDescuento = obraSocialSeleccionada.porcentaje;
  const valorFinal = valorOriginal - (valorOriginal * porcentajeDescuento / 100);

  const turno = {
    usuario: usuario_logeado,
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    dni: document.getElementById("dni").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    obraSocialId: obraSocialSeleccionada.id,
    obraSocialNombre: obraSocialSeleccionada.nombre,
    especialidadId: especialidadObj.id,
    especialidadNombre: especialidadObj.nombre,
    medicoMatricula: medicoSeleccionado.matricula,
    medicoNombre: `Dr. ${medicoSeleccionado.nombre} ${medicoSeleccionado.apellido}`,
    fecha: fechaInput.value,
    horario: horarioSeleccionado.textContent,
    valorOriginal: valorOriginal,
    porcentajeDescuento: porcentajeDescuento,
    valorFinal: valorFinal.toFixed(2)
  };

  // Mostrar resumen
  resumenDatos.innerHTML = `
    <li class="list-group-item"><strong>Paciente:</strong> ${turno.nombre} ${turno.apellido}</li>
    <li class="list-group-item"><strong>DNI:</strong> ${turno.dni}</li>
    <li class="list-group-item"><strong>Teléfono:</strong> ${turno.telefono}</li>
    <li class="list-group-item"><strong>Obra Social:</strong> ${turno.obraSocialNombre}</li>
    <li class="list-group-item"><strong>Médico:</strong> ${turno.medicoNombre}</li>
    <li class="list-group-item"><strong>Especialidad:</strong> ${turno.especialidadNombre}</li>
    <li class="list-group-item"><strong>Fecha:</strong> ${turno.fecha}</li>
    <li class="list-group-item"><strong>Horario:</strong> ${turno.horario}</li>
    <li class="list-group-item"><strong>Valor Original:</strong> $${turno.valorOriginal}</li>
    <li class="list-group-item"><strong>Descuento:</strong> ${turno.porcentajeDescuento}%</li>
    <li class="list-group-item"><strong>Valor Final:</strong> $${turno.valorFinal}</li>
  `;

  revisionTurno.classList.remove("d-none");

  btnFinalizar.onclick = () => {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));

    // MARCAR TURNO ADMIN COMO NO DISPONIBLE (si existe)
    marcarTurnoComoReservado(turno.medicoMatricula, turno.fecha, turno.horario);

    alert("Turno reservado con éxito ✅");
    form.reset();
    limpiarSelects(['especialidad', 'medico']);
    limpiarValoresConsulta();
    horariosDiv.innerHTML = "";
    revisionTurno.classList.add("d-none");
  };
}

// MOSTRAR MIS TURNOS
function mostrarMisTurnos() {
  document.getElementById("form_turnos").classList.add("d-none");
  document.getElementById("misTurnos").classList.remove("d-none");

  listaMisTurnos.innerHTML = "";
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const usuario_logeado = sessionStorage.getItem("usuario_logeado");
  const misTurnos = turnos.filter(t => t.usuario === usuario_logeado);

  if (misTurnos.length === 0) {
    listaMisTurnos.innerHTML = `<p class="text-center">No tenés turnos reservados.</p>`;
    return;
  }

  misTurnos.forEach((t, index) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4 mb-3";
    card.innerHTML = `
      <div class="card p-4">
        <h5 class="card-title">${t.medicoNombre}</h5>
        <p class="card-text"><strong>Especialidad:</strong> ${t.especialidadNombre}</p>
        <p class="card-text"><strong>Obra Social:</strong> ${t.obraSocialNombre}</p>
        <p class="card-text"><strong>Fecha:</strong> ${t.fecha}</p>
        <p class="card-text"><strong>Horario:</strong> ${t.horario}</p>
        <p class="card-text"><strong>Valor:</strong> $${t.valorFinal} <small class="text-muted">(desc. ${t.porcentajeDescuento}%)</small></p>
        <button class="btn btn-danger btn-sm w-100 mt-2" data-index="${index}">Cancelar turno</button>
      </div>
    `;
    listaMisTurnos.appendChild(card);

    const btnCancelar = card.querySelector("button");
    btnCancelar.addEventListener("click", () => cancelarTurno(t, card));
  });
}

// CANCELAR TURNO
function cancelarTurno(turno, cardElement) {
  if (!confirm("¿Estás seguro que querés cancelar este turno?")) return;

  const turnosTotales = JSON.parse(localStorage.getItem("turnos")) || [];
  const turnoIndex = turnosTotales.findIndex(item =>
    item.usuario === turno.usuario &&
    item.medicoMatricula === turno.medicoMatricula &&
    item.fecha === turno.fecha &&
    item.horario === turno.horario
  );

  if (turnoIndex > -1) {
    turnosTotales.splice(turnoIndex, 1);
    localStorage.setItem("turnos", JSON.stringify(turnosTotales));
    
    // ✅ MARCAR TURNO ADMIN COMO DISPONIBLE NUEVAMENTE (si existe)
    marcarTurnoComoDisponible(turno.medicoMatricula, turno.fecha, turno.horario);
    
    cardElement.remove();
    alert("Turno cancelado con éxito ✅");
  }
}

// MOSTRAR FORMULARIO DE RESERVA
function mostrarFormularioReserva() {
  document.getElementById("form_turnos").classList.remove("d-none");
  document.getElementById("misTurnos").classList.add("d-none");
}

// UTILIDADES
function limpiarSelects(ids) {
  ids.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.innerHTML = '<option value="">Seleccione...</option>';
    }
  });
}

function limpiarValoresConsulta() {
  valorConsultaOriginal.textContent = "—";
  descuentoTexto.textContent = "—";
  valorConsultaFinal.textContent = "—";
}