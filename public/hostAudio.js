// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia)

// define other variables

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

var myAudio = document.querySelector('audio')
