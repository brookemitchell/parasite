// TokBox Settings constructor
var tokSettings = {
  // this.audioVolume = volume,
  insertMode : 'append',
  width : 200,
  height : 150,
  // subscribeToAudio : true,
  // subscribeToVideo : false,
  name  : 'host'
}
var user = [,,,,,,]

// console.log(token, apiKey, sessionId);

// Initialize an OpenTok Session object
var session = OT.initSession(apiKey, sessionId)
// Initialize a Publisher, place it into the element with id="publisher"
// var publisher = OT.initPublisher('host', { name: 'host' })
// console.log(session);

// Attach event handlers
session.on({

  sessionConnected: function(event) {
      var element = document.getElementById('host')
      var publisher = OT.initPublisher( element , {
        audioFallbackEnabled: true,
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

var stateArray = [0,0,0,0,0,0,0]

session.on('signal', function(event) {
  // console.log('Signal sent from connection: ' + event.from.id);
  // console.log('Signal type: ' + event.type);
  // console.log('Signal data: ' + event.data);
  checkForRemoteClicks(event)

})

function checkForRemoteClicks(event) {

  if (event.type === 'up') {
    if ( ++stateArray[Number(event.data)] === 1 )
      console.log('Turn on the Audio/Lights!');
  }

  if (event.type === 'down') {
    if ( ++stateArray[Number(event.data)] === 0 )
      console.log('Turn off the Audio/Lights!');
  }
}
