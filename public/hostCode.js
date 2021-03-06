// TokBox Settings constructor
var tokSettings = {
  insertMode : 'append',
  width : 200,
  height : 150,
  name  : '{{host}}'
}

var user = [,,,,,,]
var stateArray = [0,0,0,0,0,0,0]


// Attach event handlers
session.on({

  sessionConnected: function(event) {
      var element = document.getElementById('host')
      var publisher = OT.initPublisher( element , {
        audioFallbackEnabled: true,
        publishAudio: true,
        height: 240,
        width: 320,
        insertMode: 'append',
        name: 'host',
        style: {
          nameDisplayMode: 'off',
          buttonDisplayMode: 'off'
        }
      }, function() {
        // console.log(session.connection.id);
        session.publish(publisher, function (err) {
          if (err) console.log('session didnt publish')
          session.signal({
            type: 'hostId',
            data: 'iyo'
          }, function(error) {
            if (error) {
              console.log('signal error: ' + error.message);
            } else {
              // console.log('cool sent it')
            }
          })
        })
      })},

  // This function runs when another client publishes a stream (eg. session.publish())
  streamCreated: function(event) {
    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"
    var userNum = Number(event.stream.name)
    // console.log('user joined: ', userNum);
    var subContainer = document.getElementById(userNum)
    // console.log(subContainer)
    // Subscribe to the stream that caused this event, put it inside the container we just made
    user[userNum] = session.subscribe(event.stream, subContainer,{
      audioVolume: 0,
      subscribeToVideo : false,
      insertMode: 'append'
    }, function( err ) {
      // console.log(user[userNum])
      user[userNum].setAudioVolume(0)
    })
  }
})
// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
session.connect(token)

session.on('signal', function(event) {
  checkForRemoteClicks(event)

})


//need to remove users from arr on leave

function checkForRemoteClicks(event) {
  var person

  if (event.type === 'signal:up') {
    person = user[Number(event.data)]
    if (person)
      person.setAudioVolume(0)
    ++stateArray[Number(event.data)]
    console.log(stateArray[Number(event.data)]);
    if ( stateArray[Number(event.data)] === 1 ) {
      // Meteor.call('arduinoCommand', 'TurnOn', 13)
      socket.emit('yo', 'off')
    }
  }

  if (event.type === 'signal:down') {
    person = user[Number(event.data)]
    if (person)
      person.setAudioVolume(75)

    ++stateArray[Number(event.data)]
    console.log(stateArray[Number(event.data)]);

    if ( --stateArray[Number(event.data)] === 0 ){
      // Meteor.call('arduinoCommand', 'TurnOff', 13)
      socket.emit('yo', 'on')
    }
  }
}
