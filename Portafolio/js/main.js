import { NavigationController } from './navegation-controller.js';
import { ScrollDownCommand } from './command__scroll-down.js';
import { ScrollUpCommand } from './command__scroll-up.js';

const secciones = document.querySelectorAll('.seccion-rueda');
const links = document.querySelectorAll('.nav-link');

// Initialization
const navController = new NavigationController(secciones, links);
const scrollDown = new ScrollDownCommand(navController);
const scrollUp = new ScrollUpCommand(navController);

navController.cambiarSeccion(0);

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        scrollDown.execute();
    } else {
        scrollUp.execute();
    }
});

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = parseInt(link.getAttribute('data-index'));
        navController.cambiarSeccion(target);
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        scrollUp.execute();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        scrollDown.execute();
    }
});