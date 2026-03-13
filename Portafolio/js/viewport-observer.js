export class ViewportObserver {
    constructor(callback) {
        this.callback = callback;
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.callback(entry.target);
                }
            });
        }, { threshold: 0.5 });
    }

    observe(elements) {
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}
