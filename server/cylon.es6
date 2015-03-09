Cylon.robot({
  name: 'testbot',
  description: 'Description is optional...',

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    redLed: { driver: 'led', pin: 13 },
  },

  redLed: function () {
    this.devices.redLed.toggle();
    return 'Cylon ' + this.name + ' toggles red led';
  },

  toggleAll: function () {
    this.devices.redLed.toggle();
    this.devices.yellowLed.toggle();
    return 'Cylon ' + this.name + ' toggles red and yellow led';
  },

  commands: function () {
    return {
      'Toggle red Led': this.redLed
    }
  }

}).start()
