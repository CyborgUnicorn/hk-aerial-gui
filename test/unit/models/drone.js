describe('/models/Drone', function () {

  var Drone;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function (_Drone_) {
      Drone = _Drone_;
    });
  });

  it('can be instantiated', function () {
    expect(new Drone()).to.be.instanceof(Drone);
  });
  it('should have more tests');

});