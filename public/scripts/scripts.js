
const menuIcon = document.querySelector("[data-menu-icon]")
const sidebar =  document.querySelector("[data-sidebar]")

menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuIcon.classList.toggle("change");
})

const filterIcon = document.querySelector("[data-filter-icon]")
const filterSidebar = document.querySelector("[data-filter-sidebar]")

filterIcon.addEventListener("click", () => {
    filterIcon.classList.toggle("open");
    filterSidebar.classList.toggle("open");
});



const clearInput = () => {
    const input = document.querySelector("[data-input]");
    input.value = "";
  }
  
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);
  
  