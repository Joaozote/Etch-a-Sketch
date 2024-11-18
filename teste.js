const gridContainer = document.querySelector("#grid-container");
const gridButton = document.getElementById("btnCreate");
gridButton.addEventListener("click", createGrid);



// function createGrid() {
//     gridContainer.innerHTML = '';
//     const gridSize = parseInt(document.getElementById('input').value);
//     if (!gridSize || isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
//         alert("Please choose a number between 1 and 100");

//     } else {

//         console.log(gridSize)
//         for (let i = 0; i < gridSize; i++) {
//             let column = document.createElement("div");
//             column.classList.add("column");
//             for (let j = 0; j < gridSize; j++) {
//                 let row = document.createElement('div');
//                 row.classList.add("row")
//                 const cellSize = 500 / gridSize;
//                 row.style.width = cellSize + "px";
//                 row.style.height = cellSize + "px";
//                 row.classList.add('grid-cell');
//                 column.appendChild(row);
//             }
//             gridContainer.appendChild(column);
//         }
//         addHoverEffect();
//         gridContainer.style.width = gridContainer.clientHeight + 'px';

//     }
// }

function createGrid() {
    gridContainer.innerHTML = '';
    const gridSize = parseInt(document.getElementById('input').value);
    if (!gridSize || isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
        alert("Please choose a number between 1 and 100");
    } else {
        const cellSize = 500 / gridSize;
        const column = [];
        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            column.push(cell.outerHTML);
        }
        
        for (let i = 0; i < gridSize; i++) {
            const columnContainer = document.createElement('div');
            columnContainer.classList.add('column');
            columnContainer.innerHTML = column.join(''); 
            gridContainer.appendChild(columnContainer);
        }
        addHoverEffect();
        gridContainer.style.width = gridContainer.clientHeight + 'px';
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function addHoverEffect() {
    // Selecione todas as células (com a classe grid-cell)
    const gridCells = document.querySelectorAll('.grid-cell');  

    gridCells.forEach(cell => {
        // Evento para quando o mouse entra na célula
        cell.addEventListener('mouseenter', function () {
            this.style.backgroundColor = getRandomColor();  // Altera a cor de fundo
            this.style.transform = 'scale(1.1)';  // Aumenta o tamanho da célula
            this.style.transition = 'transform 0.2s ease';  // Animação de aumento
        });

        // Evento para quando o mouse sai da célula
        // cell.addEventListener('mouseleave', function () {
        //     this.style.backgroundColor = '';  // Reseta a cor de fundo
        //     this.style.transform = 'scale(1)';  // Reseta o tamanho
        //     this.style.transition = 'transform 0.2s ease';  // Animação de reset
        // });
    });
}

