/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/blog-mutation-observer.js"
/*!**************************************!*\
  !*** ./js/blog-mutation-observer.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BlogMutationObserver: () => (/* binding */ BlogMutationObserver)\n/* harmony export */ });\nclass BlogMutationObserver {\r\n    constructor(targetElement, onExpandCallback) {\r\n        this.targetElement = targetElement;\r\n        this.onExpandCallback = onExpandCallback;\r\n\r\n        this.observer = new MutationObserver((mutations) => {\r\n            mutations.forEach((mutation) => {\r\n                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {\r\n                    const transform = this.targetElement.style.transform;\r\n                    // Si detectamos que el círculo cambió su forma expandiéndose\r\n                    if (transform && transform.includes('scale(50)')) {\r\n                        this.onExpandCallback();\r\n                    }\r\n                }\r\n            });\r\n        });\r\n\r\n        this.observer.observe(this.targetElement, {\r\n            attributes: true,\r\n            attributeFilter: ['style']\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/blog-mutation-observer.js?\n}");

/***/ },

/***/ "./js/command.js"
/*!***********************!*\
  !*** ./js/command.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Command: () => (/* binding */ Command)\n/* harmony export */ });\nclass Command {\r\n    execute() {}\r\n}\n\n//# sourceURL=webpack:///./js/command.js?\n}");

/***/ },

/***/ "./js/command__scroll-down.js"
/*!************************************!*\
  !*** ./js/command__scroll-down.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ScrollDownCommand: () => (/* binding */ ScrollDownCommand)\n/* harmony export */ });\n/* harmony import */ var _command_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./command.js */ \"./js/command.js\");\n\r\n\r\nclass ScrollDownCommand extends _command_js__WEBPACK_IMPORTED_MODULE_0__.Command {\r\n    constructor(controller) {\r\n        super();\r\n        this.controller = controller;\r\n    }\r\n    execute() {\r\n        this.controller.next();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/command__scroll-down.js?\n}");

/***/ },

/***/ "./js/command__scroll-up.js"
/*!**********************************!*\
  !*** ./js/command__scroll-up.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ScrollUpCommand: () => (/* binding */ ScrollUpCommand)\n/* harmony export */ });\n/* harmony import */ var _command_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./command.js */ \"./js/command.js\");\n\r\n\r\nclass ScrollUpCommand extends _command_js__WEBPACK_IMPORTED_MODULE_0__.Command {\r\n    constructor(controller) {\r\n        super();\r\n        this.controller = controller;\r\n    }\r\n    execute() {\r\n        this.controller.prev();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/command__scroll-up.js?\n}");

/***/ },

