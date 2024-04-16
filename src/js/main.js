"use strict";

import "webp-in-css/polyfill.js";

import "./modules/_preloader.js";

import {} from "./constants/_libs.js";

import ScrollAnimator from "./classes/ScrollAnimator.js";
import Projects from "./classes/Projects.js";
import Testimonials from "./classes/Testimonials.js";

const scrollAnimator = new ScrollAnimator();
scrollAnimator.init();

const projects = new Projects();
projects.init();

const testimonials = new Testimonials();
testimonials.init();

export {};
