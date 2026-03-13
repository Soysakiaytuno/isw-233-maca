import { Command } from './command.js';

export class ScrollUpCommand extends Command {
    constructor(controller) {
        super();
        this.controller = controller;
    }
    execute() {
        this.controller.prev();
    }
}