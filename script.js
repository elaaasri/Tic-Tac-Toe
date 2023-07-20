function gameBoard() {
  const my2DArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const rows = [];
  const columns = [];

  // a func to create the 2D board :
  function createBoard() {
    const boardContainer = document.querySelector(".board");
    for (let i = 0; i < my2DArray.length; i++) {
      for (let j = 0; j < my2DArray[i].length; j++) {
        const button = document.createElement("button");
        button.setAttribute("data-value", my2DArray[i][j]);
        boardContainer.appendChild(button);
      }
    }
  }
  createBoard();
}
gameBoard();

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

      // console.log(button);
      // if (button.textContent === "X") {
      //   result.push(buttonDataValue);
      // }

      // let row = [1, 2, 3];
      // console.log(result);

      // let filteredResult = [];

      // // console.log(result);
      // result.forEach((element) => {
      //   if (element == 1 || element == 2 || element == 3) {
      //     filteredResult.push(element);
      //   }
      // });

      // console.log(filteredResult);

      // let final = filteredResult.sort((a, b) => a - b);
      // // console.log(final);
      // if (button.textContent === "X") {
      //   if (final.toString() == row.toString()) {
      //     alert("x wins");
      //   }
      // }
    })
  );
}
addMarksToSpecificSpot();

function getTheWinner() {
  let allButtons = document.querySelectorAll("button");
  let storeDataValue = [];

  allButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonDataValue = Number(button.getAttribute("data-value"));
      let sortedDataValue = [];

      if (button.textContent === "X") {
        storeDataValue.push(buttonDataValue);
      }

      let row = [1, 2, 3];
      let rowTwo = [4, 5, 6];

      storeDataValue.filter((value) => {
        row.filter((rowValue) => {
          if (value === rowValue) {
            sortedDataValue.push(value);
          }
        });
      });

      sortedDataValue.sort((a, b) => a - b);

      console.log(row);
      console.log(sortedDataValue);

      if (
        button.textContent === "X" &&
        sortedDataValue.toString() === row.toString()
      ) {
        alert("x wins");
      } else if (
        button.textContent === "O" &&
        sortedDataValue.toString() === row.toString()
      ) {
        alert("o wins");
      }

      // if (button.textContent === "X") {
      //   if (sortedDataValue.toString() === row.toString()) {
      //     alert("x wins");
      //   }
      // } else if (button.textContent === "O") {
      //   if (sortedDataValue.toString() == row.toString()) {
      //     alert("o wins");
      //   }
      // }
    });
  });
}
getTheWinner();

// func to add the choosen mark :
const playerOptionSelect = document.getElementById("optionSelect");
function addChoosenMark() {
  const selectedOption = playerOptionSelect.value;
  return selectedOption === "Player One"
    ? playerOne.getMark()
    : playerTwo.getMark();
}
playerOptionSelect.addEventListener("click", addChoosenMark);

// func to get the other player mark :
function getOtherMark() {
  return addChoosenMark() === playerOne.getMark()
    ? playerTwo.getMark()
    : playerOne.getMark();
}

// storeDataValue.forEach((element) => {
//   if (element == 1 || element == 2 || element == 3) {
//     filteredResult.push(element);
//   }
// });

// console.log(filteredResult);

// let final = filteredResult.sort((a, b) => a - b);
// // console.log(final);
// if (button.textContent === "X") {
//   if (final.toString() == row.toString()) {
//     alert("x wins");
//   }
// } else if (button.textContent === "O") {
//   if (final.toString() == row.toString()) {
//     alert("o wins");
//   }
// }

const test = { name: "zbe", age: 21 };
console.log(JSON.stringify(test));
