const gameBoardDiv = document.querySelector(".gameboard-div");
const divElement = document.querySelector(".divElement");
let currentStatus = "";

function createGameBoard(game) {
  const gameName = game;
  const gameBoardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return { gameName, gameBoardArr };
}

function createPlayer(name) {
  const playerName = name;
  const results = [0, 0, 0];
  return { playerName, results };
}

function gameFlow(X, Y) {
  currentPositionX = X;
  currentPositionY = Y;
  return { currentPositionX, currentPositionY };
}

const gameBoard = createGameBoard("siema");
const Player1 = createPlayer("Player1");
const Player2 = createPlayer("Player2");

displayGameBoard(gameBoard);
setupClickHandler();

function displayGameBoard(gameBoard) {
  gameBoardDiv.innerHTML = "";
  let temp = gameBoard.gameBoardArr;
  temp.forEach((position, i) => {
    const positionDiv = document.createElement("div");
    const positionPlace = document.createTextNode(position);
    positionDiv.appendChild(positionPlace);
    positionDiv.classList.add(`position-div`);
    positionDiv.classList.add(`position-div-${i}`);
    gameBoardDiv.appendChild(positionDiv);
  });
}

function setupClickHandler() {
  gameBoardDiv.addEventListener("click", function (event) {
    if (event.target.classList.contains("position-div")) {
      const positionIndex = Array.from(gameBoardDiv.children).indexOf(
        event.target
      );

      if (
        gameBoard.gameBoardArr[positionIndex] !== "X" &&
        gameBoard.gameBoardArr[positionIndex] !== "O"
      ) {
        if (currentStatus === "" || currentStatus === "O") {
          gameBoard.gameBoardArr[positionIndex] = "X";
          currentStatus = "X";
        } else if (currentStatus === "X") {
          gameBoard.gameBoardArr[positionIndex] = "O";
          currentStatus = "O";
        }
      }
      displayGameBoard(gameBoard);
      gameRules(gameBoard, currentStatus);
    }
  });
}

function gameRules(gameBoard, val) {
  // Warunek dla pierwszego wiersza
  if (
    val === gameBoard.gameBoardArr[0] &&
    val === gameBoard.gameBoardArr[1] &&
    val === gameBoard.gameBoardArr[2]
  ) {
    getWinningPositions(0, 1, 2);
    displayButton();
  }
  // Warunek dla drugiego wiersza
  else if (
    val === gameBoard.gameBoardArr[3] &&
    val === gameBoard.gameBoardArr[4] &&
    val === gameBoard.gameBoardArr[5]
  ) {
    getWinningPositions(3, 4, 5);
    displayButton();
  }
  // Warunek dla trzeciego wiersza
  else if (
    val === gameBoard.gameBoardArr[6] &&
    val === gameBoard.gameBoardArr[7] &&
    val === gameBoard.gameBoardArr[8]
  ) {
    getWinningPositions(6, 7, 8);
    displayButton();
  }
  // Warunek dla pierwszej kolumny
  else if (
    val === gameBoard.gameBoardArr[0] &&
    val === gameBoard.gameBoardArr[3] &&
    val === gameBoard.gameBoardArr[6]
  ) {
    getWinningPositions(0, 3, 6);
    displayButton();
  }
  // Warunek dla drugiej kolumny
  else if (
    val === gameBoard.gameBoardArr[1] &&
    val === gameBoard.gameBoardArr[4] &&
    val === gameBoard.gameBoardArr[7]
  ) {
    getWinningPositions(1, 4, 7);
    displayButton();
  }
  // Warunek dla trzeciej kolumny
  else if (
    val === gameBoard.gameBoardArr[2] &&
    val === gameBoard.gameBoardArr[5] &&
    val === gameBoard.gameBoardArr[8]
  ) {
    getWinningPositions(2, 5, 8);
    displayButton();
  }
  // Warunek dla przekątnej z lewej góry do prawego dołu
  else if (
    val === gameBoard.gameBoardArr[0] &&
    val === gameBoard.gameBoardArr[4] &&
    val === gameBoard.gameBoardArr[8]
  ) {
    getWinningPositions(0, 4, 8);
    displayButton();
  }
  // Warunek dla przekątnej z prawej góry do lewego dołu
  else if (
    val === gameBoard.gameBoardArr[2] &&
    val === gameBoard.gameBoardArr[4] &&
    val === gameBoard.gameBoardArr[6]
  ) {
    getWinningPositions(2, 4, 6);
    displayButton();
  } else {
    let positionsCount = checkIfAllPositionsFilled(gameBoard);
    if (positionsCount === 9) {
      restartGameBoard(gameBoard);
      displayGameBoard(gameBoard);
    }
  }
}

function restartGameBoard(gameBoard) {
  gameBoard.gameBoardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function checkIfAllPositionsFilled(gameBoard) {
  let positionsFilledCount = 0;
  gameBoard.gameBoardArr.forEach((position) => {
    if (position === "X" || position === "O") positionsFilledCount++;
  });
  return positionsFilledCount;
}

function getWinningPositions(a, b, c) {
  [a, b, c].forEach((winningPosition) => {
    let positionDiv = document.querySelector(
      `.position-div-${winningPosition}`
    );

    positionDiv.classList.add("won");
  });
}

function displayButton() {
  buttonElement = document.createElement("button");
  buttonText = document.createTextNode("Repeat");
  buttonElement.appendChild(buttonText);
  divElement.appendChild(buttonElement);
  buttonElement.addEventListener("click", () => {
    restartGameBoard(gameBoard);
    displayGameBoard(gameBoard);
    buttonElement.remove();
  });
}
