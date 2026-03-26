import { NavigationController } from './js/navegation-controller.js';
import { ScrollDownCommand } from './js/command__scroll-down.js';
import { ScrollUpCommand } from './js/command__scroll-up.js';
import { ElementFactory } from './js/element-factory.js';
import { LikeStateManager } from './js/favorite-state-manager.js';
import { LikeCaretaker } from './js/favorite-caretaker.js';
import { FocusSubject, FocusObserver } from './js/resize-observer.js';
import { BlogMutationObserver } from './js/blog-mutation-observer.js';

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
        imageUrl: "blocks/proyectos/proyectos__tarjeta__image--TouhouBuild.png",
        title: "Heaven Studio Touhou Build",
        description: "Editor y Videojuego de ritmo, inspirado en Rhythm Heaven, readaptando y poniendo los juegos de Touhou Rhythm Carnival",
        link: "https://drive.google.com/drive/folders/10ud3R1KHlCEVmI1xAp6oNOg2akF7WGTG"
    },
    {
        imageUrl: "blocks/proyectos/proyectos__tarjeta__image--LaMesa.jpg",
        title: "La Mesa",
        description: "Pagina para hacer la gestión dentro de un restaurante, adaptado para el uso de delivery, cocinero, cliente y mesero",
        link: "https://github.com/Diegolew/ProyectoDise-oSoftware"
    },
    {
        imageUrl: "blocks/proyectos/proyectos__tarjeta__image--PedidosAhorita.jpg",
        title: "Pedidos Ahorita",
        description: "Pagina de compra y venta de diferentes productos, realizado para tener tu tienda online",
        link: "https://github.com/Andress-Mallea/Final-Progra-Base2"
    }
];

const redSocialData = [
    {
        imageUrl: "blocks/red-social/red-social__entrada__img--YouTube.png",
        title: "Youtube",
        link: "https://www.youtube.com/@Mijaneitor-Soysakiaytuno44"
    },
    {
        imageUrl: "blocks/red-social/red-social__entrada__img--TikTok.png",
        title: "TikTok",
        link: "https://www.tiktok.com/@soysakiaytuno"
    },
    {
        imageUrl: "blocks/red-social/red-social__entrada__img--Linkedin.png",
        title: "Linkedin",
        link: "https://www.linkedin.com/in/mijael-callejas-aguirre-ab305928b/"
    },
    {
        imageUrl: "blocks/red-social/red-social__entrada__img--Gmail.jpg",
        title: "Gmail",
        link: "mailto:soysakia44@gmail.com?Subject=Interesado%20en%20el%20servicio"
    },
    {
        imageUrl: "blocks/red-social/red-social__entrada__img--WhatsApp.png",
        title: "WhatsApp",
        link: "https://wa.me/59168406492?text=Interesado%20en%20el%20servicio"
    }
];

const blogData = [
    {
        id: "post-1",
        imageUrl: "blocks/blogs/blog__post__img--FotoDePerfil.png",
        title: "Actualización de Portfolio",
        description: "Mejorando la experiencia de usuario con patrones de diseño.",
        tags: ["Tecnología", "Multimedia"]
    },
    {
        id: "post-2",
        imageUrl: "blocks/blogs/blog__post__img--FotoDePerfil.png",
        title: "Desarrollo en Unity",
        description: "Aprendiendo nuevas mecánicas para juegos 2D.",
        tags: ["Tecnología", "Arte"]
    },
    {
        id: "post-3",
        imageUrl: "blocks/blogs/blog__post__img--FotoDePerfil.png",
        title: "Vida Universitaria",
        description: "Balanceando estudios y proyectos personales.",
        tags: ["Casual", "Arte"]
    },
    {
        id: "post-4",
        imageUrl: "blocks/blogs/blog__post__img--FotoDePerfil.png",
        title: "Typescript",
        description: "Aprendiendo y cambiando cosas para typescrypt.",
        tags: ["Casual", "Tecnología"]
    },
    {
        id: "post-5",
        imageUrl: "blocks/blogs/blog__post__img--FotoDePerfil.png",
        title: "Vida Universitaria",
        description: "Balanceando estudios y proyectos personales.",
        tags: ["Casual", "Arte"]
    },
];

const proyectosContainer = document.querySelector('.proyectos__contenedor');
const redSocialContainer = document.querySelector('.redsocial');
const blogContainer = document.querySelector('.blogaccess__content');

const elementFactory = new ElementFactory();

const proyectosSubject = new FocusSubject();
proyectosData.forEach(data => {
    const tarjeta = elementFactory.createElement('proyecto', data);
    proyectosContainer.appendChild(tarjeta);
    new FocusObserver(tarjeta, proyectosSubject, 'proyectos__tarjeta');
});

const redSocialSubject = new FocusSubject();
redSocialData.forEach(data => {
    const entrada = elementFactory.createElement('redSocial', data);
    redSocialContainer.appendChild(entrada);
    new FocusObserver(entrada, redSocialSubject, 'redsocial__entrada');
});

blogData.forEach(data => {
    const post = elementFactory.createElement('blogPost', data);
    blogContainer.appendChild(post);
});

const infoSubject = new FocusSubject();
const infoTarjetas = document.querySelectorAll('.info__tarjeta');
infoTarjetas.forEach(tarjeta => {
    new FocusObserver(tarjeta, infoSubject, 'info__tarjeta');
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
    
    new BlogMutationObserver(circleElement, () => {
        setTimeout(() => {
            blogOverlay.classList.add('blogaccess--visible');
        }, 400); 
    });

    btnAbrirBlog.addEventListener('click', () => {
        navController.suspender();
        circleElement.style.transition = "transform 0.8s ease-in-out";
        circleElement.style.transform = "scale(50)";
        circleElement.style.zIndex = "1500"; 
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
        filterButtons.forEach(b => b.classList.remove('blog-filter__btn--active'));
        btn.classList.add('blog-filter__btn--active');

        if (filterMenu) filterMenu.classList.remove('blog-filter__menu--active');

        const filterValue = btn.getAttribute('data-filter');
        const posts = document.querySelectorAll('.blog__post');
        posts.forEach(post => {
            let shouldShow = false;

            if (filterValue === 'all') {
                shouldShow = true;
            } else if (filterValue === 'favorites') {
                const likeBtn = post.querySelector('.blog__like');
                if (likeBtn && (likeBtn.classList.contains('blog__like--active') || likeBtn.classList.contains('active'))) {
                    shouldShow = true;
                }
            } else {
                const tags = Array.from(post.querySelectorAll('.blog__tag')).map(t => t.textContent);
                if (tags.includes(filterValue)) {
                    shouldShow = true;
                }
            }
            if (shouldShow) {
                post.classList.remove('blog__post--hidden');
            } else {
                post.classList.add('blog__post--hidden');
            }
        });
    });
});