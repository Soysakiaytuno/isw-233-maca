import { NavigationController } from './navegation-controller.js';
import { ScrollDownCommand } from './command__scroll-down.js';
import { ScrollUpCommand } from './command__scroll-up.js';
import { ElementFactory } from './element-factory.js';

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

// Project data
const proyectosData = [
    {
        imageUrl: "srcimages/Proyectos/TouhouBuild.png",
        title: "Heaven Studio Touhou Build",
        description: "Editor y Videojuego de ritmo, inspirado en Rhythm Heaven, readaptando y poniendo los juegos de Touhou Rhythm Carnival",
        link: "https://drive.google.com/drive/folders/10ud3R1KHlCEVmI1xAp6oNOg2akF7WGTG"
    },
    {
        imageUrl: "srcimages/Proyectos/LaMesa.jpg",
        title: "La Mesa",
        description: "Pagina para hacer la gestión dentro de un restaurante, adaptado para el uso de delivery, cocinero, cliente y mesero",
        link: "https://github.com/Diegolew/ProyectoDise-oSoftware"
    },
    {
        imageUrl: "srcimages/Proyectos/PedidosAhorita.jpg",
        title: "Pedidos Ahorita",
        description: "Pagina de compra y venta de diferentes productos, realizado para tener tu tienda online",
        link: "https://github.com/Andress-Mallea/Final-Progra-Base2"
    }
];

// Social media data
const redSocialData = [
    {
        imageUrl: "srcimages/Iconos/YouTube.png",
        title: "Youtube",
        link: "https://www.youtube.com/@Mijaneitor-Soysakiaytuno44"
    },
    {
        imageUrl: "srcimages/Iconos/TikTok.png",
        title: "TikTok",
        link: "https://www.tiktok.com/@soysakiaytuno"
    },
    {
        imageUrl: "srcimages/Iconos/Linkedin.png",
        title: "Linkedin",
        link: "https://www.linkedin.com/in/mijael-callejas-aguirre-ab305928b/"
    },
    {
        imageUrl: "srcimages/Iconos/Gmail.jpg",
        title: "Gmail",
        link: "mailto:soysakia44@gmail.com?Subject=Interesado%20en%20el%20servicio"
    },
    {
        imageUrl: "srcimages/Iconos/WhatsApp.png",
        title: "WhatsApp",
        link: "https://wa.me/59168406492?text=Interesado%20en%20el%20servicio"
    }
];

// Get the containers
const proyectosContainer = document.querySelector('.proyectos__contenedor');
const redSocialContainer = document.querySelector('.redsocial');

// Create the factory
const elementFactory = new ElementFactory();

// Create and append project elements
proyectosData.forEach(data => {
    const tarjeta = elementFactory.createElement('proyecto', data);
    proyectosContainer.appendChild(tarjeta);
});

// Create and append social media elements
redSocialData.forEach(data => {
    const entrada = elementFactory.createElement('redSocial', data);
    redSocialContainer.appendChild(entrada);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        scrollUp.execute();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        scrollDown.execute();
    }
});

// --- Lógica de la Sección Blog (Refactorización) ---

const btnAbrirBlog = document.querySelector('.blog__boton');
const btnCerrarBlog = document.querySelector('.blogaccess__back');
const blogOverlay = document.querySelector('.blogaccess');
const circleElement = document.querySelector('.circle');

if (btnAbrirBlog && btnCerrarBlog && blogOverlay && circleElement) {
    
    btnAbrirBlog.addEventListener('click', () => {
        // 1. Deshabilitar navegación (Observer/Controller)
        navController.suspender();

        // 2. Animación del círculo (Expandir para fondo)
        // Asumimos que el circulo tiene una transición CSS
        circleElement.style.transition = "transform 0.8s ease-in-out";
        circleElement.style.transform = "scale(50)"; // Escala masiva para cubrir pantalla
        circleElement.style.zIndex = "1500"; // Asegurar que quede detrás del overlay pero sobre el resto

        // 3. Mostrar contenido del blog
        setTimeout(() => {
            blogOverlay.classList.add('blogaccess--visible');
        }, 400); // Esperar un poco a que el circulo crezca
    });

    btnCerrarBlog.addEventListener('click', () => {
        blogOverlay.classList.remove('blogaccess--visible');

        circleElement.style.transform = "";
        circleElement.style.zIndex = ""; // Restaurar z-index original
        
        setTimeout(() => {
            navController.reanudar();
        }, 800); // Esperar a que termine la animación
    });
}