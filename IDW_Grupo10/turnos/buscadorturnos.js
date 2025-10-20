const formBuscar = document.getElementById("formBuscar");
const dniInput = document.getElementById("dniBuscar");
const resultadosTurnos = document.getElementById("resultadosTurnos");
const listaTurnos = document.getElementById("listaTurnos");

// Evento de búsqueda
formBuscar.addEventListener("submit", e => {
  e.preventDefault();
  const dni = dniInput.value.trim();
  if (!dni) {
    alert("Por favor, ingrese un DNI.");
    return;
  }

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const encontrados = turnos.filter(t => t.dni === dni);

  listaTurnos.innerHTML = "";

  if (encontrados.length === 0) {
    alert("No se encontraron turnos para ese DNI.");
    resultadosTurnos.classList.add("d-none");
    return;
  }

  encontrados.forEach((turno, index) => {
    const item = document.createElement("li");
    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    item.innerHTML = `
      <div>
        <strong>${turno.fecha} ${turno.horario}</strong><br>
        Médico: ${turno.medico} - Especialidad: ${turno.especialidad}
      </div>
      <div class="btn-group">
        <button class="btn btn-outline-secondary btn-sm" data-index="${index}" data-dni="${dni}">Editar</button>
        <button class="btn btn-outline-danger btn-sm" data-index="${index}" data-dni="${dni}">Cancelar</button>
      </div>
    `;

    listaTurnos.appendChild(item);
  });

  resultadosTurnos.classList.remove("d-none");
});

// evnto para cancelar turno
listaTurnos.addEventListener("click", e => {
if (e.target.textContent === "Cancelar") {
  const index = parseInt(e.target.dataset.index);
  const dni = e.target.dataset.dni;

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const turno = turnos.find((t, i) => t.dni === dni && i === index);

  if (!turno) return;

  // Verificar si faltan menos de 24 horas - EN ESTO DEBO TRABAJAR!!
  
  const fechaHoraTurno = new Date(`${turno.fecha}T${turno.horario}`);
  const ahora = new Date();
  const diferenciaMs = fechaHoraTurno - ahora;

  if (diferenciaMs < 24 * 60 * 60 * 1000) {
    alert("No se puede cancelar el turno porque falta menos de 24 horas.");
    return;
  }

  const confirmar = confirm("¿Seguro desea cancelar su reserva de turno?");
  if (!confirmar) return;

  const nuevosTurnos = turnos.filter((t, i) => !(t.dni === dni && i === index));
  localStorage.setItem("turnos", JSON.stringify(nuevosTurnos));
  alert("Turno cancelado.");
  formBuscar.dispatchEvent(new Event("submit"));
}


  if (e.target.textContent === "Editar") {
    alert("Función de edición en desarrollo.");
    //DESDE ACA TRABAJAREMOS CON EDITAR TURNO
    //Fecha y dia
  }
});
