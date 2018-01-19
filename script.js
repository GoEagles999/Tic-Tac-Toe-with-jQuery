/********************************************/
/* @author : Pauline Ghiazza                */
/* @author site : www.paulineghiazza.fr     */
/********************************************/

// todo:
// fix alignment of vertical and diagonal cross lines: due to previous design choice (:before css selector) this takes time
// championships data is not functioning correctly: only stores up to 2 rounds
// update game moves real time (hence the sleep function)

$(function() {

  // for creating delay between steps
  function sleep (ms) {
    var currentTime = new Date().getTime();
    while (currentTime + ms >= new Date().getTime()) {
      //
    }
  }
  
  /* args:
   @pattern: string 'circle' or 'cross'
  */
  var Machine = function(pattern) {
    this.pattern = pattern
  }
  
  // constructor class for the tic-tac-toe board 
  var Table = function() {
    this.state = {
      // value can be free, cross or circle
      field0: 'free', 
      field1: 'free', 
      field2: 'free', 
      field3: 'free', 
      field4: 'free', 
      field5: 'free', 
      field6: 'free', 
      field7: 'free', 
      field8: 'free'
    },

    // the machine that starts out first
    this.turn = 'Machine1',

    // could have put all into one function; this breakdown is so that optimizing for performance will be easier later down the road
    this.checkFirstRow = (pattern) => {
      if (this.state['field0']== pattern && this.state['field1'] == pattern && this.state['field2'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkSecondRow = (pattern) => {
      if (this.state['field3'] == pattern && this.state['field4'] == pattern && this.state['field5'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkLastRow = (pattern) => {
      if (this.state['field6'] == pattern && this.state['field7'] == pattern && this.state['field8'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkFirstColumn = (pattern) => {
      if (this.state['field0'] == pattern && this.state['field3'] == pattern && this.state['field6'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkSecondColumn = (pattern) => {
      if (this.state['field1'] == pattern && this.state['field4'] == pattern && this.state['field7'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkLastColumn = (pattern) => {
      if (this.state['field2'] == pattern && this.state['field5'] == pattern && this.state['field8'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkDiagonalFromTopLeft = (pattern) => {
      if (this.state['field0'] == pattern && this.state['field4'] == pattern && this.state['field8'] == pattern) {
        return true
      } else {
        return false
      }
    },
    this.checkDiagonalFromTopRight = (pattern) => {
      if (this.state['field2'] == pattern && this.state['field4'] == pattern && this.state['field6'] == pattern) {
        return true
      } else {
        return false
      }
    },


    // check all conditions above in a single function
    this.hasWon = (machine) => {
      if (this.checkFirstRow(machine.pattern) == true) {
        $('.field0').html('<div class="horizontalCross"></div>')
        $('.field1').html('<div class="horizontalCross"></div>')
        $('.field2').html('<div class="horizontalCross"></div>')
        return true
      }
      if (this.checkSecondRow(machine.pattern) == true) {
        $('.field3').html('<div class="horizontalCross"></div>')
        $('.field4').html('<div class="horizontalCross"></div>')
        $('.field5').html('<div class="horizontalCross"></div>')
        return true
      }
      if (this.checkLastRow(machine.pattern) == true) {
        $('.field6').html('<div class="horizontalCross"></div>')
        $('.field7').html('<div class="horizontalCross"></div>')
        $('.field8').html('<div class="horizontalCross"></div>')
        return true
      }
      if (this.checkFirstColumn(machine.pattern) == true) {
        $('.field0').html('<div class="verticalCross"></div>')
        $('.field3').html('<div class="verticalCross"></div>')
        $('.field6').html('<div class="verticalCross"></div>')
        return true
      }
      if (this.checkSecondColumn(machine.pattern) == true) {
        $('.field1').html('<div class="verticalCross"></div>')
        $('.field4').html('<div class="verticalCross"></div>')
        $('.field7').html('<div class="verticalCross"></div>')
        return true
      }
      if (this.checkLastColumn(machine.pattern) == true) {
        $('.field2').html('<div class="verticalCross"></div>')
        $('.field5').html('<div class="verticalCross"></div>')
        $('.field8').html('<div class="verticalCross"></div>')
        return true
      }
      if (this.checkDiagonalFromTopLeft(machine.pattern) == true) {
        $('.field0').html('<div class="topLeftDiagonalCross"></div>')
        $('.field4').html('<div class="topLeftDiagonalCross"></div>')
        $('.field8').html('<div class="topLeftDiagonalCross"></div>')
        return true
      }
      if (this.checkDiagonalFromTopRight(machine.pattern) == true) {
        $('.field2').html('<div class="topRightDiagonalCross"></div>')
        $('.field4').html('<div class="topRightDiagonalCross"></div>')
        $('.field6').html('<div class="topRightDiagonalCross"></div>')
        return true
      }
      // no check was successful. there is no winner:
      console.log(`No winner yet.`)
      return false
    },
   

    /* args:
     @index: integer between 0 and 8
     @machine: Machine object (Machine1 or Machine2) to make a move */
    this.fill = (index, machine) => {
      console.log(`Trying to fill in: field ${index}`)
      // check if the field being accessed is empty
      if ( (this.state['field'+index]) == 'free') {
        // set the state of the field to the machine's pattern
        this.state['field'+index] = machine.pattern
        // updating UI
        $('.field'+index).html('')
        $('.field'+index).addClass(machine.pattern)
        return true
      } else {
        // failure; field that was accessed was not empty  
        return false
      }
    },

    // if starting a new game
    this.resetState = () => {
      this.state.field0 = 'free'
      this.state.field1 = 'free'
      this.state.field2 = 'free'
      this.state.field3 = 'free'
      this.state.field4 = 'free'
      this.state.field5 = 'free'
      this.state.field6 = 'free'
      this.state.field7 = 'free'
      this.state.field8 = 'free'
    }
  }
  
  // user clicked on the START button:
  $('#startNewBtn').click(function() {

    // initialize objects and switches for the game
    let Machine1 = new Machine('cross'),
      Machine2 = new Machine('circle'),
      Board = new Table(),

      randomNumber = () => {
        return Math.floor((Math.random() * 9))
      },

      filled = false,
      crossWon = 0,
      circleWon = 0,
      crossLost = 0,
      circleLost = 0,

      steps = 0,
      crossSteps = 0,
      circleSteps = 0,
      gameRunning = true
   
    // main game loop
    while (gameRunning) {
      // have to set this everytime at the beggining of every round: it was set to true before in the do/while loop
      filled = false
      
      // machine 1's turn:
      if (Board.turn == 'Machine1') {

        // check round limit, if met break out of main game loop
        if (steps == 10) {
          break
        }

        crossSteps++
        $('#crossMoves').html(crossSteps)

        // fill in a field on tic-tac-toe board by pattern Cross
        do {
          // making Cross a much stronger opponent. reference: https://www.wikihow.com/Win-at-Tic-Tac-Toe 
          // plays the first Cross in the corner
          if (steps == 0) {
            filled = Board.fill(6, Machine1)
          } else {
            filled = Board.fill(randomNumber(), Machine1)
          }
        } while (filled != true)

        // check for winner
        if (Board.hasWon(Machine1)) {
          Board.winner = Machine1.pattern
          console.log(`${Board.winner} has won`)
          crossWon++
          circleLost++
          $('#crossWon').html(crossWon)
          $('#circleLost').html(circleLost)
          // break out of game loop because game was finished
          break
        }

        // sleep for 10 ms, increment step counter for total, pass the turn
        sleep(10)
        steps++
        Board.turn = 'Machine2'

      } else {
        // check round limit, if met, break out of game loop
        if (steps == 10) {
          break
        }
        
        // increment counter for circle steps and update on front-end
        circleSteps++
        $('#circleMoves').html(circleSteps)

        // fill in a field on the tic-tac-toe board with pattern of Machine 2 (e.g. circle)
        do {
          filled = Board.fill(randomNumber(), Machine2)
        } while (filled != true)

        // check for a potential winner
        if (Board.hasWon(Machine2)) {
          Board.winner = Machine2.pattern
          $('#messages').html(`The game has ended. ${Board.winner} has won. Please refresh the page to run a new game.`)
          crossLost++
          circleWon++
          $('#circleWon').html(circleWon)
          $('#crossLost').html(crossLost)
          // break out of main game loop because game was finished
          break
        }

        // wait for 100 milliseconds before continuing with next step
        sleep(100)
        // increment counter of steps
        steps++
        // give pass to other machine
        Board.turn = 'Machine1'
      }
    }
  })
  
  $('.championShipsBtn').click(function() {
    $('#championships').toggle({effect:'fade'})
    document.location.href = '#championships'
  })
  
})
