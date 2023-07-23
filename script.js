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
      buttonsContainer.appendChild(button);
      button.setAttribute("data-value", data);
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
      checkForWin.bind(button)(); // binding the button to checkForWin.
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

const storeDataFor_X_ = [];
const storeDataFor_O_ = [];

function checkForWin() {
  const allRows = GameBoard.storeRowsAndColumns().rows;
  const allColumns = GameBoard.storeRowsAndColumns().columns;
  const allDiagonals = GameBoard.storeRowsAndColumns().diagonals;
  const button = this; // binding the button to checkForTheWinner.
  const buttonData = Number(button.getAttribute("data-value"));
  const allSolutions = [...allRows, ...allColumns, ...allDiagonals];

  if (button.textContent === "X") {
    storeDataFor_X_.push(buttonData);
  } else if (button.textContent === "O") {
    storeDataFor_O_.push(buttonData);
  }

  // func to check if an array contains all elements of another array :
  function containsAllElements(mainArray, subArray) {
    return subArray.every((elem) => mainArray.includes(elem));
  }

  for (const solution of allSolutions) {
    if (containsAllElements(storeDataFor_X_, solution)) {
      console.log("x wins");
      return;
    } else if (containsAllElements(storeDataFor_O_, solution)) {
      console.log("o wins");
    }
  }
}

// checkForWin();

// function checkwin() {
//   console.log(storeDataFor_X_);
//   const allRows = GameBoard.storeRowsAndColumns().rows;
//   const allColumns = GameBoard.storeRowsAndColumns().columns;
//   const allDiagonals = GameBoard.storeRowsAndColumns().diagonals;
//   const allSolutions = [...allRows, ...allColumns, ...allDiagonals];
//   // func to check if an array contains all elements of another array :
//   function containsAllElements(mainArray, subArray) {
//     return subArray.every((elem) => mainArray.includes(elem));
//   }
//   console.log(storeDataFor_X_);

//   for (const solution of allSolutions) {
//     if (containsAllElements(storeDataFor_X_, solution)) {
//       console.log("x wins");
//       return;
//     } else if (containsAllElements(storeDataFor_O_, solution)) {
//       console.log("o wins");
//     }

//     // if (storeDataFor_X_.length === 5) {
//     //   console.log("It's a draw!");
//     // }
//   }
// }
// checkwin();
