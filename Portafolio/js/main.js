const secciones = document.querySelectorAll('.seccion-rueda');
const links = document.querySelectorAll('.nav-link');
let indiceActual = -1;
let bloqueado = false;

function cambiarSeccion(nuevoIndice) {
    if (bloqueado || nuevoIndice === indiceActual || nuevoIndice < 0 || nuevoIndice >= secciones.length) return;

    bloqueado = true;

    secciones.forEach((sec, i) => {
        sec.classList.remove('estado-actual', 'estado-pasado', 'estado-futuro');
        
        if (i < nuevoIndice) {
            sec.classList.add('estado-pasado');
        } else if (i === nuevoIndice) {
            sec.classList.add('estado-actual');
        } else {
            sec.classList.add('estado-futuro');
        }
    });
    links.forEach((link, i) => {
        if (i === nuevoIndice) {
            link.classList.add('activo');
        } else {
            link.classList.remove('activo');
        }
    });
    indiceActual = nuevoIndice;
    setTimeout(() => { bloqueado = false; }, 1000);
}

cambiarSeccion(0);

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        cambiarSeccion(indiceActual + 1);
    } else {
        cambiarSeccion(indiceActual - 1);
    }
});

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = parseInt(link.getAttribute('data-index'));
        cambiarSeccion(target);
    });
});