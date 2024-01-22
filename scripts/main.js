// Defined Constants 
const svgNS = "http://www.w3.org/2000/svg";
const arrowLength = 75 ;
const interBoxPadding = 20 ;
const textBoxPadding = 30 ;
const firstLineYDisplace = 0.9 ;
const otherLineYDisplace = 1.2 ;
const boxFill = "#180029";
const boxStroke = "#3bff89";
const boxRadius = "6";
const arrowStroke = "#00ccff";
const arrowWidth = "2";
const textStroke = "#00aaff";
const textFill = "#00a6ff";


// Accessed Elements
var textLineTemplate = document.createElementNS(svgNS,"tspan");
textLineTemplate.setAttribute("x","0");
var svgbox = document.getElementById("svgbox");
var svgGroupScaler = document.getElementById("svg-group-scaler");
var tempsvg = document.getElementById("tempsvg");
var textbox = document.getElementById("InputJSON");
var visualizeButton = document.getElementById("visualize-button");
var jsonObject = JSON.parse(textbox.innerHTML);

console.log(svgGroupScaler);
visualizeButton.addEventListener("click", ()=>{
    textbox = document.getElementById("InputJSON");
    console.log(textbox.value);
    jsonObject = JSON.parse(textbox.value);
    textbox.value = JSON.stringify( jsonObject , undefined , '    ' );
    svgGroupScaler.innerHTML = "";
    svgGroupScaler.appendChild(traverseObject(jsonObject));
})

svgGroupScaler.innerHTML = "";
svgGroupScaler.appendChild(traverseObject(jsonObject));
//svgbox.appendChild (createBoxWithText(["Hello World","Hello World","Hello World"]));

function traverseObject( object  , name) {
    var terminals = [] ;
    var boxes = [] ;
    var temp1 ;
    var temp2 ;
    var tempGroup ;
    if(objectType(object) == "object"){
        // console.log("object");
        var keys = Object.keys(object);
        for(var i = 0;i<keys.length ;i++ ){
            if(isLeaf(object[keys[i]])){
                terminals.push(""+keys[i]+" : "+object[keys[i]]);
            }
        }

        if(terminals.length > 0)
            boxes.push(createBoxWithText(terminals));

        for(var i = 0;i<keys.length ;i++ ){
            if( !isLeaf(object[keys[i]])){
                temp1 = createBoxWithText([keys[i]]);
                temp2 = traverseObject(object[keys[i]] , keys[i] );
                tempGroup = document.createElementNS(svgNS,"g");
                tempsvg.appendChild(tempGroup);
                tempGroup.appendChild(temp1);
                tempGroup.appendChild(temp2);
                temp1.setAttribute("transform" ,"translate("+ 0 + "," + (temp2.getBBox().height/2 - temp1.getBBox().height/2) + ")")
                temp2.setAttribute("transform" ,"translate("+ temp1.getBBox().width + "," + 0 + ")")
                boxes.push(tempGroup);
            }
        }

        tempGroup = document.createElementNS(svgNS,"g");
        tempsvg.appendChild(tempGroup);
        height = 0 ;
        for (let i = 0; i < boxes.length; i++) {
            tempGroup.appendChild(boxes[i]);
            boxes[i].setAttribute("transform" ,"translate("+ arrowLength + "," + height + ")");
            height += boxes[i].getBBox().height ;
            height += interBoxPadding ;
        }
        drawArrowsToChildElements(tempGroup)
        return tempGroup;

    }
    // lists

    if(objectType(object) == "list"){
        //console.log("list");
        for(var i = 0;i<object.length ;i++ ){
            if(isLeaf(object[i])){
                terminals.push(""+name +"["+i+"]"+" : "+object[i]);
            }
        }

        if(terminals.length > 0)
            boxes.push(createBoxWithText(terminals));

        for(var i = 0;i<object.length ;i++ ){
            if(!isLeaf(object[i])){
                temp1 = createBoxWithText([name +"["+i+"]"]);
                temp2 = traverseObject(object[i] ,name +"["+i+"]" );
                tempGroup = document.createElementNS(svgNS,"g");
                tempsvg.appendChild(tempGroup);
                tempGroup.appendChild(temp1);
                tempGroup.appendChild(temp2);
                temp1.setAttribute("transform" ,"translate("+ 0 + "," + (temp2.getBBox().height/2 - temp1.getBBox().height/2) + ")")
                temp2.setAttribute("transform" ,"translate("+ temp1.getBBox().width + "," + 0 + ")")
                boxes.push(tempGroup);
            }

        }
        tempGroup = document.createElementNS(svgNS,"g");
        tempsvg.appendChild(tempGroup);
        height = 0 ;
        for (let i = 0; i < boxes.length; i++) {
            tempGroup.appendChild(boxes[i]);
            boxes[i].setAttribute("transform" ,"translate("+ arrowLength + "," + height + ")");
            height += boxes[i].getBBox().height ;
            height += interBoxPadding ;
        }
        drawArrowsToChildElements(tempGroup)
        return tempGroup;

    }
    
    if(objectType(object) == "others"){
        // console.log("others");

    }
    console.log(object);


}


