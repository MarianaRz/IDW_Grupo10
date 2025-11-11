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

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const motivo = document.getElementById("motivo");
    const mensaje = document.getElementById("mensaje");
    const consentimiento = document.getElementById("consentimiento");

    const marcarError = (campo, mensaje) => {
      campo.classList.add("is-invalid");
      const error = document.createElement("small");
      error.textContent = mensaje;
      error.classList.add("text-danger");
      campo.insertAdjacentElement("afterend", error);
      valido = false;
    };

    if (nombre.value.trim().length < 3)
      marcarError(
        nombre,
        "Debe ingresar un nombre válido (mínimo 3 caracteres)"
      );
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value))
      marcarError(email, "Debe ingresar un correo válido");
    if (motivo.value === "")
      marcarError(motivo, "Debe seleccionar un motivo de contacto");
    if (mensaje.value.trim().length < 5)
      marcarError(mensaje, "El mensaje no puede estar vacío");
    if (!consentimiento.checked) {
      const label = document.querySelector("label[for='consentimiento']");
      const error = document.createElement("small");
      error.textContent = "Debe aceptar los términos";
      error.classList.add("text-danger", "d-block", "mt-1");
      label.insertAdjacentElement("afterend", error);
      valido = false;
    }

    if (telefono.value.trim() !== "" && !/^\d{7,}$/.test(telefono.value)) {
      marcarError(telefono, "Debe ingresar un número válido");
    }

    if (valido) {
      const exito = document.createElement("p");
      exito.textContent = "✅ ¡Mensaje enviado correctamente!";
      exito.classList.add("text-success", "text-center", "mt-3");
      form.appendChild(exito);
      form.reset();
    }
  });
});
