Meteor.methods({
  arduinoCommand: function (command, pin) {
    if (_.isObject(Cylon)) {
      return Cylon.robots['arduino'].commands[command].call(Cylon.robots['arduino'], pin);
    }
  }
});
