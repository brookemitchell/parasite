Router.configure({
  layoutTemplate: 'ApplicationLayout',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
})

Router.route('/', {

  waitOn: function() {
    Meteor.subscribe('allTok')
  },
  data: function() {
    return TokDetails.findOne()
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
