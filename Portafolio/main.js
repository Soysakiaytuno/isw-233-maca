import { NavigationController } from './js/navegation-controller.js';
import { ScrollDownCommand } from './js/command__scroll-down.js';
import { ScrollUpCommand } from './js/command__scroll-up.js';
import { ElementFactory } from './js/element-factory.js';
import { LikeStateManager } from './js/like-state-manager.js';
import { LikeCaretaker } from './js/like-caretaker.js';

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
        imageUrl: "images/Proyectos/TouhouBuild.png",
        title: "Heaven Studio Touhou Build",
        description: "Editor y Videojuego de ritmo, inspirado en Rhythm Heaven, readaptando y poniendo los juegos de Touhou Rhythm Carnival",
        link: "https://drive.google.com/drive/folders/10ud3R1KHlCEVmI1xAp6oNOg2akF7WGTG"
    },
    {
        imageUrl: "images/Proyectos/LaMesa.jpg",
        title: "La Mesa",
        description: "Pagina para hacer la gestión dentro de un restaurante, adaptado para el uso de delivery, cocinero, cliente y mesero",
        link: "https://github.com/Diegolew/ProyectoDise-oSoftware"
    },
    {
        imageUrl: "images/Proyectos/PedidosAhorita.jpg",
        title: "Pedidos Ahorita",
        description: "Pagina de compra y venta de diferentes productos, realizado para tener tu tienda online",
        link: "https://github.com/Andress-Mallea/Final-Progra-Base2"
    }
];

const redSocialData = [
    {
        imageUrl: "images/Iconos/YouTube.png",
        title: "Youtube",
        link: "https://www.youtube.com/@Mijaneitor-Soysakiaytuno44"
    },
    {
        imageUrl: "images/Iconos/TikTok.png",
        title: "TikTok",
        link: "https://www.tiktok.com/@soysakiaytuno"
    },
    {
        imageUrl: "images/Iconos/Linkedin.png",
        title: "Linkedin",
        link: "https://www.linkedin.com/in/mijael-callejas-aguirre-ab305928b/"
    },
    {
        imageUrl: "images/Iconos/Gmail.jpg",
        title: "Gmail",
        link: "mailto:soysakia44@gmail.com?Subject=Interesado%20en%20el%20servicio"
    },
    {
        imageUrl: "images/Iconos/WhatsApp.png",
        title: "WhatsApp",
        link: "https://wa.me/59168406492?text=Interesado%20en%20el%20servicio"
    }
];

const blogData = [
    {
        id: "post-1",
        imageUrl: "images/Blog/FotoDePerfil.png",
        title: "Actualización de Portfolio",
        description: "Mejorando la experiencia de usuario con patrones de diseño.",
        tags: ["Tecnología", "Multimedia"]
    },
    {
        id: "post-2",
        imageUrl: "images/Blog/FotoDePerfil.png",
        title: "Desarrollo en Unity",
        description: "Aprendiendo nuevas mecánicas para juegos 2D.",
        tags: ["Tecnología", "Arte"]
    },
    {
        id: "post-3",
        imageUrl: "images/Blog/FotoDePerfil.png",
        title: "Vida Universitaria",
        description: "Balanceando estudios y proyectos personales.",
        tags: ["Casual", "Arte"]
    }
];

const proyectosContainer = document.querySelector('.proyectos__contenedor');
const redSocialContainer = document.querySelector('.redsocial');
const blogContainer = document.querySelector('.blogaccess__content');

const elementFactory = new ElementFactory();

proyectosData.forEach(data => {
    const tarjeta = elementFactory.createElement('proyecto', data);
    proyectosContainer.appendChild(tarjeta);
});

redSocialData.forEach(data => {
    const entrada = elementFactory.createElement('redSocial', data);
    redSocialContainer.appendChild(entrada);
});

blogData.forEach(data => {
    const post = elementFactory.createElement('blogPost', data);
    blogContainer.appendChild(post);
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
            btn.classList.toggle('blog__like--active'); // Aseguramos el estado visual para el filtro
            
            const newMemento = likeStateManager.save();
            likeCaretaker.saveMemento(newMemento);
        }
    });
});

// --- Lógica de Filtro del Blog ---
const filterToggleBtn = document.querySelector('.blog-filter__toggle');
const filterMenu = document.querySelector('.blog-filter__menu');
const filterButtons = document.querySelectorAll('.blog-filter__btn');

if (filterToggleBtn && filterMenu) {
    filterToggleBtn.addEventListener('click', () => {
        filterMenu.classList.toggle('blog-filter__menu--active');
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Manejar estado visual de los botones del filtro
        filterButtons.forEach(b => b.classList.remove('blog-filter__btn--active'));
        btn.classList.add('blog-filter__btn--active');

        // Ocultar menú tras seleccionar una opción
        if (filterMenu) filterMenu.classList.remove('blog-filter__menu--active');

        const filterValue = btn.getAttribute('data-filter');
        const posts = document.querySelectorAll('.blog__post');

        // 2. Filtrar cada post según su etiqueta o si fue "likeado"
        posts.forEach(post => {
            let shouldShow = false;

            if (filterValue === 'all') {
                shouldShow = true;
            } else if (filterValue === 'favorites') {
                const likeBtn = post.querySelector('.blog__like');
                // Revisa si el botón tiene el modifier activo u otro indicador
                if (likeBtn && (likeBtn.classList.contains('blog__like--active') || likeBtn.classList.contains('active'))) {
                    shouldShow = true;
                }
            } else {
                // Revisa todos los tags del post para ver si incluye el valor filtrado
                const tags = Array.from(post.querySelectorAll('.blog__tag')).map(t => t.textContent);
                if (tags.includes(filterValue)) {
                    shouldShow = true;
                }
            }

            // 3. Aplicar clase BEM para ocultar
            if (shouldShow) {
                post.classList.remove('blog__post--hidden');
            } else {
                post.classList.add('blog__post--hidden');
            }
        });
    });
});