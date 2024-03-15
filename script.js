const gridContainer = document.querySelector("#grid-container");
const button = document.getElementById("btnCreate");
button.addEventListener("click", createGrid);

function createGrid() {
    gridContainer.innerHTML = '';
    const gridSize = parseInt(document.getElementById('input').value);
    if (!gridSize || isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
        alert("Please choose a number between 1 and 100");

    } else {

        console.log(gridSize)
        for (let i = 0; i < gridSize; i++) {
            let column = document.createElement("div");
            column.classList.add("column");
            for (let j = 0; j < gridSize; j++) {
                let row = document.createElement('div');
                row.classList.add("row")
                const cellSize = 500 / gridSize;
                row.style.width = cellSize + "px";
                row.style.height = cellSize + "px";
                row.classList.add('grid-cell');
                column.appendChild(row);
            }
            gridContainer.appendChild(column);
        }

        gridContainer.style.width = gridContainer.clientHeight + 'px'; ''
    }
}
