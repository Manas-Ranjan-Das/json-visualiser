let isDragging = false;
let offsetX, offsetY;


var svgGroupPositioner = document.getElementById("svg-group-positioner");

// Event listeners for mouse down, move, and up
svgbox.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

svgbox.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    svgGroupPositioner = svgbox.querySelector('g');
    isDragging = true;
    transformXY = getTransformXY(svgGroupPositioner);

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    offsetX = clientX - transformXY.x;
    offsetY = clientY - transformXY.y;
    svgbox.style.cursor = 'grabbing';
}

function drag(e) {
    if (isDragging) {
        //console.log("Darging");
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const x = clientX - offsetX;
        const y = clientY - offsetY;

        svgGroupPositioner.setAttribute('transform', "translate("+x+","+y+")");
        //svgGroup.setAttribute('y', y);
    }
}

function endDrag() {
    isDragging = false;
    svgbox.style.cursor = 'grab';
}


