import { NavigationController } from './navegation-controller.js';
import { ScrollDownCommand } from './command__scroll-down.js';
import { ScrollUpCommand } from './command__scroll-up.js';
import { ElementFactory } from './element-factory.js';
import { LikeStateManager } from './like-state-manager.js';
import { LikeCaretaker } from './like-caretaker.js';

const secciones = document.querySelectorAll('.seccion-rueda');
const links = document.querySelectorAll('.nav-link');

const navController = new NavigationController(secciones, links);
const scrollDown = new ScrollDownCommand(navController);
const scrollUp = new ScrollUpCommand(navController);

const initialHash = window.location.hash;
let initialIndex = 0;
if (initialHash) {
    const targetLink = Array.from(links).find(link => link.getAttribute('href') === initialHash);
    if (targetLink) initialIndex = parseInt(targetLink.getAttribute('data-index'));
}

navController.cambiarSeccion(initialIndex);

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

const proyectosContainer = document.querySelector('.proyectos__contenedor');
const redSocialContainer = document.querySelector('.redsocial');

const elementFactory = new ElementFactory();

proyectosData.forEach(data => {
    const tarjeta = elementFactory.createElement('proyecto', data);
    proyectosContainer.appendChild(tarjeta);
});

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


const btnAbrirBlog = document.querySelector('.blog__boton');
const btnCerrarBlog = document.querySelector('.blogaccess__back');
const blogOverlay = document.querySelector('.blogaccess');
const circleElement = document.querySelector('.circle');

if (btnAbrirBlog && btnCerrarBlog && blogOverlay && circleElement) {
    
    btnAbrirBlog.addEventListener('click', () => {
        navController.suspender();
        circleElement.style.transition = "transform 0.8s ease-in-out";
        circleElement.style.transform = "scale(50)";
        circleElement.style.zIndex = "1500"; 

        setTimeout(() => {
            blogOverlay.classList.add('blogaccess--visible');
        }, 400); 
    });

    btnCerrarBlog.addEventListener('click', () => {
        blogOverlay.classList.remove('blogaccess--visible');

        circleElement.style.transform = "";
        circleElement.style.zIndex = "";
        
        setTimeout(() => {
            navController.reanudar();
        }, 800);
    });
}

const likeStateManager = new LikeStateManager();
const likeCaretaker = new LikeCaretaker();

const savedMemento = likeCaretaker.getMemento();
likeStateManager.restore(savedMemento);

const likeButtons = document.querySelectorAll('.blog__like');
likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const postElement = btn.closest('.blog__post');
        if (postElement) {
            const postId = postElement.dataset.postId;
            
            likeStateManager.toggleLike(postId);
            
            const newMemento = likeStateManager.save();
            likeCaretaker.saveMemento(newMemento);
        }
    });
});