/***/ "./js/element-factory.js"
/*!*******************************!*\
  !*** ./js/element-factory.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ElementFactory: () => (/* binding */ ElementFactory)\n/* harmony export */ });\nclass ElementFactory {\r\n    constructor() {\r\n        this.templateProyecto = document.getElementById('template-proyecto');\r\n        this.templateRedSocial = document.getElementById('template-redsocial');\r\n        this.templateBlogPost = document.getElementById('template-blogpost');\r\n    }\r\n\r\n    createElement(type, data) {\r\n        switch (type) {\r\n            case 'proyecto':\r\n                return this.createProyecto(data);\r\n            case 'redSocial':\r\n                return this.createRedSocial(data);\r\n            case 'blogPost':\r\n                return this.createBlogPost(data);\r\n            default:\r\n                throw new Error('Tipo de elemento no soportado');\r\n        }\r\n    }\r\n\r\n    createProyecto(data) {\r\n        const clone = this.templateProyecto.content.cloneNode(true);\r\n        const tarjeta = clone.firstElementChild;\r\n        \r\n        tarjeta.onclick = () => window.open(data.link);\r\n\r\n        const img = tarjeta.querySelector('.proyectos__tarjeta__img');\r\n        img.src = data.imageUrl;\r\n\r\n        const h3 = tarjeta.querySelector('.proyectos__tarjeta__h3');\r\n        h3.textContent = data.title;\r\n\r\n        const p = tarjeta.querySelector('.proyectos__tarjeta__p');\r\n        p.textContent = data.description;\r\n\r\n        return tarjeta;\r\n    }\r\n\r\n    createRedSocial(data) {\r\n        const clone = this.templateRedSocial.content.cloneNode(true);\r\n        const entrada = clone.firstElementChild;\r\n        \r\n        entrada.onclick = () => window.open(data.link);\r\n\r\n        const img = entrada.querySelector('.redsocial__entrada__img');\r\n        img.src = data.imageUrl;\r\n\r\n        const h3 = entrada.querySelector('.redsocial__entrada__h3');\r\n        h3.textContent = data.title;\r\n        \r\n        return entrada;\r\n    }\r\n\r\n    createBlogPost(data) {\r\n        const clone = this.templateBlogPost.content.cloneNode(true);\r\n        const post = clone.firstElementChild;\r\n        \r\n        post.dataset.postId = data.id; // Importante para que el LikeStateManager siga funcionando\r\n\r\n        const img = post.querySelector('.blog__post__img');\r\n        img.src = data.imageUrl;\r\n\r\n        const h3 = post.querySelector('h3');\r\n        h3.textContent = data.title;\r\n\r\n        const p = post.querySelector('p');\r\n        p.textContent = data.description;\r\n\r\n        const tagsContainer = post.querySelector('.blog__tags');\r\n        if (data.tags && data.tags.length > 0) {\r\n            data.tags.forEach(tag => {\r\n                const span = document.createElement('span');\r\n                span.classList.add('blog__tag');\r\n                span.textContent = tag;\r\n                tagsContainer.appendChild(span);\r\n            });\r\n        }\r\n        return post;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/element-factory.js?\n}");

/***/ },

/***/ "./js/favorite-caretaker.js"
/*!**********************************!*\
  !*** ./js/favorite-caretaker.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LikeCaretaker: () => (/* binding */ LikeCaretaker)\n/* harmony export */ });\n/* harmony import */ var _like_memento_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like-memento.js */ \"./js/like-memento.js\");\n\r\n\r\nclass LikeCaretaker {\r\n    constructor(storageKey = 'blogLikesMemento') {\r\n        this.storageKey = storageKey;\r\n    }\r\n\r\n    saveMemento(memento) {\r\n        localStorage.setItem(this.storageKey, JSON.stringify(memento.getState()));\r\n    }\r\n\r\n    getMemento() {\r\n        const storedState = localStorage.getItem(this.storageKey);\r\n        return storedState ? new _like_memento_js__WEBPACK_IMPORTED_MODULE_0__.LikeMemento(JSON.parse(storedState)) : null;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/favorite-caretaker.js?\n}");

/***/ },

/***/ "./js/favorite-state-manager.js"
/*!**************************************!*\
  !*** ./js/favorite-state-manager.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LikeStateManager: () => (/* binding */ LikeStateManager)\n/* harmony export */ });\n/* harmony import */ var _like_memento_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like-memento.js */ \"./js/like-memento.js\");\n\r\n\r\nclass LikeStateManager {\r\n    constructor() {\r\n        this.likedPosts = new Set();\r\n    }\r\n\r\n    toggleLike(postId) {\r\n        if (this.likedPosts.has(postId)) {\r\n            this.likedPosts.delete(postId);\r\n        } else {\r\n            this.likedPosts.add(postId);\r\n        }\r\n        this.updateUI();\r\n    }\r\n\r\n    save() {\r\n        return new _like_memento_js__WEBPACK_IMPORTED_MODULE_0__.LikeMemento(Array.from(this.likedPosts));\r\n    }\r\n\r\n    restore(memento) {\r\n        this.likedPosts = memento ? new Set(memento.getState()) : new Set();\r\n        this.updateUI();\r\n    }\r\n\r\n    updateUI() {\r\n        document.querySelectorAll('.blog__post').forEach(post => {\r\n            const postId = post.dataset.postId;\r\n            const likeButton = post.querySelector('.blog__like');\r\n            if (likeButton) {\r\n                likeButton.classList.toggle('blog__like--active', this.likedPosts.has(postId));\r\n            }\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/favorite-state-manager.js?\n}");

