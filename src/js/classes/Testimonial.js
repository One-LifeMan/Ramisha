import Card from "./Card.js";

export default class Testimonial extends Card {
    #text;
    #rating;

    constructor(testimonial) {
        super(testimonial);
        this.#text = testimonial.text;
        this.#rating = testimonial.rating * 20;
    }

    get text() {
        return this.#text;
    }

    getRenderer(template) {
        const testimonial = {
            alt: this.img,
            url: `${this.url}${this.img}`,
            text: this.#text,
            rating: this.#rating,
        };

        return super.getRender(template, testimonial);
    }
}
