//####Event Responses
//When our session starts trigger
startSessionResponse = function (event) {
  // console.log(isHost)
  if(isHost){
    globalSlotId = 'host'
    publishOptions.name = 'host'
    publishOptions.height = 180
    publishOptions.width = 320
    publishOptions.resolution = '640x480'
    var element = document.getElementById('host')
    var publisher = OT.initPublisher( element, publishOptions,
                                      () => removeButtons())
    hostStream = this.publish(publisher, err => {})
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

  //updtate stream details
  var latestStream = event.stream
  var joinName = latestStream.name
  // console.log(latestStream)
  // console.log(isHost, joinName)

  var element = document.getElementById(joinName)

  if(joinName === 'host') {
    subscribeOptions.height = 180
    subscribeOptions.width = 320
    subscribeOptions.subscribeToAudio = true
    subscribeOptions.audioVolume = 100
  } else {
    subscribeOptions.subscribeToAudio = false
    subscribeOptions.audioVolume = 0
    subscribeOptions.height = 70
    subscribeOptions.width = 160
  }

  if(isHost) {
    subscribeOptions.subscribeToAudio = true
  }

  //now u have to remove these too
  subItems[Number(joinName)] = this.subscribe(
    event.stream, element, subscribeOptions , err => {
      removeButtons()
      if( isHost) {
        // console.log(this)
        subItems[Number(joinName)].setAudioVolume(0)
      }
    })
}
