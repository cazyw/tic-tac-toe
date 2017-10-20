let turn = "X"
let board = ["", "", "", "", "", "", "", "", ""]
let winner = ""
let playable = true
let timer

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
    document.getElementById('outcome').innerHTML = `Winner: ${winner}`
    document.getElementById(`player${winner}`).innerHTML = Number(document.getElementById(`player${winner}`).textContent) + 1
    playable = false
    timer = setTimeout(clearBoard, 2000)
  } else if (board.find(val => val === "") === undefined){
    document.getElementById('outcome').innerHTML = `Draw`
    playable = false
    timer = setTimeout(clearBoard, 2000)
  }
}
const clearBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""]
  for (let i = 0 ; i < 9 ; i++) {
    document.getElementById(`b${i}`).innerHTML = ""
    document.getElementById(`b${i}`).style.color = 'rgba(255, 255, 255, 0.5)'
  }
  winner = ""
  playable = true
  document.getElementById('outcome').innerHTML = ""
  console.log('board cleared')
  clearTimeout(timer)
}

const resetGame = () => {
  document.getElementById('playerX').innerHTML = 0
  document.getElementById('playerO').innerHTML = 0
  clearBoard()
}

const markBoard = (event) => {
  if(playable && document.getElementById(event.id).innerHTML === ""){
    document.getElementById(event.id).innerHTML = turn
    board[Number(event.id[1])] = turn
    turn === "X" ? turn = "O" : turn = "X"
    console.log(board)
    calculate()
  }
}

const game = (event) => {
  console.log(event.id)
  markBoard(event)
}