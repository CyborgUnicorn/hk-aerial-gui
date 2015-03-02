angular.module('hk-aerial-gui').directive('adjustableSlider', function () {
  'use strict';

  var $this = {}; // w00t!

  $this.getNormalizedValue = function ( min, max, value ) {
    return (value-min) / (max-min);
  };

  return {
    restrict: 'E',
    replace: true,
    scope: {
      min: '=',
      max: '=',
      middle: '=',
      value: '='
    },
    templateUrl: 'directives/adjustableSlider/adjustableSlider.html',
    link: function (scope, element, attrs, fn) {
      var sliderPxWidth = element[0].style.width.replace('px', '') | 0;
      
      var middlePosition = $this.getNormalizedValue(scope.min, scope.max, scope.middle);
      var valuePosition = $this.getNormalizedValue(scope.min, scope.max, scope.value);

      if (middlePosition < 0 || middlePosition > 1 || valuePosition < 0 || valuePosition > 1)
        scope.outOfBoundsErrorClass = "outOfBounds";
      else
        scope.outOfBoundsErrorClass = "";
      scope.middlePxPosition = (middlePosition * sliderPxWidth);
      scope.valuePxPosition = (valuePosition * sliderPxWidth);
    },
  };
});