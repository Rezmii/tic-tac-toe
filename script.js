const gameBoardDiv = document.querySelector(".gameboard-div");

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
clickOnPositions();

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

function clickOnPositions() {
  let positions = document.querySelectorAll(".position-div");
  positions.forEach((position, i) => {
    position.addEventListener("click", () => {
      gameBoard.gameBoardArr[i] = "X";
      console.log(gameBoard.gameBoardArr[i]);
      displayGameBoard(gameBoard);
    });
  });
}
