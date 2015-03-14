createToken = () => {
    var token = openTokClient.generateToken(
      sessionId, {role: 'publisher', expireTime:
                  Math.round(new Date().getTime() / 1000) + 2592e+3}) //30days
  return token
}

pickEmpty = () => {
  var guess,
      found = false

  var mInfo =  findUserSlots()
  console.log(mInfo)
  var userSlots = mInfo.userSlots
  console.log(userSlots)

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

endConnection = (elemId) => {
  console.log('remove: ' + elemId)
  slots = "userSlots." + elemId
  TokDetails.update(findUserSlots()._id , {$set: {[slots]: null}})
}


findUserSlots = () => {

  return TokDetails.findOne({userSlots: {$exists: true}}
                            , {fields: {userSlots:1}})

}
