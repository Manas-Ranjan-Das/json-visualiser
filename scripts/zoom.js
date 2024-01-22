//svgGroupScaler
//svgGroupPositioner
var currentScale ;
var currentPosition ;
var zoomPosition ;
var newPosition ;

var e ;



svgbox.addEventListener ("wheel" , handleZoom);




function handleZoom(event) {
    e = event ;
    event.preventDefault();
    console.log(event);
    zoomPosition = [event.offsetX ,event.offsetY]

    const newScale = event.deltaY < 0 ? zoomBy (1.1) : zoomBy (1 / 1.1);
    
}


function zoomBy (scale){
    currentScale = getTransformScale(svgGroupScaler);
    currentPosition = getTransformXY(svgGroupPositioner);
    
    const newScale =  currentScale * scale;
    newPosition = [ zoomPosition[0] + (currentPosition.x - zoomPosition[0] ) * scale ,  
                    zoomPosition[1] + (currentPosition.y - zoomPosition[1] ) * scale ]
    
    svgGroupPositioner.setAttribute('transform', "translate("+newPosition[0]+","+newPosition[1]+")");

    svgGroupScaler.setAttribute("transform","scale("+newScale + ")");
}