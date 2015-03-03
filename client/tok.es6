//undef divs to be filled once page loads
var subscribersContainer;

// var userId = getId().then
// console.log(userId())

// Now Sequence Begins
Meteor.startup( () => {
  // load all the correct boxes
  //get any need page elements
  subscribersContainer = document.getElementById('subscribers')

  //nested thens, this could be better
  //TODO: show lightbox if no sots free
  getId().then( res => {
    createToken().then( tD => {
      // console.log(res);
      // console.log(tD.id);
      //extend the tok object with all the info and init session and publisher
      console.log(res)
      return Object.create(tD, {
        id: {value: res},
        session: {value: TB.initSession(tD.sessionId)}
        // publisher: {value: TB.initPublisher(tD.apiKey, res)}
      })
    }).then(watchSession).then( tD => tD.session.connect(tD.apiKey, tD.token))
  })

})

function watchSession ( tD ) {

  tD.session.on({
    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      // console.log(event)
      tD.session.subscribe(event.stream, subscribersContainer)
                                 // {insertMode: 'append'})
    },
    sessionConnected: function(event) {
      console.log(tD.id)
      var publisher = TB.initPublisher(tD.apiKey, tD.id)
      tD.session.publish(publisher, {})
    }
  })
  return tD
}


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

function getId() {
  return new Promise( (resolve, reject) => {
    // the Meteor callback (must be async due to TokBox req.)
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
