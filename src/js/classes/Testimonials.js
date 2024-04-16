import Testimonial from "./Testimonial.js";

export default class Testimonials {
    #testimonials = [];
    #RESULTS = document.querySelector(".slider__wrap");
    #TEMPLATE = document.querySelector("#testimonialsTemplate").innerHTML;

    init() {
        fetch("../json/testimonials.json")
            .then((response) => response.json())
            .then((data) => {
                for (const testimonial of data) {
                    this.#createTestimonial(testimonial);
                }
                this.showTestimonials();
            });
    }

    #createTestimonial(testimonial) {
        this.#addTestimonials(new Testimonial(testimonial));
    }

    #addTestimonials(testimonial) {
        this.#testimonials.push(testimonial);
    }

    showTestimonials() {
        this.#RESULTS.innerHTML = "";

        const fragment = document.createDocumentFragment();

        for (const testimonial of this.#testimonials) {
            const render = testimonial.getRenderer(this.#TEMPLATE);

            const div = document.createElement("div");
            div.innerHTML = render;
            div.classList.add("slider__slide", "slide", "swiper-slide");

            fragment.append(div);
        }
        this.#RESULTS.append(fragment);
    }
}
