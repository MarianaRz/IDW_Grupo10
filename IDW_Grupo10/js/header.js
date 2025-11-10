const header = document.querySelector('header');
const main = document.querySelector('main');
const sidebar = document.querySelector('.sidebar');

let lastScrollTop = 0;
let isMenuVisible = true;

// Verifica si es móvil/tablet
function isMobileOrTablet() {
    return window.innerWidth <= 900;
}

// Ajusta padding del main y top/height del sidebar según altura actual del header
function actualizarEspaciado() {
    const alturaHeader = header.offsetHeight;
    if (main) main.style.paddingTop = `${alturaHeader}px`;
    if (sidebar) {
        sidebar.style.top = `${alturaHeader}px`;
        sidebar.style.height = `calc(100vh - ${alturaHeader}px)`;
    }
}

// Toggle del menú solo para pantallas ≤900px
function toggleMenu(show) {
    if (!isMobileOrTablet()) return;

    const nav = header.querySelector('nav');
    if (show) {
        header.style.paddingTop = '1.5rem';
        header.style.paddingBottom = '1.5rem';
        nav.style.maxHeight = '500px';
        nav.style.opacity = '1';
        nav.style.overflow = 'visible';
        isMenuVisible = true;
    } else {
        header.style.paddingTop = '1rem';
        header.style.paddingBottom = '1rem';
        nav.style.maxHeight = '0';
        nav.style.opacity = '0';
        nav.style.overflow = 'hidden';
        isMenuVisible = false;
    }
    actualizarEspaciado();
}

// Scroll: solo oculta nav si estamos en móvil/tablet
window.addEventListener('scroll', () => {
    if (!isMobileOrTablet()) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Solo ocultar al hacer scroll hacia abajo
    if (scrollTop > lastScrollTop && scrollTop > 30 && isMenuVisible) {
        toggleMenu(false);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Click en logo para mostrar/ocultar nav solo en móvil/tablet
document.querySelector('.logo').addEventListener('click', (e) => {
    if (!isMobileOrTablet()) return;

    e.preventDefault();
    toggleMenu(!isMenuVisible);
});

// Observador para detectar cambios de altura del header
const resizeObserver = new ResizeObserver(() => {
    actualizarEspaciado();
});

// Inicializar observador
if (header) resizeObserver.observe(header);

// Ajuste inicial y al redimensionar
window.addEventListener('load', actualizarEspaciado);
window.addEventListener('resize', () => {
    actualizarEspaciado();
    if (!isMobileOrTablet()) {
        // En desktop, aseguramos que nav siempre se vea
        const nav = header.querySelector('nav');
        nav.style.maxHeight = '';
        nav.style.opacity = '';
        nav.style.overflow = '';
        header.style.paddingTop = '';
        header.style.paddingBottom = '';
        isMenuVisible = true;
    }
});
