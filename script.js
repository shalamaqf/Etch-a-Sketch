// Create a variable to store the reference of grid container
const squareContainer = document.querySelector("#square-container");

// Create a variable to store the reference of button container
const btnContainer = document.querySelector("#button-container");

// Create a button element for size, set its id, and append it to button container
const sizeBtn = document.createElement("button");
sizeBtn.setAttribute("id", "size-button");
sizeBtn.textContent = "Size";
btnContainer.appendChild(sizeBtn);

// Set the container size 
const CONTAINER_SIZE = 500;
squareContainer.style.height = `${CONTAINER_SIZE}px`;
squareContainer.style.width = `${CONTAINER_SIZE}px`;

// Create a function to create a square
function createSquare(){
    const aSquare = document.createElement("div");
    aSquare.classList.add("square");
    return aSquare;
}

/* Create a function to a create grid with num parameter,
   so that user can create any grid size with desired
*/
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
}

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

/* Create a function to handle the event when mouse hover on the square,
   so the square will turns black */
function hoverSquare(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = "black";
        })
    })
}