var Server = new Mongo.Collection('server')

// var FreeSlots = new Mongo.Collection('freeSlots')
// var slotsId = FreeSlots.insert({free:[,,,,,,,]})
// console.log('slotsId: ', slotsId);

var freeSlots = [,,,,,,,];

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

Meteor.methods({
   //TODO: give this custom args
  createToken: () => {
    var token = openTokClient.generateToken(sessionId, {
      role: 'publisher',
      expireTime: Math.round(new Date().getTime() / 1000) + 2592e+3 // 30 days
    })
  return {token: token, apiKey: apiKey, sessionId: sessionId}
  },

  slotsFree: () => {
    // console.log(freeSlots, freeSlots.length);
    return freeSlots.every( val => {
      console.log(!!val);
      !!val} )

    // for(let r = Math.floor(Math.random() * 8);;){
    //   if (!freeSlots[r])
    //     freeSlots[r] = r
    //     return r
  }


})

Meteor.startup( function() {});
