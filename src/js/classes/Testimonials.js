import Testimonial from "./Testimonial.js";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export default class Testimonials {
    #testimonials = [];
    #RESULTS = document.querySelector(".slider__wrap");
    #TEMPLATE = document.querySelector("#testimonialsTemplate").innerHTML;
    testimonialsSlider;

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

        this.createSlider();
    }

    createSlider() {
        this.testimonialsSlider = new Swiper(".testimonials__slider", {
            modules: [Navigation, Pagination],
            direction: "horizontal",
            autoHeight: false,
            loop: true,
            speed: 300,
            spaceBetween: 30,
            autoplay: {
                delay: 3000,
            },
            slidesPerView: 1,
            breakpoints: {
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                800: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1160: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            },
            roundLengths: true,
            pagination: {
                el: ".swiper-pagination",
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        let height = Number.NEGATIVE_INFINITY;
        for (const slide of this.#RESULTS.children) {
            let slideHeight = slide.getBoundingClientRect().height;
            if (slideHeight > height) {
                height = slideHeight;
            }
        }
        for (const slide of this.#RESULTS.children) {
            slide.style.height = `${height}px`;
        }
    }
}
