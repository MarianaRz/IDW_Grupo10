document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn_buscar");
  const formEditar = document.getElementById("form_editar");
  const datosObra = document.getElementById("datos_obra");
  const inputBuscar = document.getElementById("buscar_nombre");
  const inputFoto = document.getElementById("foto");

  let obraActual = null;

  btnBuscar.addEventListener("click", () => {
    const nombre = inputBuscar.value.trim().toLowerCase();
    const obras = JSON.parse(localStorage.getItem("obrasSociales")) || [];
    obraActual = obras.find(o => o.nombre.toLowerCase() === nombre);

    if (obraActual) {
      datosObra.style.display = "block";
      document.getElementById("nombre").value = obraActual.nombre;
      document.getElementById("descripcion").value = obraActual.descripcion || "";
      document.getElementById("email").value = obraActual.email || "";
      document.getElementById("porcentaje").value = obraActual.porcentaje || 0;
      document.getElementById("url").value = obraActual.url || "";
    } else {
      alert("No se encontró la obra social ❌");
      datosObra.style.display = "none";
    }
  });

  function convertirImagenABase64(archivo) {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = () => resolve(lector.result);
      lector.onerror = reject;
      lector.readAsDataURL(archivo);
    });
  }

  formEditar.addEventListener("submit", async (e) => {
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

    let nuevaImagen = obraActual.img;
    const archivo = inputFoto.files[0];
    if (archivo) {
      nuevaImagen = await convertirImagenABase64(archivo);
    }


    obras[index] = {
      ...obraActual,
      nombre: document.getElementById("nombre").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      email: document.getElementById("email").value.trim(),
      porcentaje: parseFloat(document.getElementById("porcentaje").value),
      img: nuevaImagen,
      url: document.getElementById("url").value.trim() || "#"
    };

    localStorage.setItem("obrasSociales", JSON.stringify(obras));

    alert("Obra social actualizada correctamente ✅");
    formEditar.reset();
    datosObra.style.display = "none";
  });
});