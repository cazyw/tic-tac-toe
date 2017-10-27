// let players = {
//   player1: 'X',
//   player2: 'O'
// }
// let turnPlayer = 1
// let board = ["", "", "", "", "", "", "", "", ""]
// let winner = ""
// let playable = false
var timer
var tictactoe
// let playerNo = 1;

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
    this.winner = "";
  }
}


const playerTurn = () => {
  clearTimeout(timer)
  document.getElementById(`player${turnPlayer}-text`).style.color = 'red'
  document.getElementById(`player${turnPlayer}-sign`).classList.add('show');
}

const displayScores = () => {
  document.getElementsByClassName('outcome')[0].classList.remove('hide')
  document.getElementsByClassName('turn')[0].classList.remove('hide')
  document.getElementsByClassName('intro')[0].classList.add('hide')

}



const colorWinner = (a, b, c) => {
  document.getElementById(`b${a}`).style.color = 'rgb(63, 191, 127)'
  document.getElementById(`b${b}`).style.color = 'rgb(63, 191, 127)'
  document.getElementById(`b${c}`).style.color = 'rgb(63, 191, 127)'
}

const checkWinner = (board) => {
  if (board[0] === board[1] && board[1] === board[2] && board[1] != ""){
    console.log('row 1');
    // winner = board[0];
    // colorWinner(0, 1, 2);
    return [0, 1, 2];
  }
  if (board[3] === board[4] && board[4] === board[5] && board[4] != ""){
    console.log('row 2')
    // winner = board[3]
    // colorWinner(3, 4, 5)
    return [3, 4, 5];
  }
  if (board[6] === board[7] && board[7] === board[8] && board[7] != ""){
    console.log('row 3')
    // winner = board[6]
    // colorWinner(6, 7, 8)
    return [6, 7, 8];
  }
  if (board[0] === board[3] && board[3] === board[6] && board[3] != ""){
    console.log('col 1')
    // winner = board[0]
    // colorWinner(0, 3, 6)
    return [0, 3, 6];
  }
  if (board[1] === board[4] && board[4] === board[7] && board[4] != ""){
    console.log('col 2')
    // winner = board[1]
    // colorWinner(1, 4, 7)
    return [1, 4, 7];
  }
  if (board[2] === board[5] && board[5] === board[8] && board[5] != ""){
    console.log('col 3')
    // winner = board[2]
    // colorWinner(2, 5, 8)
    return [2, 5, 8];
  }
  if (board[0] === board[4] && board[4] === board[8] && board[4] != ""){
    console.log('diag lr')
    // winner = board[0]
    // colorWinner(0, 4, 8)
    return [0, 4, 8];
  }
  if (board[2] === board[4] && board[4] === board[6] && board[4] != ""){
    console.log('diag rl')
    // winner = board[2]
    // colorWinner(2, 4, 6)
    return [2, 4, 6];
  } 
  return false;
}

const computerPlays = () => {
  clearTimeout(timer);
  let piece = compMove(board);
  document.getElementById(`b${piece}`).innerHTML = players[`player${turnPlayer}`]
  board[piece] = players[`player${turnPlayer}`]
  document.getElementById(`player${turnPlayer}-sign`).classList.remove('show')
  document.getElementById(`player${turnPlayer}-text`).style.color = 'black' 
  playable = false
  console.log(board)
  calculate()

}

const calculate = (piece) => {
  let arr = checkWinner(board);
  if (arr) {
    winner = arr[0];
    colorWinner(arr[0], arr[1], arr[2]);
    document.getElementById(`player${turnPlayer}-text`).style.color = 'black' 
    document.getElementById(`player${turnPlayer}`).innerHTML = Number(document.getElementById(`player${turnPlayer}`).textContent) + 1
    document.getElementsByClassName('displayWinner')[0].innerHTML = `Winner:<br/> Player ${turnPlayer}`
    console.log(`winner: ${turnPlayer}`)
    playable = false
    timer = setTimeout(displayOutcome, 500)
    
  } else if (board.find(val => val === "") === undefined){
    document.getElementById(`player${turnPlayer}-text`).style.color = 'black' 
    document.getElementsByClassName('displayWinner')[0].innerHTML = `Draw`
    turnPlayer === 1 ? turnPlayer = 2 : turnPlayer = 1
    playable = false
    timer = setTimeout(displayOutcome, 500)
  } else {
    turnPlayer === 1 ? turnPlayer = 2 : turnPlayer = 1
    document.getElementById(`player${turnPlayer}-text`).style.color = 'red' 
    document.getElementById(`player${turnPlayer}-sign`).classList.add('show')
    if (playerNo === 2 || turnPlayer === 1){
      playable = true
    } else {
      console.log("playing computer");
      timer = setInterval(computerPlays, 2000);
    }
  }
}

