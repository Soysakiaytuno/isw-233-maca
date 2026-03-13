import { ViewportObserver } from './viewport-observer.js';

export class NavigationController {
    constructor(sections, links) {
        this.sections = sections;
        this.links = links;
        this.indiceActual = -1;
        this.bloqueado = false;
        
        this.observer = new ViewportObserver((target) => this.actualizarLinks(target));
        this.observer.observe(this.sections);
    }

    cambiarSeccion(nuevoIndice) {
        // Lógica cíclica: verificar extremos y rotar
        if (nuevoIndice < 0) nuevoIndice = this.sections.length - 1;
        else if (nuevoIndice >= this.sections.length) nuevoIndice = 0;

        if (this.bloqueado || nuevoIndice === this.indiceActual) return;

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

        this.indiceActual = nuevoIndice;
        setTimeout(() => { this.bloqueado = false; }, 1000);
    }

    actualizarLinks(seccionVisible) {
        const index = Array.from(this.sections).indexOf(seccionVisible);
        this.links.forEach((link, i) => {
            if (i === index) {
                link.classList.add('activo');
            } else {
                link.classList.remove('activo');
            }
        });
    }

    next() {
        this.cambiarSeccion(this.indiceActual + 1);
    }

    prev() {
        this.cambiarSeccion(this.indiceActual - 1);
    }
}