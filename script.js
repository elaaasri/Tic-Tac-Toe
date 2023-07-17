const gameBoard = (function () {
  const board = ["X", "O"];
  const rows = 3;
  const columns = 3;
  const the2Dboard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  for (let i = 0; i < the2Dboard.length; i++) {
    for (let j = 0; j < the2Dboard[i].length; j++) {
      // console.log(the2Dboard[i]);
    }
  }
  return { the2Dboard, board };
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

function setDataBoard() {
  const dataBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  for (let i = 0; i < dataBoard.length; i++) {
    for (let j = 0; j < dataBoard[i].length; j++) {
      const button = document.createElement("button");
      const boardContainer = document.querySelector(".board");
      boardContainer.appendChild(button);
      button.setAttribute("data-value", dataBoard[i][j]);
    }
  }
}
setDataBoard();

// function checksForTheWinner() {
//   const allButtons = document.querySelectorAll("button");
//   allButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const buttonDataValue = button.getAttribute("data-value");
//       console.log(buttonDataValue);
//     });
//   });
// }
// checksForTheWinner();

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
    })
  );
}
addMarksToSpecificSpot();

// func to add the choosen mark :
const playerOptionSelect = document.getElementById("optionSelect");
function addChoosenMark() {
  const selectedOption = playerOptionSelect.value;
  return selectedOption === "Player One"
    ? playerOne.getMark()
    : selectedOption === "Player Two"
    ? playerTwo.getMark()
    : "";
}
playerOptionSelect.addEventListener("click", addChoosenMark);

// func to get the other player mark :
function getOtherMark() {
  return addChoosenMark() === playerOne.getMark()
    ? playerTwo.getMark()
    : addChoosenMark() === playerTwo.getMark()
    ? playerOne.getMark()
    : "";
}

// function render() {
//   const allbuttons = document.querySelectorAll(".button");
//   let clickCount = 0;

//   allbuttons.forEach((button) =>
//     button.addEventListener("click", function () {
//       // stops players from playing in spots that already taken :
//       if (button.textContent != "") return;
//       // display the mark on the specific spot :
//       if (clickCount === 0) {
//         button.textContent = addChoosenMark();
//         clickCount++;
//       } else if (clickCount === 1) {
//         button.textContent = getOtherMark();
//         clickCount = 0;
//       }
//     })
//   );
// }
// render();
