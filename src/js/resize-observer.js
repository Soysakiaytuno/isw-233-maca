export class FocusSubject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyFocus(activeObserver) {
        this.observers.forEach(obs => {
            if (obs !== activeObserver) {
                obs.shrink();
            }
        });
    }

    notifyBlur() {
        this.observers.forEach(obs => {
            obs.reset();
        });
    }
}

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