/***/ },

/***/ "./js/like-memento.js"
/*!****************************!*\
  !*** ./js/like-memento.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LikeMemento: () => (/* binding */ LikeMemento)\n/* harmony export */ });\nclass LikeMemento {\r\n    constructor(likedPosts) {\r\n        this.likedPosts = [...likedPosts];\r\n    }\r\n\r\n    getState() {\r\n        return this.likedPosts;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/like-memento.js?\n}");

/***/ },

/***/ "./js/navegation-controller.js"
/*!*************************************!*\
  !*** ./js/navegation-controller.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NavigationController: () => (/* binding */ NavigationController)\n/* harmony export */ });\n/* harmony import */ var _viewport_observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewport-observer.js */ \"./js/viewport-observer.js\");\n\r\n\r\nclass NavigationController {\r\n    constructor(sections, links) {\r\n        this.sections = sections;\r\n        this.links = links;\r\n        this.indiceActual = -1;\r\n        this.bloqueado = false;\r\n        this.suspendido = false; // Nuevo estado para cuando el blog está abierto\r\n        \r\n        this.observer = new _viewport_observer_js__WEBPACK_IMPORTED_MODULE_0__.ViewportObserver((target) => this.actualizarLinks(target));\r\n        this.observer.observe(this.sections);\r\n    }\r\n\r\n    cambiarSeccion(nuevoIndice) {\r\n        \r\n        if (nuevoIndice < 0) nuevoIndice = this.sections.length - 1;\r\n        else if (nuevoIndice >= this.sections.length) nuevoIndice = 0;\r\n\r\n        if (this.bloqueado || this.suspendido || nuevoIndice === this.indiceActual) return;\r\n\r\n        this.bloqueado = true;\r\n\r\n        this.sections.forEach((sec, i) => {\r\n            sec.classList.remove('estado__actual', 'estado__pasado', 'estado__futuro');\r\n            \r\n            if (i < nuevoIndice) {\r\n                sec.classList.add('estado__pasado');\r\n            } else if (i === nuevoIndice) {\r\n                sec.classList.add('estado__actual');\r\n            } else {\r\n                sec.classList.add('estado__futuro');\r\n            }\r\n        });\r\n\r\n        this.indiceActual = nuevoIndice;\r\n\r\n        const activeLink = this.links[this.indiceActual];\r\n        if (activeLink) {\r\n            history.replaceState(null, null, activeLink.getAttribute('href'));\r\n        }\r\n\r\n        setTimeout(() => { this.bloqueado = false; }, 1000);\r\n    }\r\n\r\n    actualizarLinks(seccionVisible) {\r\n        const index = Array.from(this.sections).indexOf(seccionVisible);\r\n        this.links.forEach((link, i) => {\r\n            if (i === index) {\r\n                link.classList.add('activo');\r\n                history.replaceState(null, null, link.getAttribute('href'));\r\n            } else {\r\n                link.classList.remove('activo');\r\n            }\r\n        });\r\n    }\r\n\r\n    next() {\r\n        this.cambiarSeccion(this.indiceActual + 1);\r\n    }\r\n\r\n    prev() {\r\n        this.cambiarSeccion(this.indiceActual - 1);\r\n    }\r\n\r\n    // Métodos para controlar el estado global desde main.js\r\n    suspender() {\r\n        this.suspendido = true;\r\n    }\r\n\r\n    reanudar() {\r\n        this.suspendido = false;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/navegation-controller.js?\n}");

/***/ },

