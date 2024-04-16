const CONTACT_FORM = document.forms[0];
const FORM_BTN = document.querySelector(".contact-form__btn-wrap");
const FORM__MESSAGE_ELEM = document.querySelector(".contact-form__message");

CONTACT_FORM.addEventListener("submit", (e) => {
    formSubmit(e);
});

FORM_BTN.addEventListener("click", (e) => {
    formSubmit(e);
});

function formSubmit(e) {
    e.preventDefault();

    const email = document.querySelector(".contact-form__email").value;
    const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    let message = "";
    let addClass = "";
    if (reg.test(email)) {
        const data = JSON.stringify({
            email: document.querySelector(".contact-form__email").value,
        });

        fetch("https://formspree.io/f/mgegpgbb", {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                message = "Thank you for your request!";
                addClass = "valid";
            } else {
                message = "Oops! Something went wrong, please try again later";
                addClass = "invalid";
            }
        });
    } else {
        message = "invalid email";
        addClass = "invalid";
    }

    FORM__MESSAGE_ELEM.innerText = message;
    FORM__MESSAGE_ELEM.classList.add(addClass);

    const time = setTimeout(() => {
        FORM__MESSAGE_ELEM.classList.remove("valid", "invalid");
        clearTimeout(time);
    }, 3000);
}
