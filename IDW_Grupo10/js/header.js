// Ajusta el contenido debajo del header según su altura
function ajustarContenido() {
    const header = document.querySelector('header');
    const contenido = document.querySelector('main');
    const headerHeight = header.offsetHeight;
    
    contenido.style.paddingTop = `${headerHeight}px`;
}

window.addEventListener('load', ajustarContenido);
window.addEventListener('resize', ajustarContenido);


function ajustarSidebar() {
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar');
    const headerHeight = header.offsetHeight;

    sidebar.style.top = `${headerHeight}px`;
    sidebar.style.height = `calc(100vh - ${headerHeight}px)`;
}

window.addEventListener('load', ajustarSidebar);
window.addEventListener('resize', ajustarSidebar);