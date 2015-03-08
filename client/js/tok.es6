Meteor.startup( () => {
  getId().then( res => {
    console.log(res);
    createToken().then( tD => {
      //extend the tok object with all the info and init session and publisher
      return Object.create(tD, {
        id: {value: res},
        session: {value: OT.initSession(tD.apiKey, tD.sessionId)}
      })
    }).then( tD => {
      tD.session.connect(tD.token)
      session = tD.session
      return tD
    }).then(watchSession)
  })
})

var session

function watchSession ( tD ) {
  tD.session.on({
    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      //check name of stream creator
      let subName = event.stream.name
      let isHost = (subName === 'host')
      let element = document.getElementById(subName)
      console.log('subtoaudio: ', isHost)
      console.log(event.stream)
      tD.session.subscribe(event.stream, element, {
        fitMode: 'contain',
        height: isHost ? 180 : 70,
        width: isHost ? 320 : 160,
        insertMode: 'append',
        subscribeToAudio: isHost,
        style: {
          nameDisplayMode: 'off',
          buttonDisplayMode: 'off'
        }
      }, err => {
        removeButtons()
        if (err) console.log("couldn\'t join: ", event)
        if (isHost) return event.stream.id
        console.log(event)
      })
      // console.log(serverAddress);
    },
    //when we start a session....
    sessionConnected: function(event) {
      let element = document.getElementById(tD.id)
      let publisher = OT.initPublisher( element , {
        audioFallbackEnabled: true,
        height: 70,
        width: 160,
        insertMode: 'append',
        // publishAudio: true,
        name: tD.id,
        frameRate: 15,
        resolution: '320x240',
        style: {
          nameDisplayMode: 'off',
          buttonDisplayMode: 'off'
        }
      }, () => {
        // var allEdges = [].slice.call(document.getElementsByClassName("OT_edge-bar-item"))
        // allEdges.forEach( elem => elem.setAttribute("hidden", ""))
      })
      tD.session.publish(publisher, err => {
        removeButtons()
      })
    },
    'signal':  function(event) {
      // console.log('Signal sent from connection: ' + event.from.id)
      if (event.type === 'hostId' ) host = event.from.id
      // console.log('Signal data: ' + event.data)
    }
  })
  return tD
}

Template.subscribers.events({
  'mousedown .sub ': (event) => {
    sendMouseMess('down', event.currentTarget.id)
  },

  'mouseup .sub ': (event) => {
    sendMouseMess('up', event.currentTarget.id)
  }
})

// Promiseify the createToken Request
function createToken () {
  return new Promise( (resolve, reject) => {
    Meteor.call('createToken', (err, tokDetails) => {
      // session = tokDetails.session
      // console.log(session);
      if (err) reject(Error(err))
      else resolve(tokDetails)
    })
  })
}

function getId () {
  return new Promise( (resolve, reject) => {
    Meteor.call('pickEmpty', (err, res) => {
      if (err) reject(Error(err))
      else resolve(res)
    })
  })
}

function sendMouseMess (state, mess) {
      session.signal({
        type: state,
        data: mess
      }, function(error) {
        if (error) {
          console.log('signal error: ' + error.message);
        }
      })
}

function removeButtons () {
        var allEdges = [].slice.call(document.getElementsByClassName('OT_edge-bar-item'))
        allEdges.forEach( elem => elem.setAttribute('hidden', ''))
}
