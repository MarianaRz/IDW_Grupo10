document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn_buscar");
  const formEditar = document.getElementById("form_editar");
  const datosObra = document.getElementById("datos_obra");
  const inputBuscar = document.getElementById("buscar_nombre");

  let obraActual = null;

  btnBuscar.addEventListener("click", () => {
    const nombre = inputBuscar.value.trim().toLowerCase();
    const obras = JSON.parse(localStorage.getItem("obrasSociales")) || [];
    obraActual = obras.find(o => o.nombre.toLowerCase() === nombre);

    if (obraActual) {
      datosObra.style.display = "block";
      document.getElementById("nombre").value = obraActual.nombre;
      document.getElementById("direccion").value = obraActual.direccion || "";
      document.getElementById("telefono").value = obraActual.telefono || "";
      document.getElementById("email").value = obraActual.email || "";
      document.getElementById("porcentaje").value = obraActual.porcentaje || 0;
    } else {
      alert("No se encontró la obra social ❌");
      datosObra.style.display = "none";
    }
  });

  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!obraActual) {
      alert("Primero busque una obra social para editar.");
      return;
    }

    const esValido = validarFormulario();
    if (!esValido) {
      alert("Por favor, complete correctamente todos los campos antes de guardar.");
      return;
    }

    const obras = JSON.parse(localStorage.getItem("obrasSociales")) || [];
    const index = obras.findIndex(o => o.nombre.toLowerCase() === obraActual.nombre.toLowerCase());

    if (index === -1) {
      alert("Error al encontrar la obra social. Intente nuevamente.");
      return;
    }

    obras[index] = {
      ...obraActual,
      nombre: document.getElementById("nombre").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim(),
      porcentaje: parseFloat(document.getElementById("porcentaje").value)
    };

    localStorage.setItem("obrasSociales", JSON.stringify(obras));

    alert("Obra social actualizada correctamente ✅");
    formEditar.reset();
    datosObra.style.display = "none";
  });
});
