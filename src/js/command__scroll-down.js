import { Command } from './command.js';

export class ScrollDownCommand extends Command {
    constructor(controller) {
        super();
        this.controller = controller;
    }
    execute() {
        this.controller.next();
    }
}