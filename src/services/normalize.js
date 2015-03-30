angular.module('hk-aerial-gui').service('normalize', function () {
  
  function Normalizer() {
    this._from = {low: 0, high: 0};
    this._to = {low: 0, high: 0};
  }

  Normalizer.prototype.from = function (low, high) {
    this._from = {low: low, high: high};
    return this;
  };

  Normalizer.prototype.to = function (low, high) {
    this._to = {low: low, high: high};
    return this;
  };

  Normalizer.prototype.calc = function (val) {
    var pos = (val - this._from.low) / (this._from.high - this._from.low);
    return this._to.low + pos * (this._to.high - this._to.low);
  };

  var normalize = {
    from: function (low, high) { return new Normalizer().from(low, high); },
    to: function (low, high) { return new Normalizer().to(low, high); }
  };

  return normalize;
});