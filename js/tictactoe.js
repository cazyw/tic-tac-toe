
var timer
var tictactoe

class Game {
  constructor() {
    this.players = {
      player1: 'X',
      player2: 'O'
    };
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.noPlayers = 1;
    this.playerTurn = 1;
    this.playable = false;
  }
}

// highlight the winning row/column/diagonal
const colorWinner = (a, b, c) => {
  document.getElementById(`b${a}`).style.color = 'rgb(63, 191, 127)'
  document.getElementById(`b${b}`).style.color = 'rgb(63, 191, 127)'
  document.getElementById(`b${c}`).style.color = 'rgb(63, 191, 127)'
}

// check if there's a winning row/column/diagonal
const checkWinner = (board) => {
  if (board[0] === board[1] && board[1] === board[2] && board[1] != ""){
    return [0, 1, 2];
  }
  if (board[3] === board[4] && board[4] === board[5] && board[4] != ""){
    return [3, 4, 5];
  }
  if (board[6] === board[7] && board[7] === board[8] && board[7] != ""){
    return [6, 7, 8];
  }
  if (board[0] === board[3] && board[3] === board[6] && board[3] != ""){
    return [0, 3, 6];
  }
  if (board[1] === board[4] && board[4] === board[7] && board[4] != ""){
    return [1, 4, 7];
  }
  if (board[2] === board[5] && board[5] === board[8] && board[5] != ""){
    return [2, 5, 8];
  }
  if (board[0] === board[4] && board[4] === board[8] && board[4] != ""){
    return [0, 4, 8];
  }
  if (board[2] === board[4] && board[4] === board[6] && board[4] != ""){
    return [2, 4, 6];
  } 
  return false;
}

// check if the opponent will win on the next move
const checkPendingDoom = (testBoard, i, m) => {
  testBoard[i] = m;
  if (checkWinner(testBoard)) {
    return true;
  } 
}

// check if the opponent could place a piece that 
// produces two possible win scenarios
const checkPendingFork = (forkBoard, m) => {
  let countPossWins = 0;
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(forkBoard);
    if (testBoard[i] === '' && checkPendingDoom(testBoard, i, m)){
      countPossWins += 1;
    }
  }
  return countPossWins > 1;
}

const randomiseArray = (arr) => {
  if (arr.length === 1) return arr;
  let i = Math.floor(Math.random() * (arr.length));
  let res = [];
  res.push(arr.splice(i, 1))
  return res.concat(randomiseArray(arr));
}

// computer decides which is the optimal move
const compMove = (board) => {
  var compPiece = tictactoe.players.player2;
  var playerPiece = 'X'
  compPiece === 'X' ? playerPiece = 'O' : playerPiece = 'X'; 
  // test if computer can win 
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '') {
      testBoard[i] = compPiece;
      if (checkWinner(testBoard)){
        return i;
      }
    } 
  }

  // test if other player could win on their next move
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '' && checkPendingDoom(testBoard, i, playerPiece)){
      return i;
    }
  }
  
  // checking for the special case of a diagonal fork
  v1 = [`${playerPiece}`, "", "", "", `${compPiece}`, "", "", "", `${playerPiece}`];
  v2 = ["", "", `${playerPiece}`, "", `${compPiece}`, "", `${playerPiece}`, "", ""];
  let same = true;
  for (let i = 0; i < 9 ; i++) {
    if (board[i] !== v1[i]) {
      same = false;
      break;
    }
  }
  if (same) {
    return randomiseArray([1, 3, 5, 7]).find(sq => board[sq] === '');
  }
  same = true;
  for (let i = 0; i < 9 ; i++) {
    if (board[i] !== v2[i]) {
      same = false;
      break;
    }
  }
  if (same) {
    return randomiseArray([1, 3, 5, 7]).find(sq => board[sq] === '');
  }
  
  // test if we can win two moves ahead
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '') {
      testBoard[i] = compPiece;
      if (checkPendingFork(testBoard, compPiece)){
        return i;
      }
    }
  }
  
  // test if other player could win two moves ahead
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '') {
      testBoard[i] = playerPiece;
      if (checkPendingFork(testBoard, playerPiece)){
        return i;
      }
    }
  }
  
  // test for centre square
  if (board[4] === '') {
    return 4;
  }
    
  // test for corners
  let corner = randomiseArray([0, 2, 6, 8]).find(sq => board[sq] === '');
  if (corner !== undefined) {
    return corner;
  }
  
  // test for sides
  let side = randomiseArray([1, 3, 5, 7]).find(sq => board[sq] === '');
  if (side !== undefined) {
  return side;
  }
}

// computer plays the game;
const computerPlays = () => {
  tictactoe.playable = false;
  clearTimeout(timer);
  let piece = compMove(tictactoe.board);
  var temp = document.createElement('div');
  temp.id = `b${piece}`;
  markBoard(temp.id);
}

// resets the game, doesn't reset the game object values
// as that is reset on the first menu screen
const resetGame = () => {
  updateScore('player1', 'reset'); // scores reset to zero
  updateScore('player2', 'reset'); // scores reset to zero

  addedClass('outcome', 'hide'); // hide the scores box
  addedClass('turn', 'hide'); // hide the player turn box
  removedClass('intro', 'hide'); // show the intro box

  removedClass('playerPiece', 'show'); 
  addedClass('playerNumber', 'show'); // show screen to pick no. players
  clearBoard();
  removedClass('box', 'show');
  tictactoe.playable = false;
}

