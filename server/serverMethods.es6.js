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
                                        , divPos: 1}})
}

findActiveDivs = () => {
  return TokDetails.findOne({activeDivs: {$exists: true}}
                            , {fields: {activeDivs: 1
                                        , divPos: 1}})
}

mousePress = (actionName, id, offset, light) => {
  var res = (actionName === 'down') ? 1 : 0
  var spot = "activeDivs." + id
  var divPos = "divPos." + id
  var divs = findActiveDivs()

  //### Log each press
  if (res === 1)
    console.log('press:', id)

  if (light){
    if (res === 1)
      Meteor.call('pinOn', id )
    else Meteor.call('pinOff', id )
  }

  if (offset)
    TokDetails.update(divs._id , {$set: {[spot]: res
                                         , [divPos]: offset}})
  else
    TokDetails.update(divs._id , {$set: {[spot]: res }})
}

pinOn = (pin) => {
  if (_.isObject(Cylon)) {
    return Cylon.robots['Light'].commands['switchStairOn'].call(Cylon.robots['Light'], pin)

  }
}

pinOff = (pin) => {
  if (_.isObject(Cylon)) {
    return Cylon.robots['Light'].commands['switchStairOff'].call(Cylon.robots['Light'], pin)

  }
}
