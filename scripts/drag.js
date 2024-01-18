let isDragging = false;
let offsetX, offsetY;

const svgs = document.getElementsByClassName('draggable-svg');
const svg = svgs[0];
var   svgGroup = svg.querySelector('g');

// Event listeners for mouse down, move, and up
svg.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);


function startDrag(e) {
    svgGroup = svg.querySelector('g');
    isDragging = true;
    transformXY = getTransformXY(svgGroup);
    offsetX = e.clientX - transformXY.x;
    offsetY = e.clientY - transformXY.y;
    svg.style.cursor = 'grabbing';
}

function drag(e) {
    if (isDragging) {
        console.log("Darging");
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        svgGroup.setAttribute('transform', "translate("+x+","+y+")");
        //svgGroup.setAttribute('y', y);
    }
}

function endDrag() {
    isDragging = false;
    svg.style.cursor = 'grab';
}