// clear the board for the next round
const clearBoard = () => {
  tictactoe.board = ["", "", "", "", "", "", "", "", ""]
  
  // clear the visual board
  for (let i = 0 ; i < 9 ; i++) {
    document.getElementById(`b${i}`).innerHTML = ""
    document.getElementById(`b${i}`).style.color = 'rgba(255, 255, 255, 0.5)'
  }
  
  removedClass('displayWinner', 'show');
  clearTimeout(timer);
  timer = setTimeout(() => {
    addedClass('box', 'show');
    if (tictactoe.noPlayers === 1 && tictactoe.playerTurn === 2){
      setTimeout(computerPlays, 1500);
    } else {
      tictactoe.playable = true;
    }
  }, 1500);
  
}

// toggle the turns
const toggleTurns = () => {
  let currentP = tictactoe.playerTurn;
  let nextP;
  currentP === 1 ? nextP = 2 : nextP = 1;
  removedClass(`player${currentP}-sign`, 'show');
  addedClass(`player${nextP}-sign`, 'show');
  tictactoe.playerTurn = nextP;
  return nextP;
}


// display the outcome screen
const displayOutcome = (outcome) => {

  // set the display text
  switch(outcome) {
    case 'win':
      if (tictactoe.noPlayers === 1 && tictactoe.playerTurn === 2) {
        document.getElementsByClassName('displayWinner')[0].innerHTML = `Winner:<br/> Computer`
      } else {
        document.getElementsByClassName('displayWinner')[0].innerHTML = `Winner:<br/> Player ${tictactoe.playerTurn}`
      }
      break;
    case 'draw':
      document.getElementsByClassName('displayWinner')[0].innerHTML = `Well played - Draw`;
      break;
    default:
      console.log('error in display outcome switch');
      break;
  }

  addedClass('displayWinner','show')
}

// update the score
const updateScore = (player, reason) => {
  switch(reason) {
    case 'win':
      document.getElementById(player).innerHTML = Number(document.getElementById(player).textContent) + 1;
      break;
    case 'reset':
      document.getElementById(player).innerHTML = "";
      break;
    default:
      console.log("error in updating the score");
      break;
  }
}

const playOn = () => {
  if (toggleTurns() === 2 && tictactoe.noPlayers === 1){
    timer = setInterval(computerPlays, 1500);
  } else {
    tictactoe.playable = true;
  }
}

// calculate if win, draw, continue
const calculateStatus = () => {
  let winningArr = checkWinner(tictactoe.board);
  if (winningArr) {
    // winner found
    colorWinner(winningArr[0], winningArr[1], winningArr[2]);
    timer = setTimeout(() => {
      removedClass('box', 'show');
      updateScore(`player${tictactoe.playerTurn}`, 'win');
      displayOutcome('win');
      setTimeout(clearBoard, 1500);
    }, 1000);

  } else if (tictactoe.board.find(val => val === "") === undefined) {
    // it's a draw
    timer = setTimeout(() => {
      removedClass('box', 'show');
      displayOutcome('draw');
      toggleTurns();
      setTimeout(() => {
        clearBoard();
      }, 1500);
    }, 1000);

  } else {
    // continue playing
    console.log("Play on");
    playOn();
  }
}

// check if the box selected is empty
const boxEmpty = (box) => {
  if (tictactoe.noPlayers === 1 && tictactoe.playerTurn === 2) {
    return document.getElementById(box).innerHTML === "";
  } else {
    return tictactoe.playable && document.getElementById(box).innerHTML === "";
  }
}


// mark the board
const markBoard = (box) => {
  document.getElementById(box).innerHTML = tictactoe.players[`player${tictactoe.playerTurn}`]
  tictactoe.board[Number(box[1])] = tictactoe.players[`player${tictactoe.playerTurn}`]
  calculateStatus();
}

// player has selected a box
const markBox = (event) => {
  console.log(tictactoe.playable, tictactoe.noPlayers, tictactoe.playerTurn);
  
  if (boxEmpty(event.id) && tictactoe.playable === true) {
    tictactoe.playable = false;
    markBoard(event.id);
  }
}

// add the grid outline
const addedClass = (boxes, cl) => {
  clearTimeout(timer);
  [].forEach.call(document.getElementsByClassName(boxes), box => box.classList.add(cl));
}

// add the grid outline
const removedClass = (boxes, cl) => {
  clearTimeout(timer);
  [].forEach.call(document.getElementsByClassName(boxes), box => box.classList.remove(cl));
}

// the game is now set and playable
const startGame = () => {
  tictactoe.playable = true;
  removedClass('turn', 'hide');
  removedClass('outcome', 'hide');
  addedClass('intro', 'hide');
  timer = setTimeout(addedClass, 500, `player${tictactoe.playerTurn}-sign`, 'show');
}

// set the players' pieces (X or O)
const setPlayerPiece = (event) => {
  let piece = event.id.charAt(event.id.length-1);
  tictactoe.players.player1 = piece;
  piece === 'X' ? tictactoe.players.player2 = 'O' : tictactoe.players.player2 = 'X'; 
  removedClass('playerPiece', 'show');
  timer = setTimeout(() => {
    addedClass('box', 'show');
    startGame();
  }, 1000);
}

const updateForComputer = () => {
  document.getElementById('player2-sign').innerHTML = "Computer's Turn";
  document.getElementById('player2-text').innerHTML = "Computer: ";

}

// set the number of players (1 or 2)
const setPlayerNumber = (event) => {
  setupGame();
  tictactoe.noPlayers = Number(event.id.charAt(event.id.length-1));
  if (event.id.charAt(event.id.length-1) === '1') {
    updateForComputer();
  }
  removedClass('playerNumber', 'show');
  timer = setTimeout(addedClass, 1000, 'playerPiece', 'show');
}

// create the game object
const setupGame = () => {
  tictactoe = new Game;
}

const back = () => {
  removedClass('playerPiece', 'show');
  addedClass('playerNumber', 'show');
}