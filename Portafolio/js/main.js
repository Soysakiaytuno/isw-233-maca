const introduccion = document.querySelector('.textos-principales');
const galeryproject = document.querySelector('.proyectos');
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        introduccion.classList.add('rotar-salida');
        galeryproject.classList.add('rotar-entrada');
    }
    else if (event.deltaY < 0) {
        introduccion.classList.remove('rotar-salida');
        galeryproject.classList.remove('rotar-entrada');
    }
});