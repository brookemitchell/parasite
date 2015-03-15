Session.setDefault('isHost', false)


subscribeOptions = {
  // isHost: Session.get('isHost')
  fitMode: 'contain',
  height: isHost ? 180 : 70,
  // height:  70,
  width: isHost ? 320 : 160,
  // width: 160,
  insertMode: 'append',
  // subscribeToAudio: this.isHost || false,
  subscribeToAudio: false,
  style: {
    nameDisplayMode: 'off',
    buttonDisplayMode: 'off'
  }
}

publishOptions = {
  audioFallbackEnabled: true,
  height: 70,
  width: 160,
  // height: 70,
  // width: 160,
  insertMode: 'append',
  // name: 1,
  frameRate: 15,
  resolution: isHost ?  '640x480' : '320x240',
  style: {
    nameDisplayMode: 'off',
    buttonDisplayMode: 'off'
  }
}
