describe('/models/EventEmitter', function () {

  var EventEmitter;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function (_EventEmitter_) {
      EventEmitter = _EventEmitter_;
    });
  });

  it('can be instantiated', function () {
    expect(new EventEmitter()).to.be.instanceof(EventEmitter);
  });
  it('should have more tests');

});