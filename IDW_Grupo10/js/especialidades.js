const ESPECIALIDADES = [
  {
    id: 1,
    nombre: "Clínica General",
    descripcion:
      "Atención integral para adultos, con control de la salud general, seguimiento de hábitos y derivación a especialistas cuando sea necesario.",
    icono: "fa-stethoscope"
  },
  {
    id: 2,
    nombre: "Pediatría",
    descripcion:
      "Atención completa para niños y adolescentes, incluyendo controles de crecimiento, vacunas, seguimiento del desarrollo y orientación familiar.",
    icono: "fa-user-doctor"
  },
  {
    id: 3,
    nombre: "Cardiología",
    descripcion:
      "Prevención, diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio, con seguimiento personalizado y controles periódicos.",
    icono: "fa-heart"
  },
  {
    id: 4,
    nombre: "Oftalmología",
    descripcion:
      "Prevención y tratamiento de enfermedades oculares, controles de visión, seguimiento de patologías crónicas y asesoramiento en salud visual.",
    icono: "fa-eye"
  },
  {
    id: 5,
    nombre: "Odontología",
    descripcion:
      "Atención integral de la salud bucal, incluyendo prevención, diagnóstico, tratamiento de enfermedades dentales y estética dental personalizada.",
    icono: "fa-tooth"
  },
  {
    id: 6,
    nombre: "Traumatología",
    descripcion:
      "Diagnóstico y tratamiento de lesiones y enfermedades del sistema musculoesquelético, abarcando huesos, articulaciones, ligamentos y músculos.",
    icono: "fa-user-injured"
  }
];

if (!localStorage.getItem("especialidades")) {
  localStorage.setItem("especialidades", JSON.stringify(ESPECIALIDADES));
}

function obtenerEspecialidades() {
  try {
    return JSON.parse(localStorage.getItem("especialidades")) || [];
  } catch {
    localStorage.setItem("especialidades", JSON.stringify(ESPECIALIDADES));
    return ESPECIALIDADES;
  }
}

function guardarEspecialidades(lista) {
  localStorage.setItem("especialidades", JSON.stringify(lista));
}

window.obtenerEspecialidades = obtenerEspecialidades;
window.guardarEspecialidades = guardarEspecialidades;
