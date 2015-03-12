var session = getTokDetails().then( tDs => {
  return OT.initSession(tDs.apiKey, tDs.sessionId)
}).then(session => {
  watchEvents(session)
  return session
})

Promise.all([session, createToken]).then( proms => {
  // console.log(vals)
  proms[1]().then(token => proms[0].connect(token))
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
//#########
