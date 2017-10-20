# Tic Tac Toe Game
Free Code Camp Advanced Project - Tic Tac Toe Game

## Objective
Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/KzXQgy/.
* I can play a game of Tic Tac Toe with the computer.
* My game will reset as soon as it's over so I can play again.
* I can choose whether I want to play as X or O.

## Operating Instructions

<img src="" width="450" alt="">


## Discussion

I started with designing the basic look of the board for desktops, adding a chalkboard background (using radial gradients) and then implementing the javascript to mark an "X" or "O" the board and store the value in an array. The board can also be cleared and game reset. Next I implemented the logic behind calculating if there is a winner or a draw and highlighting the winning row/column/diagonal and adding scoring.

Completed:
* Can mark 'X' and 'O' on the board (will alternate turns, will not allow a mark to be made on an already marked square, will not allow a mark to be added once a game is finished)
* Can reset the game
* Calculates if a player has won or if there is a draw
* If a game has ended (winner or draw), the game board will clear after 2 seconds
* Keeps score of the winner

To do:
* Add design feature to show turns
* Make the game media responsive (currently fixed width and height)
* Implement computer player logic
* Allow player to choose to play as 'X' and 'O'