Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

Router.route('/', {
  // tokData = { sessionId: Tok.findOne('sessionId')}
  name: 'guestPath',
  template: 'guest',
  waitOn: function() {
    Meteor.subscribe('allTok')
  },
  data: function () {
  },
  action: function() {
    if(this.ready())
      this.render()
  }
})
// Router.route('/host', function () {
//   this.render('host', {
//     data: {
//       name: 'host',
//       apiKey: 123234,
//       sessionId: 'NNNNNNN',
//     }
//   })
// })
