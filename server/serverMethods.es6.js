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
  var userSlots = mInfo.userSlots
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
  if (elemId !== 'host') {
    slots = "userSlots." + elemId
    TokDetails.update(findUserSlots()._id , {$set: {[slots]: null}})
  }
}

findUserSlots = () => {
  return TokDetails.findOne({userSlots: {$exists: true}}
                            , {fields: {userSlots:1
                                        , divPost: 1}})
}

mousePress = (actionName, id, offset) => {
  // if (!offset) offset = [0,0]
  if (actionName == 'down') var res = 1
  else if (actionName == 'up') var res = 0
  var spot = "activeDivs." + id
  var divPos = "divPos." + id
  // console.log(findUserSlots())

  if (offset)
    TokDetails.update(findUserSlots()._id , {$set: {[spot]: res
                                                  , [divPos]: offset}})
  else
    TokDetails.update(findUserSlots()._id , {$set: {[spot]: res }})
}

lightYellow = (pin, on) => {
  if (_.isObject(Cylon)) {
    return Cylon.robots['Light'].commands['switchStair'].call(Cylon.robots['Light'], pin, on)

  }
}
