createToken = () => {
    var token = openTokClient.generateToken(
      sessionId, {role: 'publisher', expireTime:
                  Math.round(new Date().getTime() / 1000) + 2592e+3}) //30days
  // var slots = TokDetails.findOne({slots})
  // console.log(slots);
  return token
}

pickEmpty = () => {
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

slotsFull = (arr) => {
    return arr.every(val => {return val})
}

endConnection = (event) => {
  console.log(event)
}
