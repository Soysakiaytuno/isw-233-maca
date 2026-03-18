// Subject: Actúa como el coordinador central de un grupo de elementos
export class FocusSubject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    // Cuando un elemento crece, notifica a los demás para que se alejen
    notifyFocus(activeObserver) {
        this.observers.forEach(obs => {
            if (obs !== activeObserver) {
                obs.shrink();
            }
        });
    }

    // Cuando el mouse sale, notifica a todos para volver a la normalidad
    notifyBlur() {
        this.observers.forEach(obs => {
            obs.reset();
        });
    }
}

// Observer: Envuelve tu tarjeta HTML y se comunica con el coordinador
export class FocusObserver {
    constructor(element, subject, baseClassName) {
        this.element = element;
        this.subject = subject;
        this.baseClassName = baseClassName;

        this.element.addEventListener('mouseenter', () => this.subject.notifyFocus(this));
        this.element.addEventListener('mouseleave', () => this.subject.notifyBlur());
        this.subject.addObserver(this);
    }

    shrink() { this.element.classList.add(`${this.baseClassName}__relegated`); }
    reset() { this.element.classList.remove(`${this.baseClassName}__relegated`); }
}