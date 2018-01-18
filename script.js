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
    this.checkRow1 = (type) => {
      if (this.state.fieldOne == type && this.state.fieldTwo == type && this.state.fieldThree == type) {
        return true
      }
    },
    this.checkRow2 = (type) => {
      if (this.state.fieldFour == type && this.state.fieldFive == type && this.state.fieldSix == type) {
        return true
      }
    },
    this.checkRow3 = (type) => {
      if (this.state.fieldSeven == type && this.state.fieldEight == type && this.state.fieldNine == type) {
        return true
      }
    },
    this.checkColumn1 = (type) => {
      if (this.state.fieldOne == type && this.state.fieldFour == type && this.state.fieldEight == type) {
        return true
      }
    },
    this.checkColumn2 = (type) => {
      if (this.state.fieldTwo == type && this.state.fieldFive == type && this.state.fieldNine == type) {
        return true
      }
    },
    this.checkColumn3 = (type) => {
      if (this.state.fieldThree == type && this.state.fieldSix == type && this.state.fieldNine == type) {
        return true
      }
    },
    this.checkDiagonalFromTopLeft = (type) => {
      if (this.state.fieldOne == type && this.state.fieldFive == type && this.state.fieldNine == type) {
        return true
      }
    },
    this.checkDiagonalFromTopRight = (type) => {
      if (this.state.fieldThree == type && this.state.fieldFive == type && this.state.fieldNine == type) {
        return true
      }
    },
    this.hasWon = (machine) => {
      if (this.checkRow1(machine.type) == true) {
        return true
      }
      if (this.checkRow2(machine.type) == true) {
        return true
      }
      if (this.checkRow3(machine.type) == true) {
        return true
      }
      if (this.checkColumn1(machine.type) == true) {
        return true
      }
      if (this.checkColumn2(machine.type) == true) {
        return true
      }
      if (this.checkColumn3(machine.type) == true) {
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
    // @number: integer
    // @machine: Machine
    this.fill = (field, machine) => {
      for (var key in this.state) {
        if (this.state[key] == 'free') {
          this.state.field = machine.type
          $('.item'+field).addClass(machine.type)
          return true
        }
        return false
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
      fields = ['fieldOne', 'fieldTwo', 'fieldThree', 'fieldFour', 'fieldFive', 'fieldSix', 'fieldSeven', 'fieldEight', 'fieldNine']
      winner = undefined,
      gameRunning = false

  // take 1 sec between turns
  // in the fill method, show on frontend
  $('#startNewBtn').click(function() {
    // activate game loop
    gameRunning = true
    while (gameRunning) {
      if (Board.turn == 'Machine1') {
        while (Board.fill(fields[randomNumber()], Machine1) == false) {
          filled = Board.fill(fields[randomNumber()], Machine1)
        }
        // check if any combination has happened
        if (Board.hasWon(Machine1.type)) {
          winner = 'Machine 1'
          gameRunning = false
          break
        }
        // pass turn to other
        Board.turn = Machine2
      }
      if (Board.turn == 'Machine2') {
        console.log('asd')
        while (Board.fill(fields[randomNumber()], Machine1) == false) {
          filled = Board.fill(fields[randomNumber()], Machine1)
        }
        // check if any combination has happened
        if (Board.hasWon(Machine2.type)) {
          winner = 'Machine 2'
          gameRunning = false
          break
        }
        // pass turn to other
        Board.turn = Machine1
      }
    }
    console.log(winner)
  })
})

