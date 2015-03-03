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
    }).then(watchSession).then( tD => tD.session.connect(tD.token))
  })
})

function watchSession ( tD ) {
  tD.session.on({
    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      //check name of stream creator
      console.log(event.stream.name);
      let isHost = (event.stream.name === 'host')

      let element = document.getElementById(event.stream.name)
      tD.session.subscribe(event.stream, element, err => { })
                                 // {insertMode: 'append'})
    },
    //when we start a session....
    sessionConnected: function(event) {
      // console.log(event);
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
          audioLevelDisplayMode: 'on',
          nameDisplayMode: 'off',
          buttonDisplayMode: 'off'
        }

      }, () => {})
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
