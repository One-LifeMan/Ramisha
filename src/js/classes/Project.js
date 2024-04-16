import Card from "./Card.js";

export default class Project extends Card {
    #category;
    constructor(project) {
        super(project);
        this.#category = project.category;
    }

    get category() {
        return this.#category;
    }

    getRender(template) {
        const project = {
            alt: this.img,
            url: `${this.url}${this.img}`,
        };
        return super.getRender(template, project);
    }
}