const displayOutcome = () => {
  document.getElementsByClassName('displayWinner')[0].classList.add('show')
  clearTimeout(timer)
  timer = setTimeout(clearBoard, 1500)
}
const clearBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""]
  for (let i = 0 ; i < 9 ; i++) {
    document.getElementById(`b${i}`).innerHTML = ""
    document.getElementById(`b${i}`).style.color = 'rgba(255, 255, 255, 0.5)'
  }
  document.getElementById(`player1-text`).style.color = 'black' 
  document.getElementById(`player2-text`).style.color = 'black' 
  document.getElementById(`player${turnPlayer}-text`).style.color = 'red'
  document.getElementById(`player${turnPlayer}-sign`).classList.add('show')
  winner = ""
  if (turnPlayer === 1 || playerNo === 2) {
    playable = true;
  }
  document.getElementsByClassName('displayWinner')[0].classList.remove('show')
  console.log('board cleared')
  clearTimeout(timer)
  if (playerNo === 1 && turnPlayer === 2){
    timer = setInterval(computerPlays, 2000);
  }
}

const resetGame = () => {
  clearInterval(timer);
  clearTimeout(timer);
  document.getElementById('player1').innerHTML = 0
  document.getElementById('player2').innerHTML = 0
  document.getElementsByClassName('outcome')[0].classList.add('hide')
  document.getElementsByClassName('turn')[0].classList.add('hide')
  document.getElementsByClassName('intro')[0].classList.remove('hide')
  document.getElementsByClassName('playerChoose')[0].classList.remove('game')
  clearBoard()
  document.getElementById(`player${turnPlayer}-sign`).classList.remove('show')
  turnPlayer = 1;
  playable = false
}

const markBoard = (event) => {
  if(tictactoe.playable && document.getElementById(event.id).innerHTML === ""){
    document.getElementById(event.id).innerHTML = players[`player${turnPlayer}`]
    board[Number(event.id[1])] = players[`player${turnPlayer}`]
    document.getElementById(`player${turnPlayer}-sign`).classList.remove('show')
    document.getElementById(`player${turnPlayer}-text`).style.color = 'black' 
    playable = false
    console.log(board)
    calculate(Number(event.id[1]));
  }
}

const game = (event) => {
  console.log(event.id)
  markBoard(event)
}

// const playGame = () => {
//   console.log("clicked")
//   document.getElementsByClassName('test')[0].classList.add('game')
// }


// let board = ["", "", "", "", "", "", "", "", ""]

// boards = [["X", "", "", "", "", "", "", "", ""],
// ["X", "X", "", "", "", "", "", "", ""],
// ["X", "", "X", "", "", "", "", "", ""],
// ["X", "", "", "X", "", "", "", "", ""],
// ["X", "", "", "", "X", "", "", "", ""],
// ["X", "", "", "", "", "X", "", "", ""],
// ["X", "", "", "", "", "", "X", "", ""],
// ["X", "", "", "", "", "", "", "X", "X"],
// ["", "X", "", "", "", "", "", "X", ""],
// ["", "", "X", "", "", "", "X", "", ""],
// ["", "X", "", "", "", "X", "", "", ""],
// ["", "", "X", "", "", "", "", "", "X"],
// ["", "", "", "X", "", "X", "", "", ""],
// ["", "", "", "", "X", "X", "", "", ""],
// ["", "", "", "", "X", "", "", "", ""],
// ["O", "", "O", "", "X", "", "O", "", "O"],
// ["O", "", "", "", "", "", "O", "", "O"],
// ["O", "X", "", "", "O", "", "", "", "X"],
// ["X", "O", "", "", "X", "", "", "", "O"]]

const checkPendingDoom = (testBoard, i, m) => {
  testBoard[i] = m;
  console.log("checking board ", testBoard);
  if (checkWinner(testBoard)) {
    return true;
  } 
}

const checkPendingFork = (forkBoard, m) => {
  console.log("fork board ", forkBoard);
  let countPossWins = 0;
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(forkBoard);
    if (testBoard[i] === '' && checkPendingDoom(testBoard, i, m)){
      countPossWins += 1;
    }
  }
  console.log("poss wins: " + countPossWins);
  return countPossWins > 1;
}

const randomiseArray = (arr) => {
  if (arr.length === 1) return arr;
  let i = Math.floor(Math.random() * (arr.length));
  let res = [];
  res.push(arr.splice(i, 1))
  return res.concat(randomiseArray(arr));
}

