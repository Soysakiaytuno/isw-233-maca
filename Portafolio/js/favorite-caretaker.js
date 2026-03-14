import { LikeMemento } from './favorite-memento.js';

export class LikeCaretaker {
    constructor(storageKey = 'blogLikesMemento') {
        this.storageKey = storageKey;
    }

    saveMemento(memento) {
        localStorage.setItem(this.storageKey, JSON.stringify(memento.getState()));
    }

    getMemento() {
        const storedState = localStorage.getItem(this.storageKey);
        return storedState ? new LikeMemento(JSON.parse(storedState)) : null;
    }
}