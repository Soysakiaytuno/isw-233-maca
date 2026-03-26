export class BlogMutationObserver {
    constructor(targetElement, onExpandCallback) {
        this.targetElement = targetElement;
        this.onExpandCallback = onExpandCallback;

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const transform = this.targetElement.style.transform;
                    if (transform && transform.includes('scale(50)')) {
                        this.onExpandCallback();
                    }
                }
            });
        });

        this.observer.observe(this.targetElement, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
}