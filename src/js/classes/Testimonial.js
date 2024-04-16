import Card from "./Card.js";

export default class Testimonial extends Card {
    #text;

    constructor(testimonial) {
        super(testimonial);
        this.#text = testimonial.text;
    }

    get text() {
        return this.#text;
    }

    getRenderer(template) {
        const testimonial = {
            alt: this.img,
            url: `${this.url}${this.img}`,
            text: this.#text,
        };

        return super.getRender(template, testimonial);
    }
}
