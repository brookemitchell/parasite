Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

Router.route('/', {
  waitOn: function() {
    Meteor.subscribe('allTok')
  },
  data: function() {
    return TokDetails.findOne()
    // isHost: false
  },
  action: function() {
    if(this.ready())
      this.render('guest')
  }
})

Router.route('/isHost', {
  waitOn: function() {
    Meteor.subscribe('allTok')
  },
  data: {
    isHost: true
  },
  action: function() {
    if(this.ready())
      this.render('host')
  }

})
