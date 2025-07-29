// Create a variable to store the reference of grid container
const squareContainer = document.querySelector("#square-container");

// Create a variable to store the reference of button container
const btnContainer = document.querySelector("#button-container");

// Create a button element for size, set its id, and append it to the button container
const sizeBtn = document.createElement("button");
sizeBtn.setAttribute("id", "size-button");
sizeBtn.textContent = "Size";
btnContainer.appendChild(sizeBtn);

// Create a button element for erase feature, set its id, and append it to the button container
const statusBtn = document.createElement("button");
statusBtn.setAttribute("id", "status-button");
statusBtn.textContent = "Current Mode: Draw";
btnContainer.append(statusBtn);

// Create a button element for rgb feature, set its id, and append it to the button container
const rgbaBtn = document.createElement("button");
rgbaBtn.setAttribute("id", "rgba-button");
rgbaBtn.textContent = "RGBA:";
btnContainer.appendChild(rgbaBtn);

// Create a span element for an icon color
const iconColor = document.createElement("span");
iconColor.setAttribute("id", "icon-color");
rgbaBtn.appendChild(iconColor);

// Create a button element for reset feature, set its id, and append it to the button container
const resetBtn = document.createElement("button");
resetBtn.setAttribute("id", "reset-button");
resetBtn.textContent = "Reset";
btnContainer.appendChild(resetBtn);

// Set the container size 
const CONTAINER_SIZE = 500;
squareContainer.style.height = `${CONTAINER_SIZE}px`;
squareContainer.style.width = `${CONTAINER_SIZE}px`;

// Create a function to create a square
function createSquare(){
    const aSquare = document.createElement("div");
    aSquare.dataset.alpha = 0;
    aSquare.classList.add("square");
    return aSquare;
}

/* Create a function to a create grid with num parameter,
   so that user can create any grid size with desired */
function createGrid(num){
    // count the number of squares to put in the container
    const size = num * num;
    
    // delete old grid
    squareContainer.innerHTML = '';

    // generate a grid
    for (let i = 0; i < size; i++){
        squareContainer.appendChild(createSquare());
    }

    // customize the container and square size
    setSquareSize(num);

    hoverSquare();
}

/* Create a function to adjust the square size 
   to fit the container size */
function setSquareSize(num){
    // set the square size
    const squareSize = CONTAINER_SIZE / num;

    // set every square size in the grid
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
    });
}

// Creata a variable to store the status mode, either draw or erase
let statusMode = "Draw";

/* Create a function to handle the event when mouse hover on the square,
   so the square will turns black */
function hoverSquare(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            const alpha = increaseOpacity(square);
            handleHoverColor(square, alpha);
        })
    })
}

/* Create a function to handle the event when mouse click on the size button,
   then it will prompt the user to enter a grid size */
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

/* Attach an event listener to size button to prompt the user how much size of the grid
   then change the grid size */
sizeBtn.addEventListener('click', () => {
    createGrid(promptSize());
})

// Create a function to handle the hover 
function handleHoverColor(square, alpha){
    if (statusMode == "Draw"){
        square.style.backgroundColor = `rgba(${sketchColor.match(/\d+/g).slice(0, 3).join(', ')}, ${alpha})`;
    }
    else{
        square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    }
}

/* Attach an event listener to status button, to change the status mode
   and change the text context of the button */
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

// create a function to generate a random rgb color
function generateRandomRgbaColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, 0)`;
}

// create a variable to store the rgb values
let sketchColor = "rgba(0, 0, 0, 0)";

// create a function to activate the rgb color
function activateRgbaColor(){
    // generate the random rgb color
    sketchColor = generateRandomRgbaColor();

    resetAlpha();

    // set the icon color
    const rgbValues = sketchColor.match(/\d+/g).slice(0, 3).join(', ');
    iconColor.style.backgroundColor = `rgb(${rgbValues})`; 
    
    // update the ui of status button
    statusMode = "Draw";
    statusBtn.textContent = "Current Mode: Draw";
}

/* Attach an event listener to rgb button, when it clicked
   it will change the sketch color,
   and upgrade the icon color */
rgbaBtn.addEventListener('click', activateRgbaColor);

// Create a function to reset the squares color to white
function resetGrid(){
    // set all square's color to white
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    })

    // set square's alpha to 0
    resetAlpha();

    // set the sketch color back to default (black)
    sketchColor = "rgba(0, 0, 0, 0)";

    // set the iconColor back to default (black)
    iconColor.style.backgroundColor = "rgb(0, 0, 0)";
}

/* Attach an event listener to reset button, when it clicked
   it will change all square's color back to white,
   and upgrade the sketch and icon color back to the default color (black) */
resetBtn.addEventListener('click', resetGrid);

// Create a function to check and update the alpha color of a square
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

// Create a function to check the alpha square
function resetAlpha(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        if (parseFloat(square.dataset.alpha) > 0) {
            square.dataset.alpha = 0;
        }
    });
}

// Create usage instructions to use this program
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

// Create a title of the program
const titleProject = document.createElement("div");
titleProject.setAttribute("id", "title");
titleProject.textContent = "Etch A Sketch!"
document.body.insertBefore(titleProject, btnContainer);

// default grid
createGrid(16);