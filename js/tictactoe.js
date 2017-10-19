let turn = "X"
let board = ["", "", "", "", "", "", "", "", ""]

const clearBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""]
  for (let i = 0 ; i < 9 ; i++) {
    document.getElementById(`b${i}`).innerHTML = ""
  }
  console.log('board cleared')
  
}

const markBoard = (event) => {
  if(document.getElementById(event.id).innerHTML === ""){
    document.getElementById(event.id).innerHTML = turn
    board[Number(event.id[1])] = turn
  }
  turn === "X" ? turn = "O" : turn = "X"
  console.log(board)
}

const game = (event) => {
  console.log(event.id)
  markBoard(event)
}