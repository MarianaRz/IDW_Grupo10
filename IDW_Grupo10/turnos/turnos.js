const medicoSelect = document.getElementById("medico");
const especialidadSelect = document.getElementById("especialidad");
const fechaInput = document.getElementById("fecha");
const horariosDiv = document.getElementById("horarios");
const form = document.getElementById("formTurno");
const resumenDatos = document.getElementById("resumenDatos");
const revisionTurno = document.getElementById("revisionTurno");
const btnFinalizar = document.getElementById("btnFinalizar");
const valorConsulta = document.getElementById("valorConsulta");


// 1.horarios base

const horariosBase = [
  "08:00", "09:00", "10:00", "11:00",
  "16:00", "17:00", "18:00", "19:00"
];

// 2.Cargar médicos desde localStorage

const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

medicos.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m.matricula;
  opt.textContent = `${m.nombre} ${m.apellido}`;
  const especialidades = Array.isArray(m.especialidad)
    ? m.especialidad
    : [m.especialidad];
  opt.dataset.especialidades = JSON.stringify(especialidades);
  opt.dataset.valorConsulta = m.valorConsulta;
  medicoSelect.appendChild(opt);
});

//3.especialidades según médico

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

    const valor = selected.dataset.valorConsulta || "—";
    valorConsulta.textContent = `$${valor}`;


  mostrarHorariosDisponibles();
});

// 5.NO trabajamos sábados y domingos

fechaInput.addEventListener("change", () => {
  const fechaSeleccionada = new Date(fechaInput.value);
  const diaSemana = fechaSeleccionada.getDay(); // 6 = domingo, 5 = sábado

  if (diaSemana === 5 || diaSemana === 6) {
    alert("No se pueden reservar turnos los fines de semana.");
    fechaInput.value = "";
    horariosDiv.innerHTML = "";
    return;
  }

  mostrarHorariosDisponibles();
});

especialidadSelect.addEventListener("change", mostrarHorariosDisponibles);

//6.Mostrar horarios disponibles

function mostrarHorariosDisponibles() {
  horariosDiv.innerHTML = "";

  const fecha = fechaInput.value;
  const medico = medicoSelect.value;
  const especialidad = especialidadSelect.value;

  if (!fecha || !medico || !especialidad) return;

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  const ocupados = turnos
    .filter(t => t.fecha === fecha && t.medico === medico && t.especialidad === especialidad)
    .map(t => t.horario);

  horariosBase.forEach(hora => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = hora;
    btn.classList.add("btn", "btn-outline-primary");

    if (ocupados.includes(hora)) {
      btn.classList.add("disabled");
    } else {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#horarios button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    }

    horariosDiv.appendChild(btn);
  });
}


// 7.reservas de prueba
if (!localStorage.getItem("turnos")) {
  const reservasDePrueba = [
    {
      nombre: "Carlos",
      apellido: "Ramírez",
      dni: "16598745",
      telefono: "123456789",
      medico: "1234",
      especialidad: "Cardiología",
      fecha: "2025-10-21",
      horario: "09:00"
    },
    {
      nombre: "Lucía",
      apellido: "Fernández",
      dni: "33556895",
      telefono: "987654321",
      medico: "5678",
      especialidad: "Pediatría",
      fecha: "2025-10-21",
      horario: "16:00"
    }
  ];

  localStorage.setItem("turnos", JSON.stringify(reservasDePrueba));
}

//Revisión y confirmación de turno

form.addEventListener("submit", e => {
  e.preventDefault();

    // Validar campos personales
  const campos = [
    { id: "nombre", label: "Nombre" },
    { id: "apellido", label: "Apellido" },
    { id: "dni", label: "dni" },
    { id: "telefono", label: "Teléfono" }
  ];

  for (const campo of campos) {
    const input = document.getElementById(campo.id);
    if (!input.value.trim()) {
      alert(`Por favor, complete el campo "${campo.label}".`);
      input.focus();
      return;
    }
  }

  const horarioSeleccionado = document.querySelector("#horarios button.active");
  if (!horarioSeleccionado) {
    alert("Por favor, seleccione un horario disponible.");
    return;
  }

  const turno = {
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    dni: document.getElementById("dni").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    medico: medicoSelect.options[medicoSelect.selectedIndex].text,
    especialidad: especialidadSelect.value,
    fecha: fechaInput.value,
    horario: horarioSeleccionado.textContent,
    valorConsulta: valorConsulta.textContent
  };

  resumenDatos.innerHTML = "";
  for (const [key, value] of Object.entries(turno)) {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
    resumenDatos.appendChild(item);
  }

  revisionTurno.classList.remove("d-none");

  btnFinalizar.onclick = () => {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push({
      nombre: turno.nombre,
      apellido: turno.apellido,
      dni: turno.dni,
      telefono: turno.telefono,
      medico: medicoSelect.value,
      especialidad: turno.especialidad,
      fecha: turno.fecha,
      horario: turno.horario,
      valorConsulta: turno.valorConsulta
    });
    localStorage.setItem("turnos", JSON.stringify(turnos));

    alert("Turno reservado con éxito.");
    form.reset();
    horariosDiv.innerHTML = "";
    especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad...</option>';
    revisionTurno.classList.add("d-none");
  };
});
