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
        square.style.backgroundColor = rgbToRgba(sketchColor, alpha);
    }
    else{
        square.style.backgroundColor = "#ffffff";
    }
}

/* Attach an event listener to status button, to change the status mode
   and change the text context of the button */
statusBtn.addEventListener('click', () => {
    if (statusMode == "Draw"){
        statusMode = "Erase";
        statusBtn.textContent = "Current Mode: Erase";
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

    // set the icon color
    iconColor.style.backgroundColor = sketchColor;

    // update the ui of status button
    statusMode = "Draw";
    statusBtn.textContent = "Current Mode: Draw";
}

/* Attach an event listener to rgb button, when it clicked
   it will change the sketch color,
   and upgrade the icon color */
rgbaBtn.addEventListener('click', activateRgbColor);

// Create a function to reset the squares color to white
function resetGrid(){
    // set all square's color to white
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.style.backgroundColor = "#ffffff";

        // set the alpha back to 0
        square.dataset.alpha = "0";
    })

    // set the sketch color back to default (black)
    sketchColor = "rgb(0, 0, 0)";

    // set the iconColor back to default (black)
    iconColor.style.backgroundColor = sketchColor;
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

// convert the rgb color to rgba
function rgbToRgba(rgb, alpha){
    // user regex to extract the number of rgb
    const [r, g, b] = rgb.match(/\d+/g);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}