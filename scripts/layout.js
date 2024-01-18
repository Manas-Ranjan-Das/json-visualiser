const mediaQuery = window.matchMedia("(orientation: portrait)");
const closeButton = document.getElementById("inputToggle");
const codeSec = document.getElementById("code-sec");

if (mediaQuery.matches){
    
    codeSec.style.width = "100%";
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

// closeButton.addEventListener("touchstart" , (e)=>{
//     console.log("aaa");
//     if(codeSec.style.display != "none"){
//         codeSec.style.display = "none";
//     }
//     else{
//         codeSec.style.display = "";
//     }
// })