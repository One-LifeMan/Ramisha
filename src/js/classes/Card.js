import { Mustache } from "../constants/_libs.js";

export default class Card {
    #img;
    #url = "../img/";

    constructor(data) {
        this.#img = data.img;
    }

    get img() {
        return this.#img;
    }
    get url() {
        return this.#url;
    }

    getRender(template, obj) {
        const renderer = Mustache.render(template, obj);
        return renderer;
    }
}
