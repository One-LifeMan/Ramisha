import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const testimonialsSlider = new Swiper(".testimonials__slider", {
    modules: [Navigation, Pagination],
    direction: "horizontal",
    loop: true,
    speed: 400,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 4,
    roundLengths: true,
    pagination: {
        el: ".swiper-pagination",
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
