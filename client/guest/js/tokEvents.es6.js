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
  db = TokDetails.findOne({userSlots: {$exists: true}}, {fields: {userSlots:1}})
  console.log(db)
  slots = db.userSlots
  id = db._id

  if (slotsFree(slots)) {
    elemId = pickEmpty(slots)
    slots[elemId] = elemId
  }
  else throw Error('Slots Full!')

  TokDetails.update(id , {$set: {userSlots: slots}})

  if (elemId){
    var element = document.getElementById(elemId)
    // console.log(element)

    //elem to replace, options, callback
    publishOptions.name = elemId
    // console.log(publishOptions.name)

    var publisher = OT.initPublisher( element, publishOptions,
                                      () => removeButtons())
  }
  this.publish(publisher, err => {})
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

function pickEmpty ( arr ) {
  var found = false
  var guess
  while (found === false){
    guess = Math.floor(Math.random() * arr.length)
    if (!arr[guess]) found = true
  }
  return guess
}

function slotsFree (arr) {
    return arr.some(val => {return val == null})
}
