Template.subscribers.events({
  'mousedown .sub ': (event) => {
    // sendMouseMess('down', event.currentTarget.id)
    // console.log('mOUSEPREss', event)

    Meteor.call('mousePress', 'down', event.currentTarget.id)

  },

  'mouseup .sub, mouseleave .sub ': (event) => {
    // sendMouseMess('up', event.currentTarget.id)
    Meteor.call('mousePress', 'up', event.currentTarget.id)
  }
})

Template.subscribers.helpers({


})

var prev
Tracker.autorun(function () {
  var curs = TokDetails.findOne({activeDivs: {$exists: true}},
                                {fields: {activeDivs: 1}})
  if (curs){
    var divs = curs.activeDivs
    divs.forEach((elem, i) => {
      if (prev && prev[i] !== elem)
        document.getElementById(i).classList.toggle('active', elem)
    })
    prev = divs
  }
})
