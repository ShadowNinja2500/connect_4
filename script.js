// variables
Player1Name = "Red"
Player2Name = "Yellow"
Player = "player1";
gameGrid = [];
Turn = document.getElementById('TurnText').textContent;

//generating the grid
let cols = 7;
let rows = 6;
let gridArray = [];
let ChoosingGrid = document.getElementById('CG');;

function GenerateGrid() {
    let Connect4Grid = document.getElementById('C4G'); 
    Connect4Grid.classList.add('Connect4-Grid'); 

    // Initialize a 2D array to store the grid
    for (let j = 0; j <= cols - 1; j++) {
        // Initialize an empty column
        const column = [];

        // Add buttons to the ChoosingGrid
        const ChoosingBtn = document.createElement('div'); 
        ChoosingBtn.classList.add('cell'); 
        ChoosingBtn.classList.add('ChoosingButtons'); 
        ChoosingBtn.id = `${j}`; 
        ChoosingGrid.appendChild(ChoosingBtn);
        ChoosingBtn.addEventListener('click', handleCellClick)

        for (let i = 0; i < rows + 1; i++) {
            // Create a cell for the Connect4Grid
            const cell = document.createElement('div'); 
            cell.classList.add('cell'); 
            cell.classList.add('empty'); 
            // cell.id = `${j}-${i}`
            // cell.innerHTML= cell.id;
            Connect4Grid.appendChild(cell);
            column.push(cell);
        }
        gridArray.push(column);
    }
    
    console.log(gridArray)
}

GenerateGrid();

//Placing the coin
function isColumnFull(colId) {
    // Check all cells in the given column (colId)
    for (let i = 0; i < rows; i++) {
      if (gridArray[i][colId].classList.contains('empty')) {
        return false; // If any cell is empty, the column is not full
      }
    }
    return true; // If all cells are filled, the column is full
  }
  function handleCellClick(event) {
    // This function will be called when a cell is clicked
    const cellId = event.target.id;
    console.log(`Cell clicked: ${cellId}`);
  
    // Check if the clicked column is full
    if (isColumnFull(cellId)) {
      alert("Column is full! Please choose another column.");
      return;
    }
  
    for (let i = rows; i >= 0; i--) {
      if (gridArray[i][cellId].classList.contains('empty')) {
        gridArray[i][cellId].classList.remove('empty');
        gridArray[i][cellId].classList.add(Player);
        console.log(Player);
        checkWinner();
        break;
      }
    }
  
    // Switch Player only if the column is not full
    if (Player === 'player1') {
      Player = 'player2';
      Turn = 'Turn: YELLOW 🟡'
    } else {
        Player = 'player1';
        Turn = 'Turn: RED 🔴'
    }
    document.getElementById('TurnText').innerHTML = Turn;
  }
  

//win condition
function checkWinner() {
Player == 'player1' ? winner = Player1Name : winner = Player2Name

    // Horizontal
    for (let r = 0; r<=rows; r++) {
        for(let c = 0; c<=cols-4; c++) {
            if(gridArray[r][c].classList.contains(Player) &&
                gridArray[r][c+1].classList.contains(Player) &&
                gridArray[r][c+2].classList.contains(Player)&&
                gridArray[r][c+3].classList.contains(Player)) {
                    alert(`${winner} wins`);
                    ChoosingGrid.classList.add('invisible');
                }
        }
    }

    // Vertical
    for(let c = 0; c<=cols-1; c++) {
        for (let r = 0; r<=rows-3; r++) {
            if(gridArray[r][c].classList.contains(Player) &&
                gridArray[r+1][c].classList.contains(Player) &&
                gridArray[r+2][c].classList.contains(Player)&&
                gridArray[r+3][c].classList.contains(Player)) {
                    alert(`${winner} wins`);
                    ChoosingGrid.classList.add('invisible');
                }
        }
    }

    //diagonal :)
        // Diagonal front
        for(let c = 0; c<=cols-3; c++) {
            for (let r = 0; r<=rows-3; r++) {
                if(gridArray[r][c].classList.contains(Player) &&
                    gridArray[r+1][c+1].classList.contains(Player) &&
                    gridArray[r+2][c+2].classList.contains(Player)&&
                    gridArray[r+3][c+3].classList.contains(Player)) {
                        alert(`${winner} wins`);
                        ChoosingGrid.classList.add('invisible');
                    }
            }
        }
        // Diagonal back
        for(let c = 3; c<=cols-1; c++) {
            for (let r = 0; r<=rows-3; r++) {
                if(gridArray[r][c].classList.contains(Player) &&
                    gridArray[r+1][c-1].classList.contains(Player) &&
                    gridArray[r+2][c-2].classList.contains(Player)&&
                    gridArray[r+3][c-3].classList.contains(Player)) {
                        alert(`${winner} wins`);
                        ChoosingGrid.classList.add('invisible');
                    }
            }
        }
}


//Resetting the grid
const ResetBtn = document.getElementById('ResetBtn');
ResetBtn.addEventListener('click', ResetGrid);

function ResetGrid() {
    for (let j = 0; j <= cols; j++) {
        for (let i = 0; i <= rows; i++) {
            const cell = gridArray[i][j]; 
            cell.classList.remove('player1', 'player2');
            cell.classList.add('empty');
            ChoosingGrid.classList.remove('invisible');
            ChoosingGrid.classList.add('visible');
        }
    }
    Player = 'player1'; 
    Turn= 'Turn: RED 🔴'
}
