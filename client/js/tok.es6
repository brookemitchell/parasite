Meteor.startup( () => {
  //nested thens, this could be better
  //TODO: show error & remove publish permission if no sots free
  getId().then( res => {
    createToken().then( tD => {
      //extend the tok object with all the info and init session and publisher
      return Object.create(tD, {
        id: {value: res},
        session: {value: OT.initSession(tD.apiKey, tD.sessionId)}
      })
    }).then( tD => {
      tD.session.connect(tD.token)
      return tD
    }).then(watchSession)
  })
})

function watchSession ( tD ) {
  tD.session.on({
    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      //check name of stream creator
      let subName = event.stream.name
      let isHost = (subName === 'host')
      let element = document.getElementById(subName)
      console.log(element);
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

      }, err => { })
    },
    //when we start a session....
    sessionConnected: function(event) {
      let element = document.getElementById(tD.id)
      let publisher = OT.initPublisher( element , {
        audioFallbackEnabled: true,
        height: 70,
        width: 160,
        insertMode: 'append',
        name: tD.id,
        frameRate: 15,
        resolution: '320x240',
        style: {
          nameDisplayMode: 'off',
          buttonDisplayMode: 'off'
        }
      }, () => {
        var allEdges = [].slice.call(document.getElementsByClassName("OT_edge-bar-item"))
        allEdges.forEach( elem => elem.setAttribute("hidden", ""))
      })
      tD.session.publish(publisher, err => { })
    }
  })
  return tD
}

// Promiseify the createToken Request
function createToken() {
  return new Promise( (resolve, reject) => {
    Meteor.call('createToken', (err, tokDetails) => {
      if (err) reject(Error(err))
      else resolve(tokDetails)
    })
  })
}

function getId() {
  return new Promise( (resolve, reject) => {
    Meteor.call('pickEmpty', (err, res) => {
      if (err) reject(Error(err))
      else resolve(res)
    })
  })
}

function connect( tD ) {
  tD.session.connect(tD.apiKey, tD.token)
  return tD
}
