// admin-turnos.js - Sistema unificado de gestión de turnos
document.addEventListener("DOMContentLoaded", () => {
  const medicos = obtenerMedicos();
  let modalEditar;
  
  // Inicializar modal
  const modalElement = document.getElementById('modalEditarTurno');
  if (modalElement) {
    modalEditar = new bootstrap.Modal(modalElement);
  }
  
  // Cargar médicos en todos los selects
  cargarMedicosEnSelects();
  
  // Cambio en el tipo de turno
  document.getElementById("tipoTurno").addEventListener("change", cambiarTipoTurno);
  
  // Formulario turno individual
  document.getElementById("formTurnoIndividual").addEventListener("submit", (e) => {
    e.preventDefault();
    crearTurnoIndividual();
  });
  
  // Filtrar turnos
  document.getElementById("btnFiltrar").addEventListener("click", cargarTurnos);
  
  // Guardar edición
  document.getElementById("btnGuardarEdicion").addEventListener("click", guardarEdicionTurno);
  
  // Cargar turnos inicialmente
  cargarTurnos();
});

function cargarMedicosEnSelects() {
  const medicos = obtenerMedicos();
  const selects = [
    "medicoIndividual",
    "filtroMedico",
    "editarMedico"
  ];
  
  selects.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    // Mantener la opción inicial excepto en editarMedico
    if (selectId !== "editarMedico") {
      const primeraOpcion = select.querySelector("option");
      select.innerHTML = "";
      if (primeraOpcion) select.appendChild(primeraOpcion);
    } else {
      select.innerHTML = '<option value="">Seleccione un médico...</option>';
    }
    
    medicos.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.matricula;
      opt.textContent = `Dr. ${m.nombre} ${m.apellido}`;
      select.appendChild(opt);
    });
  });
}

function cambiarTipoTurno() {
  const tipoTurno = document.getElementById("tipoTurno").value;
  const contenedorFecha = document.getElementById("contenedorFecha");
  const fechaInput = document.getElementById("fechaIndividual");
  const infoTipo = document.getElementById("infoTipo");
  
  if (tipoTurno === "siempre") {
    contenedorFecha.style.display = "none";
    fechaInput.removeAttribute("required");
    fechaInput.value = "";
    infoTipo.innerHTML = '<i class="fas fa-infinity"></i> Creará un turno permanente que se repetirá todos los días laborables.';
  } else {
    contenedorFecha.style.display = "block";
    fechaInput.setAttribute("required", "required");
    infoTipo.innerHTML = '<i class="fas fa-info-circle"></i> Creará un turno para el día seleccionado.';
  }
}

function crearTurnoIndividual() {
  const medicoMatricula = Number(document.getElementById("medicoIndividual").value);
  const tipoTurno = document.getElementById("tipoTurno").value;
  const fecha = document.getElementById("fechaIndividual").value;
  const horario = document.getElementById("horarioIndividual").value;
  
  if (!medicoMatricula || !horario) {
    alert("Complete todos los campos requeridos");
    return;
  }
  
  // Validar fecha si es turno único
  if (tipoTurno === "unico" && !fecha) {
    alert("Debe seleccionar una fecha para turno único");
    return;
  }
  
  let resultado;
  
  if (tipoTurno === "siempre") {
    resultado = crearTurnoPermanente(medicoMatricula, horario);
    
    if (resultado.success) {
      alert("Turno permanente creado exitosamente ✅\nEste turno estará disponible todos los días laborables.");
      document.getElementById("formTurnoIndividual").reset();
      cargarTurnos();
    } else {
      alert("Error: " + resultado.message);
    }
  } else {
    resultado = crearTurno(medicoMatricula, fecha, horario);
    
    if (resultado.success) {
      alert("Turno creado exitosamente ✅");
      document.getElementById("formTurnoIndividual").reset();
      cargarTurnos();
    } else {
      alert("Error: " + resultado.message);
    }
  }
}

