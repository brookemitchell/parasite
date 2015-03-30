var secret = '5426df72cdf7f74f027eb0692c8b21b983087d39'
apiKey = 45194182
openTokClient = new OpenTokClient(apiKey,secret)
sessionId = openTokClient.createSession({mediaMode: 'routed'})


// init
var slots = new Array(7)        // dummy array to populate values
// var slots = [null,1,2,3,4,5,6]
TokDetails.insert({userSlots: slots,
                   activeDivs: slots,
                   divPos: slots})