/***/ "./js/resize-observer.js"
/*!*******************************!*\
  !*** ./js/resize-observer.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FocusObserver: () => (/* binding */ FocusObserver),\n/* harmony export */   FocusSubject: () => (/* binding */ FocusSubject)\n/* harmony export */ });\n// Subject: Actúa como el coordinador central de un grupo de elementos\r\nclass FocusSubject {\r\n    constructor() {\r\n        this.observers = [];\r\n    }\r\n\r\n    addObserver(observer) {\r\n        this.observers.push(observer);\r\n    }\r\n\r\n    // Cuando un elemento crece, notifica a los demás para que se alejen\r\n    notifyFocus(activeObserver) {\r\n        this.observers.forEach(obs => {\r\n            if (obs !== activeObserver) {\r\n                obs.shrink();\r\n            }\r\n        });\r\n    }\r\n\r\n    // Cuando el mouse sale, notifica a todos para volver a la normalidad\r\n    notifyBlur() {\r\n        this.observers.forEach(obs => {\r\n            obs.reset();\r\n        });\r\n    }\r\n}\r\n\r\n// Observer: Envuelve tu tarjeta HTML y se comunica con el coordinador\r\nclass FocusObserver {\r\n    constructor(element, subject, baseClassName) {\r\n        this.element = element;\r\n        this.subject = subject;\r\n        this.baseClassName = baseClassName;\r\n\r\n        this.element.addEventListener('mouseenter', () => this.subject.notifyFocus(this));\r\n        this.element.addEventListener('mouseleave', () => this.subject.notifyBlur());\r\n        this.subject.addObserver(this);\r\n    }\r\n\r\n    shrink() { this.element.classList.add(`${this.baseClassName}__relegated`); }\r\n    reset() { this.element.classList.remove(`${this.baseClassName}__relegated`); }\r\n}\n\n//# sourceURL=webpack:///./js/resize-observer.js?\n}");

/***/ },

