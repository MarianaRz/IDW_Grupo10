const form_login = document.getElementById("form_login");
const usuario = document.getElementById("usuario");
const clave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");

function mostrar_mensaje(texto, tipo) {
    mensaje.innerHTML = `
        <div class="col-md-6 col-lg-4">
            <div class="alert alert-${tipo}">${texto}</div>
        </div>`;
}

form_login.addEventListener("submit", function(event) {
    event.preventDefault();

    let usuario_input = usuario.value.trim();
    let clave_input = clave.value.trim();
    
    const is_usuario = usuarios.find(
        u => u.usuario === usuario_input && u.clave === clave_input 
    );

    if(is_usuario){
        sessionStorage.setItem("usuario_logeado", usuario_input);
        mostrar_mensaje(`Bienvenido usuario ${usuario_input}`, "success");
        window.location.href = "admin/altamedicos.html";
    } else {
        mostrar_mensaje("Error en credenciales", "danger")
    }
})