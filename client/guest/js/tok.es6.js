Meteor.startup(function() {
  var session = getTokDetails().then( tDs => {
    return OT.initSession(tDs.apiKey, tDs.sessionId)
  }).then(sess => {
    watchEvents(sess)
    return sess
  })

  Promise.all([session, createToken()]).then( proms => {
    var session = proms[0]
    var token = proms[1]
    session.connect(token)
  })
})

//##### Event Watcher
function watchEvents ( session ) {

  streamCreatedResponse =  _.bind(streamCreatedResponse, session)
  startSessionResponse =  _.bind(startSessionResponse, session)

  session.on({
    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: streamCreatedResponse,
    //when we connect to a session....
    sessionConnected: startSessionResponse,
    //when we get a tok message signal
    signal: signalResponse
  })

  return session

}
