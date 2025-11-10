const MEDICOS_BASE = [
  {
    id: 1,
    matricula: 1111,
    apellido: "Lopez",
    nombre: "Martin",
    especialidad: 1, // Clínica General
    obraSocial: [1, 2], // OSDE, PAMI
    valorConsulta: 7200,
    descripcion: "Medico clinico especializado en tercera edad.",
    email: "martin.lopez@centromedico.com",
    telefono: "1156789012",
    img: "imagen/doctor1.jpg"
  },
  {
    id: 2,
    matricula: 2222,
    apellido: "Medina",
    nombre: "Javier",
    especialidad: 2, // Pediatría
    obraSocial: [3, 4], // Apross, SwissMedical
    valorConsulta: 6800,
    descripcion: "Pediatra enfocado en desarrollo infantil.",
    email: "javier.medina@centromedico.com",
    telefono: "1145678901",
    img: "imagen/doctor2.jpg"
  },
  {
    id: 3,
    matricula: 3333,
    apellido: "Gómez",
    nombre: "Ricardo",
    especialidad: 3, // Cardiología
    obraSocial: [5, 4], // Galeno, SwissMedical
    valorConsulta: 7500,
    descripcion: "Especialista en cardiología con 10 años de experiencia.",
    email: "ricardo.gomez@centromedico.com",
    telefono: "1132456789",
    img: "imagen/doctor3.jpg"
  },
  {
    id: 4,
    matricula: 4444,
    apellido: "Rojas",
    nombre: "Cecilia",
    especialidad: 4, // Oftalmología
    obraSocial: [6, 1], // Medife, OSDE
    valorConsulta: 7000,
    descripcion: "Especialista en oftalmología con 8 años de experiencia.",
    email: "cecilia.rojas@centromedico.com",
    telefono: "1167890123",
    img: "imagen/doctor4.jpg"
  },
  {
    id: 5,
    matricula: 5555,
    apellido: "Torres",
    nombre: "Santiago",
    especialidad: 5, // Odontología
    obraSocial: [8, 7], // IOMA, Omint
    valorConsulta: 6500,
    descripcion: "Odontólogo con 12 años de experiencia en clínica dental.",
    email: "santiago.torres@centromedico.com",
    telefono: "1178901234",
    img: "imagen/doctor5.jpg"
  },
  {
    id: 6,
    matricula: 6666,
    apellido: "Suárez",
    nombre: "Valeria",
    especialidad: 6, // Traumatología
    obraSocial: [2, 9], // PAMI, Premedic
    valorConsulta: 7000,
    descripcion: "Traumatóloga especializada en lesiones deportivas.",
    email: "valeria.suarez@centromedico.com",
    telefono: "1189012345",
    img: "imagen/doctor6.jpg"
  },
  {
    id: 7,
    matricula: 7777,
    apellido: "Fernandez",
    nombre: "Laura",
    especialidad: 1, // Clínica General (Cirugía General no existe en especialidades.js)
    obraSocial: [3, 1], // Apross, OSDE
    valorConsulta: 8000,
    descripcion: "Cirujana general con 15 años de experiencia.",
    email: "laura.fernandez@centromedico.com",
    telefono: "1190123456",
    img: "imagen/doctor7.jpg"
  },
  {
    id: 8,
    matricula: 8888,
    apellido: "Castillo",
    nombre: "Mariana",
    especialidad: 1, // Clínica General (Oncología no existe en especialidades.js)
    obraSocial: [4, 5], // SwissMedical, Galeno
    valorConsulta: 9500,
    descripcion: "Oncóloga con amplia experiencia en tratamientos modernos.",
    email: "mariana.castillo@centromedico.com",
    telefono: "1101234567",
    img: "imagen/doctor8.jpg"
  },
  {
    id: 9,
    matricula: 9999,
    apellido: "Paredes",
    nombre: "Leonardo",
    especialidad: 2, // Pediatría
    obraSocial: [6, 1], // Medife, OSDE
    valorConsulta: 6800,
    descripcion: "Pediatra con 10 años de experiencia en atención infantil.",
    email: "leonardo.paredes@centromedico.com",
    telefono: "1112345678",
    img: "imagen/doctor9.jpg"
  },
  {
    id: 10,
    matricula: 1010,
    apellido: "Vega",
    nombre: "Juan",
    especialidad: 3, // Cardiología
    obraSocial: [10, 1], // OSAPM, OSDE
    valorConsulta: 7600,
    descripcion: "Cardiólogo con 12 años de experiencia en cardiología clínica.",
    email: "juan.vega@centromedico.com",
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