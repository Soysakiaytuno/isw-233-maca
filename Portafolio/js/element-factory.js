export class ElementFactory {
    constructor() {
        this.templateProyecto = document.getElementById('template-proyecto');
        this.templateRedSocial = document.getElementById('template-redsocial');
        this.templateBlogPost = document.getElementById('template-blogpost');
    }

    createElement(type, data) {
        switch (type) {
            case 'proyecto':
                return this.createProyecto(data);
            case 'redSocial':
                return this.createRedSocial(data);
            case 'blogPost':
                return this.createBlogPost(data);
            default:
                throw new Error('Tipo de elemento no soportado');
        }
    }

    createProyecto(data) {
        const clone = this.templateProyecto.content.cloneNode(true);
        const tarjeta = clone.firstElementChild;
        
        tarjeta.onclick = () => window.open(data.link);

        const img = tarjeta.querySelector('.proyectos__tarjeta__img');
        img.src = data.imageUrl;

        const h3 = tarjeta.querySelector('.proyectos__tarjeta__h3');
        h3.textContent = data.title;

        const p = tarjeta.querySelector('.proyectos__tarjeta__p');
        p.textContent = data.description;

        return tarjeta;
    }

    createRedSocial(data) {
        const clone = this.templateRedSocial.content.cloneNode(true);
        const entrada = clone.firstElementChild;
        
        entrada.onclick = () => window.open(data.link);

        const img = entrada.querySelector('.redsocial__entrada__img');
        img.src = data.imageUrl;

        const h3 = entrada.querySelector('h3');
        h3.textContent = data.title;
        
        return entrada;
    }

    createBlogPost(data) {
        const clone = this.templateBlogPost.content.cloneNode(true);
        const post = clone.firstElementChild;
        
        post.dataset.postId = data.id; // Importante para que el LikeStateManager siga funcionando

        const img = post.querySelector('.blog__post__img');
        img.src = data.imageUrl;

        const h3 = post.querySelector('h3');
        h3.textContent = data.title;

        const p = post.querySelector('p');
        p.textContent = data.description;

        const tagsContainer = post.querySelector('.blog__tags');
        if (data.tags && data.tags.length > 0) {
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.classList.add('blog__tag');
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });
        }
        return post;
    }
}