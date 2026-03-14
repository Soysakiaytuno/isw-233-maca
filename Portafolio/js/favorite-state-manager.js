import { LikeMemento } from './favorite-memento.js';

export class LikeStateManager {
    constructor() {
        this.likedPosts = new Set();
    }

    toggleLike(postId) {
        if (this.likedPosts.has(postId)) {
            this.likedPosts.delete(postId);
        } else {
            this.likedPosts.add(postId);
        }
        this.updateUI();
    }

    save() {
        return new LikeMemento(Array.from(this.likedPosts));
    }

    restore(memento) {
        this.likedPosts = memento ? new Set(memento.getState()) : new Set();
        this.updateUI();
    }

    updateUI() {
        document.querySelectorAll('.blog__post').forEach(post => {
            const postId = post.dataset.postId;
            const likeButton = post.querySelector('.blog__like');
            if (likeButton) {
                likeButton.classList.toggle('blog__like--active', this.likedPosts.has(postId));
            }
        });
    }
}