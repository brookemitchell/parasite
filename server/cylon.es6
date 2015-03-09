Cylon.robot({
  name: 'arduino',
  description: 'Description is optional...',

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

 devices: {
   button0: { driver: 'button', pin: 0, isPullUp: true },
   button1: { driver: 'button', pin: 1, isPullUp: true },
   button2: { driver: 'button', pin: 2, isPullUp: true },
   button3: { driver: 'button', pin: 3, isPullUp: true },
   button4: { driver: 'button', pin: 4, isPullUp: true },
   button5: { driver: 'button', pin: 13, isPullUp: true },
   button6: { driver: 'button', pin: 20, isPullUp: true },
   led0: { driver: 'led', pin: 5},
   led1: { driver: 'led', pin: 6},
   led2: { driver: 'led', pin: 7},
   led3: { driver: 'led', pin: 8},
   led4: { driver: 'led', pin: 9},
   led5: { driver: 'led', pin: 10},
   led6: { driver: 'led', pin: 11}
  },

  // dLed: function () {
  //   this.devices.redLed.toggle();
  //   return 'Cylon ' + this.name + ' toggles red led';
  // },

  lightOn: ( number ) => {
    var name = 'led'+number
    if (!my.name.isOn())
      my.name.turnOn()
  },

  lightOff: ( number ) => {
    var name = 'led'+number
    if (my.name.isOn())
      my.name.turnOff
  },

  lightoff: () => {},

  work:(my) => {
    my.button0.on('push',() =>  {
      my.led0.turnOn()
    }),
    my.button1.on('push',() =>  {
      my.led1.turnOn()}),

    my.button2.on('push',() =>  {
      my.led2.turnOn()}),

    my.button3.on('push',() =>  {
      my.led3.turnOn()}),

    my.button4.on('push',() =>  {
      my.led4.turnOn()}),

    my.button5.on('push',() =>  {
      my.led5.turnOn()}),

    my.button6.on('push',() =>  {
      my.led6.turnOn()}),

    my.button0.on('release',() =>  {
      my.led0.turnOff()}),

    my.button1.on('release',() =>  {
      my.led1.turnOff()}),

    my.button2.on('release',() =>  {
      my.led2.turnOff()}),

    my.button3.on('release',() =>  {
      my.led3.turnOff()}),

    my.button4.on('release',() =>  {
      my.led4.turnOff()}),

    my.button5.on('release',() =>  {
      my.led5.turnOff()}),

    my.button6.on('release',() =>  {
      my.led6.turnOff()})
  },

  commands: function () {
    return {
      'TurnOn': this.lightOn,
      'TurnOff': this.lightOff
    }
  }
}).start()
