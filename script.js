// DOM elements :
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
  function displayTheBoardAndSetsItsData() {
    boardData.forEach((data) => {
      // player vs player contaner :
      const buttonsContainer = document.querySelector("#board-container");
      const button = document.createElement("button");
      button.id = "board-buttons";
      buttonsContainer.appendChild(button);
      button.setAttribute("data-value", data);
      // player vs bot container :
      const playerVsBotButtonsContainer = document.querySelector(
        "#playerVsBot-board-container"
      );
      const playerVsBotButton = document.createElement("button");
      playerVsBotButton.id = "playerVsBot-board-buttons";
      playerVsBotButtonsContainer.appendChild(playerVsBotButton);
      playerVsBotButton.setAttribute("data-value", data);
    });
  }
  displayTheBoardAndSetsItsData();

  return { storeRowsAndColumns, boardData };
})();

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

// func to add a specific mark to the specific button :
let clickCount = 0;
function addMarksToSpecificSpot() {
  const allButtons = document.querySelectorAll("#board-buttons");
  allButtons.forEach((button) =>
    button.addEventListener("click", function () {
      // stops players from playing in spots that already taken :
      if (button.textContent != "") return;
      // display the mark on the specific spot :
      if (clickCount === 0) {
        button.textContent = assignNewPlayers().playerOne.getMark();
        clickCount++;
      } else if (clickCount === 1) {
        button.textContent = assignNewPlayers().playerTwo.getMark();
        clickCount = 0;
      }
      checkForWin.bind(button)(); // binding button to checkForWin.
    })
  );
}
// addMarksToSpecificSpot();

// store data for both player :
let storeDataForX = [];
let storeDataForO = [];

function checkForWin() {
  // declare variables :
  const button = button;
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
      showWinner.textContent = `${assignNewPlayers().playerOne.getName()} wins button round! 🥳😎`;
      gameOver();
    } else if (containsAllElements(storeDataForO, solution)) {
      showWinner.textContent = `${assignNewPlayers().playerTwo.getName()} wins button round! 🥳😎`;
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
  const allButtons = document.querySelectorAll("#board-buttons");
  allButtons.forEach((button) => {
    button.style.pointerEvents = "none";
  });
}

// func to start player vs player game :
function startPlayerVsPlayerGame() {
  // required player names :
  if (playerOneInput.value == "" || playerTwoInput.value == "") return;
  popupOverlay.style.display = "flex";
  popupWindow.style.display = "flex";
  playerOneOutput.textContent = playerOneInput.value;
  playerTwoOutput.textContent = playerTwoInput.value;
  addMarksToSpecificSpot();
}
// start game button event :
startGameButton.addEventListener("click", startPlayerVsPlayerGame);

// func to delete all data :
function deleteAllData() {
  storeDataForX = [];
  storeDataForO = [];
  showWinner.textContent = "";
  const allButtons = document.querySelectorAll("#board-buttons");
  allButtons.forEach((button) => {
    button.textContent = "";
    button.style.pointerEvents = "auto";
    clickCount = 0;
  });
}

// play again button event :
playAgainButton.addEventListener("click", deleteAllData);
// close button event :
closeButton.addEventListener("click", function () {
  popupOverlay.style.display = "none";
  popupWindow.style.display = "none";
  deleteAllData();
});

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const playerVsBotButton = document.getElementById("playerVsBot-button");
// func to start player vs bot game :
function startPlayerVsBotGame() {
  const playerVsBotButtonsContainer = document.getElementById(
    "playerVsBot-board-container"
  );
  playerVsBotButtonsContainer.style = "display : grid";
  addMarksToSpecificSpotForPlayerVsBot();
}
playerVsBotButton.addEventListener("click", startPlayerVsBotGame);

const allButtonsForPlayervsBot = document.querySelectorAll(
  "#playerVsBot-board-buttons"
);

// func to return random button :
function getRandomButton() {
  let randomChoice = Math.floor(
    Math.random() * allButtonsForPlayervsBot.length
  );
  let randomButton = allButtonsForPlayervsBot[randomChoice];
  return randomButton;
}

function addMarksToSpecificSpotForPlayerVsBot() {
  allButtonsForPlayervsBot.forEach((button) => {
    button.addEventListener("click", function () {
      // get ranodm button :
      let randomChoice = Math.floor(
        Math.random() * allButtonsForPlayervsBot.length
      );
      let randomButton = allButtonsForPlayervsBot[randomChoice];

      if (button.textContent != "") return;
      if (randomButton.textContent != "") {
        console.log("random place taken");
        button.textContent = "X";
        if (getRandomEmptyButton().length > 0) {
          getRandomEmptyButton()[0].textContent = "test";
        }
        return;
      } else if (button === randomButton) {
        console.log("=");
        button.textContent = "X";
        if (getRandomEmptyButton().length > 0) {
          getRandomEmptyButton()[0].textContent = "test2";
        }
        return;
      } else {
        button.textContent = "X";
        randomButton.textContent = "O";
      }
    });
  });
}

function getRandomEmptyButton() {
  let randomEmptybuttonArr = [];
  allButtonsForPlayervsBot.forEach((element) => {
    if (element.textContent == "") {
      randomEmptybuttonArr.push(element);
    }
  });
  return randomEmptybuttonArr;
}
// console.log(getRandomEmptyButton());
// if (button.textContent != "") {
//   return;
// } else if (randomButton.textContent != "") {
//   console.log("taken");
//   if (button.textContent != "") {
//     return;
//   } else {
//     button.textContent = "X";
//     getRandomButton().textContent = "O";
//   }
//   // randomButton.textContent = "O";
// } else if (randomButton == button) {
//   console.log("=");
// } else {
//   button.textContent = "X";
//   randomButton.textContent = "O";
// }
