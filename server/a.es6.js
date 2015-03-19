var secret = '330406bb207afa42e6e0f86c505ce3f0d7a575b1'
apiKey = 45167732
openTokClient = new OpenTokClient(apiKey,secret)
sessionId = openTokClient.createSession({mediaMode: 'routed'})


// init
var slots = new Array(7)        // dummy array to populate values
// var slots = [null,1,2,3,4,5,6]
TokDetails.insert({userSlots: slots,
                   activeDivs: slots,
                   divPos: slots})
