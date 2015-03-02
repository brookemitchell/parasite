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


function addSessionStats (tokDeets) {

  return Object.create(tokDeets, {
    session: {value: TB.initSession(tokDeets.sessionId)},
    // publisher : {value: TB.initPublisher(tokDeets.apiKey, 'publisher')},
    //swapped with 'layout' hack
    layout: {value: TB.initLayoutContainer(layoutContainer).layout},
  })
}

function watchSession ( tokDeets ) {
  console.log(tokDeets);
  tokDeets.session.on({
    streamCreated: function(event) {
      tokDeets.session.subscribe(event.stream, layoutContainer,
                                 {insertMode: 'append'})
      tokDeets.layout()
    }
  })
  return tokDeets
}

function connect( tokDeets ) {
  tokDeets.session.connect(tokDeets.apiKey, tokDeets.token, (err) => {
    tokDeets.session.publish('publisherContainer')
    tokDeets.layout()
  })
  return tokDeets
}

Meteor.startup( () => {
  var layoutContainer = document.getElementById('layoutContainer')
  //Tokbox Setup
  // console.log(layoutContainer);
  createToken().then(addSessionStats).then(watchSession).then(connect)
})
