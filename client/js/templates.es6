Template.seconds.helpers({
  seconds: function () {
    return counter.get()
  }
})

Template.subscribers.helpers({
  boxes: () => [0,1,2,3,4,5,6]
})

var counter = new ReactiveVar(0)
setInterval(function () {
  counter.set(counter.get() + 1)
}, 1000);
