const gridContainer = document.querySelector("#grid-container");
const gridButton = document.getElementById("btnCreate");
gridButton.addEventListener("click", createGrid);

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

function resetGrid() {
    // Seleciona todas as células da grid e apaga a cor
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.style.backgroundColor = '';  // Reseta a cor de fundo para branco
        cell.style.transform = 'scale(1)';
    });
}

let hoverColor = 'black';
let isRainbowMode = false;


function addHoverEffect() {
    // Selecione todas as células (com a classe grid-cell)
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(cell => {
        cell.addEventListener('mouseenter', function () {
            if (isRainbowMode) {
                this.style.backgroundColor = getRandomColor();  // Cor aleatória se o modo rainbow estiver ativado
            } else {
                this.style.backgroundColor = hoverColor;  // Cor normal escolhida pelo usuário
            }
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.2s ease';
        });
        cell.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';  // Reseta o tamanho para 1 (sem aumento)
        });

        // Evento para quando o mouse sai da célula
        // cell.addEventListener('mouseleave', function () {
        //     this.style.backgroundColor = '';  // Reseta a cor de fundo
        //     this.style.transform = 'scale(1)';  // Reseta o tamanho
        //     this.style.transition = 'transform 0.2s ease';  // Animação de reset
        // });
    });
}

document.getElementById('color-picker').addEventListener('input', function (event) {
    hoverColor = event.target.value;  // Atualiza a cor do hover
});

document.getElementById('btnRandomHover').addEventListener('click', function () {
    isRainbowMode = !isRainbowMode; // Alterna o estado do modo rainbow
    this.textContent = isRainbowMode ? "Disable Rainbow" : "Rainbow"; // Troca o texto do botão
});

document.getElementById('btnErase').addEventListener('click', function () {
    resetGrid(); // Limpa o grid
});
