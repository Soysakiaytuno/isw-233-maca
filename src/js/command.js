export class Command {
    execute(){}
    scrollup() {
        this.controller.prev();
    }
    scrolldown()
    {
        this.controller.next();
    }
}