/***/ "./js/viewport-observer.js"
/*!*********************************!*\
  !*** ./js/viewport-observer.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ViewportObserver: () => (/* binding */ ViewportObserver)\n/* harmony export */ });\nclass ViewportObserver {\r\n    constructor(callback) {\r\n        this.callback = callback;\r\n        this.observer = new IntersectionObserver((entries) => {\r\n            entries.forEach(entry => {\r\n                if (entry.isIntersecting) {\r\n                    this.callback(entry.target);\r\n                }\r\n            });\r\n        }, { threshold: 0.5 });\r\n    }\r\n\r\n    observe(elements) {\r\n        elements.forEach(element => {\r\n            this.observer.observe(element);\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./js/viewport-observer.js?\n}");

/***/ },

/***/ "./main.js"
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_navegation_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/navegation-controller.js */ \"./js/navegation-controller.js\");\n/* harmony import */ var _js_command_scroll_down_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/command__scroll-down.js */ \"./js/command__scroll-down.js\");\n/* harmony import */ var _js_command_scroll_up_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/command__scroll-up.js */ \"./js/command__scroll-up.js\");\n/* harmony import */ var _js_element_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/element-factory.js */ \"./js/element-factory.js\");\n/* harmony import */ var _js_favorite_state_manager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/favorite-state-manager.js */ \"./js/favorite-state-manager.js\");\n/* harmony import */ var _js_favorite_caretaker_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/favorite-caretaker.js */ \"./js/favorite-caretaker.js\");\n/* harmony import */ var _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/resize-observer.js */ \"./js/resize-observer.js\");\n/* harmony import */ var _js_blog_mutation_observer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/blog-mutation-observer.js */ \"./js/blog-mutation-observer.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst secciones = document.querySelectorAll('.seccion-rueda');\r\nconst links = document.querySelectorAll('.nav-link');\r\n\r\nconst navController = new _js_navegation_controller_js__WEBPACK_IMPORTED_MODULE_0__.NavigationController(secciones, links);\r\nconst scrollDown = new _js_command_scroll_down_js__WEBPACK_IMPORTED_MODULE_1__.ScrollDownCommand(navController);\r\nconst scrollUp = new _js_command_scroll_up_js__WEBPACK_IMPORTED_MODULE_2__.ScrollUpCommand(navController);\r\n\r\nconst initialHash = window.location.hash;\r\nlet initialIndex = 0;\r\nif (initialHash) {\r\n    const targetLink = Array.from(links).find(link => link.getAttribute('href') === initialHash);\r\n    if (targetLink) initialIndex = parseInt(targetLink.getAttribute('data-index'));\r\n}\r\n\r\nnavController.cambiarSeccion(initialIndex);\r\n\r\nwindow.addEventListener('wheel', (e) => {\r\n    if (e.deltaY > 0) {\r\n        scrollDown.execute();\r\n    } else {\r\n        scrollUp.execute();\r\n    }\r\n});\r\n\r\nlinks.forEach(link => {\r\n    link.addEventListener('click', (e) => {\r\n        e.preventDefault();\r\n        const target = parseInt(link.getAttribute('data-index'));\r\n        navController.cambiarSeccion(target);\r\n    });\r\n});\r\n\r\nconst proyectosData = [\r\n    {\r\n        imageUrl: \"images/Proyectos/TouhouBuild.png\",\r\n        title: \"Heaven Studio Touhou Build\",\r\n        description: \"Editor y Videojuego de ritmo, inspirado en Rhythm Heaven, readaptando y poniendo los juegos de Touhou Rhythm Carnival\",\r\n        link: \"https://drive.google.com/drive/folders/10ud3R1KHlCEVmI1xAp6oNOg2akF7WGTG\"\r\n    },\r\n    {\r\n        imageUrl: \"images/Proyectos/LaMesa.jpg\",\r\n        title: \"La Mesa\",\r\n        description: \"Pagina para hacer la gestión dentro de un restaurante, adaptado para el uso de delivery, cocinero, cliente y mesero\",\r\n        link: \"https://github.com/Diegolew/ProyectoDise-oSoftware\"\r\n    },\r\n    {\r\n        imageUrl: \"images/Proyectos/PedidosAhorita.jpg\",\r\n        title: \"Pedidos Ahorita\",\r\n        description: \"Pagina de compra y venta de diferentes productos, realizado para tener tu tienda online\",\r\n        link: \"https://github.com/Andress-Mallea/Final-Progra-Base2\"\r\n    }\r\n];\r\n\r\nconst redSocialData = [\r\n    {\r\n        imageUrl: \"images/Iconos/YouTube.png\",\r\n        title: \"Youtube\",\r\n        link: \"https://www.youtube.com/@Mijaneitor-Soysakiaytuno44\"\r\n    },\r\n    {\r\n        imageUrl: \"images/Iconos/TikTok.png\",\r\n        title: \"TikTok\",\r\n        link: \"https://www.tiktok.com/@soysakiaytuno\"\r\n    },\r\n    {\r\n        imageUrl: \"images/Iconos/Linkedin.png\",\r\n        title: \"Linkedin\",\r\n        link: \"https://www.linkedin.com/in/mijael-callejas-aguirre-ab305928b/\"\r\n    },\r\n    {\r\n        imageUrl: \"images/Iconos/Gmail.jpg\",\r\n        title: \"Gmail\",\r\n        link: \"mailto:soysakia44@gmail.com?Subject=Interesado%20en%20el%20servicio\"\r\n    },\r\n    {\r\n        imageUrl: \"images/Iconos/WhatsApp.png\",\r\n        title: \"WhatsApp\",\r\n        link: \"https://wa.me/59168406492?text=Interesado%20en%20el%20servicio\"\r\n    }\r\n];\r\n\r\nconst blogData = [\r\n    {\r\n        id: \"post-1\",\r\n        imageUrl: \"images/Blog/FotoDePerfil.png\",\r\n        title: \"Actualización de Portfolio\",\r\n        description: \"Mejorando la experiencia de usuario con patrones de diseño.\",\r\n        tags: [\"Tecnología\", \"Multimedia\"]\r\n    },\r\n    {\r\n        id: \"post-2\",\r\n        imageUrl: \"images/Blog/FotoDePerfil.png\",\r\n        title: \"Desarrollo en Unity\",\r\n        description: \"Aprendiendo nuevas mecánicas para juegos 2D.\",\r\n        tags: [\"Tecnología\", \"Arte\"]\r\n    },\r\n    {\r\n        id: \"post-3\",\r\n        imageUrl: \"images/Blog/FotoDePerfil.png\",\r\n        title: \"Vida Universitaria\",\r\n        description: \"Balanceando estudios y proyectos personales.\",\r\n        tags: [\"Casual\", \"Arte\"]\r\n    }\r\n];\r\n\r\nconst proyectosContainer = document.querySelector('.proyectos__contenedor');\r\nconst redSocialContainer = document.querySelector('.redsocial');\r\nconst blogContainer = document.querySelector('.blogaccess__content');\r\n\r\nconst elementFactory = new _js_element_factory_js__WEBPACK_IMPORTED_MODULE_3__.ElementFactory();\r\n\r\nconst proyectosSubject = new _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__.FocusSubject();\r\nproyectosData.forEach(data => {\r\n    const tarjeta = elementFactory.createElement('proyecto', data);\r\n    proyectosContainer.appendChild(tarjeta);\r\n    new _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__.FocusObserver(tarjeta, proyectosSubject, 'proyectos__tarjeta');\r\n});\r\n\r\nconst redSocialSubject = new _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__.FocusSubject();\r\nredSocialData.forEach(data => {\r\n    const entrada = elementFactory.createElement('redSocial', data);\r\n    redSocialContainer.appendChild(entrada);\r\n    new _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__.FocusObserver(entrada, redSocialSubject, 'redsocial__entrada');\r\n});\r\n\r\nblogData.forEach(data => {\r\n    const post = elementFactory.createElement('blogPost', data);\r\n    blogContainer.appendChild(post);\r\n});\r\n\r\n// Aplicar patrón Observer a las tarjetas de Sobre Mí (que ya están estáticas en el HTML)\r\nconst infoSubject = new _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__.FocusSubject();\r\nconst infoTarjetas = document.querySelectorAll('.info__tarjeta');\r\ninfoTarjetas.forEach(tarjeta => {\r\n    new _js_resize_observer_js__WEBPACK_IMPORTED_MODULE_6__.FocusObserver(tarjeta, infoSubject, 'info__tarjeta');\r\n});\r\n\r\ndocument.addEventListener('keydown', function(event) {\r\n    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {\r\n        scrollUp.execute();\r\n    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {\r\n        scrollDown.execute();\r\n    }\r\n});\r\n\r\n\r\nconst btnAbrirBlog = document.querySelector('.blog__boton');\r\nconst btnCerrarBlog = document.querySelector('.blogaccess__back');\r\nconst blogOverlay = document.querySelector('.blogaccess');\r\nconst circleElement = document.querySelector('.circle');\r\n\r\nif (btnAbrirBlog && btnCerrarBlog && blogOverlay && circleElement) {\r\n    \r\n    // Instanciamos el observer de mutación\r\n    new _js_blog_mutation_observer_js__WEBPACK_IMPORTED_MODULE_7__.BlogMutationObserver(circleElement, () => {\r\n        // Mantenemos un pequeño retraso visual para que termine de cubrir la pantalla\r\n        setTimeout(() => {\r\n            blogOverlay.classList.add('blogaccess--visible');\r\n        }, 400); \r\n    });\r\n\r\n    btnAbrirBlog.addEventListener('click', () => {\r\n        navController.suspender();\r\n        circleElement.style.transition = \"transform 0.8s ease-in-out\";\r\n        circleElement.style.transform = \"scale(50)\";\r\n        circleElement.style.zIndex = \"1500\"; \r\n    });\r\n\r\n    btnCerrarBlog.addEventListener('click', () => {\r\n        blogOverlay.classList.remove('blogaccess--visible');\r\n\r\n        circleElement.style.transform = \"\";\r\n        circleElement.style.zIndex = \"\";\r\n        \r\n        setTimeout(() => {\r\n            navController.reanudar();\r\n        }, 800);\r\n    });\r\n}\r\n\r\nconst likeStateManager = new _js_favorite_state_manager_js__WEBPACK_IMPORTED_MODULE_4__.LikeStateManager();\r\nconst likeCaretaker = new _js_favorite_caretaker_js__WEBPACK_IMPORTED_MODULE_5__.LikeCaretaker();\r\n\r\nconst savedMemento = likeCaretaker.getMemento();\r\nlikeStateManager.restore(savedMemento);\r\n\r\nconst likeButtons = document.querySelectorAll('.blog__like');\r\nlikeButtons.forEach(btn => {\r\n    btn.addEventListener('click', () => {\r\n        const postElement = btn.closest('.blog__post');\r\n        if (postElement) {\r\n            const postId = postElement.dataset.postId;\r\n            \r\n            likeStateManager.toggleLike(postId);\r\n            \r\n            const newMemento = likeStateManager.save();\r\n            likeCaretaker.saveMemento(newMemento);\r\n        }\r\n    });\r\n});\r\n\r\n// --- Lógica de Filtro del Blog ---\r\nconst filterToggleBtn = document.querySelector('.blog-filter__toggle');\r\nconst filterMenu = document.querySelector('.blog-filter__menu');\r\nconst filterButtons = document.querySelectorAll('.blog-filter__btn');\r\n\r\nif (filterToggleBtn && filterMenu) {\r\n    filterToggleBtn.addEventListener('click', () => {\r\n        filterMenu.classList.toggle('blog-filter__menu--active');\r\n    });\r\n}\r\n\r\nfilterButtons.forEach(btn => {\r\n    btn.addEventListener('click', () => {\r\n        // 1. Manejar estado visual de los botones del filtro\r\n        filterButtons.forEach(b => b.classList.remove('blog-filter__btn--active'));\r\n        btn.classList.add('blog-filter__btn--active');\r\n\r\n        // Ocultar menú tras seleccionar una opción\r\n        if (filterMenu) filterMenu.classList.remove('blog-filter__menu--active');\r\n\r\n        const filterValue = btn.getAttribute('data-filter');\r\n        const posts = document.querySelectorAll('.blog__post');\r\n\r\n        // 2. Filtrar cada post según su etiqueta o si fue \"likeado\"\r\n        posts.forEach(post => {\r\n            let shouldShow = false;\r\n\r\n            if (filterValue === 'all') {\r\n                shouldShow = true;\r\n            } else if (filterValue === 'favorites') {\r\n                const likeBtn = post.querySelector('.blog__like');\r\n                // Revisa si el botón tiene el modifier activo u otro indicador\r\n                if (likeBtn && (likeBtn.classList.contains('blog__like--active') || likeBtn.classList.contains('active'))) {\r\n                    shouldShow = true;\r\n                }\r\n            } else {\r\n                // Revisa todos los tags del post para ver si incluye el valor filtrado\r\n                const tags = Array.from(post.querySelectorAll('.blog__tag')).map(t => t.textContent);\r\n                if (tags.includes(filterValue)) {\r\n                    shouldShow = true;\r\n                }\r\n            }\r\n\r\n            // 3. Aplicar clase BEM para ocultar\r\n            if (shouldShow) {\r\n                post.classList.remove('blog__post--hidden');\r\n            } else {\r\n                post.classList.add('blog__post--hidden');\r\n            }\r\n        });\r\n    });\r\n});\n\n//# sourceURL=webpack:///./main.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;