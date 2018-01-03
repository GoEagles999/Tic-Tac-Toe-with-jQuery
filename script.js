/********************************************/
/* @author : Pauline Ghiazza                */
/* @author site : www.paulineghiazza.fr     */
/********************************************/

$(function() {
  // TO-DO: for the championship data. store here all game-specific data here
  // TO-DO: detect draw
  // TO-DO: block user action on board after game finished
  var machineData = new Array()
  var userData = new Array()

  var table = $('table')
  var tickingSeconds
  var messages = $('.messages')
  var turn = $('.turn')
  var moveCounter = 0
  // timer is not started until user clicks on table
  var timerStarted = false
  // seconds elapsed since beginning of round
  var secondsElapsed = 0

  $('td').click(function() {
    moveCounter++
    var currentGameStatsUpdate = function() {
      var avg = secondsElapsed/moveCounter
      // rounded to whole number
      $('#playerSpeed').html(Math.round(avg)+'s')
      $('#playerMoves').html(moveCounter)
      $('#machineMoves').html(moveCounter)

    }
    var startTimer = function() {
      if (timerStarted == false) {
        tickingSeconds = setInterval(drawTime, 1000)
        function drawTime() {
          secondsElapsed += 1
          $('#timeElapsed').html(secondsElapsed+'s')
        }
        timerStarted = true
      } else {
        // timer has started
        return; 
      }
    }
    var checked = function(td) {
      if(td.hasClass('cross') || td.hasClass('circle')) {
        return true
      } else {
        return false
      }
    }

    // MACHINE LOGIC
    var machineTurn = function() {
      var checked = function(td) {
        if (td.hasClass('cross') || td.hasClass('circle')) {
          return true
        } else {
          return false
        }
      }
      var randomItem
      for (var i=0;i<100;i++) {
        // generates whole number between 1 and 9
        var randomNumber = Math.floor(Math.random() * 9) + 1
        var gotRandomItem = $('.item'+randomNumber)
        var isChecked = checked(gotRandomItem)
        if (!isChecked) {
          randomItem = gotRandomItem
          break
        }
      }
      var pattern = 'circle';
      changeState(randomItem, pattern);
      if (checkHasEnded(table, pattern) == true) {
        $('.turn').html('')
        messages.html('You have lost!<br><br>Start a new game by clicking on the button at the bottom.')
        clearInterval(tickingSeconds)
      }
    }

    //misc functions
    $('#welcome').hide()
    startTimer()
    currentGameStatsUpdate()

    td = $(this);
    var checked = checked(td);
    if (checked) {
      messages.html('This box has already been checked. Please click into another (unchecked) box.')
    } else {
      var pattern = 'cross';
      changeState(td, pattern);
      if (checkHasEnded(table, pattern) == true) {
        turn.html('')
        messages.html('You have have won!<br><br>Start a new game by clicking on the button at the bottom.')
        clearInterval(tickingSeconds)
      } else {
        turn.html("It's your turn.")
        machineTurn()
      }
    }
    $('.startNewBtn').click(function() {
      messages.html('')
      startNew(table)
      function startNew(table) {
        // reset data
        table.find('td').each(function() {
          $(this).removeClass('circle').removeClass('cross');
        });
        $('#playerSpeed').html(0)
        $('#playerMoves').html(0)
        $('#machineMoves').html(0)

        moveCounter = 0
        secondsElapsed = 0
        timerStarted = false
        $('#timeElapsed').html(0)
      }
    })
  })
  
  $('.championShipsBtn').click(function() {
    $('#championshipStats').toggle({effect:'fade'})
    document.location.href = '#championshipStats'
  })
})

function changeState(td, pattern) {
  return td.addClass(pattern);
}

// check different rows/columns/diagonals
function checkHasEnded(table, pattern) {
  if(table.find('.item1').hasClass(pattern) && table.find('.item2').hasClass(pattern) && table.find('.item3').hasClass(pattern)) {
    return true
  } else if (table.find('.item1').hasClass(pattern) && table.find('.item4').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
    return true
  } else if (table.find('.item1').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    return true
  } else if (table.find('.item4').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item6').hasClass(pattern)) {
    return true
  } else if (table.find('.item7').hasClass(pattern) && table.find('.item8').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    return true 
  } else if (table.find('.item2').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item8').hasClass(pattern)) {
    return true 
  } else if (table.find('.item3').hasClass(pattern) && table.find('.item6').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    return true
  } else if (table.find('.item3').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
    return true
  }
  return false
}

