//####Event Responses
//user join trigger
streamCreatedResponse = function streamCreatedResponse (event) {
  console.log(event.stream.name + ': joined!')
  //check name of stream creator
  var subName = event.stream.name
  var isHost = (subName === 'host')

  var element = document.getElementById(subName)

  this.subscribe(event.stream, element, subscribeOptions , err => {
    // removeButtons()
    // if (err) console.log("couldn\'t join: ", event)
    // if (isHost) return event.stream.id
    // console.log(event)
  })
}

//When our session starts trigger
startSessionResponse = function (event) {
  // db = TokDetails.findOne({userSlots: {$exists: true}}, {fields: {userSlots:1}})
  // slots = db.userSlots
  // id = db._id
  // TokDetails.update(id , {$set: {userSlots: slots}})
  pickEmpty().then( slotId => {
    publishOptions.name = slotId
    var element = document.getElementById(slotId)
    var publisher = OT.initPublisher( element, publishOptions,
                                      () => removeButtons())
    console.log(this)

    this.publish(publisher, err => {})
  })
}

//perhaps only do this on host watcher
endConnectionResponse = function(event) {
  // console.log(event.stream.name +': left')
  var spot = event.stream.name
  var cursor = TokDetails.findOne({userSlots: spot})
  // console.log(cursor)

  var key = "userSlots."+spot
  // console.log(key)

  TokDetails.update(cursor._id, {$set: {[key]: 999}})
}

signalResponse = function signalResponse( event ) {
    console.log('Signal sent from connection: ' + event.from.id)
    console.log('Signal data: ' + event.data)
    if (event.type === 'hostId' ) host = event.from.id
}

// function pickEmpty ( arr ) {
//   var found = false
//   var guess
//   while (found === false){
//     guess = Math.floor(Math.random() * arr.length)
//     if (!arr[guess]) found = true
//   }
//   return guess
// }

// function slotsFree (arr) {
//     return arr.some(val => {return val == null})
// }
