angular.module('hk-aerial-gui').directive('adjustableSlider', function () {
  'use strict';

  function getNormalizedValue( min, max, value ) {
    return (value-min) / (max-min);
  }

  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '='
    },
    templateUrl: 'directives/adjustableSlider/adjustableSlider.html',
    link: function (scope, element, attrs, fn) {
      var sliderPxWidth = element[0].style.width.replace('px', '') | 0;
      
      function update() {
        if(scope.data) {

          var middlePosition = getNormalizedValue(scope.data.min, scope.data.max, scope.data.middle);
          var valuePosition = getNormalizedValue(scope.data.min, scope.data.max, scope.data.value);

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
          scope.roundedValue = Math.round(scope.data.value);
        }
      }
      
      scope.$watch('data', update, true);
    },
  };
});