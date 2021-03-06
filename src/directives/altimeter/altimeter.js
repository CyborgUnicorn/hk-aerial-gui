angular.module('hk-aerial-gui').directive('altimeter', function () {
  'use strict';

  function getTotalAltitudeString(totalAltitude) {
    if(!totalAltitude) { totalAltitude = 0; }

    var result = '';
    var numChars = totalAltitude.toString().length;
    var desiredChars = 6;
    for ( var i = numChars; i < desiredChars; ++i) {
      result += '0';
    }

    return result + totalAltitude;
  }

  function getNeedleAngle(totalAltitude) {
    if(!totalAltitude) { totalAltitude = 0; }

    var circleMod = 100;
    return (totalAltitude / circleMod) * 360;
  }

  return {
    restrict: 'E',
    replace: true,
    scope: {
      altitude: '='
    },
    templateUrl: 'directives/altimeter/altimeter.html',
    link: function (scope, element, attrs, fn) {

      function render() {
        if(scope.altitude !== undefined) {
          scope.totalAltitude = getTotalAltitudeString(scope.altitude);
          scope.needleRotation = getNeedleAngle(scope.altitude);
        }
      }

      scope.$watch('altitude', render);
    }
  };
});