angular.module('hk-aerial-gui').directive('compass', function () {
  'use strict';

  function calculateDegrees(mag) {
    var SENSORS_GAUSS_TO_MICROTESLA = 100;  // < Gauss to micro-Tesla multiplier
    var _hmc5883_Gauss_LSB_XY = 1100; //MagGain 1.3
    var _hmc5883_Gauss_LSB_Z = 980; //MagGain 1.3

    var magRoll_X = mag[0];
    var magPitch_Y = mag[1];
    var magYaw_Z = mag[2];

    var X = magRoll_X / _hmc5883_Gauss_LSB_XY * SENSORS_GAUSS_TO_MICROTESLA;
    var Y = magPitch_Y / _hmc5883_Gauss_LSB_XY * SENSORS_GAUSS_TO_MICROTESLA;
    var Z = magYaw_Z / _hmc5883_Gauss_LSB_Z * SENSORS_GAUSS_TO_MICROTESLA;

    var heading = Math.atan2(Y, X);
    // Find yours here: http://www.magnetic-declination.com/
    var declinationAngle = 15 * (Math.PI / 180);
    heading += declinationAngle;

    if (heading < 0)
        heading += 2 * Math.PI;

    if (heading > 2 * Math.PI)
        heading -= 2 * Math.PI;

    // Convert radians to degrees for readability.
    var headingDegrees = heading * 180 / Math.PI;

    return headingDegrees;
  }

  return {
    restrict: 'E',
    replace: true,
    scope: {
      mag: '='
    },
    templateUrl: 'directives/compass/compass.html',
    link: function (scope, element, attrs, fn) {

      function render() {
        if(scope.mag !== undefined) {
          scope.compassRotation = calculateDegrees(scope.mag);
        }
      }

      scope.$watch('mag', render, true);
    }
  };
});