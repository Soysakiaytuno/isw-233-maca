# isw-233-maca
<h2>Introduccion</h2>
El presente proyecto se realiza para un portafolio en inicio basico para hacer presentaciones del proyectos realizados tanto en equipo como individuales. En el presente documento se les mostrara una breve introduccion a como se desarrollo el proyecto.
<h2>Estructura del proyecto</h2>
Dentro de este repositorio encontraran lo que es la carpeta Portafolio, ahi adentro se encuentra el proyecto que consta de de 3 carpetas y un archivo html llamado index, debes ejecutar este para poder tener una vista de como se ve el proyecto, tambien hay 2 carpetas una llamada JavaScript y css, cada uno con un archivo de su respectivo tipo, y en la ultima carpeta srcimages, se encuentran las imagenes usadas en las diferentes secciones, para una mayor facilidad de control de que imagen se usa y de donde se saca.<br>
El archivo index.html es la estructura de todo el proyecto, estando divida principalmente por head, body, head siendo una instancia previa a la ejecucion que se usa para cargar lo que es styles.css, y dentro de body dividido por un header, que contiene un accesso directo a las diferentes pantallas y divs que se encuentran todas las secciones del proyecto (Inicio, Galeria, Blog, Sobre Mi, Contacto), dando la estructura dentro del body a todas las pantallas diseñadas previamente en el figma y tambien hace la carga del archivo main.js para poder implementar la logica de animacion tipo rueda al momento de cambiar de pantalla ya previamente cargado por el css.
<h2>Que se hace</h2>
El proyecto te muestra un portafolio basico, con una introduccion basica, galeria de proyectos, accesso a un blog personal (no desarrollado a profundidad), informacion academica y acceso a direntes contactos, teniendo un header con acceso directo a cualquiera de las pestañas que te muestra en que pestaña estas actualmente y una animacion suave de tipo rueda, que al momento de hacer scroll o seleccionar un acceso desde el header cambia de pantalla haciendo la trancision previa
<h3>INTRODUCCION</h3>
Es la primera pantalla que se ve, que simplemente te muestra la interfaz basica y una muy breve introduccion
<h3>GALERIA</h3>
Muestra 3 tarjetas con los proyectos recientes realizados y/o apoyados, donde cada uno tiene su respectivo enlace de accesso para que el usuario pueda descargar el proyecto y probarlo por su cuenta, cada tarjeta tiene una imagen, titul y descripcion breve de cada proyecto mostrado 
<h3>BLOG</h3>
Es una pagina aun en proceso, que mostrara las 3 publicaciones mas recientes realizados en mi blog personal, aun en proceso por que aun no existe ninguna publicacion en ningun blog (realizarse en futuras versiones)
<h3>SOBRE MI</h3>
Es una pestaña con informacion personal, academica, experiencia y algunos datos personales que sirve para la mejor persepcion del usuario que lo va a ver 
<h3>CONTACTO</h3>
Son enlaces a diferentes contactos y redes sociales para poder entrar en contacto por diferentes medios que puedan ser preferibles al usuario
<h2>Como se hace</h2>
La estructura basica y la division por divs de cada seccion se realiza en el html, dividiendo en los bloques principales (inicio, galeria, blog, sobre mi, contacto), haciendo la mayoria de diviciones por div y clases de css para la estetica y ordenamiento, el html tambien se encarga de cargar todo lo que es el css y el java script para poderlos usar. Para los enlaces se usa la funcion en html de onclick = window.open dentro de su respectivo div. Las animaciones de tipo rueda se hace la carga de las pocisiones trancisiones y tipo de ease (suavizado de movimiento de animacion para la fluidez) para el actual, previo y siguiente, las cuales dependiendo de si se llama por medio del acceso directo o por scroll intercambie de animacion usando el estado actual, previo y posterior. Se utiliza una misma animacion de backgraund color y el font type blod para dar enfacis a la casilla actual, que se desvanece cuando cambia a otra pestaña y en esa se habilita
<h2>Por que se hace</h2>
Se hicieron esta forma para dar una forma mas unica pero sencilla de entender a como se ve un portafolio teniendo en cuenta de base "el ciclo de vida de software" para poder dar la idea de rueda, utilizando una paleta de colores inspirada en el azul y el morado para dar un ligero contraste que no incomode para mantener la idea minimalista, usando mas bordes redondeados y formas circulares para dar un toque mas de suavidad sin entrar en la agresividad, ademas se dieron las animaciones asi para dar un entendimiento suave de cada cambio de pantalla, al no usar la barra de scroll tradicional
<h2>Patrones de diseño</h2>
Se utilizan los siguientes patrones de diseño<br>
Factory: Para la creacion de los elementos de blog post, tarjetas de proyecto y accesos de contacto, para poder tener un manejo mejor para estos mismos<br>
Observer: Se utiliza observer, mas especificamente el Observer Interseccion, para hacer un manejo correcto del control del scroll y saber cuando acaba para dar la vuelta y volver a empezar desde el inicio<br>
Command: El comand se utilizo para tener un mejor control del scroll implementacion con los botones y al hacer un scroll se llame al command para que este ejecute lo que es requerido
Memento: Se utilizo memento para hacer un guardado y captura en el local storage para la implementacion del like, en el cual se mantiene por mas que la pagina se reinicie
<h2>Link al figma</h2>
https://www.figma.com/design/RgmPV904bFMy9uHGnto2X9/CV?node-id=8-36&t=YQXeITJz42V21X4i-1
<br>
<h2>REFERENCIAS</h2>
Se usaron las paginas de base para entender como se puede estructurar un portafolio sencillo pero llamativo, y se uso la ia de gemini para aprender cosas basicas de html css y apoyo en la implementacion de las animaciones mas complejas
<br>
https://www.fezzbone.com/
<br>https://www.memoriesandtributes.co.uk/
<br>https://www.blueconnect.ai/
<br>https://gemini.google.com/share/b81884c01ece
