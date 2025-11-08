const OBRAS_SOCIALES_BASE = [
  {
    nombre: "Osde",
    direccion: "Av. Corrientes 1234, Buenos Aires",
    telefono: "1145678900",
    email: "contacto@osde.com.ar",
    porcentaje: 20
  },
  {
    nombre: "Pami",
    direccion: "Calle San Martín 987, Córdoba",
    telefono: "3516789012",
    email: "info@pami.gob.ar",
    porcentaje: 30
  },
  {
    nombre: "Galeno",
    direccion: "Av. Santa Fe 2450, Buenos Aires",
    telefono: "1134567890",
    email: "atencion@galeno.com.ar",
    porcentaje: 15
  },
  {
    nombre: "Swiss Medical",
    direccion: "Bv. Illia 1555, Córdoba",
    telefono: "3512345678",
    email: "info@swissmedical.com.ar",
    porcentaje: 25
  },
  {
    nombre: "Medife",
    direccion: "Av. Colón 3456, Rosario",
    telefono: "3414567890",
    email: "contacto@medife.com.ar",
    porcentaje: 18
  },
  {
    nombre: "IOMA",
    direccion: "Calle 7 N° 1075, La Plata",
    telefono: "2215678901",
    email: "info@ioma.gba.gov.ar",
    porcentaje: 22
  },
  {
    nombre: "OMINT",
    direccion: "Av. Callao 1230, Buenos Aires",
    telefono: "1123456789",
    email: "contacto@omint.com.ar",
    porcentaje: 20
  },
  {
    nombre: "Premedic",
    direccion: "Bv. San Juan 230, Córdoba",
    telefono: "3519012345",
    email: "info@premedic.com.ar",
    porcentaje: 17
  },
  {
    nombre: "Apross",
    direccion: "Calle Belgrano 432, Córdoba",
    telefono: "3516789054",
    email: "contacto@apross.gov.ar",
    porcentaje: 28
  },
  {
    nombre: "OSAPM",
    direccion: "Calle Tucumán 800, Rosario",
    telefono: "3418901234",
    email: "osapm@obra.com.ar",
    porcentaje: 10
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