function isLeaf (object){
    if(objectType(object)=="others" || object == null){
        return true ;
    }
    if(objectType(object)=="object" && Object.keys(object).length == 0 ){
        return true ;
    }
    if(objectType(object)=="list" && object.length == 0 ){
        return true ;
    }
    return false ;

}

function objectType(object) {
    if(typeof(object) === typeof({})){
        if(Array.isArray(object)){
            return "list";
        }
        else{
            return "object";
        }
    }
    else{
        return "others";
    }
}

function createBoxWithText( lines ) {
    //creating elements
    var textBoxGroup=document.createElementNS(svgNS, "g");
    var text = document.createElementNS(svgNS, "text");
    var box = document.createElementNS(svgNS, "rect");
    
    // Hierarchy 
    tempsvg.appendChild(textBoxGroup);
    textBoxGroup.appendChild(box);
    textBoxGroup.appendChild(text);

    // text atributes
    text.setAttribute("font-family","Consolas");
    // text.setAttribute("stroke",textStroke);
    text.setAttribute("fill",textFill);
    addLinesToText(text,lines);
    text.setAttribute("transform" ,"translate("+ textBoxPadding/2 + "," + textBoxPadding/2 + ")"  );

    // box atributes
    box.setAttribute("height" ,text.getBBox().height +textBoxPadding  );
    box.setAttribute("width" ,text.getBBox().width +textBoxPadding );
    box.setAttribute("fill" , boxFill );
    box.setAttribute("stroke" , boxStroke );
    box.setAttribute("rx",boxRadius);
    box.setAttribute("ry",boxRadius);
    
    // group positioning
    textBoxGroup.setAttribute("transform" ,"translate(0, 0)");
    
    return textBoxGroup;
    


    //svgbox.lastChild.remove;
}

function addLinesToText ( text , lines){
    var dyValue = firstLineYDisplace ;
    var temp ;
    for (let i = 0; i < lines.length; i++) {
        temp = textLineTemplate.cloneNode(true);
        temp.setAttribute("dy",dyValue+"em");
        temp.innerHTML = lines[i];
        text.appendChild(temp);
        if(dyValue == firstLineYDisplace){
            dyValue = otherLineYDisplace ;
        }
    }

}

function drawArrowsToChildElements (group , isList){
    var children = group.children ;
    var arrowFrom = [0, group.getBBox().height/2] ;
    var arrowTo ;
    var arrow ;
    var arrows = [] ;
    for (var i = 0; i < children.length; i++) {
         //console.log(children[i]);
        
        arrowTo = getTransformXY(children[i]);
        arrowTo = [arrowTo.x,arrowTo.y];
        arrowTo[1] += children[i].getBBox().height/2 ;

        arrow = document.createElementNS(svgNS,"path");
        arrow.setAttribute("d","M "+ arrowFrom[0] +" " + arrowFrom[1] + "C " + (arrowFrom[0]+ arrowLength * 0.9) + " " + arrowFrom[1] + " " + (arrowTo[0] - arrowLength*0.9) + " " + arrowTo[1] + " " + arrowTo[0] + " " + arrowTo[1]);
        arrow.setAttribute("fill","transparent");
        arrow.setAttribute("stroke",arrowStroke);
        arrow.setAttribute("stroke-width",arrowWidth)
        arrows.push(arrow);

    }
    for (let i = 0; i < arrows.length; i++) {
        group.appendChild(arrows[i]);
        
    }

}

function getTransformXY(element) {
    var inputString = element.getAttribute("transform");
    if(inputString==null){
        return {x:0,y:0}
    }
    var regex = /translate\(([^,]+),([^)]+)\)/;

    var match = inputString.match(regex);

    if (match!=null) {
        var num1 = parseFloat(match[1]);
        var num2 = parseFloat(match[2]);
    } 
    else {
        console.log("No match found.");
    }
    return {x:num1,y:num2};
}

function getTransformScale (element) {
    var inputString = element.getAttribute("transform");
    if(inputString==null){
        return 1;
    }
    var regex = /scale\((\d+(\.\d+)?)\)/;
    var match = inputString.match(regex);

    if (match) {
        var scaleValue = parseFloat(match[1]);
        return scaleValue ;
    } else {
        console.log("error in getTransformScale");
    }
}