Meteor.methods({

  createToken: createToken,
  endConnection: endConnection,
  mousePress: mousePress,
  pickEmpty: pickEmpty,
  getSessionId: () => {return sessionId},
  getTokDetails: () => {return {apiKey: apiKey, sessionId: sessionId}}

})

Meteor.publish('allTok', function () {
    return TokDetails.find()
})
