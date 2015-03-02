// Promiseify the createToken Request
function createToken() {
  return new Promise( (resolve, reject) => {
    // the Meteor callback (must be async due to TokBox req.)
    Meteor.call('createToken', (err, tokDetails) => {
      if (err) reject(Error(err))
      else resolve(tokDetails)
    })
  })
}

//Tokbox Setup
createToken().then(addSessionStats).then(watchSessStart).then(watchSessJoin)

function addSessionStats (tokDeets) {
  return Object.create(tokDeets, {
    session: {value: TB.initSession(tokDeets.sessionId)},
    publisher : {value: TB.initPublisher(tokDeets.apiKey, 'publisher')}
  })
}

function watchSessStart(tokDeets) {
  // Attach event handlers
  tokDeets.session.on({
    // This function runs when session.connect() asynchronously completes
    sessionConnected: function(event) {
      // Publish (this will trigger 'streamCreated' on other clients)
      tokDeets.session.publish(tokDeets.publisher);
    }
    // This function runs when another client publishes a stream (eg. session.publish())
  })
  // console.log(tokDeets.session.connect)
  tokDeets.session.connect(tokDeets.apiKey, tokDeets.token)
  return tokDeets
}

function watchSessJoin ( tokDeets ) {
  tokDeets.session.on({
    streamCreated: function(event) {
      // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
      // the element with id="subscribers"
      // Subscribe to the stream that caused this event, put it inside the container we just made
      var subContainer = document.createElement('div')
      subContainer.id = 'stream-' + event.stream.streamId
      document.getElementById('subscribers').appendChild(subContainer)
      tokDeets.session.subscribe(event.stream, subContainer)
      createContainer(event)
    }
  })
}
