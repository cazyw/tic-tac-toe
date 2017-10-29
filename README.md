# Tic Tac Toe Game
Free Code Camp Advanced Project - Tic Tac Toe Game

## Objective
Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/KzXQgy/.
* I can play a game of Tic Tac Toe with the computer.
* My game will reset as soon as it's over so I can play again.
* I can choose whether I want to play as X or O.

## Operating Instructions

<img src="https://cazyw.github.io/img/js-tictactoe.jpg" width="450" alt="Tic Tac Toe">

The gameplay:
1. Choose to play against the computer or against another person
2. Choose player 1's piece (X or O)

The game then starts with each player placing their pieces in turn and ends when there's a winner or all the spots are filled. A player wins when they have 3 of their pieces in a row/column/diagonal.

The board automatically clears and begins a new game. The winner starts. If it's a draw, the next player starts.

The entire game can be reset.

In one player mode, players play against a computer who places down their piece after a 1-2 second pause.


## Discussion

### Design

I started with designing the basic look of the board for desktops, adding a chalkboard background (using radial gradients) and then implementing the javascript to mark an "X" or "O" the board and store the value in an array. The board can also be cleared and game reset. Next I implemented the logic behind calculating if there is a winner or a draw and highlighting the winning row/column/diagonal and adding scoring.

CSS transitions were used to fade in and out between the different screens (choose number of players, choose piece, display the game board, display the outcome) and Javscript timers were used to move between the different screens. This was also used to raise and lower the flags showing whose turn it was.

### Computer AI Logic

The part that required a bit of research was implementing the computer logic if the player plays against the computer (one player mode). I didn't want the computer to simply randomly select an empty spot but instead, would try to program the logic so the computer would win (or at the very least draw). This website [Python: Coding unbeatable Tic Tac Toe AI](https://mblogscode.wordpress.com/2016/06/03/python-naughts-crossestic-tac-toe-coding-unbeatable-ai/) was my inspiration.

The computer logic is as follows. The computer will select the spot (being empty) that:
1. will win the game
2. will stop the opponent winning on the next move
3. will 'fork' the board, ie create a situation where the computer will essentially check-mate the player by creating two 'winning' scenarios, of which the opponent can only block one (the opponent can block one row but then the computer will win on the other row)
4. will stop the opponent from creating a 'fork' situation
5. is in the centre of the board
6. is in a corner
7. is in a side

This shows a fork. The computer ('O') has placed a piece that creates two winning scenarios. Player 1 ('X') can block one, but ultimately the computer will win on their next move.

<img src="https://cazyw.github.io/ticTacToe/img/js-tictactoe-fork.jpg" width="450" alt="Tic Tac Toe Fork">


There are also a special case also accounted for:
1. there's a special 'fork' situation involving diagonals. The computer will choose a side slot rather than the usual corner.

Where a corner or side is chosen, a randomise function will pick a random spot (so empty spots are not selected in the same order). It was fun using recursion to write this program.
