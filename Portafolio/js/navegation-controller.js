const secciones = document.querySelectorAll('.seccion-rueda');
const links = document.querySelectorAll('.nav-link');

export class NavigationController {
    constructor(sections, links) {
        this.sections = sections;
        this.links = links;
        this.indiceActual = -1;
        this.bloqueado = false;
    }

    cambiarSeccion(nuevoIndice) {
        if (this.bloqueado || nuevoIndice === this.indiceActual || nuevoIndice < 0 || nuevoIndice >= this.sections.length) return;

        this.bloqueado = true;

        this.sections.forEach((sec, i) => {
            sec.classList.remove('estado__actual', 'estado__pasado', 'estado__futuro');
            
            if (i < nuevoIndice) {
                sec.classList.add('estado__pasado');
            } else if (i === nuevoIndice) {
                sec.classList.add('estado__actual');
            } else {
                sec.classList.add('estado__futuro');
            }
        });

        this.links.forEach((link, i) => {
            if (i === nuevoIndice) {
                link.classList.add('activo');
            } else {
                link.classList.remove('activo');
            }
        });

        this.indiceActual = nuevoIndice;
        setTimeout(() => { this.bloqueado = false; }, 1000);
    }

    next() {
        this.cambiarSeccion(this.indiceActual + 1);
    }

    prev() {
        this.cambiarSeccion(this.indiceActual - 1);
    }
}