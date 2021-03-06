describe.only('/services/normalize', function () {

  var normalize;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function (_normalize_) {
      normalize = _normalize_;
    });
  });
  it('sets initial from', function () {
    var normalizer = normalize.from(1100, 1800);

    expect(normalizer._from).to.eql({low: 1100, high: 1800});
  });
  it('sets initial to', function () {
    var normalizer = normalize.to(0, 255);

    expect(normalizer._to).to.eql({low: 0, high: 255});
  });
  it('sets initial from and to', function () {
    var normalizer = normalize.from(1100, 1800).to(0, 255);

    expect(normalizer._from).to.eql({low: 1100, high: 1800});
    expect(normalizer._to).to.eql({low: 0, high: 255});
  });

  describe('#linear', function () {
    it('calculates 0 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.linear(0)).to.equal(0);
    });
    it('calculates 255 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.linear(255)).to.equal(1);
    });
    it('calculates 128 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.linear(127.5)).to.equal(0.5);
    });
    it('calculates 128 from 0-255 to 1100-1900 correctly', function () {
      var normalizer = normalize.from(0, 255).to(1100, 1900);
      expect(normalizer.linear(127.5)).to.equal(1500);
    });
  });

  describe('#quadratic', function () {
    it('calculates 0 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.quadratic(0)).to.equal(0);
    });
    it('calculates 255 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.quadratic(255)).to.equal(1);
    });
    it('calculates 128 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.quadratic(127.5)).to.equal(0.5);
    });
    it('calculates 128 from 0-255 to 1100-1900 correctly', function () {
      var normalizer = normalize.from(0, 255).to(1100, 1900);
      expect(normalizer.quadratic(127.5)).to.equal(1500);
    });
  });

  describe('#cubic', function () {
    it('calculates 0 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.cubic(0)).to.equal(0);
    });
    it('calculates 255 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.cubic(255)).to.equal(1);
    });
    it('calculates 128 from 0-255 to 0-1 correctly', function () {
      var normalizer = normalize.from(0, 255).to(0, 1);
      expect(normalizer.cubic(127.5)).to.equal(0.5);
    });
    it('calculates 128 from 0-255 to 1100-1900 correctly', function () {
      var normalizer = normalize.from(0, 255).to(1100, 1900);
      expect(normalizer.cubic(127.5)).to.equal(1500);
    });
  });
});