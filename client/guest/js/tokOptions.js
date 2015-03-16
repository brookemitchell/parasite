Session.setDefault('isHost', false)

subscribeOptions = {
  // audioVolume: 100,
  fitMode: 'contain',
  // height:  70,
  // width: 160,
  insertMode: 'append',
  // subscribeToAudio: false,
  style: {
    nameDisplayMode: 'off',
    buttonDisplayMode: 'off'
  }
}

publishOptions = {
  audioFallbackEnabled: true,
  height: 70,
  width: 160,
  insertMode: 'append',
  frameRate: 15,
  resolution: '320x240',
  style: {
    nameDisplayMode: 'off',
    buttonDisplayMode: 'off'
  }
}
