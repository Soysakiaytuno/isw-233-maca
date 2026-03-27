import Handlebars from 'handlebars';
import proyectoTemplateStr from './proyecto.hbs?raw';
import redSocialTemplateStr from './redsocial.hbs?raw';
import blogPostTemplateStr from './blogpost.hbs?raw';

export class ElementFactory {
    constructor() {
        this.templateProyecto = Handlebars.compile(proyectoTemplateStr);
        this.templateRedSocial = Handlebars.compile(redSocialTemplateStr);
        this.templateBlogPost = Handlebars.compile(blogPostTemplateStr);
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

    // Método auxiliar para convertir un string HTML en un elemento DOM
    _htmlToElement(html) {
        const template = document.createElement('template');
        html = html.trim(); 
        template.innerHTML = html;
        return template.content.firstElementChild;
    }

    createProyecto(data) {
        const html = this.templateProyecto(data);
        const tarjeta = this._htmlToElement(html);
        
        tarjeta.onclick = () => window.open(data.link);
        return tarjeta;
    }

    createRedSocial(data) {
        const html = this.templateRedSocial(data);
        const entrada = this._htmlToElement(html);
        
        entrada.onclick = () => window.open(data.link);
        return entrada;
    }

    createBlogPost(data) {
        const html = this.templateBlogPost(data);
        const post = this._htmlToElement(html);
        return post;
    }
}