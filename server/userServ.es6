var FreeSlots = new Mongo.Collection('Slots')
var slotsId = FreeSlots.insert({slots:[,,,,,,]})
//dont need no db?
// var freeSlots = [,,,,,,,];
// var freeSlots = [1,1,1,1,1,1,1];

// console.log(Math.random().toString(36).substr(2, 5))

function slotsFull (arr) {
    return arr.every(val => {return val})
}

Meteor.methods({
  pickEmpty: () => {
    var arr = FreeSlots.findOne(slotsId).slots
    if (slotsFull( arr )) throw new Meteor.Error('No slots free')
    var found = false
    var guess
    while (found === false){
      guess = Math.floor(Math.random() * 6)
      // console.log(guess)
      if (!arr[guess]) found = true
      }
    return guess
    }
})
