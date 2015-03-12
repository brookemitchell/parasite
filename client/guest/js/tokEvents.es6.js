//####Event Responses
streamCreatedResponse = function streamCreatedResponse (event) {
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

startSessionResponse = function startSessionResponse (event) {
    // console.log(this);
    var element = document.getElementById(1)
    //elem to replace, options, callback
    var publisher = OT.initPublisher( element, publishOptions,
                                      () => removeButtons())
    this.publish(publisher, err => {})
}

signalResponse = function signalResponse( event ) {
    console.log('Signal sent from connection: ' + event.from.id)
    console.log('Signal data: ' + event.data)
    if (event.type === 'hostId' ) host = event.from.id
}
//#######
