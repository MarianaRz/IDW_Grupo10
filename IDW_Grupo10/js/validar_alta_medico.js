document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valido = true;

    document
      .querySelectorAll(".text-danger, .text-success")
      .forEach((e) => e.remove());
    document
      .querySelectorAll(".is-invalid, .is-valid")
      .forEach((e) => e.classList.remove("is-invalid", "is-valid"));

    const campos = {
      nombre: document.getElementById("nombre"),
      apellido: document.getElementById("apellido"),
      email: document.getElementById("email"),
      telefono: document.getElementById("telefono"),
      matricula: document.getElementById("matricula"),
      especialidad: document.getElementById("especialidad"),
      obrasocial: document.getElementById("obrasocial"),
      descripcion: document.getElementById("descripcion"),
    };

    const marcarError = (campo, mensaje) => {
      campo.classList.add("is-invalid");
      const error = document.createElement("small");
      error.textContent = mensaje;
      error.classList.add("text-danger");
      campo.insertAdjacentElement("afterend", error);
      valido = false;
    };

    // Validaciones específicas
    if (campos.nombre.value.trim().length < 2)
      marcarError(campos.nombre, "Debe ingresar un nombre válido");
    if (campos.apellido.value.trim().length < 2)
      marcarError(campos.apellido, "Debe ingresar un apellido válido");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value))
      marcarError(campos.email, "Correo inválido");
    if (!/^\d{7,}$/.test(campos.telefono.value))
      marcarError(campos.telefono, "Teléfono inválido (mínimo 7 dígitos)");
    if (campos.matricula.value <= 0)
      marcarError(campos.matricula, "Ingrese una matrícula válida");
    if (campos.especialidad.value.trim() === "")
      marcarError(campos.especialidad, "Debe ingresar la especialidad");
    if (campos.obrasocial.value.trim() === "")
      marcarError(campos.obrasocial, "Debe ingresar una obra social");
    if (campos.descripcion.value.trim().length < 10)
      marcarError(campos.descripcion, "La descripción es demasiado corta");

    if (valido) {
      const ok = document.createElement("p");
      ok.textContent = "✅ Médico registrado con éxito.";
      ok.classList.add("text-success", "text-center", "mt-3");
      form.appendChild(ok);
      form.reset();
    }
  });
});
