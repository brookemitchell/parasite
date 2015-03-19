Meteor.startup( function() {
    Cylon.robot({
      name: 'Light',
      description: 'Arduino light controller',

      connections: {
        arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1421' }
      },

      devices: {
          stair0: { driver: 'led', pin: 5 }
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
        }
    }).start()
})
