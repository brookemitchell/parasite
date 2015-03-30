Meteor.methods({

  createToken: createToken,
  endConnection: endConnection,
  // lightYellow: lightYellow,
  pinOn: pinOn,
  pinOff: pinOff,
  mousePress: mousePress,
  pickEmpty: pickEmpty,
  getSessionId: () => {return sessionId},
  getTokDetails: () => {return {apiKey: apiKey, sessionId: sessionId}}

})

Meteor.publish('allTok', function () {
    return TokDetails.find()
})
