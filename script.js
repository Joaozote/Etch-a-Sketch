const gridContainer = document.querySelector("#grid-container");
const gridButton = document.getElementById("btnCreate");
const sizeValue = document.querySelector(".sizeValue");
const inputRange = document.getElementById("input");
gridButton.addEventListener("click", createGrid);


// carrega a página com um valor padrão
window.addEventListener('load', function () {
    const input = document.getElementById('input');

    // Definir o valor padrão para o input se ele estiver vazio
    if (!input.value) {
        input.value = 12;  // Defina o valor padrão para o tamanho da grade (ex: 12)
    }

    createGrid();  // Chama a função para criar o grid com o valor do input
});

//atualiza o sizeValue sempre que o input range mudar
inputRange.addEventListener('input', function () {
    const value = inputRange.value;
    sizeValue.textContent = `${value} x ${value}`;  // Atualiza a div com o novo valor
});

function createGrid() {
    gridContainer.innerHTML = '';
    const gridSize = parseInt(document.getElementById('input').value);
    if (!gridSize || isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
        alert("Please choose a number between 1 and 100");
    } else {
        const cellSize = 500 / gridSize;

        gridContainer.style.width = '500px';
        gridContainer.style.height = '500px';

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


let hoverColor = 'black';
let isRainbowMode = false;

function addHoverEffect() {
    // Selecione todas as células (com a classe grid-cell)
    const gridCells = document.querySelectorAll('.grid-cell');

    let isDrawing = false;  // Flag para controlar se está desenhando
    let hasColor = false;   // Flag para saber se a célula já foi colorida

    gridCells.forEach(cell => {
        // Começar a desenhar no 'mousedown'
        cell.addEventListener('mousedown', function (e) {
            e.preventDefault();

            // Impede a seleção de texto enquanto o botão do mouse estiver pressionado
            window.getSelection().removeAllRanges();
            isDrawing = true;  // Inicia o desenho
            if (isRainbowMode) {
                if (!hasColor) {  // Aplica a cor aleatória apenas se ainda não tiver sido colorida
                    this.style.backgroundColor = getRandomColor();
                    hasColor = true;
                }
            } else {
                this.style.backgroundColor = hoverColor;
            }
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.2s ease';
        });

        // Continuar desenhando enquanto o mouse estiver pressionado (mousemove)
        cell.addEventListener('mousemove', function () {
            if (isDrawing) {
                if (isRainbowMode) {
                    if (!hasColor) {  // Aplica a cor aleatória apenas se ainda não tiver sido colorida
                        this.style.backgroundColor = getRandomColor();
                        hasColor = true;
                    }
                } else {
                    this.style.backgroundColor = hoverColor;
                }
                this.style.transform = 'scale(1.2)';
                this.style.transition = 'transform 0.2s ease';
            }
        });

        // Parar o desenho quando o mouse for solto (mouseup)
        cell.addEventListener('mouseup', function () {
            isDrawing = false;
        });

        // Parar o desenho se o mouse sair da célula (mouseleave)
        cell.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';  // Reseta o tamanho para 1 (sem aumento)
            hasColor = false;  // Reseta o estado de cor da célula quando o mouse sai dela
        });
    });

    // Garantir que, se o mouse sair do grid ou da tela, o desenho pare
    document.addEventListener('mouseup', function () {
        isDrawing = false;  // Para o desenho quando o mouse for solto, mesmo fora do grid
    });

    // Para o desenho se o mouse sair da tela
    document.addEventListener('mouseleave', function () {
        isDrawing = false;  // Para o desenho se o mouse sair da tela
    });
}


document.getElementById('color-picker').addEventListener('input', function (event) {
    hoverColor = event.target.value;  // Atualiza a cor do hover
});

document.getElementById('btnRandomHover').addEventListener('click', function () {
    isRainbowMode = !isRainbowMode; // Alterna o estado do modo rainbow
    this.textContent = isRainbowMode ? "Disable Rainbow" : "Rainbow"; // Troca o texto do botão
});


function resetGrid() {
    // Seleciona todas as células da grid e apaga a cor
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.style.backgroundColor = '';  // Reseta a cor de fundo para branco
        cell.style.transform = 'scale(1)';
    });


}

document.getElementById('btnErase').addEventListener('click', function () {
    resetGrid(); // Limpa o grid
});