function cargarTurnos() {
  const medicos = obtenerMedicos();
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const turnosAdmin = obtenerTurnosAdmin();
  const reservas = JSON.parse(localStorage.getItem("turnos")) || [];

  // Obtener filtros
  const filtroMedico = Number(document.getElementById("filtroMedico").value) || null;
  const filtroFecha = document.getElementById("filtroFecha").value || null;
  const filtroEstado = document.getElementById("filtroEstado").value || null;

  // Filtrar turnos
  let turnosFiltrados = turnosAdmin;

  if (filtroMedico) {
    turnosFiltrados = turnosFiltrados.filter(t => t.medicoMatricula === filtroMedico);
  }

  if (filtroFecha) {
    turnosFiltrados = turnosFiltrados.filter(t => 
      t.fecha === filtroFecha || t.permanente === true
    );
  }

  if (filtroEstado === "disponible") {
    turnosFiltrados = turnosFiltrados.filter(t => t.permanente || t.disponible === true);
  } else if (filtroEstado === "ocupado") {
    turnosFiltrados = turnosFiltrados.filter(t => !t.permanente && t.disponible === false);
  }

  // Ordenar: permanentes primero, luego por fecha y horario
  turnosFiltrados.sort((a, b) => {
    if (a.permanente && !b.permanente) return -1;
    if (!a.permanente && b.permanente) return 1;
    if (a.permanente && b.permanente) return a.horario.localeCompare(b.horario);
    if (a.fecha !== b.fecha) return a.fecha.localeCompare(b.fecha);
    return a.horario.localeCompare(b.horario);
  });

  // Mostrar turnos
  const tablaTurnos = document.getElementById("tablaTurnos");
  const sinResultados = document.getElementById("sinResultados");
  tablaTurnos.innerHTML = "";

  if (turnosFiltrados.length === 0) {
    sinResultados.classList.remove("d-none");
    return;
  }
  sinResultados.classList.add("d-none");

  turnosFiltrados.forEach(turno => {
    const medico = medicos.find(m => m.matricula === turno.medicoMatricula);
    const especialidad = especialidades.find(e => e.id === medico?.especialidad);

    const tr = document.createElement("tr");

    let fechaDisplay, estadoDisplay;

    if (turno.permanente) {
      // Reservas de este turno
      const reservasDelTurno = reservas
        .filter(r => r.medicoMatricula === turno.medicoMatricula && r.horario === turno.horario)
        .map(r => r.fecha);

      fechaDisplay = `
        <span class="badge bg-info">
          <i class="fas fa-infinity"></i> Permanente
        </span>
      `;

      estadoDisplay = `<span class="badge bg-success">Activo</span>`;

      if (reservasDelTurno.length > 0) {
        estadoDisplay += `<br><small class="text-muted">
          ${reservasDelTurno.map(f => formatearFecha(f)).join(" - ")}
        </small>`;
      }

    } else {
      fechaDisplay = formatearFecha(turno.fecha);
      estadoDisplay = `
        <span class="badge ${turno.disponible ? 'badge-disponible' : 'badge-ocupado'}">
          ${turno.disponible ? 'Disponible' : 'Ocupado'}
        </span>
      `;
    }

    // Crear celdas
    const tdMedico = document.createElement("td");
    tdMedico.innerHTML = medico ? `Dr. ${medico.nombre} ${medico.apellido}` : 'Médico no encontrado';

    const tdEspecialidad = document.createElement("td");
    tdEspecialidad.innerHTML = especialidad ? especialidad.nombre : 'Sin especialidad';

    const tdFecha = document.createElement("td");
    tdFecha.innerHTML = fechaDisplay;

    const tdHorario = document.createElement("td");
    tdHorario.innerHTML = `<strong>${turno.horario}</strong>`;

    const tdEstado = document.createElement("td");
    tdEstado.innerHTML = estadoDisplay;

    const tdAcciones = document.createElement("td");

    // Botón editar
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-sm btn-outline-primary me-1";
    btnEditar.title = "Editar";
    btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
    btnEditar.addEventListener("click", () => editarTurnoModal(turno.id));
    tdAcciones.appendChild(btnEditar);

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-outline-danger";
    btnEliminar.title = "Eliminar";
    btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    btnEliminar.addEventListener("click", () => eliminarTurnoConfirm(turno.id));
    tdAcciones.appendChild(btnEliminar);

    tr.appendChild(tdMedico);
    tr.appendChild(tdEspecialidad);
    tr.appendChild(tdFecha);
    tr.appendChild(tdHorario);
    tr.appendChild(tdEstado);
    tr.appendChild(tdAcciones);

    tablaTurnos.appendChild(tr);
  });
}


function formatearFecha(fecha) {
  const [año, mes, dia] = fecha.split('-');
  return `${dia}/${mes}`;
}

function editarTurnoModal(id) {
  const turnos = obtenerTurnosAdmin();
  const turno = turnos.find(t => t.id === id);
  
  if (!turno) {
    alert("Turno no encontrado");
    return;
  }
  
  document.getElementById("editarTurnoId").value = turno.id;
  document.getElementById("editarMedico").value = turno.medicoMatricula;
  document.getElementById("editarFecha").value = turno.fecha || "";
  document.getElementById("editarHorario").value = turno.horario;
  document.getElementById("editarDisponible").value = turno.disponible.toString();
  
  const modalElement = document.getElementById('modalEditarTurno');
  const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  modal.show();
}

function guardarEdicionTurno() {
  const id = Number(document.getElementById("editarTurnoId").value);
  const medicoMatricula = Number(document.getElementById("editarMedico").value);
  const fecha = document.getElementById("editarFecha").value;
  const horario = document.getElementById("editarHorario").value;
  const disponible = document.getElementById("editarDisponible").value === "true";
  
  const resultado = editarTurno(id, {
    medicoMatricula,
    fecha,
    horario,
    disponible
  });
  
  if (resultado.success) {
    alert("Turno actualizado exitosamente ✅");
    const modalElement = document.getElementById('modalEditarTurno');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
    cargarTurnos();
  } else {
    alert("Error: " + resultado.message);
  }
}

function eliminarTurnoConfirm(id) {
  if (!confirm("¿Está seguro que desea eliminar este turno?")) return;
  
  const resultado = eliminarTurno(id);
  
  if (resultado.success) {
    alert("Turno eliminado exitosamente ✅");
    cargarTurnos();
  } else {
    alert("Error: " + resultado.message);
  }
}

// Exponer funciones globalmente para los onclick
window.editarTurnoModal = editarTurnoModal;
window.eliminarTurnoConfirm = eliminarTurnoConfirm;