const compMove = (board) => {
  var compPiece = players.player2;
  console.log("COMPUTER: ", players.player2);
  var playerPiece = 'X'
  compPiece === 'X' ? playerPiece = 'O' : playerPiece = 'X'; 
  console.log('Board: ', board);

  // test if computer can win 
  console.log('Checking if computer has winning piece');
  
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '') {
      testBoard[i] = compPiece;
      if (checkWinner(testBoard)){
        console.log('COMPUTER WINS ==> ', testBoard);
        return i;
      }
    } 
  }

  // test if other player could win on their next move
  console.log('checking if player has a winning piece')
  
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '' && checkPendingDoom(testBoard, i, playerPiece)){
      console.log('TRUE ==> ', testBoard);
      return i;
    }
  }
  
  console.log('checking if special case')
  // checking for the special case
  v1 = [`${playerPiece}`, "", "", "", `${compPiece}`, "", "", "", `${playerPiece}`];
  v2 = ["", "", `${playerPiece}`, "", `${compPiece}`, "", `${playerPiece}`, "", ""];
  console.log(board, v1, v2);
  let same = true;
  for (let i = 0; i < 9 ; i++) {
    if (board[i] !== v1[i]) {
      same = false;
      break;
    }
  }
  if (same) {
    console.log("SPECIAL")
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
    console.log("SPECIAL")
    return randomiseArray([1, 3, 5, 7]).find(sq => board[sq] === '');
  }
  
  console.log('checking if computer can fork')
  // test if we can win two moves ahead
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '') {
      testBoard[i] = compPiece;
      if (checkPendingFork(testBoard, compPiece)){
        console.log('computer FORK ' + i);
        return i;
      }
    }
  }
  
  console.log('checking if player can fork')
  // test if other player could win two moves ahead
  for (let i = 0; i < 9; i++) {
    let testBoard = [].concat(board)
    if (testBoard[i] === '') {
      testBoard[i] = playerPiece;
      if (checkPendingFork(testBoard, playerPiece)){
        console.log('PENDING FORK ' + i);
        return i;
      }
    }
  }
  
  console.log('checking center')
  // test for centre square
  if (board[4] === '') {
    console.log('CENTER');
    return 4;
  }
  
  console.log('checking corners')
  // test for corners
  let corner = randomiseArray([0, 2, 6, 8]).find(sq => board[sq] === '');
  console.log(corner);
  if (corner !== undefined) {
    console.log('CORNER ' + corner);
    return corner;
  }
  
  console.log('checking sides')
  // test for sides
  // [1, 3, 5, 7].findIndex(sq => sq === '')
  let side = randomiseArray([1, 3, 5, 7]).find(sq => board[sq] === '');
  if (side !== undefined) {
    console.log('SIDE ' + side);
    return side;
  }
}

// boards.forEach((board) => {
//   compMove(board);
// })

const toggleTurns = () => {

}

// the game is now set and playable
const startGame = () => {
  tictactoe.playable = true;
  removedClass('turn', 'hide');
  removedClass('outcome', 'hide');
  addedClass('intro', 'hide');
  timer = setTimeout(addedClass, 500, `player${tictactoe.playerTurn}-sign`, 'show');
  console.log(tictactoe);
}

// these two functions are needed to show/hide screens
const addedClass = (el, cl) => {
  clearTimeout(timer);
  document.getElementById(el).classList.add(cl);
}

const removedClass = (el, cl) => {
  clearTimeout(timer);
  document.getElementById(el).classList.remove(cl);
}

// add the grid outline
const addBoxes = (boxes, cl) => {
  clearTimeout(timer);
  [].forEach.call(document.getElementsByClassName(boxes), box => box.classList.add(cl));
  console.log('set the board');
  startGame();
}

// set the players' pieces (X or O)
const setPlayerPiece = (event) => {
  let piece = event.id.charAt(event.id.length-1);
  tictactoe.players.player1 = piece;
  piece === 'X' ? tictactoe.players.player2 = 'O' : tictactoe.players.player2 = 'X'; 
  console.log(tictactoe.players.player1, tictactoe.players.player2);
  removedClass('playerChoose', 'show');
  timer = setTimeout(addBoxes, 1000, 'box', 'show');
}

// set the number of players (1 or 2)
const setPlayerNumber = (event) => {
  setupGame();
  tictactoe.noPlayers = Number(event.id.charAt(event.id.length-1));
  console.log(tictactoe.noPlayers);
  removedClass('playerNumber', 'show');
  timer = setTimeout(addedClass, 1000, 'playerChoose', 'show');
}

// create the game object
const setupGame = () => {
  tictactoe = new Game;
}