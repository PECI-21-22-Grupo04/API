
const menuIcon = document.querySelector("[data-menu-icon]")
const sidebar =  document.querySelector("[data-sidebar]")
const content = document.querySelectorAll("[data-content]")
menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuIcon.classList.toggle("change");
    content.forEach( (cont) => {
        cont.classList.toggle("open");
    });
});


const avatarIcon = document.querySelector(".avatar");
const avatarDropdown = document.querySelector(".avatar-dropdown")

avatarIcon.addEventListener("click", () => {
    avatarDropdown.classList.toggle("open");
});




const clearInput = () => {
    const input = document.querySelector("[data-input]");
    input.value = "";
  }
  
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);
  


// Upload Plans script

