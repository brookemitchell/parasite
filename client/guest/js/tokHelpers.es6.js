Template.subscribers.events({
  'mousedown .sub ': (event) => {
    // sendMouseMess('down', event.currentTarget.id)
    console.log('mOUSEPREss', event)
    Meteor.call('mousePress', 'down', event.currentTarget.id)
  },

  'mouseup .sub, mouseleave .sub ': (event) => {
    // sendMouseMess('up', event.currentTarget.id)
    Meteor.call('mousePress', 'up', event.currentTarget.id)
  }
})

Template.subscribers.helpers({

})

var prev                        //needed as file global
// the prettiest set of conditionals you'll ever see.
// the heart of the conditional audio volume changes
// one day this will be just web-audio grabbing.
// p. much the vore of the entire program
Tracker.autorun(function () {
  var curs = TokDetails.findOne({activeDivs: {$exists: true}},
                                {fields: {activeDivs: 1}})

  if(curs){
    var divs = curs.activeDivs
    divs.forEach((elem, i) => {
      if (prev && prev[i] !== elem) {
        document.getElementById(i).classList.toggle('active', elem)

        if(isHost) {
          if(session && hostStream) {
            if(subItems[i]){
              subItems[i].setAudioVolume(100 * elem)
            }
            else gainNodes[i].gain.value=(0.5 * elem)
          }
        }

      }
    })
  prev = divs
  }
})
