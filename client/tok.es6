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

//undef divs to be filled once page loads
var subscribersContainer;

// Now Sequence Begins
Meteor.startup( () => {

  //get any need page elements
  subscribersContainer = document.getElementById('subscribers')
  createToken().then(
    (tD) => {
      //extend the tok object with all the info and init session and publisher
      return Object.create(tD, {
        session: {value: TB.initSession(tD.sessionId)},
        publisher: {value: TB.initPublisher(tD.apiKey, 'subBox1')}
      })
  }).then(
    (tD) => {
      tD.session.publish(subscribersContainer);
    return tD
    }).then(watchSession).then(
      tD => tD.session.connect(tD.apiKey, tD.token))
    .catch()
})

// console.log(slot);

function watchSession ( tD ) {
  tD.session.on({
  // This function runs when session.connect() asynchronously completes
    sessionConnected: function(event) {
      // console.log(event);
      // Publish (this will trigger 'streamCreated' on other clients)
      tD.session.publish(tD.publisher);
    },

    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      // console.log(event)
      tD.session.subscribe(event.stream, subscribersContainer)
                                 // {insertMode: 'append'})
    }
  })
  return tD
}

function connect( tD ) {
  tD.session.connect(tD.apiKey, tD.token)
  return tD
}
