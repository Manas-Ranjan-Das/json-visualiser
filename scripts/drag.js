let isDragging = false;
let offsetX, offsetY;

const svgs = document.getElementsByClassName('draggable-svg');
const svg = svgs[0];
var   svgGroup = svg.querySelector('g');

// Event listeners for mouse down, move, and up
svg.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

svg.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    svgGroup = svg.querySelector('g');
    isDragging = true;
    transformXY = getTransformXY(svgGroup);

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    offsetX = clientX - transformXY.x;
    offsetY = clientY - transformXY.y;
    svg.style.cursor = 'grabbing';
}

function drag(e) {
    if (isDragging) {
        //console.log("Darging");
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const x = clientX - offsetX;
        const y = clientY - offsetY;

        svgGroup.setAttribute('transform', "translate("+x+","+y+")");
        //svgGroup.setAttribute('y', y);
    }
}

function endDrag() {
    isDragging = false;
    svg.style.cursor = 'grab';
}


