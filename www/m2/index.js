const hum = document.querySelector(".hum");
const offcanvas = document.querySelector(".offcanvas");
const btn_close = document.querySelector(".btn-close");
const back_header = document.querySelector(".back-header");
hum.addEventListener("click", () => {
    hum.classList.toggle("isactive");
    offcanvas.classList.toggle("show");
})
btn_close.addEventListener("click", () => {
    hum.classList.toggle("isactive");
    offcanvas.classList.toggle("show");
})
back_header.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = "#";
    a.click();
})