const MEDICOS_BASE = [
  {
    matricula: 1234,
    apellido: "Gómez",
    nombre: "Laura",
    especialidad: "Cardiología",
    obraSocial: "OSDE",
    valorConsulta: 7500,
    descripcion: "Especialista en cardiología con 10 años de experiencia."
  },
  {
    matricula: 5678,
    apellido: "Pérez",
    nombre: "Andrés",
    especialidad: "Pediatría",
    obraSocial: "Swiss Medical",
    valorConsulta: 6800,
    descripcion: "Pediatra enfocado en desarrollo infantil."
  },
  {
    matricula: 9101,
    apellido: "Fernández",
    nombre: "Sofía",
    especialidad: "Dermatología",
    obraSocial: "Galeno",
    valorConsulta: 7200,
    descripcion: "Dermatóloga especializada en tratamientos estéticos y clínicos."
  }
];

if (!localStorage.getItem("medicos")) {
  localStorage.setItem("medicos", JSON.stringify(MEDICOS_BASE));
}

function obtenerMedicos() {
  try {
    return JSON.parse(localStorage.getItem("medicos")) || [];
  } catch {
    localStorage.setItem("medicos", JSON.stringify(MEDICOS_BASE));
    return MEDICOS_BASE;
  }
}

function guardarMedicos(lista) {
  localStorage.setItem("medicos", JSON.stringify(lista));
}
