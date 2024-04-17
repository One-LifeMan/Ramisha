import Project from "./Project.js";

export default class Projects {
    #projects = [];
    #FILTERS = document.querySelector(".projects__filter");
    #RESULTS = document.querySelector(".projects__results");
    #TEMPLATE = document.querySelector("#projectsTemplate").innerHTML;

    init() {
        fetch("./json/projects.json")
            .then((response) => response.json())
            .then((data) => {
                for (const project of data) {
                    this.#createProject(project);
                }
                this.showProjects();

                this.#FILTERS.addEventListener("click", (e) => {
                    const filter = e.target.dataset.filter;

                    this.showProjects(filter, e.target);

                    this.setActiveFilter(e.target);
                });
            });
    }

    #createProject(project) {
        this.#addProject(new Project(project));
    }

    #addProject(project) {
        this.#projects.push(project);
    }

    showProjects(filter = "All") {
        this.#RESULTS.innerHTML = "";

        const fragment = document.createDocumentFragment();

        for (const project of this.#projects) {
            if (filter === "All" || project.category === filter) {
                const render = project.getRender(this.#TEMPLATE);

                const article = document.createElement("article");
                article.innerHTML = render;
                article.classList.add("projects__card", "project-card");

                fragment.append(article);
            }
        }
        this.#RESULTS.append(fragment);
    }

    setActiveFilter(elem) {
        for (const btn of this.#FILTERS.children) {
            btn.classList.remove("_active");
        }

        elem.classList.add("_active");
    }
}
