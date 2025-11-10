// turnos.js - Sistema de gestión de turnos del administrador

// Estructura de un turno:
// {
//   id: number,
//   medicoMatricula: number,
//   fecha: "YYYY-MM-DD" | null,  // null = turno permanente
//   horario: "HH:MM",
//   disponible: boolean,
//   permanente: boolean  // true = se repite todos los días
// }

// Inicializar turnos en localStorage si no existen
if (!localStorage.getItem("turnosAdmin")) {
  localStorage.setItem("turnosAdmin", JSON.stringify([]));
}

function obtenerTurnosAdmin() {
  try {
    return JSON.parse(localStorage.getItem("turnosAdmin")) || [];
  } catch {
    return [];
  }
}

function guardarTurnosAdmin(turnos) {
  localStorage.setItem("turnosAdmin", JSON.stringify(turnos));
}

function generarIdTurno() {
  const turnos = obtenerTurnosAdmin();
  return turnos.length > 0 ? Math.max(...turnos.map(t => t.id)) + 1 : 1;
}

// Crear nuevo turno único (con fecha específica)
function crearTurno(medicoMatricula, fecha, horario) {
  const turnos = obtenerTurnosAdmin();
  
  // Verificar que no exista ya ese turno
  const existe = turnos.some(t => 
    t.medicoMatricula === medicoMatricula && 
    t.fecha === fecha && 
    t.horario === horario
  );
  
  if (existe) {
    return { success: false, message: "Ya existe un turno para ese médico en esa fecha y horario" };
  }
  
  const nuevoTurno = {
    id: generarIdTurno(),
    medicoMatricula: medicoMatricula,
    fecha: fecha,
    horario: horario,
    disponible: true,
    permanente: false
  };
  
  turnos.push(nuevoTurno);
  guardarTurnosAdmin(turnos);
  
  return { success: true, turno: nuevoTurno };
}

// Crear turno permanente (sin fecha, se repite siempre)
function crearTurnoPermanente(medicoMatricula, horario) {
  const turnos = obtenerTurnosAdmin();
  
  // Verificar que no exista ya un turno permanente con ese horario para el médico
  const existe = turnos.some(t => 
    t.medicoMatricula === medicoMatricula && 
    t.horario === horario &&
    t.permanente === true
  );
  
  if (existe) {
    return { success: false, message: "Ya existe un turno permanente para ese médico en ese horario" };
  }
  
  const nuevoTurno = {
    id: generarIdTurno(),
    medicoMatricula: medicoMatricula,
    fecha: null,  // null indica que es permanente
    horario: horario,
    disponible: true,
    permanente: true
  };
  
  turnos.push(nuevoTurno);
  guardarTurnosAdmin(turnos);
  
  return { success: true, turno: nuevoTurno };
}

// Editar turno existente
function editarTurno(id, datos) {
  const turnos = obtenerTurnosAdmin();
  const index = turnos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return { success: false, message: "Turno no encontrado" };
  }
  
  // Actualizar campos
  if (datos.medicoMatricula !== undefined) turnos[index].medicoMatricula = datos.medicoMatricula;
  if (datos.fecha !== undefined) turnos[index].fecha = datos.fecha;
  if (datos.horario !== undefined) turnos[index].horario = datos.horario;
  if (datos.disponible !== undefined) turnos[index].disponible = datos.disponible;
  
  guardarTurnosAdmin(turnos);
  return { success: true, turno: turnos[index] };
}

// Eliminar turno
function eliminarTurno(id) {
  const turnos = obtenerTurnosAdmin();
  const index = turnos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return { success: false, message: "Turno no encontrado" };
  }
  
  turnos.splice(index, 1);
  guardarTurnosAdmin(turnos);
  
  return { success: true };
}

// Obtener turnos de un médico en una fecha específica (incluye permanentes)
function obtenerTurnosMedico(medicoMatricula, fecha) {
  const turnos = obtenerTurnosAdmin();
  return turnos.filter(t => 
    t.medicoMatricula === medicoMatricula && 
    (t.fecha === fecha || t.permanente === true)  // Incluye turnos permanentes
  );
}

// Marcar turno como no disponible (cuando se reserva)
function marcarTurnoComoReservado(medicoMatricula, fecha, horario) {
  const turnos = obtenerTurnosAdmin();
  const turno = turnos.find(t => 
    t.medicoMatricula === medicoMatricula && 
    (t.fecha === fecha || t.permanente === true) &&
    t.horario === horario
  );
  
  if (turno) {
    turno.disponible = false;
    guardarTurnosAdmin(turnos);
  }
}

// Marcar turno como disponible (cuando se cancela una reserva)
function marcarTurnoComoDisponible(medicoMatricula, fecha, horario) {
  const turnos = obtenerTurnosAdmin();
  const turno = turnos.find(t => 
    t.medicoMatricula === medicoMatricula && 
    (t.fecha === fecha || t.permanente === true) &&
    t.horario === horario
  );
  
  if (turno) {
    turno.disponible = true;
    guardarTurnosAdmin(turnos);
  }
}

// Crear múltiples turnos (Útil para generar turnos de toda una semana)
function crearTurnosMultiples(medicoMatricula, fechaInicio, fechaFin, horarios) {
  const resultados = [];
  const fechaActual = new Date(fechaInicio + "T00:00:00");
  const fechaFinal = new Date(fechaFin + "T00:00:00");
  
  while (fechaActual <= fechaFinal) {
    const dia = fechaActual.getDay();
    
    // Solo días laborables (lunes a viernes)
    if (dia !== 0 && dia !== 6) {
      const fechaStr = fechaActual.toISOString().split('T')[0];
      
      horarios.forEach(horario => {
        const resultado = crearTurno(medicoMatricula, fechaStr, horario);
        resultados.push({
          fecha: fechaStr,
          horario: horario,
          ...resultado
        });
      });
    }
    
    fechaActual.setDate(fechaActual.getDate() + 1);
  }
  
  return resultados;
}