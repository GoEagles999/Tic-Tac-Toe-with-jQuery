$(function() {
  var Machine = function(type) {
    this.type = type
  }

  var Table = function() {
    this.state = {
      // free, cross or circle
      fieldOne : 'free', 
      fieldTwo : 'free', 
      fieldThree : 'free', 
      fieldFour : 'free', 
      fieldFive : 'free', 
      fieldSix : 'free', 
      fieldSeven : 'free', 
      fieldEight : 'free', 
      fieldNine : 'free'
    },
    // which machine is starting?
    this.turn = 'Machine1',

    // broken down by different ways of winning to make it easier to optimize performance
    this.checkRowOne = (type) => {
      if (this.state.fieldOne == type && this.state.fieldTwo == type && this.state.fieldThree == type) {
        return true
      } else {
        return false
      }
    },
    this.checkRowTwo = (type) => {
      if (this.state.fieldFour == type && this.state.fieldFive == type && this.state.fieldSix == type) {
        return true
      } else {
        return false
      }
    },
    this.checkRowThree = (type) => {
      if (this.state.fieldSeven == type && this.state.fieldEight == type && this.state.fieldNine == type) {
        return true
      } else {
        return false
      }
    },
    this.checkColumnOne = (type) => {
      if (this.state.fieldOne == type && this.state.fieldFour == type && this.state.fieldEight == type) {
        return true
      } else {
        return false
      }
    },
    this.checkColumnTwo = (type) => {
      if (this.state.fieldTwo == type && this.state.fieldFive == type && this.state.fieldNine == type) {
        return true
      } else {
        return false
      }
    },
    this.checkColumnThree = (type) => {
      if (this.state.fieldThree == type && this.state.fieldSix == type && this.state.fieldNine == type) {
        return true
      } else {
        return false
      }
    },
    this.checkDiagonalFromTopLeft = (type) => {
      if (this.state.fieldOne == type && this.state.fieldFive == type && this.state.fieldNine == type) {
        return true
      } else {
        return false
      }
    },
    this.checkDiagonalFromTopRight = (type) => {
      if (this.state.fieldThree == type && this.state.fieldFive == type && this.state.fieldNine == type) {
        return true
      } else {
        return false
      }
    },
    this.hasWon = (machine) => {
      if (this.checkRowOne(machine.type) == true) {
        return true
      }
      if (this.checkRowTwo(machine.type) == true) {
        return true
      }
      if (this.checkRowThree(machine.type) == true) {
        return true
      }
      if (this.checkColumnOne(machine.type) == true) {
        return true
      }
      if (this.checkColumnTwo(machine.type) == true) {
        return true
      }
      if (this.checkColumnThree(machine.type) == true) {
        return true
      }
      if (this.checkDiagonalFromTopLeft(machine.type) == true) {
        return true
      }
      if (this.checkDiagonalFromTopRight(machine.type) == true) {
        return true
      }
      return false
    },
    // input 'number' must be random number
    // @randomNumber: integer between 0 and 9
    // @machine: Machine object
    this.fill = (randomNumber, machine) => {
      const fields = ['fieldOne', 'fieldTwo', 'fieldThree', 'fieldFour', 'fieldFive', 'fieldSix', 'fieldSeven', 'fieldEight', 'fieldNine']
      let toFill = fields[randomNumber]
      if (this.state[toFill] != 'free') {
        return false
      } else {
        this.state[toFill] = machine.type
        $('.item'+randomNumber).addClass(machine.type)
        return true
      }
    },
    this.resetState = () => {
      this.state.fieldOne = 'free'
      this.state.fieldTwo = 'free'
      this.state.fieldThree = 'free'
      this.state.fieldFour = 'free'
      this.state.fieldFive = 'free'
      this.state.fieldSix = 'free'
      this.state.fieldSeven = 'free'
      this.state.fieldEight = 'free'
      this.state.fieldNine = 'free'
    }
  }
  
  $('.championShipsBtn').click(function() {
    $('#championshipStats').toggle({effect:'fade'})
    document.location.href = '#championshipStats'
  })
  
  let Machine1 = new Machine('cross'),
      Machine2 = new Machine('circle'),
      Board = new Table(),
      randomNumber = () => {
        return Math.floor(Math.random() * 10)
      },
      winner = undefined,
      filled = undefined,
      gameRunning = true,
      rounds = 0

  // take 1 sec between turns
  // in the fill method, show on frontend
  $('#startNewBtn').click(function() {
    while (gameRunning) {
      if (rounds == 9) {
        gameRunning = false
        console.log(Board.state)
      }
      if (Board.turn == 'Machine1') {
        do {
          filled = Board.fill(randomNumber(), Machine1)
        } while (filled != true)
        // check if any combination has happened
        if (Board.hasWon(Machine1.type)) {
          winner = 'Machine 1'
          console.log(winner)
          break
        }
        rounds++
        // pass turn to other machine
        Board.turn = 'Machine2'
      } else {
        while (Board.fill(randomNumber(), Machine2)) {
          // couldnt fill, try again
          filled = Board.fill(randomNumber(), Machine2)
          if (filled) {
            break
          }
        }
        // check if any combination has happened
        if (Board.hasWon(Machine2.type)) {
          winner = 'Machine 2'
          console.log(winner)
          break
        }
        rounds++
        // pass turn to other machine
        Board.turn = 'Machine1'
      }
    }
    console.log('asd')
  })
})

