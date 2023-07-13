let GameboardModule = (function () {
  // let playersObj = {
  //   playerOne: {
  //     name: "player one",
  //     mark: "X",
  //   },
  //   playerTwo: {
  //     name: "player two",
  //     mark: "O",
  //   },
  // };

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
    return playerOne.mark;
  }
  function playerTwoRound() {
    return playerTwo.mark;
  }
  let clickCount = 0;
  function render() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) =>
      square.addEventListener("click", function () {
        if (clickCount === 0) {
          square.textContent = playerOneRound();
          clickCount++;
        } else if (clickCount === 1) {
          square.textContent = playerTwoRound();
          clickCount = 0;
        }
      })
    );
  }

  function displayController() {
    render();
  }

  return {
    displayController,
  };
})();
GameboardModule.displayController();
