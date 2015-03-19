Template.subscribers.events({
  'mousedown .sub ': (event) => {
    // sendMouseMess('down', event.currentTarget.id)
    if(event.offsetX) Meteor.call('mousePress', 'down', event.currentTarget.id
                                  , [event.offsetX, event.offsetY])
    else Meteor.call('mousePress', 'down', event.currentTarget.id)
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
// p. much the core of the entire program
Tracker.autorun(function () {
  var curs = TokDetails.findOne({activeDivs: {$exists: true}},
                                {fields: {activeDivs: 1
                                          , divPos: 1}})
  if(curs){
    var divs = curs.activeDivs
    divs.forEach((elem, i) => {
      if (prev && prev[i] !== elem) {
        document.getElementById(i).classList.toggle('active', elem)

        //*****the host section
        if(isHost) {
          if(session && hostStream) {
            if (curs.divPos[i]) {
              filterNodes[i].frequency.value = curs.divPos[i][0] * 20
              filterNodes[i].Q.value = curs.divPos[i][1] / 5
            }
            if(subItems[i]){
               // magic number for gain levels
              subItems[i].setAudioVolume(100 * elem)
            }
            else gainNodes[i].gain.value=(0.5 * elem)

           //Arduino Light up call
            Meteor.call('lightYellow', i, elem )
          }
        }
        //*****

      }
    })
  prev = divs
  }
})
