/*
Left to do:
1) make the update function reject everything other than an alpha character
2) make the update function allow the user to enter X's and O's
3) implement the game over funtion
*/

/*
  ********************
  * -----  |  *****  *
  *   |    |  *      *
  *   |    |  *****  *
  ********************
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

char** initBoard();
void updateBoard(char**, int*, int*);
void printBoard(char**);
int gameOver(int*);

int main(void) {
  //print the welcome message
  printf("")
  //users turn/winner 0 = p1 turn/win, 1 = p2 turn/win
  int turn = 0;
  int winner = 0;

  //store the cursor's current and previous location
  int currRow = 0;
  int currCol = 0;

  //initialize and print the game board
  char** gameBoard;
  gameBoard = initBoard();

  //while not game over, update and print the board
  while (1) {
    printBoard(gameBoard);
    if (gameOver(&winner)) {
      break;
    }
    updateBoard(gameBoard, &currRow, &currCol);
  }

  //after game, print the winner
  if (winner == 0) {
    printf("PLAYER ONE WINS!\n");
  }
  else {
    printf("PLAYER TWO WINS!\n");
  }
  return 0;
}

char** initBoard() {
  //temporary variable to hold the 2d array
  char** gameBoard;

  //allocate enough memory for a 3x3 game board
  gameBoard = malloc(sizeof(char*) * 3);
  for (int i = 0; i < 3; i++) {
    gameBoard[i] = malloc(sizeof(char) * 3);
  }

  //iterate over each element in the 2d array. assign each char with ' ' and
  //char at location [0][0] with a '*' to indicate curser location
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (i == 0 && j == 0) {
        gameBoard[i][j] = '*';
      }
      else if (i == 0 || i == 1) {
        gameBoard[i][j] = '_';
      }
      else {
        gameBoard[i][j] = ' ';
      }
    }
  }

  return gameBoard;
}

void printBoard(char** gameBoard) {
  //clear space with a new line
  printf("\n");

  //iterate over all of the elements in the 2d array, printing appropriately
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (i == 0 || i == 1) {
        if (j == 0 || j == 2) {
          printf("_%c_", gameBoard[i][j]);
        }
        else {
          printf("|_%c_|", gameBoard[i][j]);
        }
      }
      else {
        if (j == 0 || j == 2) {
          printf(" %c ", gameBoard[i][j]);
        }
        else {
          printf("| %c |", gameBoard[i][j]);
        }
      }
    }
    //print new line after each row
    printf("\n");
  }
  //clear space with a new line
  printf("\n");
}

void updateBoard(char** gameBoard, int* currRow, int* currCol) {
  int cr = *currRow;
  int cc = *currCol;

  //change the previous cursor location to appropriate character
  if (cr == 2) {
    gameBoard[cr][cc] = ' ';
  }
  else {
    gameBoard[cr][cc] = '_';
  }

  //determine the key pressed
  char keyPressed;
  scanf(" %c", &keyPressed);

  //update cr or cc accordingly
  keyPressed = tolower(keyPressed);
  if (keyPressed == 'w') {
    cr--;
  }
  else if (keyPressed == 's') {
    cr++;
  }
  else if (keyPressed == 'd') {
    cc++;
  }
  else if (keyPressed == 'a') {
    cc--;
  }
  else {
    printf("%c is not a command!\n", keyPressed);
  }

  //set the current cursor to a new location
  gameBoard[cr][cc] = '*';

  //update current row/col variables
  *currRow = cr;
  *currCol = cc;
}

int gameOver(int* winner){
  return *winner;
}
