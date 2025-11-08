document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form_admin");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar (si tenés una función aparte de validación)
    if (typeof validarFormulario === "function" && !validarFormulario()) {
      alert("Por favor, complete correctamente todos los campos requeridos.");
      return;
    }

    // Obtener obras sociales del localStorage
    let obrasSociales = JSON.parse(localStorage.getItem("obrasSociales") || "[]");

    const nuevaObra = {
      id: Date.now(), // ID único generado automáticamente
      nombre: document.getElementById("nombre").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim(),
      porcentaje: parseFloat(document.getElementById("porcentaje").value) || 0,
    };

    // Evitar duplicados por nombre
    if (obrasSociales.some((o) => o.nombre.toLowerCase() === nuevaObra.nombre.toLowerCase())) {
      alert("Ya existe una obra social con ese nombre.");
      return;
    }

    obrasSociales.push(nuevaObra);
    localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));

    alert("Obra social registrada correctamente ✅");
    form.reset();
  });
});
