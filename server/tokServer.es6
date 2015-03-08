var Server = new Mongo.Collection('server')
// code to run on server at startup
var apiKey = 45167732
var secret = '330406bb207afa42e6e0f86c505ce3f0d7a575b1'

// Initialize OpenTok and store it in the express app
var openTokClient = new OpenTokClient(apiKey,secret)

var sessionId = openTokClient.createSession({mediaMode: 'routed'}, (err, session) => {
  if (err) return console.log(err);
  // save the sessionId
  return Server.insert({session: session.sessionId})
})

function createData () {
  let token = openTokClient.generateToken(
    sessionId,
    {role: 'publisher',
     expireTime:
     Math.round(new Date().getTime() / 1000) + 2592e+3}) //30days
    return {token: token, apiKey: apiKey, sessionId: sessionId}
}

SSR.compileTemplate('hostPage', Assets.getText('host.html'))

Template.hostPage.helpers({
  Token : createData().token,
  apiKey : apiKey,
  sessionId: sessionId
})

Meteor.methods({
   //TODO: give this custom args
  createToken: createData,
})

Router.route('/host-server', (req, res) => {
  res.end(SSR.render('hostPage'))
  // this.next()
}, {where: 'server'})
