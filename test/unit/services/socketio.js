describe('/services/socketio', function () {

  var socketio;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function (_socketio_) {
      socketio = _socketio_;
    });
  });

  xit('should have tests', function () {
    //expect(socketio.doSomething()).to.equal('something');
  });

});