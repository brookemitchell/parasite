//####Event Responses
//When our session starts trigger

startSessionResponse = function (event) {
  // console.log(isHost)
  if(isHost){
    // globalSlotId = 'host'
    publishOptions.name = 'host'
    publishOptions.height = 180
    publishOptions.width = 320
    publishOptions.resolution = '640x480'
    var element = document.getElementById('host')
    var publisher = OT.initPublisher( element, publishOptions,
                                      () => removeButtons())
    this.publish(publisher, err => {})

  }

  else {

    pickEmpty().then( slotId => {
      //not cool
      globalSlotId = slotId
      publishOptions.name = slotId.toString()
      var element = document.getElementById(slotId)
      var publisher = OT.initPublisher( element, publishOptions,
                                        () => removeButtons())
      this.publish(publisher, err => {})
    })
  }
}

//user joins, triggers...
streamCreatedResponse = function streamCreatedResponse (event) {

  // console.log(event.stream.name)
  //check name of stream creator
  var subName = event.stream.name
  var element = document.getElementById(subName)

  if(event.stream.name === 'host'){
    // globalSlotId = 'host'
    subscribeOptions.height = 180
    subscribeOptions.width = 320
    // publishOptions.resolution = '640x480'
  }

  this.subscribe(event.stream, element, subscribeOptions , err => {
    removeButtons()
    // if (isHost) return event.stream.id
  })
}

signalResponse = function signalResponse( event ) {
    console.log('Signal sent from connection: ' + event.from.id)
    console.log('Signal data: ' + event.data)
    if (event.type === 'hostId' ) host = event.from.id
}
