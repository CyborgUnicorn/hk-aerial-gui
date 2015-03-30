angular.module('hk-aerial-gui').directive('adjustableSlider', function () {
  'use strict';

  function getNormalizedValue( min, max, value ) {
    return (value-min) / (max-min);
  }

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
      
      function update() {
        var middlePosition = getNormalizedValue(scope.min, scope.max, scope.middle);
        var valuePosition = getNormalizedValue(scope.min, scope.max, scope.value);

        if (middlePosition < 0 || middlePosition > 1 || valuePosition < 0 || valuePosition > 1) {
          scope.outOfBoundsErrorClass = "outOfBounds";
        } else {
          scope.outOfBoundsErrorClass = "";
        }

        var middle = middlePosition * sliderPxWidth;
        var value = valuePosition * sliderPxWidth;

        scope.middlePx = Math.round(middle);
        scope.leftPx = Math.round(Math.min(middle, value));
        scope.widthPx = Math.round(Math.abs(middle - value));
        scope.roundedValue = Math.round(scope.value);
      }
      
      scope.$watchGroup(['min', 'max', 'middle', 'value'], update);
    },
  };
});