const MEDICOS_BASE = [
  {
    matricula: 9101,
    apellido: "Lopez",
    nombre: "Martin",
    especialidad: "Clínica General",
    obraSocial: ["Osde", "Pami"],
    valorConsulta: 7200,
    descripcion: "Medico clinico especializado en tercera edad.",
    email: "martin.lopez@centromedico.com",
    telefono: "1156789012",
    img: "imagen/doctor1.jpg"
  },
  {
    matricula: 5678,
    apellido: "Medina",
    nombre: "Javier",
    especialidad: "Pediatría",
    obraSocial: ["Apross", "SwissMedical"],
    valorConsulta: 6800,
    descripcion: "Pediatra enfocado en desarrollo infantil.",
    email: "javier.medina@centromedico.com",
    telefono: "1145678901",
    img: "imagen/doctor2.jpg"
  },
  {
    matricula: 1234,
    apellido: "Gómez",
    nombre: "Ricardo",
    especialidad: "Cardiología",
    obraSocial: ["Galeno", "SwissMedical"],
    valorConsulta: 7500,
    descripcion: "Especialista en cardiología con 10 años de experiencia.",
    email: "ricardo.gomez@centromedico.com",
    telefono: "1132456789",
    img: "imagen/doctor3.jpg"
  },
  {
    matricula: 1111,
    apellido: "Rojas",
    nombre: "Cecilia",
    especialidad: "Oftalmología",
    obraSocial: ["Medife","Osde"],
    valorConsulta: 7000,
    descripcion: "Especialista en oftalmología con 8 años de experiencia.",
    email: "cecilia.rojas@centromedico.com",
    telefono: "1167890123",
    img: "imagen/doctor4.jpg"
  },
  {
    matricula: 2222,
    apellido: "Torres",
    nombre: "Santiago",
    especialidad: "Odontología",
    obraSocial: ["Ioma", "Omint"],
    valorConsulta: 6500,
    descripcion: "Odontólogo con 12 años de experiencia en clínica dental.",
    email: "santiago.torres@centromedico.com",
    telefono: "1178901234",
    img: "imagen/doctor5.jpg"
  },
  {
    matricula: 3333,
    apellido: "Suárez",
    nombre: "Valeria",
    especialidad: "Traumatología",
    obraSocial: ["Pami", "Premedic"],
    valorConsulta: 7000,
    descripcion: "Traumatóloga especializada en lesiones deportivas.",
    email: "valeria.suarez@centromedico.com",
    telefono: "1189012345",
    img: "imagen/doctor6.jpg"
  },
  {
    matricula: 4444,
    apellido: "Fernandez",
    nombre: "Laura",
    especialidad: "Cirugía General",
    obraSocial: ["Apross", "Osde"],
    valorConsulta: 8000,
    descripcion: "Cirujana general con 15 años de experiencia.",
    email: "laura.fernandez@centromedico.com",
    telefono: "1190123456",
    img: "imagen/doctor7.jpg"
  },
  {
    matricula: 5555,
    apellido: "Castillo",
    nombre: "Mariana",
    especialidad: "Oncología",
    obraSocial: ["SwissMedical", "Galeno"],
    valorConsulta: 9500,
    descripcion: "Oncóloga con amplia experiencia en tratamientos modernos.",
    email: "mariana.castillo@centromedico.com",
    telefono: "1101234567",
    img: "imagen/doctor8.jpg"
  },
  {
    matricula: 6666,
    apellido: "Paredes",
    nombre: "Leonardo",
    especialidad: "Pediatría",
    obraSocial: ["Medife", "Osde"],
    valorConsulta: 6800,
    descripcion: "Pediatra con 10 años de experiencia en atención infantil.",
    email: "leonardo.paredes@centromedico.com",
    telefono: "1112345678",
    img: "imagen/doctor9.jpg"
  },
  {
    matricula: 7777,
    apellido: "Vega",
    nombre: "Natalia",
    especialidad: "Cardiología",
    obraSocial: ["Osapm", "Osde"],
    valorConsulta: 7600,
    descripcion: "Cardióloga con 12 años de experiencia en cardiología clínica.",
    email: "natalia.vega@centromedico.com",
    telefono: "1123456789",
    img: "imagen/doctor10.jpg"
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