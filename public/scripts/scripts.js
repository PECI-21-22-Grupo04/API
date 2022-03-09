
const menuIcon = document.querySelector("[data-menu-icon]")
const sidebar =  document.querySelector("[data-sidebar]")

menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuIcon.classList.toggle("change");
})


const clearInput = () => {
    const input = document.querySelector("[data-input]");
    input.value = "";
  }
  
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);
  
  