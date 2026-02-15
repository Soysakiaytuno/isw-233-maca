const introduccion = document.querySelector('.textos-principales');
const galeryproject = document.querySelector('.proyectos');
const btnInicio = document.querySelector('#btn-inicio');
const btnGaleria = document.querySelector('#btn-galeria');

function mostrarProyectos() {
    introduccion.classList.add('rotar-salida');
    galeryproject.classList.add('rotar-entrada');
}

function mostrarInicio() {
    introduccion.classList.remove('rotar-salida');
    galeryproject.classList.remove('rotar-entrada');
}

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        mostrarProyectos();
    } else if (event.deltaY < 0) {
        mostrarInicio();
    }
});

btnGaleria.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarProyectos();
});

btnInicio.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarInicio();
});