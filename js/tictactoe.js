let players = {
  player1: 'X',
  player2: 'O'
}
let turnPlayer = 1
let board = ["", "", "", "", "", "", "", "", ""]
let winner = ""
let playable = false
let timer

const playerTurn = () => {
  document.getElementById(`player${turnPlayer}-text`).style.color = 'red'
}

const displayScores = () => {
  document.getElementsByClassName('outcome')[0].classList.remove('hide')
  document.getElementsByClassName('intro')[0].classList.add('hide')

}

const choosePiece = (event) => {
  document.getElementsByClassName('playerChoose')[0].classList.add('game')
  if (event.id === 'chooseX') {
    players.player1 = 'X'
    players.player2 = 'O'
  } else {
    players.player1 = 'O'
    players.player2 = 'X'
  }
  document.getElementById(`player1-text`).innerHTML = `Player 1 (${players.player1}): `
  document.getElementById(`player2-text`).innerHTML = `Player 2 (${players.player2}): `
  console.log(`chose ${players.player1}`)
  playerTurn()
  displayScores()
  playable = true
}

const colorWinner = (a, b, c) => {
  document.getElementById(`b${a}`).style.color = 'rgb(63, 191, 127)'
  document.getElementById(`b${b}`).style.color = 'rgb(63, 191, 127)'
  document.getElementById(`b${c}`).style.color = 'rgb(63, 191, 127)'
}

const calculate = () => {
  if (board[0] === board[1] && board[1] === board[2] && board[1] != ""){
    console.log('row 1')
    winner = board[0]
    colorWinner(0, 1, 2)
  }
  if (board[3] === board[4] && board[4] === board[5] && board[4] != ""){
    console.log('row 2')
    winner = board[3]
    colorWinner(3, 4, 5)
  }
  if (board[6] === board[7] && board[7] === board[8] && board[7] != ""){
    console.log('row 3')
    winner = board[6]
    colorWinner(6, 7, 8)
  }
  if (board[0] === board[3] && board[3] === board[6] && board[3] != ""){
    console.log('col 1')
    winner = board[0]
    colorWinner(0, 3, 6)
  }
  if (board[1] === board[4] && board[4] === board[7] && board[4] != ""){
    console.log('col 2')
    winner = board[1]
    colorWinner(1, 4, 7)
  }
  if (board[2] === board[5] && board[5] === board[8] && board[5] != ""){
    console.log('col 3')
    winner = board[2]
    colorWinner(2, 5, 8)
  }
  if (board[0] === board[4] && board[4] === board[8] && board[4] != ""){
    console.log('diag lr')
    winner = board[0]
    colorWinner(0, 4, 8)
  }
  if (board[2] === board[4] && board[4] === board[6] && board[4] != ""){
    console.log('diag rl')
    winner = board[2]
    colorWinner(2, 4, 6)
  } 
  if (winner !== "") {
    document.getElementById(`player${turnPlayer}-text`).style.color = 'black' 
    document.getElementById(`player${turnPlayer}`).innerHTML = Number(document.getElementById(`player${turnPlayer}`).textContent) + 1
    document.getElementsByClassName('displayWinner')[0].innerHTML = `Winner: Player ${turnPlayer}`
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
    playable = true
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
  winner = ""
  playable = true
  document.getElementsByClassName('displayWinner')[0].classList.remove('show')
  console.log('board cleared')
  clearTimeout(timer)
}

const resetGame = () => {
  document.getElementById('player1').innerHTML = 0
  document.getElementById('player2').innerHTML = 0
  document.getElementsByClassName('outcome')[0].classList.add('hide')
  document.getElementsByClassName('intro')[0].classList.remove('hide')
  clearBoard()
  document.getElementsByClassName('playerChoose')[0].classList.remove('game')
  playable = false
}

const markBoard = (event) => {
  if(playable && document.getElementById(event.id).innerHTML === ""){
    document.getElementById(event.id).innerHTML = players[`player${turnPlayer}`]
    board[Number(event.id[1])] = players[`player${turnPlayer}`]
    document.getElementById(`player${turnPlayer}-text`).style.color = 'black' 
    playable = false
    console.log(board)
    calculate()
  }
}

const game = (event) => {
  console.log(event.id)
  markBoard(event)
}

const playGame = () => {
  console.log("clicked")
  document.getElementsByClassName('test')[0].classList.add('game')
}