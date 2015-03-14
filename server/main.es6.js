Meteor.methods({

  createToken: createToken,
  pickEmpty: pickEmpty,
  endConnection: endConnection,
  getSessionId: () => {return sessionId},
  getTokDetails: () => {return {apiKey: apiKey, sessionId: sessionId}}

})

Meteor.publish('allTok', function () {
    return TokDetails.find()
})
