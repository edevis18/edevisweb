// Obtener elementos del DOM
const cookieNotice = document.getElementById('cookie-notice');
const aceptarCookiesBtn = document.getElementById('aceptar-cookies');

// Función para mostrar el aviso de cookies
function mostrarAvisoCookies() {
    cookieNotice.style.display = 'block';
}

// Función para ocultar el aviso de cookies
function ocultarAvisoCookies() {
    cookieNotice.style.display = 'none';
}

// Evento para mostrar el aviso de cookies al cargar la página (puedes personalizar cómo y cuándo se muestra)
window.addEventListener('load', mostrarAvisoCookies);

// Evento para ocultar el aviso de cookies al hacer clic en "Aceptar"
aceptarCookiesBtn.addEventListener('click', ocultarAvisoCookies);
