// Reference to grid and button container
const squareContainer = document.querySelector("#square-container");
const btnContainer = document.querySelector("#button-container");


// Create control buttons and append it to the button container
const sizeBtn = document.createElement("button");
sizeBtn.setAttribute("id", "size-button");
sizeBtn.textContent = "Size";
btnContainer.appendChild(sizeBtn);

const statusBtn = document.createElement("button");
statusBtn.setAttribute("id", "status-button");
statusBtn.textContent = "Current Mode: Draw";
btnContainer.append(statusBtn);

const rgbaBtn = document.createElement("button");
rgbaBtn.setAttribute("id", "rgba-button");
rgbaBtn.textContent = "RGBA:";
btnContainer.appendChild(rgbaBtn);

const resetBtn = document.createElement("button");
resetBtn.setAttribute("id", "reset-button");
resetBtn.textContent = "Reset";
btnContainer.appendChild(resetBtn);


// Color preview indicator inside the RGBA button
const iconColor = document.createElement("span");
iconColor.setAttribute("id", "icon-color");
rgbaBtn.appendChild(iconColor);


const CONTAINER_SIZE = 500;
squareContainer.style.height = `${CONTAINER_SIZE}px`;
squareContainer.style.width = `${CONTAINER_SIZE}px`;


// Create a single square with initial opacity data attribute
function createSquare(){
    const aSquare = document.createElement("div");
    aSquare.dataset.alpha = 0;
    aSquare.classList.add("square");
    return aSquare;
}


/* 
 * Generates a grid of squares based on the provided size (num * num)
 * Clear existing grid and adjust square sizes to fit the container
*/
function createGrid(num){
    const size = num * num;
    
    squareContainer.innerHTML = '';         // Clear existing grid

    for (let i = 0; i < size; i++){
        squareContainer.appendChild(createSquare());
    }

    setSquareSize(num);
    hoverSquare();          // Attach hover event to new squares
}


// Adjust each square's size to fit the container
function setSquareSize(num){
    const squareSize = CONTAINER_SIZE / num;

    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
    });
}


// Tracks current mode: "Draw" or "Erase"
let statusMode = "Draw";


/*
 * Adds hover event listeners to each square, to modify the color based on the current color
 * On hover, the square's opacity increase gradually
*/
function hoverSquare(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            const alpha = increaseOpacity(square);
            handleHoverColor(square, alpha);
        })
    })
}


/*
 * Prompt the user for grid size, validates the input, and return the size as a number
*/
function promptSize(){
    const sizeGrid = prompt("Enter a size: ");

    if (!sizeGrid || isNaN(sizeGrid)){
        return alert("Please enter a valid number!");
    }

    if (Number(sizeGrid) > 100){
        return alert("Max size is 100!");
    }

    return Number(sizeGrid);
}


// Event listeners to change the grid size on button click
sizeBtn.addEventListener('click', () => {
    createGrid(promptSize());
})


// Adjust the color based on the status mode and control the opacity based on alpha
function handleHoverColor(square, alpha){
    if (statusMode == "Draw"){
        square.style.backgroundColor = `rgba(${sketchColor.match(/\d+/g).slice(0, 3).join(', ')}, ${alpha})`;
    }
    else{
        square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    }
}


/* 
 * Event listeners to change the text context of status button
 * Reset the square's alpha to default on button click
*/
statusBtn.addEventListener('click', () => {
    if (statusMode == "Draw"){
        statusMode = "Erase";
        statusBtn.textContent = "Current Mode: Erase";
        resetAlpha();
    }
    else {
        statusMode = "Draw";
        statusBtn.textContent = "Current Mode: Draw";
    }
})


// Generates a random RGBA color and returns it
function generateRandomRgbaColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, 0)`;
}


// Set the default color on hover
let sketchColor = "rgba(0, 0, 0, 0)";


/*
 * Activate the RGBA color on hover
 * Reset the square's opacity back to default
 * Change the icon color based on current active RGBA color
 * Update the status mode to draw
*/
function activateRgbaColor(){
    sketchColor = generateRandomRgbaColor();

    resetAlpha();

    const rgbValues = sketchColor.match(/\d+/g).slice(0, 3).join(', ');
    iconColor.style.backgroundColor = `rgb(${rgbValues})`; 
    
    statusMode = "Draw";
    statusBtn.textContent = "Current Mode: Draw";
}


// Event listeners to activate the RGBA color on hover when button clicked
rgbaBtn.addEventListener('click', activateRgbaColor);


/*
 * Reset the each square's color back to white
 * Reset the opacity, sketch color and icon color back to default
*/
function resetGrid(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    })

    resetAlpha();

    sketchColor = "rgba(0, 0, 0, 0)";

    iconColor.style.backgroundColor = "rgb(0, 0, 0)";
}


// Event listeners to reset the grid and features back to default on button click
resetBtn.addEventListener('click', resetGrid);


/* 
 * Increase square's opacity gradually when being hovered
 * Tracks the current opacity
*/
function increaseOpacity(square){
    let currentAlpha = parseFloat(square.dataset.alpha);
    
    if (currentAlpha < 1){
        currentAlpha += 0.1;
    }

    if (currentAlpha > 1){
        currentAlpha = 1;
    }

    square.dataset.alpha = currentAlpha;

    return currentAlpha;
}


// Check the square's opacity and set it to 0, if it's more than default value
function resetAlpha(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        if (parseFloat(square.dataset.alpha) > 0) {
            square.dataset.alpha = 0;
        }
    });
}


// Create usage instructions to use this program and append it to the body
const info = document.createElement("div");
info.setAttribute("id", "info-program");

const orderedList = document.createElement("ol");
orderedList.textContent = "Usage Instructions: ";

const listInfo_1 = document.createElement("li");
listInfo_1.textContent = "Size: Change the grid size";
orderedList.appendChild(listInfo_1);

const listInfo_2 = document.createElement("li");
listInfo_2.textContent = "Current Mode: Draw (Draw mode on) / Erase (Erase mode on)";
orderedList.appendChild(listInfo_2);

const listInfo_3 = document.createElement("li");
listInfo_3.textContent = "RGBA: Change the sketch color";
orderedList.appendChild(listInfo_3);

const listInfo_4 = document.createElement("li");
listInfo_4.textContent = "Reset: Reset the grid";
orderedList.appendChild(listInfo_4);

info.appendChild(orderedList);
document.body.appendChild(info);


// Create a title of the program, set its id, and append it to the body
const titleProject = document.createElement("div");
titleProject.setAttribute("id", "title");
titleProject.textContent = "Etch A Sketch!"
document.body.insertBefore(titleProject, btnContainer);


// Set the default grid size
createGrid(16);