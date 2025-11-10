const OBRAS_SOCIALES_BASE = [
  {
    id: 1,
    nombre: "OSDE",
    direccion: "Av. Colón 1234, Córdoba",
    telefono: "0810-555-6733",
    email: "contacto@osde.com.ar",
    porcentaje: 20,
    url: "https://www.osde.com.ar/",
    img: "imagen/osde.png"
  },
  {
    id: 2,
    nombre: "PAMI",
    direccion: "Bv. Illia 240, Córdoba",
    telefono: "0800-222-7264",
    email: "info@pami.org.ar",
    porcentaje: 30,
    url: "https://www.pami.org.ar/",
    img: "imagen/pami.png"
  },
  {
    id: 3,
    nombre: "Apross",
    direccion: "Av. Vélez Sarsfield 576, Córdoba",
    telefono: "0800-888-2776",
    email: "consultas@apross.gov.ar",
    porcentaje: 25,
    url: "https://www.apross.gov.ar/",
    img: "imagen/apross.png"
  },
  {
    id: 4,
    nombre: "Swiss Medical",
    direccion: "Av. Hipólito Yrigoyen 490, Córdoba",
    telefono: "0810-444-7700",
    email: "contacto@swissmedical.com.ar",
    porcentaje: 15,
    url: "https://www.swissmedicalseguros.com/",
    img: "imagen/swissmedical.png"
  },
  {
    id: 5,
    nombre: "Galeno",
    direccion: "Av. Chacabuco 830, Córdoba",
    telefono: "0810-777-4253",
    email: "info@galeno.com.ar",
    porcentaje: 10,
    url: "https://www.planes-galeno.com.ar/",
    img: "imagen/galeno.png"
  },
  {
    id: 6,
    nombre: "Medife",
    direccion: "9 de Julio 325, Córdoba",
    telefono: "0810-333-2700",
    email: "atencion@medife.com.ar",
    porcentaje: 18,
    url: "https://www.medife.com.ar/",
    img: "imagen/medife.png"
  },
  {
    id: 7,
    nombre: "Omint",
    direccion: "Ituzaingó 550, Córdoba",
    telefono: "0810-666-6468",
    email: "clientes@omint.com.ar",
    porcentaje: 12,
    url: "https://www.omint.com.ar/PlanDeSalud/",
    img: "imagen/omint.png"
  },
  {
    id: 8,
    nombre: "IOMA",
    direccion: "Av. General Paz 105, Córdoba",
    telefono: "0800-333-4662",
    email: "info@ioma.gba.gov.ar",
    porcentaje: 20,
    url: "https://www.ioma.gba.gob.ar/",
    img: "imagen/ioma.png"
  },
  {
    id: 9,
    nombre: "Premedic",
    direccion: "Av. Sabattini 402, Córdoba",
    telefono: "0810-999-1360",
    email: "atencion@premedic.com.ar",
    porcentaje: 10,
    url: "https://www.grupopremedic.com.ar/padmin/newWeb/Home",
    img: "imagen/premedic.png"
  },
  {
    id: 10,
    nombre: "OSAPM",
    direccion: "Av. Juan B. Justo 845, Córdoba",
    telefono: "0800-999-6727",
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
