const GameBoard = (function () {
  const boardData = [];

  // fun to store rows, columns and diagonals :
  function storeRowsAndColumns() {
    const rows = [];
    const columns = [];
    const diagonals = [
      [1, 5, 9],
      [3, 5, 7],
    ];
    const my2DArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    for (let i in my2DArray) {
      rows.push(my2DArray[i]);
      for (let j in my2DArray[i]) {
        if (!columns[j]) {
          columns[j] = [];
        }
        columns[j].push(my2DArray[i][j]);
        boardData.push(my2DArray[i][j]);
      }
    }
    return { rows, columns, diagonals };
  }
  storeRowsAndColumns();

  // func to create the board and sets data value for each button :
  function createBoardAndSetsDataPvP() {
    boardData.forEach((data) => {
      // PvP mode container :
      const buttonsContainer = document.querySelector("#board-container");
      const button = document.createElement("button");
      button.id = "board-buttons";
      buttonsContainer.appendChild(button);
      button.setAttribute("data-value", data);
    });
  }
  createBoardAndSetsDataPvP();

  return { storeRowsAndColumns, boardData };
})();

// ############# PLAYER VS PLAYER MODE ############# :
// DOM elements for PvP mode :
const startGameButton = document.getElementById("start-game-button");
const popupOverlay = document.getElementById("popup-overlay");
const popupWindow = document.getElementById("popup-window");
const playerOneInput = document.getElementById("player-one-input");
const playerTwoInput = document.getElementById("player-two-input");
const playerOneOutput = document.getElementById("player-one-output");
const playerTwoOutput = document.getElementById("player-two-output");
const playAgainButton = document.getElementById("play-again-button");
const showWinner = document.getElementById("show-winner");
const closeButton = document.getElementById("close-button");
const allButtonsPvP = document.querySelectorAll("#board-buttons");

// factory func to create new players :
function playersFactory(name, mark) {
  const getName = () => {
    return name;
  };
  const getMark = () => {
    return mark;
  };
  return { getName, getMark };
}

// func to assign new players object :
function assignNewPlayers() {
  const playerOne = playersFactory(playerOneInput.value, "X");
  const playerTwo = playersFactory(playerTwoInput.value, "O");
  return { playerOne, playerTwo };
}

// func to add a specific mark to the specific button PvP mode:
let currentPlayer = "playerOne";
function addMarksToSpecificSpotPvP() {
  // required player names :
  if (playerOneInput.value == "" || playerTwoInput.value == "") {
    alert("Must Enter Names!");
    return;
  }
  // display the PvP pop up :
  popupOverlay.style.display = "flex";
  popupWindow.style.display = "flex";
  // sets name players to the pop up :
  playerOneOutput.textContent = playerOneInput.value;
  playerTwoOutput.textContent = playerTwoInput.value;
  // add marks :
  allButtonsPvP.forEach((button) =>
    button.addEventListener("click", function () {
      // stops players from playing in spots that already taken :
      if (button.textContent != "") return;
      // display the mark on the specific spot :
      if (currentPlayer === "playerOne") {
        button.textContent = assignNewPlayers().playerOne.getMark();
        currentPlayer = "playerTwo";
      } else if (currentPlayer === "playerTwo") {
        button.textContent = assignNewPlayers().playerTwo.getMark();
        currentPlayer = "playerOne";
      }
      checkForWin.bind(button)(); // binding button to checkForWin.
    })
  );
}
// start game button event :
startGameButton.addEventListener("click", addMarksToSpecificSpotPvP);

// store data for both players :
let storeDataForX = [];
let storeDataForO = [];

// func to declare the winner :
function checkForWin() {
  // declare variables :
  const button = this;
  const buttonData = Number(button.getAttribute("data-value"));
  const allRows = GameBoard.storeRowsAndColumns().rows;
  const allColumns = GameBoard.storeRowsAndColumns().columns;
  const allDiagonals = GameBoard.storeRowsAndColumns().diagonals;
  const allSolutions = [...allRows, ...allColumns, ...allDiagonals];

  // conditon to store data for each player :
  if (button.textContent === "X") {
    storeDataForX.push(buttonData);
  } else if (button.textContent === "O") {
    storeDataForO.push(buttonData);
  }

  // func to check if an array contains all elements of another array :
  function containsAllElements(mainArray, subArray) {
    return subArray.every((elem) => mainArray.includes(elem));
  }
  // check if every element in solution includes the stored data :
  for (const solution of allSolutions) {
    if (containsAllElements(storeDataForX, solution)) {
      showWinner.textContent = `${assignNewPlayers().playerOne.getName()} wins this round! 🥳😎`;
      gameOver();
    } else if (containsAllElements(storeDataForO, solution)) {
      showWinner.textContent = `${assignNewPlayers().playerTwo.getName()} wins this round! 🥳😎`;
      gameOver();
    }
  }

  // conditon to check for the tie :
  if (storeDataForX.length === 5 || storeDataForO.length === 5) {
    showWinner.textContent = "Its a Tie! 😤🫡";
  }
}

// func to stop the game :
function gameOver() {
  allButtonsPvP.forEach((button) => {
    button.style.pointerEvents = "none";
  });
}

// func to delete all data :
function deleteAllData() {
  storeDataForX = [];
  storeDataForO = [];
  currentPlayer = "playerOne";
  showWinner.textContent = "";
  allButtonsPvP.forEach((button) => {
    button.textContent = "";
    button.style.pointerEvents = "auto";
  });
}

// play again button event :
playAgainButton.addEventListener("click", deleteAllData);
// close button event :
closeButton.addEventListener("click", closePopUpWindow);

// func to close the pop up window for both modes :
function closePopUpWindow() {
  popupOverlay.style.display = "none";
  popupWindow.style.display = "none";
  deleteAllData();
}
