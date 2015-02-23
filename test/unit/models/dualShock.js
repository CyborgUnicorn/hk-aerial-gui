describe('/models/DualShock', function () {

  var DualShock;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function (_DualShock_) {
      DualShock = _DualShock_;
    });
  });

  it('can be instantiated', function () {
    expect(new DualShock()).to.be.instanceof(DualShock);
  });
  it('should have more tests');

});