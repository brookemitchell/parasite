//####### Promises
createToken = function createToken () {
  return new Promise( (resolve, reject) => {
    Meteor.call('createToken',  (err, token) => {
      // console.log(token)
      if (err) reject(Error(err))
      else resolve(token)
    })
  })
}

getTokDetails = function getTokDetails () {
  return new Promise( (resolve, reject) => {
    Meteor.call('getTokDetails', (err, tokDetails) => {
      if (err) reject(Error(err))
      else resolve(tokDetails)
    })
  })
}

initSession = function initSession ( apiKey, sessionId) {
  return new Promise( (resolve, reject) => {
    OT.initSession(apiKey, sessionId, (err, session) => {
      if (err) reject(Error(err))
      else resolve (session)
    })
  })
}
///#######
// function sendMouseMess (state, mess) {
//       session.signal({
//         type: state,
//         data: mess
//       }, function(error) {
//         if (error) {
//           console.log('signal error: ' + error.message);
//         }
//       })
// }

//helpers

removeButtons = function removeButtons () {
        var allEdges = [].slice.call(document.getElementsByClassName('OT_edge-bar-item'))
        allEdges.forEach( elem => elem.setAttribute('hidden', ''))
}


// Template.subscribers.events({
//   'mousedown .sub ': (event) => {
//     sendMouseMess('down', event.currentTarget.id)
//   },

//   'mouseup .sub ': (event) => {
//     sendMouseMess('up', event.currentTarget.id)
//   }
// })
