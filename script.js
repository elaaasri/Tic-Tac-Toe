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
      const buttonsContainer = document.querySelector("#board-container");
      const button = document.createElement("button");
      button.id = "board-buttons";
      buttonsContainer.appendChild(button);
      button.setAttribute("data-value", data);
      button.textContent = "zbe";
    });
  }
  displayTheBoardAndSetsItsData();

  return { storeRowsAndColumns };
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
const playerOne = playersFactory("Player One", "X");
const playerTwo = playersFactory("Player Two", "O");

// func to add a specific mark to the specific button :
function addMarksToSpecificSpot() {
  const allButtons = document.querySelectorAll("button");
  let clickCount = 0;
  allButtons.forEach((button) =>
    button.addEventListener("click", function () {
      // stops players from playing in spots that already taken :
      if (button.textContent != "") return;
      // display the mark on the specific spot :
      if (clickCount === 0) {
        button.textContent = addChoosenMark();
        clickCount++;
      } else if (clickCount === 1) {
        button.textContent = getOtherMark();
        clickCount = 0;
      }
      checkForWin.bind(button)(); // binding button to checkForWin.
    })
  );
}
addMarksToSpecificSpot();

// func to add the choosen mark :
function addChoosenMark() {
  const playerOptionSelect = document.querySelector("#optionSelect");
  const selectedOption = playerOptionSelect.value;
  return selectedOption === "Player One"
    ? playerOne.getMark()
    : playerTwo.getMark();
}

// func to get the other player mark :
function getOtherMark() {
  return addChoosenMark() === playerOne.getMark()
    ? playerTwo.getMark()
    : playerOne.getMark();
}

let storeDataForX = [];
let storeDataForO = [];

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

  for (const solution of allSolutions) {
    if (containsAllElements(storeDataForX, solution)) {
      console.log("x wins");
      gameOver();
    } else if (containsAllElements(storeDataForO, solution)) {
      console.log("o wins");
      gameOver();
    }
  }
  console.log(storeDataForX.length);
  console.log(storeDataForO.length);

  // conditon to check for the tie :
  if (storeDataForX.length === 5 || storeDataForO.length === 5) {
    console.log("its a tie");
  }
}

// func to stop the end the game :
// function gameOver() {
//   const allButtons = document.querySelectorAll("button");
//   allButtons.forEach((button) => {
//     button.style.pointerEvents = "none";
//   });
// }

// const test = document.querySelector("#test");
// const testSelect = document.querySelector("#test-select");

// test.addEventListener("click", function () {
//   testSelect.style.display = "flex";
// });
// console.log("zbe");

// const zbe = document.querySelectorAll("button");
// console.log(zbe);

// const startGameButton = document.getElementById("start-game-button");
// const landingPageContainer = document.getElementById("landing-page-container");
// const gameBoardCotainer = document.getElementById("game-board-container");
// const backButton = document.getElementById("back-button");

// startGameButton.addEventListener("click", function () {
//   landingPageContainer.style.display = "none";
//   gameBoardCotainer.style.display = "block";
// });

// backButton.addEventListener("click", function () {
//   landingPageContainer.style.display = "block";
//   gameBoardCotainer.style.display = "none";
// });

const startGameButton = document.getElementById("start-game-button");
const closePopupButton = document.getElementById("close-popup-button");
const popupOverlay = document.getElementById("popup-overlay");
const popupWindow = document.getElementById("popup-window");
const playerOneInput = document.getElementById("player-one-input");
const playerTwoInput = document.getElementById("player-two-input");
const playerOneOutput = document.getElementById("player-one-output");
const playerTwoOutput = document.getElementById("player-two-output");

startGameButton.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
  popupWindow.style.display = "flex";
  console.log(playerOneInput.value);
  console.log(playerTwoInput.value);
  playerOneOutput.textContent = playerOneInput.value;
  playerTwoOutput.textContent = playerTwoInput.value;
});

closePopupButton.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  popupWindow.style.display = "none";
});
