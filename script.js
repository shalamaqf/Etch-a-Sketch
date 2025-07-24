const squareContainer = document.querySelector("#square-container");
const CONTAINER_SIZE = 960;
squareContainer.style.height = `${CONTAINER_SIZE}px`;
squareContainer.style.width = `${CONTAINER_SIZE}px`;

function createSquare(){
    const aSquare = document.createElement("div");
    aSquare.classList.add("square");
    return aSquare;
}

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