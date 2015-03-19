Template.hostAudio.rendered = function() {
  if(isHost) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    var finish = audioCtx.destination;
    sourceNodes = [,,,,,,]
    filterNodes = [,,,,,,]
    gainNodes = [,,,,,,]
    ;(function setUpAudioNodes () {
      for (var i = 0 ; i < 7; i++){
        //create buff sources & gain nodes
        sourceNodes[i] = audioCtx.createBufferSource();

        filterNodes[i] = audioCtx.createBiquadFilter()
        filterNodes[i].type = "lowpass";
        filterNodes[i].frequency.value = 1000;
        filterNodes[i].gain.value = 25;

        gainNodes[i] = audioCtx.createGain();
          // connnect to gainNode
        sourceNodes[i].connect(filterNodes[i]);
        filterNodes[i].connect(gainNodes[i]);
        gainNodes[i].connect(finish);
        //settings
        sourceNodes[i].loop = true;
        gainNodes[i].gain.value = 0;
      }})()

//load sounds
     loadSounds = function(url, index) {
      var request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'arraybuffer'
      request.onload = function () {
        //when loadeed decode deeta
        audioCtx.decodeAudioData(request.response, function (buffer) {
          playSound(buffer)
        } , onError)
      }
      request.send()

    function playSound ( buffer ) {
      //when audio is decoded play da sound
      sourceNodes[index].buffer = buffer;
      sourceNodes[index].start(0);
      // gainNodes[index].gain.value = 0;
    }
    function onError (error ) {
      throw new Error(error);
    }
     }
    loadSounds('sounds/1.wav', 0)
    loadSounds('sounds/2.wav', 1)
    loadSounds('sounds/3.wav', 2)
    loadSounds('sounds/4.wav', 3)
    loadSounds('sounds/5.wav', 4)
    loadSounds('sounds/6.wav', 5)
    loadSounds('sounds/7.wav', 6)
  }
}
