export class LikeMemento {
    constructor(likedPosts) {
        this.likedPosts = [...likedPosts];
    }

    getState() {
        return this.likedPosts;
    }
}