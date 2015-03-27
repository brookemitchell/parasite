Meteor.startup( function() {
  Cylon.robot({
    name: 'Light',
    description: 'Arduino light controller',
    connections: {
      arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411' }
    },
    devices: {
      button0: { driver: 'button', pin: 0}
      , button1: { driver: 'button', pin: 1}
      , button2: { driver: 'button', pin: 2}
      , button3: { driver: 'button', pin: 3}
      , button4: { driver: 'button', pin: 4}
      , button5: { driver: 'button', pin: 20}
      , button6: { driver: 'button', pin: 21}
      , stair0: { driver: 'led', pin: 6 }
      , stair1: { driver: 'led', pin: 7 }
      , stair2: { driver: 'led', pin: 8 }
      , stair3: { driver: 'led', pin: 9 }
      , stair4: { driver: 'led', pin: 10 }
      , stair5: { driver: 'led', pin: 11 }
      , stair6: { driver: 'led', pin: 12 }
    },

    switchStairOn: _.debounce(function(stair) {
      var dev = 'stair' + stair
      this.devices[dev].turnOn()
      push('down', stair)
    }, 5, true),

    switchStairOff: _.debounce(function(stair) {
      var dev = 'stair' + stair
      this.devices[dev].turnOff()
      push('up', stair)
    }, 5, true),

    commands: function() {
      return {
        switchStairOn: this.switchStairOn,
        switchStairOff: this.switchStairOff
      }
    },

    work: function(my) {
      // this is backwards becasue I am using internal pullups
      // not in cylon js sadly, yet

      //OFF
      for( let i = 0 ; i < 7; i++ ) {
        my['button' + i].on('push', () => {
          // if (my['button' + i].isOff){
          this.switchStairOff(i, 0)
            // this.immedRelease(i)
          // }
        })
        //ON
        my['button' + i].on('release', () => {
          // if (!my['button' + i].isOn){
            // lightYellow(i, 1)
           this.switchStairOn(i, 1)
            // push('down', i)
          // }
        })
      }
    }
  }).start()
})

var push = Meteor.bindEnvironment(function(action, id) {
  Meteor.call('mousePress', action, id)
})

// #####################
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this, args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
