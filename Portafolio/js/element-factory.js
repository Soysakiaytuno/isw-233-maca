export class ElementFactory {
    createElement(type, data) {
        switch (type) {
            case 'proyecto':
                return this.createProyecto(data);
            case 'redSocial':
                return this.createRedSocial(data);
            default:
                throw new Error('Tipo de elemento no soportado');
        }
    }

    createProyecto(data) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('proyectos__tarjeta');
        tarjeta.onclick = () => window.open(data.link);

        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.classList.add('proyectos__tarjeta__img');
        tarjeta.appendChild(img);

        const h3 = document.createElement('h3');
        h3.classList.add('proyectos__tarjeta__h3');
        h3.textContent = data.title;
        tarjeta.appendChild(h3);

        const p = document.createElement('p');
        p.classList.add('proyectos__tarjeta__p');
        p.textContent = data.description;
        tarjeta.appendChild(p);

        return tarjeta;
    }

    createRedSocial(data) {
        const entrada = document.createElement('div');
        entrada.classList.add('redsocial__entrada');
        entrada.onclick = () => window.open(data.link);

        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.classList.add('redsocial__entrada__img');
        entrada.appendChild(img);

        const h3 = document.createElement('h3');
        h3.textContent = data.title;
        entrada.appendChild(h3);
        return entrada;
    }
}