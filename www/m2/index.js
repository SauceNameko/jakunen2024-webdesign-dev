const menu = document.querySelector(".menu");
const offcanvas = document.querySelector(".offcanvas");

menu.addEventListener("click", () => {
    menu.classList.toggle("isactive");
    offcanvas.classList.toggle("show");
})