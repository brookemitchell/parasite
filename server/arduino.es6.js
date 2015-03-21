Meteor.startup( function() {
  Cylon.robot({
    name: 'Light',
    description: 'Arduino light controller',
    connections: {
      arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
    },
    devices: {
      button0: { driver: 'button', pin: 0}
      , button1: { driver: 'button', pin: 1}
      , button2: { driver: 'button', pin: 2}
      , button3: { driver: 'button', pin: 3}
      , button4: { driver: 'button', pin: 4}
      , button5: { driver: 'button', pin: 20}
      , button6: { driver: 'button', pin: 21}
      , stair0: { driver: 'led', pin: 5 }
      , stair1: { driver: 'led', pin: 6 }
      , stair2: { driver: 'led', pin: 7 }
      , stair3: { driver: 'led', pin: 8 }
      , stair4: { driver: 'led', pin: 9 }
      , stair5: { driver: 'led', pin: 10 }
      , stair6: { driver: 'led', pin: 11 }
    },
    switchStair: function(stair, on) {
      var dev = 'stair' + stair
      if (on === 1)
        this.devices[dev].turnOn()
      else this.devices[dev].turnOff()
    },
    commands: function() {
      return {
        'switchStair': this.switchStair
      }
    },
    work: function(my) {
      // this is inverted becasue I am using internal pullups
      // not in cylon js sadly, yet
      for( let i = 0 ; i < 7; i++ ) {
        my['button' + i].on('push'   , () => {
          lightYellow(i, 0)
          push('up', i)
        })
        my['button' + i].on('release', () => {
          lightYellow(i, 1)
          push('down', i)
        })
      }
    }
  }).start()

})

var push = Meteor.bindEnvironment(function(action, id) {
  Meteor.call('mousePress', action, id)
})
