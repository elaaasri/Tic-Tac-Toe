let gameBoardModule = (function () {
  const allSquares = document.querySelectorAll(".square");

  function playerFactory(name, mark) {
    return {
      name,
      mark,
    };
  }
  const playerOne = playerFactory("player one", "X");
  const playerTwo = playerFactory("player two", "O");

  const board = [playerOne.mark, playerTwo.mark];

  function playerOneRound() {
    return board[0];
  }
  function playerTwoRound() {
    return board[1];
  }

  let clickCount = 0;
  function addMarksToSpecificSpots() {
    allSquares.forEach((square) =>
      square.addEventListener("click", function () {
        // stops players from playing in spots that already taken :
        if (square.textContent != "") return;
        // display the mark on the specific spot :
        if (clickCount === 0) {
          square.textContent = playerOneRound();
          clickCount++;
        } else if (clickCount === 1) {
          square.textContent = playerTwoRound();
          clickCount = 0;
        }
        console.log(board);
      })
    );
  }

  return {
    addMarksToSpecificSpots,
  };
})();
gameBoardModule.addMarksToSpecificSpots();
