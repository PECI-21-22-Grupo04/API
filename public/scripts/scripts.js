function menuButton(x) {
    x.classList.toggle("change");
};

const menuIcon = document.querySelector("[data-menu-icon]")
const sidebar =  document.querySelector("[data-sidebar]")

menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuIcon.classList.toggle("change");
})