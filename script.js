const GameBoard = (function () {
  const rows = [];
  const columns = [];
  const board = [];

  function storeRowsAndColumns() {
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
        board.push(my2DArray[i][j]);
      }
    }
  }
  storeRowsAndColumns();

  function displayTheBoard() {
    board.forEach((element) => {
      const buttonsContainer = document.querySelector("#board-container");
      const button = document.createElement("button");
      buttonsContainer.appendChild(button);
      button.setAttribute("data-value", element);
    });
  }
  displayTheBoard();
  return { rows, columns };
})();

// players factory for creating new player :
function playersFactory(name, mark) {
  const getName = function () {
    return name;
  };
  const getMark = function () {
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
  const buttonDataArray = [];
  allButtons.forEach((button) =>
    button.addEventListener("click", function () {
      // display the mark on the specific spot :
      if (button.textContent != "") return;
      // stops players from playing in spots that already taken :
      if (clickCount === 0) {
        button.textContent = addChoosenMark();
        clickCount++;
      } else if (clickCount === 1) {
        button.textContent = getOtherMark();
        clickCount = 0;
      }
      // checkForTheWinner.bind(button)(); // binding the button(this) to checkForTheWinner :

      function checkWinFor_X_() {
        const allRows = GameBoard.rows;
        const allColumns = GameBoard.columns;
        const allDiagonals = GameBoard.diagonals;

        const buttonData = Number(button.getAttribute("data-value"));

        if (button.textContent === "X") {
          buttonDataArray.push(buttonData);
        }

        buttonDataArray.sort((a, b) => a - b);

        // Helper function to check if an array contains all elements of another array
        function containsAll(mainArray, subArray) {
          return subArray.every((elem) => mainArray.includes(elem));
        }

        const winningCombinations = [...allRows, ...allColumns];

        for (const combination of winningCombinations) {
          if (containsAll(buttonDataArray, combination)) {
            console.log("x wins");
            return;
          }
        }

        if (buttonDataArray.length === 5) {
          console.log("It's a draw!");
        }
      }
      checkWinFor_X_();
    })
  );
}
addMarksToSpecificSpot();

// func to add the choosen mark :
const playerOptionSelect = document.querySelector("#optionSelect");
function addChoosenMark() {
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

// function checkForWin() {
//   const allRows = GameBoard.rows;
//   const allColumns = GameBoard.columns;

//   buttonDataArray.sort((a, b) => a - b);
//   console.log(buttonDataArray);

//   if (button.textContent === "X") {
//     if (buttonDataArray.toString() == allRows[0].toString()) {
//       console.log("x wins");
//     }
//   }
// }
// checkForWin();
