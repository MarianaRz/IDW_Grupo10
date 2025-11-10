const OBRAS_SOCIALES_BASE = [
  {
    id: 1,
    nombre: "OSDE",
    descripcion: "Cobertura médica integral con amplia red de prestadores en todo el país.",
    email: "contacto@osde.com.ar",
    porcentaje: 20,
    url: "https://www.osde.com.ar/",
    img: "imagen/osde.png"
  },
  {
    id: 2,
    nombre: "PAMI",
    descripcion: "Obra social destinada a jubilados y pensionados, con atención en múltiples especialidades.",
    email: "info@pami.org.ar",
    porcentaje: 30,
    url: "https://www.pami.org.ar/",
    img: "imagen/pami.png"
  },
  {
    id: 3,
    nombre: "Apross",
    descripcion: "Cobertura provincial de salud para empleados públicos y sus familias.",
    email: "consultas@apross.gov.ar",
    porcentaje: 25,
    url: "https://www.apross.gov.ar/",
    img: "imagen/apross.png"
  },
  {
    id: 4,
    nombre: "Swiss Medical",
    descripcion: "Plan de medicina privada con servicios premium y atención personalizada.",
    email: "contacto@swissmedical.com.ar",
    porcentaje: 15,
    url: "https://www.swissmedicalseguros.com/",
    img: "imagen/swissmedical.png"
  },
  {
    id: 5,
    nombre: "Galeno",
    descripcion: "Cobertura médica con enfoque en prevención y bienestar integral.",
    email: "info@galeno.com.ar",
    porcentaje: 10,
    url: "https://www.planes-galeno.com.ar/",
    img: "imagen/galeno.png"
  },
  {
    id: 6,
    nombre: "Medife",
    descripcion: "Planes de salud flexibles con atención en centros médicos propios y asociados.",
    email: "atencion@medife.com.ar",
    porcentaje: 18,
    url: "https://www.medife.com.ar/",
    img: "imagen/medife.png"
  },
  {
    id: 7,
    nombre: "Omint",
    descripcion: "Cobertura médica privada con enfoque en calidad de servicio y tecnología.",
    email: "clientes@omint.com.ar",
    porcentaje: 12,
    url: "https://www.omint.com.ar/PlanDeSalud/",
    img: "imagen/omint.png"
  },
  {
    id: 8,
    nombre: "IOMA",
    descripcion: "Instituto de Obra Médico Asistencial con cobertura para empleados estatales.",
    email: "info@ioma.gba.gov.ar",
    porcentaje: 20,
    url: "https://www.ioma.gba.gob.ar/",
    img: "imagen/ioma.png"
  },
  {
    id: 9,
    nombre: "Premedic",
    descripcion: "Cobertura médica privada con planes accesibles y amplia red de profesionales.",
    email: "atencion@premedic.com.ar",
    porcentaje: 10,
    url: "https://www.grupopremedic.com.ar/padmin/newWeb/Home",
    img: "imagen/premedic.png"
  },
  {
    id: 10,
    nombre: "OSAPM",
    descripcion: "Obra social para el personal de maestranza con cobertura nacional.",
    email: "contacto@osapm.org",
    porcentaje: 15,
    url: "https://osapm.org/#/homeV4",
    img: "imagen/osapm.png"
  }
];

if (!localStorage.getItem("obrasSociales")) {
  localStorage.setItem("obrasSociales", JSON.stringify(OBRAS_SOCIALES_BASE));
}

function obtenerObrasSociales() {
  try {
    return JSON.parse(localStorage.getItem("obrasSociales")) || [];
  } catch {
    localStorage.setItem("obrasSociales", JSON.stringify(OBRAS_SOCIALES_BASE));
    return OBRAS_SOCIALES_BASE;
  }
}

function guardarObrasSociales(lista) {
  localStorage.setItem("obrasSociales", JSON.stringify(lista));
}
