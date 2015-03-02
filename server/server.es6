// var tokSession = new Mongo.Collection("tok");
// code to run on server at startup
var apiKey = 45167732
var secret = '330406bb207afa42e6e0f86c505ce3f0d7a575b1'

// Initialize OpenTok and store it in the express app
var openTokClient = new OpenTokClient(apiKey,secret)
var sessionId = openTokClient.createSession({mediaMode: 'routed'})

Meteor.methods({
   //TODO: give this custom args
  createToken: () => {
    var token = openTokClient.generateToken(sessionId, {
      role: 'publisher',
      expireTime: Math.round(new Date().getTime() / 1000) + 2592e+3 // 30 days
    })
  // console.log('generating token...', token)
  return {
      token: token,
      apiKey: apiKey,
      sessionId: sessionId
    }
  }
})

Meteor.startup( function() {});
