
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
  


// Upload Plans script

const imageContainer = document.getElementById('image-container');
    var imageSelection = [];

    imageContainer.addEventListener('click', (e) => {
        if (!imageSelection.includes(e.target.src)) {
            console.log('we adding')
            imageSelection.push(e.target.src);
        }
    });
      
    const addImageButton = document.getElementById('add-image-button');
    addImageButton.addEventListener('click', async () => {
        console.log("SENDING ")
        const url = 'http://localhost:5000/plans/upload/exer';
        try {
        
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(imageSelection),
            });
            console.log(response)
            if (response.ok){           
                window.location.href = "/plans"
            }
            imageSelection = [];
        }catch(e){
            console.log("error on")            
            imageSelection = [];
        }
        imageSelection = [];


    });
  