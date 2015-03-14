var apiKey = 45167732
var secret = '330406bb207afa42e6e0f86c505ce3f0d7a575b1'
var openTokClient = new OpenTokClient(apiKey,secret)

// init
var slots = new Array(7)        // dummy array to populate values
var sessionId = openTokClient.createSession({mediaMode: 'routed'})
TokDetails.insert({userSlots: slots,
                   activeDivs: slots})


Meteor.publish('allTok', function () {
    return TokDetails.find()
})

Meteor.methods({

  createToken: createToken,
  pickEmpty: pickEmpty,
  getSessionId: () => {return sessionId},
  getTokDetails: () => {return {apiKey: apiKey, sessionId: sessionId}}

})

function createToken () {
    var token = openTokClient.generateToken(
      sessionId, {role: 'publisher', expireTime:
                  Math.round(new Date().getTime() / 1000) + 2592e+3}) //30days
  // var slots = TokDetails.findOne({slots})
  // console.log(slots);
  return token
}

function pickEmpty () {
  var guess,
      found = false,
      mInfo = TokDetails.findOne(
        {userSlots: {$exists: true}}, {fields: {userSlots:1}}),
      userSlots = mInfo.userSlots

  if (slotsFull(userSlots))
    throw new Meteor.error('SlotsFull!')

  while (found === false){
    guess = Math.floor(Math.random() * 7)
    if (userSlots[guess] === null)
      found = true
  }
  userSlots[guess] = guess
  TokDetails.update(mInfo._id, {$set: {userSlots: userSlots}})
  return guess
}

function slotsFull (arr) {
    return arr.every(val => {return val})
}

  // slots.forEach( u => {
  //   var sloats = (u).slots
  //   console.log(sloats);
  //   // if (sloats.filter(elem => elem != null).length >= 7)
  //   //   throw new Meteor.Error('slots-full', 'Slots are Full!')
  //   sloats[pickEmpty( sloats )] = id
  //   // slots.slots = slots
  //   console.log(sloats);
  // })
  // // console.log(TokDetails.find());
  // // console.log(sloats.filter(elem => elem != null).length);
  // // TokDetails.update({slots}, {$set: {'slots': sloats}})
