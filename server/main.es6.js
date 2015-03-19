Meteor.methods({

  createToken: createToken,
  endConnection: endConnection,
  lightYellow: lightYellow,
  mousePress: mousePress,
  pickEmpty: pickEmpty,
  getSessionId: () => {return sessionId},
  getTokDetails: () => {return {apiKey: apiKey, sessionId: sessionId}}

})

Meteor.publish('allTok', function () {
    return TokDetails.find()
})
