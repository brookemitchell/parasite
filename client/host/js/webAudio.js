Template.hostAudio.rendered = function() {

  if(isHost) {

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    var finish = audioCtx.destination;
    sourceNodes = [,,,,,,]
    gainNodes = [,,,,,,]

    ;(function setUpAudioNodes () {
      for (var i = 0 ; i < 7; i++){
        //create buff sources & gain nodes
        sourceNodes[i] = audioCtx.createBufferSource();
        gainNodes[i] = audioCtx.createGain();
        // connnect to gainNode
        sourceNodes[i].connect(gainNodes[i]);
        gainNodes[i].connect(finish);
        //settings
        sourceNodes[i].loop = true;
        gainNodes[i].gain.value = 0;
      }})()
//load sounds
     loadSounds = function( url, index){
      var request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'arraybuffer'
      request.onload = function () {
        //when loadeed decode deeta
        audioContext.decodeAudioData(request.response, function (buffer) {
          playSound(buffer)
        } , onError)
      }
      request.send()
  }
}



//   playSound = function playSound ( buffer ) {
//     //when audio is decoded play da sound
//     sourceNodes[index].buffer = buffer;
//     sourceNodes[index].start(0);
//     // gainNodes[index].gain.value = 0;
// }
