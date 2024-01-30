const mediaQuery = window.matchMedia("(orientation: portrait)");
const closeButton = document.getElementById("inputToggle");
visualizeButton = document.getElementById("visualize-button");
const codeSec = document.getElementById("code-sec");

if (mediaQuery.matches){
    
    codeSec.style.width = "100%";

    visualizeButton.addEventListener("mousedown" , (e)=>{
        if(codeSec.style.display != "none"){
            codeSec.style.display = "none";
            closeButton.innerHTML = "=";
        }
        else{
            codeSec.style.display = "";
            closeButton.innerHTML = "X"
        }
    })

}

closeButton.addEventListener("mousedown" , (e)=>{
    if(codeSec.style.display != "none"){
        codeSec.style.display = "none";
        closeButton.innerHTML = "=";
    }
    else{
        codeSec.style.display = "";
        closeButton.innerHTML = "X"
    }
})

